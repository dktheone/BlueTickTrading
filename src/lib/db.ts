import { createRequire } from "module";
import path from "path";
import fs from "fs";

export interface LeadRecord {
  id?: number;
  name: string;
  email: string;
  phone: string;
  experience?: string;
  interest?: string;
  message?: string;
  ip_address?: string;
  created_at?: string;
  status?: "New" | "Responded" | string;
  webinar_id?: number | null;
}

let dbInstance: any = null;
let isNodeSqliteSupported = false;

// Attempt to load node:sqlite safely (supported in Node.js >= 22.5.0)
try {
  const require = createRequire(import.meta.url);
  const sqliteModule = require("node:sqlite");
  if (sqliteModule && sqliteModule.DatabaseSync) {
    dbInstance = sqliteModule.DatabaseSync;
    isNodeSqliteSupported = true;
  }
} catch {
  isNodeSqliteSupported = false;
  console.warn(
    "[SQLite Notice] Native node:sqlite requires Node.js >= 22.5.0. Running in file-based JSON persistence mode (data/leads.json)."
  );
}

let activeDbInstance: any = null;

/**
 * Returns a singleton SQLite3 database instance using Node.js's built-in node:sqlite module
 * when available on Node >= 22.5.0.
 */
export function getDb(): any {
  if (!isNodeSqliteSupported) {
    return null;
  }

  if (!activeDbInstance) {
    const dbDir = path.join(process.cwd(), "data");
    if (!fs.existsSync(dbDir)) {
      fs.mkdirSync(dbDir, { recursive: true });
    }

    const dbPath = process.env.SQLITE_DB_PATH || path.join(dbDir, "leads.db");
    activeDbInstance = new dbInstance(dbPath);
    activeDbInstance.exec("PRAGMA journal_mode = WAL;");
    activeDbInstance.exec("PRAGMA busy_timeout = 10000;");

    // Initialize Schema from schema.sql if exists, with backward compatible fallback
    const schemaFile = path.join(process.cwd(), "src", "lib", "schema.sql");
    if (fs.existsSync(schemaFile)) {
      const schemaSql = fs.readFileSync(schemaFile, "utf-8");
      activeDbInstance.exec(schemaSql);
    } else {
      activeDbInstance.exec(`
        CREATE TABLE IF NOT EXISTS leads (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT NOT NULL,
          email TEXT NOT NULL,
          phone TEXT NOT NULL,
          experience TEXT,
          interest TEXT,
          message TEXT,
          ip_address TEXT,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        );
        CREATE INDEX IF NOT EXISTS idx_leads_email ON leads(email);
        CREATE INDEX IF NOT EXISTS idx_leads_phone ON leads(phone);
        CREATE INDEX IF NOT EXISTS idx_leads_created_at ON leads(created_at);
      `);
    }

    // Safe migration: Add status & webinar_id to leads table if not present
    try {
      activeDbInstance.exec(`ALTER TABLE leads ADD COLUMN status TEXT DEFAULT 'New';`);
    } catch {
      // Column already exists
    }
    try {
      activeDbInstance.exec(`ALTER TABLE leads ADD COLUMN webinar_id INTEGER;`);
    } catch {
      // Column already exists
    }
  }

  return activeDbInstance;
}

function getJsonFilePath(): string {
  const dbDir = path.join(process.cwd(), "data");
  if (!fs.existsSync(dbDir)) {
    fs.mkdirSync(dbDir, { recursive: true });
  }
  return path.join(dbDir, "leads.json");
}

function readJsonLeads(): LeadRecord[] {
  try {
    const filePath = getJsonFilePath();
    if (!fs.existsSync(filePath)) return [];
    const content = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(content || "[]");
  } catch (e) {
    console.error("[JSON Store Error] Failed to read leads.json:", e);
    return [];
  }
}

function writeJsonLeads(leads: LeadRecord[]): void {
  try {
    const filePath = getJsonFilePath();
    fs.writeFileSync(filePath, JSON.stringify(leads, null, 2), "utf-8");
  } catch (e) {
    console.error("[JSON Store Error] Failed to write leads.json:", e);
  }
}

/**
 * Inserts a new webinar registration or contact lead into SQLite3 (or JSON fallback).
 */
export function insertLead(lead: Omit<LeadRecord, "id" | "created_at">): { id: number | bigint; success: boolean } {
  const db = getDb();
  const status = lead.status || "New";

  // Mode 1: Native SQLite3 (Node.js >= 22.5.0)
  if (db) {
    try {
      const stmt = db.prepare(`
        INSERT INTO leads (name, email, phone, experience, interest, message, ip_address, status, webinar_id)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
      `);

      const info = stmt.run(
        lead.name,
        lead.email,
        lead.phone,
        lead.experience || null,
        lead.interest || null,
        lead.message || null,
        lead.ip_address || null,
        status,
        lead.webinar_id || null
      );

      return { id: info.lastInsertRowid, success: true };
    } catch (error) {
      console.error("[Node SQLite Error] Failed to insert lead record:", error);
      throw error;
    }
  }

  // Mode 2: JSON Persistence Fallback (Node.js < 22.5.0 on Hostinger)
  try {
    const leads = readJsonLeads();
    const newId = leads.length > 0 ? (leads[leads.length - 1].id || 0) + 1 : 1;
    const newRecord: LeadRecord = {
      ...lead,
      id: newId,
      status,
      created_at: new Date().toISOString(),
    };
    leads.push(newRecord);
    writeJsonLeads(leads);
    console.log(`[JSON Store] Persisted lead #${newId} to data/leads.json`);
    return { id: newId, success: true };
  } catch (error) {
    console.error("[JSON Store Error] Failed to insert lead record:", error);
    throw error;
  }
}

/**
 * Retrieves all stored leads ordered by newest first.
 */
export function getAllLeads(limit = 500): LeadRecord[] {
  const db = getDb();
  if (db) {
    try {
      const stmt = db.prepare(`
        SELECT id, name, email, phone, experience, interest, message, ip_address, created_at, 
               COALESCE(status, 'New') as status, webinar_id
        FROM leads
        ORDER BY id DESC
        LIMIT ?
      `);
      const rows = stmt.all(limit) as any[];
      return rows.map((r) => ({ ...r, status: r.status || "New" })) as LeadRecord[];
    } catch (error) {
      console.error("[Node SQLite Error] Failed to fetch leads:", error);
      return [];
    }
  }

  const leads = readJsonLeads();
  return leads.slice(-limit).reverse().map((l) => ({ ...l, status: l.status || "New" }));
}

/**
 * Updates the response status of a webinar lead ('New' | 'Responded').
 */
export function updateLeadStatus(id: number, status: string): boolean {
  const db = getDb();
  if (!db) return false;
  try {
    db.prepare(`UPDATE leads SET status = ? WHERE id = ?`).run(status, id);
    return true;
  } catch (err) {
    console.error("[DB Update Lead Status Error]:", err);
    return false;
  }
}

export interface ContactInquiryRecord {
  id: number;
  user_id: number;
  name: string;
  email: string;
  phone: string;
  subject_topic: string;
  message: string;
  source_url: string;
  status: "New" | "Responded" | string;
  ip_address?: string | null;
  created_at: string;
}

/**
 * Retrieves all general contact desk inquiries joined with users_master.
 */
export function getAllContactInquiries(limit = 500): ContactInquiryRecord[] {
  const db = getDb();
  if (!db) return [];

  try {
    const stmt = db.prepare(`
      SELECT 
        c.id, c.user_id, u.name, u.email, u.phone,
        c.subject_topic, c.message, c.source_url, 
        COALESCE(c.status, 'New') as status,
        c.ip_address, c.created_at
      FROM leads_contact c
      JOIN users_master u ON c.user_id = u.id
      ORDER BY c.id DESC
      LIMIT ?
    `);
    const rows = stmt.all(limit) as any[];
    return rows.map((r) => ({ ...r })) as ContactInquiryRecord[];
  } catch (err) {
    console.error("[DB Get Contact Inquiries Error]:", err);
    return [];
  }
}

/**
 * Updates the response status of a contact inquiry ('New' | 'Responded').
 */
export function updateContactInquiryStatus(id: number, status: string): boolean {
  const db = getDb();
  if (!db) return false;
  try {
    db.prepare(`UPDATE leads_contact SET status = ? WHERE id = ?`).run(status, id);
    return true;
  } catch (err) {
    console.error("[DB Update Contact Status Error]:", err);
    return false;
  }
}

/**
 * Returns total count of registered leads.
 */
export function getLeadsCount(): number {
  const db = getDb();
  if (db) {
    try {
      const row = db.prepare(`SELECT COUNT(*) as count FROM leads`).get() as { count: number };
      return row?.count || 0;
    } catch (error) {
      console.error("[Node SQLite Error] Failed to get count:", error);
      return 0;
    }
  }

  const leads = readJsonLeads();
  return leads.length;
}

/**
 * Stage 3 Relational Helper: Finds or creates a unique record in users_master
 * Composite Unique Key: (phone, email)
 */
export function findOrCreateUser(payload: { name: string; phone: string; email: string; experience?: string; city?: string }): { id: number; isNew: boolean } {
  const db = getDb();
  if (!db) {
    return { id: 1, isNew: true };
  }

  const existing = db.prepare("SELECT id FROM users_master WHERE phone = ? AND email = ?").get(payload.phone, payload.email) as { id: number } | undefined;
  if (existing) {
    return { id: existing.id, isNew: false };
  }

  const stmt = db.prepare("INSERT INTO users_master (name, phone, email, experience_level, city) VALUES (?, ?, ?, ?, ?)");
  const info = stmt.run(payload.name, payload.phone, payload.email, payload.experience || null, payload.city || null);
  return { id: Number(info.lastInsertRowid), isNew: true };
}

/**
 * Stage 3 Relational Helper: Records DPDP Act consent for a user
 */
export function recordConsent(payload: { userId: number; consentGiven?: boolean; allowWhatsApp?: boolean; allowEmail?: boolean; allowTelegram?: boolean; ip?: string; userAgent?: string }): void {
  const db = getDb();
  if (!db) return;

  const stmt = db.prepare(`
    INSERT INTO consent_status (user_id, consent_given, allow_whatsapp, allow_email, allow_telegram, ip_address, user_agent)
    VALUES (?, ?, ?, ?, ?, ?, ?)
    ON CONFLICT(user_id) DO UPDATE SET
      consent_given = excluded.consent_given,
      allow_whatsapp = excluded.allow_whatsapp,
      allow_email = excluded.allow_email,
      allow_telegram = excluded.allow_telegram,
      consent_timestamp = CURRENT_TIMESTAMP,
      ip_address = excluded.ip_address,
      user_agent = excluded.user_agent
  `);

  stmt.run(
    payload.userId,
    payload.consentGiven ?? 1 ? 1 : 0,
    payload.allowWhatsApp ?? 1 ? 1 : 0,
    payload.allowEmail ?? 1 ? 1 : 0,
    payload.allowTelegram ?? 1 ? 1 : 0,
    payload.ip || null,
    payload.userAgent || null
  );
}

/**
 * Stage 3 Relational Helper: Saves general inquiry from /contact into leads_contact
 */
export function insertContactLead(payload: { userId: number; subjectTopic: string; message: string; sourceUrl?: string; ipAddress?: string }): { id: number } {
  const db = getDb();
  if (!db) return { id: 1 };

  const stmt = db.prepare(`
    INSERT INTO leads_contact (user_id, subject_topic, message, source_url, ip_address)
    VALUES (?, ?, ?, ?, ?)
  `);
  const info = stmt.run(payload.userId, payload.subjectTopic, payload.message, payload.sourceUrl || "/contact", payload.ipAddress || null);
  return { id: Number(info.lastInsertRowid) };
}

export interface AdminUserRecord {
  id: number;
  username: string;
  display_name: string;
  role: "super_admin" | "admin";
  mobile: string;
  tg_chat_id?: string | null;
  hashed_password?: string | null;
  must_change_password: number;
  is_active: number;
  created_at: string;
  updated_at: string;
  avatar_url?: string | null;
  bio?: string | null;
  designation?: string | null;
}

/**
 * Normalizes phone numbers for uniform comparison (+91-9140494689 -> 9140494689 or +919140494689)
 */
export function normalizePhone(phone: string): string {
  const digits = phone.replace(/[^0-9]/g, "");
  if (digits.length === 10) return `+91${digits}`;
  if (digits.length === 12 && digits.startsWith("91")) return `+${digits}`;
  return phone.trim();
}

/**
 * Retrieves an admin user by username or phone number, joined with their profile.
 */
export function getAdminByUsernameOrMobile(identifier: string): AdminUserRecord | null {
  const db = getDb();
  if (!db) return null;

  const clean = identifier.trim().toLowerCase();
  const normalizedPhone = normalizePhone(identifier);

  try {
    const stmt = db.prepare(`
      SELECT 
        u.id, u.username, u.display_name, u.role, u.mobile, u.tg_chat_id,
        u.hashed_password, u.must_change_password, u.is_active, u.created_at, u.updated_at,
        p.avatar_url, p.bio, p.designation
      FROM admin_users u
      LEFT JOIN admin_user_profile p ON u.id = p.admin_user_id
      WHERE LOWER(u.username) = ? OR u.mobile = ? OR u.mobile = ?
      LIMIT 1
    `);

    const row = stmt.get(clean, clean, normalizedPhone) as unknown as AdminUserRecord | undefined;
    return row ? { ...row } : null;
  } catch (err) {
    console.error("[DB Admin Query Error]:", err);
    return null;
  }
}

/**
 * Retrieves full admin profile by user ID.
 */
export function getAdminById(id: number): AdminUserRecord | null {
  const db = getDb();
  if (!db) return null;

  try {
    const stmt = db.prepare(`
      SELECT 
        u.id, u.username, u.display_name, u.role, u.mobile, u.tg_chat_id,
        u.hashed_password, u.must_change_password, u.is_active, u.created_at, u.updated_at,
        p.avatar_url, p.bio, p.designation
      FROM admin_users u
      LEFT JOIN admin_user_profile p ON u.id = p.admin_user_id
      WHERE u.id = ?
      LIMIT 1
    `);

    const row = stmt.get(id) as unknown as AdminUserRecord | undefined;
    return row ? { ...row } : null;
  } catch (err) {
    console.error("[DB Admin Query By ID Error]:", err);
    return null;
  }
}

/**
 * Updates an admin's profile (avatar, bio, designation).
 */
export function updateAdminProfile(
  adminUserId: number,
  updates: { avatar_url?: string; bio?: string; designation?: string; tg_chat_id?: string }
): boolean {
  const db = getDb();
  if (!db) return false;

  try {
    // If tg_chat_id is provided, update admin_users table
    if (updates.tg_chat_id !== undefined) {
      db.prepare("UPDATE admin_users SET tg_chat_id = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?").run(
        updates.tg_chat_id || null,
        adminUserId
      );
    }

    // Upsert into admin_user_profile
    const existing = db.prepare("SELECT id FROM admin_user_profile WHERE admin_user_id = ?").get(adminUserId);
    if (existing) {
      db.prepare(`
        UPDATE admin_user_profile
        SET avatar_url = COALESCE(?, avatar_url),
            bio = COALESCE(?, bio),
            designation = COALESCE(?, designation),
            updated_at = CURRENT_TIMESTAMP
        WHERE admin_user_id = ?
      `).run(
        updates.avatar_url ?? null,
        updates.bio ?? null,
        updates.designation ?? null,
        adminUserId
      );
    } else {
      db.prepare(`
        INSERT INTO admin_user_profile (admin_user_id, avatar_url, bio, designation)
        VALUES (?, ?, ?, ?)
      `).run(
        adminUserId,
        updates.avatar_url || null,
        updates.bio || null,
        updates.designation || null
      );
    }

    return true;
  } catch (err) {
    console.error("[DB Admin Profile Update Error]:", err);
    return false;
  }
}

/**
 * Updates an admin user's hashed password and clears must_change_password flag.
 */
export function updateAdminPassword(adminUserId: number, hashedPassword: string): boolean {
  const db = getDb();
  if (!db) return false;

  try {
    db.prepare(`
      UPDATE admin_users
      SET hashed_password = ?, must_change_password = 0, updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `).run(hashedPassword, adminUserId);
    return true;
  } catch (err) {
    console.error("[DB Admin Password Update Error]:", err);
    return false;
  }
}

/**
 * Saves or updates an active OTP challenge in SQLite so it survives worker processes.
 */
export function setAdminOtpChallenge(userId: number, otp: string, expiresAt: number, username: string): boolean {
  const db = getDb();
  if (!db) return false;

  try {
    db.prepare(`
      INSERT INTO admin_otp_challenges (user_id, otp, expires_at, username)
      VALUES (?, ?, ?, ?)
      ON CONFLICT(user_id) DO UPDATE SET
        otp = excluded.otp,
        expires_at = excluded.expires_at,
        username = excluded.username,
        created_at = CURRENT_TIMESTAMP
    `).run(userId, otp, expiresAt, username);
    return true;
  } catch (err) {
    console.error("[DB Set Admin OTP Error]:", err);
    return false;
  }
}

/**
 * Retrieves an active OTP challenge for a user.
 */
export function getAdminOtpChallenge(userId: number): { otp: string; expires_at: number; username: string } | null {
  const db = getDb();
  if (!db) return null;

  try {
    const row = db.prepare(`
      SELECT otp, expires_at, username FROM admin_otp_challenges WHERE user_id = ?
    `).get(userId) as { otp: string; expires_at: number; username: string } | undefined;
    return row ? { ...row } : null;
  } catch (err) {
    console.error("[DB Get Admin OTP Error]:", err);
    return null;
  }
}

/**
 * Deletes an active OTP challenge for a user after use or expiry.
 */
export function deleteAdminOtpChallenge(userId: number): boolean {
  const db = getDb();
  if (!db) return false;

  try {
    db.prepare(`DELETE FROM admin_otp_challenges WHERE user_id = ?`).run(userId);
    return true;
  } catch (err) {
    console.error("[DB Delete Admin OTP Error]:", err);
    return false;
  }
}

// ==============================================================================
// WEBINAR MANAGEMENT FUNCTIONS
// ==============================================================================

export interface WebinarRecord {
  id: number;
  slug: string;
  title: string;
  subtitle?: string | null;
  date_time: string;
  duration_minutes: number;
  banner_image_url?: string | null;
  short_description?: string | null;
  full_description_html?: string | null;
  topics_json?: string | null;
  mentor_name: string;
  mentor_bio?: string | null;
  status: "draft" | "published" | "archived";
  is_active: number;
  max_seats: number;
  zoom_join_url?: string | null;
  created_at?: string;
  updated_at?: string;
  registrant_count?: number;
}

/**
 * Retrieves all webinars ordered by status, scheduled date with registration count.
 */
export function getAllWebinars(): WebinarRecord[] {
  const db = getDb();
  if (!db) return [];

  try {
    const rows = db.prepare(`
      SELECT 
        w.*,
        COUNT(r.id) as registrant_count
      FROM webinars w
      LEFT JOIN webinar_registrations r ON w.id = r.webinar_id
      GROUP BY w.id
      ORDER BY 
        CASE w.status WHEN 'published' THEN 1 WHEN 'draft' THEN 2 ELSE 3 END ASC,
        w.created_at DESC
    `).all() as unknown as WebinarRecord[];

    return rows.map((r) => ({ ...r }));
  } catch (err) {
    console.error("[DB Get All Webinars Error]:", err);
    return [];
  }
}

/**
 * Retrieves only publicly published webinars for public-facing pages (excluding drafts and archived).
 */
export function getPublishedWebinars(): WebinarRecord[] {
  const db = getDb();
  if (!db) return [];

  try {
    const rows = db.prepare(`
      SELECT 
        w.*,
        COUNT(r.id) as registrant_count
      FROM webinars w
      LEFT JOIN webinar_registrations r ON w.id = r.webinar_id
      WHERE w.status = 'published' AND w.is_active = 1
      GROUP BY w.id
      ORDER BY w.created_at DESC
    `).all() as unknown as WebinarRecord[];

    return rows.map((r) => ({ ...r }));
  } catch (err) {
    console.error("[DB Get Published Webinars Error]:", err);
    return [];
  }
}

/**
 * Retrieves a single webinar by its unique URL slug.
 */
export function getWebinarBySlug(slug: string): WebinarRecord | null {
  const db = getDb();
  if (!db) return null;

  try {
    const row = db.prepare(`
      SELECT 
        w.*,
        COUNT(r.id) as registrant_count
      FROM webinars w
      LEFT JOIN webinar_registrations r ON w.id = r.webinar_id
      WHERE w.slug = ?
      GROUP BY w.id
      LIMIT 1
    `).get(slug.trim().toLowerCase()) as unknown as WebinarRecord | undefined;

    return row ? { ...row } : null;
  } catch (err) {
    console.error("[DB Get Webinar By Slug Error]:", err);
    return null;
  }
}

/**
 * Retrieves a single webinar by its primary ID.
 */
export function getWebinarById(id: number): WebinarRecord | null {
  const db = getDb();
  if (!db) return null;

  try {
    const row = db.prepare(`
      SELECT * FROM webinars WHERE id = ? LIMIT 1
    `).get(id) as unknown as WebinarRecord | undefined;

    return row ? { ...row } : null;
  } catch (err) {
    console.error("[DB Get Webinar By ID Error]:", err);
    return null;
  }
}

/**
 * Retrieves the currently active published webinar with registrant count.
 */
export function getActiveWebinar(): WebinarRecord | null {
  const db = getDb();
  if (!db) return null;

  try {
    const row = db.prepare(`
      SELECT 
        w.*,
        COUNT(r.id) as registrant_count
      FROM webinars w
      LEFT JOIN webinar_registrations r ON w.id = r.webinar_id
      WHERE w.status = 'published' AND w.is_active = 1
      GROUP BY w.id
      ORDER BY w.created_at DESC
      LIMIT 1
    `).get() as unknown as WebinarRecord | undefined;

    return row ? { ...row } : null;
  } catch (err) {
    console.error("[DB Get Active Webinar Error]:", err);
    return null;
  }
}

/**
 * Creates a new webinar campaign.
 */
export function createWebinar(data: {
  slug: string;
  title: string;
  subtitle?: string;
  date_time: string;
  duration_minutes?: number;
  banner_image_url?: string;
  short_description?: string;
  topics_json?: string;
  mentor_name?: string;
  mentor_bio?: string;
  status?: "draft" | "published" | "archived";
  is_active?: number;
  max_seats?: number;
  zoom_join_url?: string;
}): number | null {
  const db = getDb();
  if (!db) return null;

  const status = data.status || "draft";
  const isActive = status === "published" ? 1 : 0;

  try {
    const result = db.prepare(`
      INSERT INTO webinars (
        slug, title, subtitle, date_time, duration_minutes,
        banner_image_url, short_description, topics_json,
        mentor_name, mentor_bio, status, is_active, max_seats, zoom_join_url
      ) VALUES (
        ?, ?, ?, ?, ?,
        ?, ?, ?,
        ?, ?, ?, ?, ?, ?
      )
    `).run(
      data.slug.trim().toLowerCase(),
      data.title.trim(),
      data.subtitle?.trim() || null,
      data.date_time.trim(),
      data.duration_minutes ?? 90,
      data.banner_image_url?.trim() || "/images/traderoom/time-cycle-trading.jpg",
      data.short_description?.trim() || null,
      data.topics_json || "[]",
      data.mentor_name?.trim() || "Amit Gupta",
      data.mentor_bio?.trim() || "15+ Years Active Market Veteran • SEBI / NISM Certified Research Analyst",
      status,
      isActive,
      data.max_seats ?? 500,
      data.zoom_join_url?.trim() || null
    );

    return Number(result.lastInsertRowid);
  } catch (err) {
    console.error("[DB Create Webinar Error]:", err);
    return null;
  }
}

/**
 * Updates an existing webinar campaign.
 */
export function updateWebinar(
  id: number,
  data: Partial<WebinarRecord>
): boolean {
  const db = getDb();
  if (!db) return false;

  try {
    const current = getWebinarById(id);
    if (!current) return false;

    const newStatus = data.status !== undefined ? data.status : (data.is_active !== undefined ? (data.is_active ? "published" : "draft") : current.status);
    const newIsActive = newStatus === "published" ? 1 : 0;

    db.prepare(`
      UPDATE webinars
      SET slug = COALESCE(?, slug),
          title = COALESCE(?, title),
          subtitle = COALESCE(?, subtitle),
          date_time = COALESCE(?, date_time),
          duration_minutes = COALESCE(?, duration_minutes),
          banner_image_url = COALESCE(?, banner_image_url),
          short_description = COALESCE(?, short_description),
          topics_json = COALESCE(?, topics_json),
          mentor_name = COALESCE(?, mentor_name),
          mentor_bio = COALESCE(?, mentor_bio),
          status = COALESCE(?, status),
          is_active = ?,
          max_seats = COALESCE(?, max_seats),
          zoom_join_url = COALESCE(?, zoom_join_url),
          updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `).run(
      data.slug !== undefined && data.slug !== null ? data.slug.trim().toLowerCase() : (data.slug ?? null),
      data.title !== undefined && data.title !== null ? data.title.trim() : (data.title ?? null),
      data.subtitle !== undefined && data.subtitle !== null ? data.subtitle.trim() : (data.subtitle ?? null),
      data.date_time !== undefined && data.date_time !== null ? data.date_time.trim() : (data.date_time ?? null),
      data.duration_minutes !== undefined ? data.duration_minutes : null,
      data.banner_image_url !== undefined && data.banner_image_url !== null ? data.banner_image_url.trim() : (data.banner_image_url ?? null),
      data.short_description !== undefined && data.short_description !== null ? data.short_description.trim() : (data.short_description ?? null),
      data.topics_json !== undefined ? data.topics_json : null,
      data.mentor_name !== undefined && data.mentor_name !== null ? data.mentor_name.trim() : (data.mentor_name ?? null),
      data.mentor_bio !== undefined && data.mentor_bio !== null ? data.mentor_bio.trim() : (data.mentor_bio ?? null),
      newStatus,
      newIsActive,
      data.max_seats !== undefined ? data.max_seats : null,
      data.zoom_join_url !== undefined && data.zoom_join_url !== null ? data.zoom_join_url.trim() : (data.zoom_join_url ?? null),
      id
    );

    return true;
  } catch (err) {
    console.error("[DB Update Webinar Error]:", err);
    return false;
  }
}

/**
 * Registers a student for a specific webinar.
 * Automatically upserts user in users_master and inserts into webinar_registrations.
 */
export function registerUserForWebinar(payload: {
  webinarId: number;
  name: string;
  email: string;
  phone: string;
  experience?: string;
  ipAddress?: string;
}): { success: boolean; registrationId?: number; isNewUser?: boolean; error?: string } {
  const db = getDb();
  if (!db) return { success: false, error: "Database unavailable." };

  try {
    // 1. Find or create master user identity
    const userRes = findOrCreateUser({
      name: payload.name,
      email: payload.email,
      phone: payload.phone,
      experience: payload.experience,
    });

    // 2. Record consent
    recordConsent({
      userId: userRes.id,
      consentGiven: true,
      allowWhatsApp: true,
      allowEmail: true,
      allowTelegram: true,
      ip: payload.ipAddress,
    });

    // 3. Insert webinar registration (or ignore if already registered)
    const stmt = db.prepare(`
      INSERT INTO webinar_registrations (webinar_id, user_id, ip_address)
      VALUES (?, ?, ?)
      ON CONFLICT(webinar_id, user_id) DO UPDATE SET
        registered_at = CURRENT_TIMESTAMP
    `);

    const result = stmt.run(payload.webinarId, userRes.id, payload.ipAddress || null);

    return {
      success: true,
      registrationId: Number(result.lastInsertRowid) || 1,
      isNewUser: userRes.isNew,
    };
  } catch (err: any) {
    console.error("[DB Webinar Registration Error]:", err);
    return { success: false, error: err?.message || "Failed to register for webinar." };
  }
}

/**
 * Deletes a webinar by its ID.
 */
export function deleteWebinar(id: number): boolean {
  const db = getDb();
  if (!db) return false;

  try {
    db.prepare("DELETE FROM webinars WHERE id = ?").run(id);
    return true;
  } catch (err) {
    console.error("[DB Delete Webinar Error]:", err);
    return false;
  }
}

/**
 * Purges all user-submitted leads, inquiries, and master users, while strictly
 * preserving webinars, admin identities, and CMS/review content.
 */
export function purgeAllLeadsAndContacts(): { success: boolean; purged: Record<string, number>; error?: string } {
  const db = getDb();
  const purged: Record<string, number> = {};

  if (db) {
    try {
      db.exec("PRAGMA foreign_keys = OFF;");

      const tables = [
        "leads",
        "leads_contact",
        "leads_newsletter",
        "webinar_registrations",
        "users_master",
        "consent_status",
        "followup_progress",
      ];

      for (const table of tables) {
        try {
          const row = db.prepare(`SELECT COUNT(*) as count FROM "${table}"`).get() as { count: number };
          purged[table] = row ? row.count : 0;
          db.exec(`DELETE FROM "${table}";`);
        } catch {
          purged[table] = 0;
        }
      }

      try {
        const placeholders = tables.map((t) => `'${t}'`).join(",");
        db.exec(`DELETE FROM sqlite_sequence WHERE name IN (${placeholders});`);
      } catch {
        // ignore
      }

      db.exec("PRAGMA foreign_keys = ON;");
      return { success: true, purged };
    } catch (err: any) {
      console.error("[DB Purge Error]:", err);
      return { success: false, purged, error: err?.message };
    }
  }

  // Purge JSON fallback store
  try {
    const filePath = getJsonFilePath();
    if (fs.existsSync(filePath)) {
      const current = readJsonLeads();
      purged["leads_json"] = current.length;
      writeJsonLeads([]);
    }
    return { success: true, purged };
  } catch (err: any) {
    return { success: false, purged, error: err?.message };
  }
}

