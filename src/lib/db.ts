import { getMongoDb } from "./mongodb";

// ==============================================================================
// TYPES & INTERFACES
// ==============================================================================

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

// ==============================================================================
// HELPER: Auto-increment Sequence Generator for MongoDB
// ==============================================================================
async function getNextSequence(sequenceName: string): Promise<number> {
  const db = await getMongoDb();
  const counterCol = db.collection("counters");
  const result = await counterCol.findOneAndUpdate(
    { _id: sequenceName as any },
    { $inc: { seq: 1 } },
    { upsert: true, returnDocument: "after" }
  );
  return result?.seq ?? Date.now();
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

// ==============================================================================
// LEADS (Webinar & Landing Page Leads)
// ==============================================================================

/**
 * Inserts a new webinar registration or contact lead into MongoDB Atlas.
 */
export async function insertLead(
  lead: Omit<LeadRecord, "id" | "created_at">
): Promise<{ id: number; success: boolean }> {
  try {
    const db = await getMongoDb();
    const nextId = await getNextSequence("leads");
    const status = lead.status || "New";
    const now = new Date().toISOString();

    const doc: LeadRecord = {
      id: nextId,
      name: lead.name,
      email: lead.email,
      phone: lead.phone,
      experience: lead.experience || undefined,
      interest: lead.interest || undefined,
      message: lead.message || undefined,
      ip_address: lead.ip_address || undefined,
      status,
      webinar_id: lead.webinar_id ?? null,
      created_at: now,
    };

    await db.collection("leads").insertOne(doc);
    return { id: nextId, success: true };
  } catch (error) {
    console.error("[MongoDB Error] Failed to insert lead record:", error);
    throw error;
  }
}

/**
 * Retrieves all stored leads ordered by newest first.
 */
export async function getAllLeads(limit = 500): Promise<LeadRecord[]> {
  try {
    const db = await getMongoDb();
    const docs = await db
      .collection("leads")
      .find({})
      .sort({ id: -1, created_at: -1 })
      .limit(limit)
      .toArray();

    return docs.map((d) => ({
      id: d.id,
      name: d.name,
      email: d.email,
      phone: d.phone,
      experience: d.experience,
      interest: d.interest,
      message: d.message,
      ip_address: d.ip_address,
      status: d.status || "New",
      webinar_id: d.webinar_id,
      created_at: d.created_at,
    }));
  } catch (error) {
    console.error("[MongoDB Error] Failed to fetch leads:", error);
    return [];
  }
}

/**
 * Updates the response status of a webinar lead ('New' | 'Responded').
 */
export async function updateLeadStatus(id: number, status: string): Promise<boolean> {
  try {
    const db = await getMongoDb();
    const res = await db.collection("leads").updateOne(
      { id: Number(id) },
      { $set: { status, updated_at: new Date().toISOString() } }
    );
    return res.matchedCount > 0;
  } catch (err) {
    console.error("[MongoDB Update Lead Status Error]:", err);
    return false;
  }
}

/**
 * Returns total count of registered leads.
 */
export async function getLeadsCount(): Promise<number> {
  try {
    const db = await getMongoDb();
    return await db.collection("leads").countDocuments();
  } catch (error) {
    console.error("[MongoDB Error] Failed to get count:", error);
    return 0;
  }
}

// ==============================================================================
// CONTACT INQUIRIES & MASTER USERS
// ==============================================================================

/**
 * Retrieves all general contact desk inquiries joined with users_master.
 */
export async function getAllContactInquiries(limit = 500): Promise<ContactInquiryRecord[]> {
  try {
    const db = await getMongoDb();
    const inquiries = await db
      .collection("leads_contact")
      .aggregate([
        { $sort: { id: -1 } },
        { $limit: limit },
        {
          $lookup: {
            from: "users_master",
            localField: "user_id",
            foreignField: "id",
            as: "user",
          },
        },
        { $unwind: { path: "$user", preserveNullAndEmptyArrays: true } },
      ])
      .toArray();

    return inquiries.map((item: any) => ({
      id: item.id,
      user_id: item.user_id,
      name: item.user?.name || item.name || "Anonymous",
      email: item.user?.email || item.email || "",
      phone: item.user?.phone || item.phone || "",
      subject_topic: item.subject_topic,
      message: item.message,
      source_url: item.source_url || "/contact",
      status: item.status || "New",
      ip_address: item.ip_address || null,
      created_at: item.created_at,
    }));
  } catch (err) {
    console.error("[MongoDB Get Contact Inquiries Error]:", err);
    return [];
  }
}

/**
 * Updates the response status of a contact inquiry ('New' | 'Responded').
 */
export async function updateContactInquiryStatus(id: number, status: string): Promise<boolean> {
  try {
    const db = await getMongoDb();
    const res = await db.collection("leads_contact").updateOne(
      { id: Number(id) },
      { $set: { status, updated_at: new Date().toISOString() } }
    );
    return res.matchedCount > 0;
  } catch (err) {
    console.error("[MongoDB Update Contact Status Error]:", err);
    return false;
  }
}

/**
 * Finds or creates a unique record in users_master.
 * Composite Unique Key: (phone, email)
 */
export async function findOrCreateUser(payload: {
  name: string;
  phone: string;
  email: string;
  experience?: string;
  city?: string;
}): Promise<{ id: number; isNew: boolean }> {
  try {
    const db = await getMongoDb();
    const usersCol = db.collection("users_master");
    const existing = await usersCol.findOne({
      phone: payload.phone.trim(),
      email: payload.email.trim().toLowerCase(),
    });

    if (existing) {
      return { id: existing.id, isNew: false };
    }

    const nextId = await getNextSequence("users_master");
    const now = new Date().toISOString();
    await usersCol.insertOne({
      id: nextId,
      name: payload.name.trim(),
      phone: payload.phone.trim(),
      email: payload.email.trim().toLowerCase(),
      experience_level: payload.experience || null,
      city: payload.city || null,
      created_at: now,
      updated_at: now,
    });

    return { id: nextId, isNew: true };
  } catch (error) {
    console.error("[MongoDB FindOrCreateUser Error]:", error);
    return { id: 1, isNew: false };
  }
}

/**
 * Records DPDP Act consent for a user.
 */
export async function recordConsent(payload: {
  userId: number;
  consentGiven?: boolean;
  allowWhatsApp?: boolean;
  allowEmail?: boolean;
  allowTelegram?: boolean;
  ip?: string;
  userAgent?: string;
}): Promise<void> {
  try {
    const db = await getMongoDb();
    const consentCol = db.collection("consent_status");
    await consentCol.updateOne(
      { user_id: Number(payload.userId) },
      {
        $set: {
          user_id: Number(payload.userId),
          consent_given: payload.consentGiven ?? true ? 1 : 0,
          allow_whatsapp: payload.allowWhatsApp ?? true ? 1 : 0,
          allow_email: payload.allowEmail ?? true ? 1 : 0,
          allow_telegram: payload.allowTelegram ?? true ? 1 : 0,
          consent_timestamp: new Date().toISOString(),
          ip_address: payload.ip || null,
          user_agent: payload.userAgent || null,
        },
      },
      { upsert: true }
    );
  } catch (error) {
    console.error("[MongoDB RecordConsent Error]:", error);
  }
}

/**
 * Saves general inquiry from /contact into leads_contact.
 */
export async function insertContactLead(payload: {
  userId: number;
  subjectTopic: string;
  message: string;
  sourceUrl?: string;
  ipAddress?: string;
}): Promise<{ id: number }> {
  try {
    const db = await getMongoDb();
    const nextId = await getNextSequence("leads_contact");
    const now = new Date().toISOString();

    await db.collection("leads_contact").insertOne({
      id: nextId,
      user_id: Number(payload.userId),
      subject_topic: payload.subjectTopic,
      message: payload.message,
      source_url: payload.sourceUrl || "/contact",
      ip_address: payload.ipAddress || null,
      status: "New",
      created_at: now,
    });

    return { id: nextId };
  } catch (error) {
    console.error("[MongoDB InsertContactLead Error]:", error);
    return { id: 1 };
  }
}

// ==============================================================================
// ADMIN ACCOUNTS & AUTHENTICATION
// ==============================================================================

/**
 * Retrieves an admin user by username or phone number, joined with their profile.
 */
export async function getAdminByUsernameOrMobile(identifier: string): Promise<AdminUserRecord | null> {
  try {
    const db = await getMongoDb();
    const clean = identifier.trim().toLowerCase();
    const normalizedPhone = normalizePhone(identifier);

    const user = await db.collection("admin_users").findOne({
      $or: [
        { username: clean },
        { mobile: clean },
        { mobile: normalizedPhone },
        { mobile: identifier.trim() },
      ],
    });

    if (!user) return null;

    const profile = await db.collection("admin_user_profile").findOne({
      admin_user_id: user.id,
    });

    return {
      id: user.id,
      username: user.username,
      display_name: user.display_name,
      role: user.role,
      mobile: user.mobile,
      tg_chat_id: user.tg_chat_id || null,
      hashed_password: user.hashed_password || null,
      must_change_password: user.must_change_password ?? 1,
      is_active: user.is_active ?? 1,
      created_at: user.created_at,
      updated_at: user.updated_at,
      avatar_url: profile?.avatar_url || null,
      bio: profile?.bio || null,
      designation: profile?.designation || null,
    };
  } catch (err) {
    console.error("[MongoDB Admin Query Error]:", err);
    return null;
  }
}

/**
 * Retrieves full admin profile by user ID.
 */
export async function getAdminById(id: number): Promise<AdminUserRecord | null> {
  try {
    const db = await getMongoDb();
    const user = await db.collection("admin_users").findOne({ id: Number(id) });
    if (!user) return null;

    const profile = await db.collection("admin_user_profile").findOne({
      admin_user_id: user.id,
    });

    return {
      id: user.id,
      username: user.username,
      display_name: user.display_name,
      role: user.role,
      mobile: user.mobile,
      tg_chat_id: user.tg_chat_id || null,
      hashed_password: user.hashed_password || null,
      must_change_password: user.must_change_password ?? 1,
      is_active: user.is_active ?? 1,
      created_at: user.created_at,
      updated_at: user.updated_at,
      avatar_url: profile?.avatar_url || null,
      bio: profile?.bio || null,
      designation: profile?.designation || null,
    };
  } catch (err) {
    console.error("[MongoDB Admin Query By ID Error]:", err);
    return null;
  }
}

/**
 * Updates an admin's profile (avatar, bio, designation, tg_chat_id).
 */
export async function updateAdminProfile(
  adminUserId: number,
  updates: { avatar_url?: string; bio?: string; designation?: string; tg_chat_id?: string }
): Promise<boolean> {
  try {
    const db = await getMongoDb();
    const now = new Date().toISOString();

    if (updates.tg_chat_id !== undefined) {
      await db.collection("admin_users").updateOne(
        { id: Number(adminUserId) },
        { $set: { tg_chat_id: updates.tg_chat_id || null, updated_at: now } }
      );
    }

    const profileSet: Record<string, any> = { updated_at: now };
    if (updates.avatar_url !== undefined) profileSet.avatar_url = updates.avatar_url || null;
    if (updates.bio !== undefined) profileSet.bio = updates.bio || null;
    if (updates.designation !== undefined) profileSet.designation = updates.designation || null;

    await db.collection("admin_user_profile").updateOne(
      { admin_user_id: Number(adminUserId) },
      { $set: profileSet },
      { upsert: true }
    );

    return true;
  } catch (err) {
    console.error("[MongoDB Admin Profile Update Error]:", err);
    return false;
  }
}

/**
 * Updates an admin user's hashed password and clears must_change_password flag.
 */
export async function updateAdminPassword(adminUserId: number, hashedPassword: string): Promise<boolean> {
  try {
    const db = await getMongoDb();
    const now = new Date().toISOString();
    const res = await db.collection("admin_users").updateOne(
      { id: Number(adminUserId) },
      {
        $set: {
          hashed_password: hashedPassword,
          must_change_password: 0,
          updated_at: now,
        },
      }
    );
    return res.matchedCount > 0;
  } catch (err) {
    console.error("[MongoDB Admin Password Update Error]:", err);
    return false;
  }
}

/**
 * Saves or updates an active OTP challenge so it survives worker processes.
 */
export async function setAdminOtpChallenge(
  userId: number,
  otp: string,
  expiresAt: number,
  username: string
): Promise<boolean> {
  try {
    const db = await getMongoDb();
    await db.collection("admin_otp_challenges").updateOne(
      { user_id: Number(userId) },
      {
        $set: {
          user_id: Number(userId),
          otp,
          expires_at: expiresAt,
          username,
          created_at: new Date().toISOString(),
        },
      },
      { upsert: true }
    );
    return true;
  } catch (err) {
    console.error("[MongoDB Set Admin OTP Error]:", err);
    return false;
  }
}

/**
 * Retrieves an active OTP challenge for a user.
 */
export async function getAdminOtpChallenge(
  userId: number
): Promise<{ otp: string; expires_at: number; username: string } | null> {
  try {
    const db = await getMongoDb();
    const doc = await db.collection("admin_otp_challenges").findOne({ user_id: Number(userId) });
    if (!doc) return null;
    return {
      otp: doc.otp,
      expires_at: doc.expires_at,
      username: doc.username,
    };
  } catch (err) {
    console.error("[MongoDB Get Admin OTP Error]:", err);
    return null;
  }
}

/**
 * Deletes an active OTP challenge for a user after use or expiry.
 */
export async function deleteAdminOtpChallenge(userId: number): Promise<boolean> {
  try {
    const db = await getMongoDb();
    await db.collection("admin_otp_challenges").deleteOne({ user_id: Number(userId) });
    return true;
  } catch (err) {
    console.error("[MongoDB Delete Admin OTP Error]:", err);
    return false;
  }
}

// ==============================================================================
// WEBINAR MANAGEMENT FUNCTIONS
// ==============================================================================

/**
 * Retrieves all webinars ordered by status, scheduled date with registration count.
 */
export async function getAllWebinars(): Promise<WebinarRecord[]> {
  try {
    const db = await getMongoDb();
    const webinars = await db
      .collection("webinars")
      .aggregate([
        {
          $lookup: {
            from: "webinar_registrations",
            localField: "id",
            foreignField: "webinar_id",
            as: "registrations",
          },
        },
        {
          $addFields: {
            registrant_count: { $size: "$registrations" },
            statusSort: {
              $switch: {
                branches: [
                  { case: { $eq: ["$status", "published"] }, then: 1 },
                  { case: { $eq: ["$status", "draft"] }, then: 2 },
                ],
                default: 3,
              },
            },
          },
        },
        { $sort: { statusSort: 1, created_at: -1 } },
        { $project: { registrations: 0, statusSort: 0 } },
      ])
      .toArray();

    return webinars.map((w: any) => ({
      id: w.id,
      slug: w.slug,
      title: w.title,
      subtitle: w.subtitle || null,
      date_time: w.date_time,
      duration_minutes: w.duration_minutes ?? 90,
      banner_image_url: w.banner_image_url || "/images/traderoom/time-cycle-trading.jpg",
      short_description: w.short_description || null,
      full_description_html: w.full_description_html || null,
      topics_json: w.topics_json || "[]",
      mentor_name: w.mentor_name || "Amit Gupta",
      mentor_bio: w.mentor_bio || null,
      status: w.status || "draft",
      is_active: w.is_active ?? 1,
      max_seats: w.max_seats ?? 500,
      zoom_join_url: w.zoom_join_url || null,
      created_at: w.created_at,
      updated_at: w.updated_at,
      registrant_count: w.registrant_count || 0,
    }));
  } catch (err) {
    console.error("[MongoDB Get All Webinars Error]:", err);
    return [];
  }
}

/**
 * Retrieves only publicly published webinars for public-facing pages (excluding drafts and archived).
 */
export async function getPublishedWebinars(): Promise<WebinarRecord[]> {
  try {
    const db = await getMongoDb();
    const webinars = await db
      .collection("webinars")
      .aggregate([
        { $match: { status: "published", is_active: 1 } },
        {
          $lookup: {
            from: "webinar_registrations",
            localField: "id",
            foreignField: "webinar_id",
            as: "registrations",
          },
        },
        {
          $addFields: {
            registrant_count: { $size: "$registrations" },
          },
        },
        { $sort: { created_at: -1 } },
        { $project: { registrations: 0 } },
      ])
      .toArray();

    return webinars.map((w: any) => ({
      id: w.id,
      slug: w.slug,
      title: w.title,
      subtitle: w.subtitle || null,
      date_time: w.date_time,
      duration_minutes: w.duration_minutes ?? 90,
      banner_image_url: w.banner_image_url || "/images/traderoom/time-cycle-trading.jpg",
      short_description: w.short_description || null,
      full_description_html: w.full_description_html || null,
      topics_json: w.topics_json || "[]",
      mentor_name: w.mentor_name || "Amit Gupta",
      mentor_bio: w.mentor_bio || null,
      status: "published",
      is_active: 1,
      max_seats: w.max_seats ?? 500,
      zoom_join_url: w.zoom_join_url || null,
      created_at: w.created_at,
      updated_at: w.updated_at,
      registrant_count: w.registrant_count || 0,
    }));
  } catch (err) {
    console.error("[MongoDB Get Published Webinars Error]:", err);
    return [];
  }
}

/**
 * Retrieves a single webinar by its unique URL slug.
 */
export async function getWebinarBySlug(slug: string): Promise<WebinarRecord | null> {
  try {
    const db = await getMongoDb();
    const cleanSlug = slug.trim().toLowerCase();

    const webinars = await db
      .collection("webinars")
      .aggregate([
        { $match: { slug: cleanSlug } },
        {
          $lookup: {
            from: "webinar_registrations",
            localField: "id",
            foreignField: "webinar_id",
            as: "registrations",
          },
        },
        {
          $addFields: {
            registrant_count: { $size: "$registrations" },
          },
        },
        { $limit: 1 },
        { $project: { registrations: 0 } },
      ])
      .toArray();

    if (!webinars || webinars.length === 0) return null;
    const w = webinars[0];

    return {
      id: w.id,
      slug: w.slug,
      title: w.title,
      subtitle: w.subtitle || null,
      date_time: w.date_time,
      duration_minutes: w.duration_minutes ?? 90,
      banner_image_url: w.banner_image_url || "/images/traderoom/time-cycle-trading.jpg",
      short_description: w.short_description || null,
      full_description_html: w.full_description_html || null,
      topics_json: w.topics_json || "[]",
      mentor_name: w.mentor_name || "Amit Gupta",
      mentor_bio: w.mentor_bio || null,
      status: w.status || "draft",
      is_active: w.is_active ?? 0,
      max_seats: w.max_seats ?? 500,
      zoom_join_url: w.zoom_join_url || null,
      created_at: w.created_at,
      updated_at: w.updated_at,
      registrant_count: w.registrant_count || 0,
    };
  } catch (err) {
    console.error("[MongoDB Get Webinar By Slug Error]:", err);
    return null;
  }
}

/**
 * Retrieves a single webinar by its primary ID.
 */
export async function getWebinarById(id: number): Promise<WebinarRecord | null> {
  try {
    const db = await getMongoDb();
    const w = await db.collection("webinars").findOne({ id: Number(id) });
    if (!w) return null;

    const count = await db
      .collection("webinar_registrations")
      .countDocuments({ webinar_id: Number(id) });

    return {
      id: w.id,
      slug: w.slug,
      title: w.title,
      subtitle: w.subtitle || null,
      date_time: w.date_time,
      duration_minutes: w.duration_minutes ?? 90,
      banner_image_url: w.banner_image_url || "/images/traderoom/time-cycle-trading.jpg",
      short_description: w.short_description || null,
      full_description_html: w.full_description_html || null,
      topics_json: w.topics_json || "[]",
      mentor_name: w.mentor_name || "Amit Gupta",
      mentor_bio: w.mentor_bio || null,
      status: w.status || "draft",
      is_active: w.is_active ?? 0,
      max_seats: w.max_seats ?? 500,
      zoom_join_url: w.zoom_join_url || null,
      created_at: w.created_at,
      updated_at: w.updated_at,
      registrant_count: count,
    };
  } catch (err) {
    console.error("[MongoDB Get Webinar By ID Error]:", err);
    return null;
  }
}

/**
 * Retrieves the currently active published webinar with registrant count.
 */
export async function getActiveWebinar(): Promise<WebinarRecord | null> {
  try {
    const db = await getMongoDb();
    const webinars = await db
      .collection("webinars")
      .aggregate([
        { $match: { status: "published", is_active: 1 } },
        {
          $lookup: {
            from: "webinar_registrations",
            localField: "id",
            foreignField: "webinar_id",
            as: "registrations",
          },
        },
        {
          $addFields: {
            registrant_count: { $size: "$registrations" },
          },
        },
        { $sort: { created_at: -1 } },
        { $limit: 1 },
        { $project: { registrations: 0 } },
      ])
      .toArray();

    if (!webinars || webinars.length === 0) return null;
    const w = webinars[0];

    return {
      id: w.id,
      slug: w.slug,
      title: w.title,
      subtitle: w.subtitle || null,
      date_time: w.date_time,
      duration_minutes: w.duration_minutes ?? 90,
      banner_image_url: w.banner_image_url || "/images/traderoom/time-cycle-trading.jpg",
      short_description: w.short_description || null,
      full_description_html: w.full_description_html || null,
      topics_json: w.topics_json || "[]",
      mentor_name: w.mentor_name || "Amit Gupta",
      mentor_bio: w.mentor_bio || null,
      status: w.status || "published",
      is_active: 1,
      max_seats: w.max_seats ?? 500,
      zoom_join_url: w.zoom_join_url || null,
      created_at: w.created_at,
      updated_at: w.updated_at,
      registrant_count: w.registrant_count || 0,
    };
  } catch (err) {
    console.error("[MongoDB Get Active Webinar Error]:", err);
    return null;
  }
}

/**
 * Creates a new webinar campaign in MongoDB Atlas.
 */
export async function createWebinar(data: {
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
}): Promise<number | null> {
  try {
    const db = await getMongoDb();
    const nextId = await getNextSequence("webinars");
    const status = data.status || "draft";
    const isActive = status === "published" ? 1 : 0;
    const now = new Date().toISOString();

    await db.collection("webinars").insertOne({
      id: nextId,
      slug: data.slug.trim().toLowerCase(),
      title: data.title.trim(),
      subtitle: data.subtitle?.trim() || null,
      date_time: data.date_time.trim(),
      duration_minutes: data.duration_minutes ?? 90,
      banner_image_url: data.banner_image_url?.trim() || "/images/traderoom/time-cycle-trading.jpg",
      short_description: data.short_description?.trim() || null,
      full_description_html: null,
      topics_json: data.topics_json || "[]",
      mentor_name: data.mentor_name?.trim() || "Amit Gupta",
      mentor_bio:
        data.mentor_bio?.trim() ||
        "15+ Years Active Market Veteran • SEBI / NISM Certified Research Analyst",
      status,
      is_active: isActive,
      max_seats: data.max_seats ?? 500,
      zoom_join_url: data.zoom_join_url?.trim() || null,
      created_at: now,
      updated_at: now,
    });

    return nextId;
  } catch (err) {
    console.error("[MongoDB Create Webinar Error]:", err);
    return null;
  }
}

/**
 * Updates an existing webinar campaign.
 */
export async function updateWebinar(
  id: number,
  data: Partial<WebinarRecord>
): Promise<boolean> {
  try {
    const db = await getMongoDb();
    const current = await getWebinarById(id);
    if (!current) return false;

    const newStatus =
      data.status !== undefined
        ? data.status
        : data.is_active !== undefined
        ? data.is_active
          ? "published"
          : "draft"
        : current.status;
    const newIsActive = newStatus === "published" ? 1 : 0;
    const now = new Date().toISOString();

    const updateDoc: Record<string, any> = {
      updated_at: now,
      status: newStatus,
      is_active: newIsActive,
    };

    if (data.slug !== undefined) updateDoc.slug = data.slug.trim().toLowerCase();
    if (data.title !== undefined) updateDoc.title = data.title.trim();
    if (data.subtitle !== undefined) updateDoc.subtitle = data.subtitle?.trim() || null;
    if (data.date_time !== undefined) updateDoc.date_time = data.date_time.trim();
    if (data.duration_minutes !== undefined) updateDoc.duration_minutes = data.duration_minutes;
    if (data.banner_image_url !== undefined) updateDoc.banner_image_url = data.banner_image_url?.trim() || null;
    if (data.short_description !== undefined) updateDoc.short_description = data.short_description?.trim() || null;
    if (data.topics_json !== undefined) updateDoc.topics_json = data.topics_json;
    if (data.mentor_name !== undefined) updateDoc.mentor_name = data.mentor_name?.trim() || null;
    if (data.mentor_bio !== undefined) updateDoc.mentor_bio = data.mentor_bio?.trim() || null;
    if (data.max_seats !== undefined) updateDoc.max_seats = data.max_seats;
    if (data.zoom_join_url !== undefined) updateDoc.zoom_join_url = data.zoom_join_url?.trim() || null;

    const res = await db.collection("webinars").updateOne(
      { id: Number(id) },
      { $set: updateDoc }
    );

    return res.matchedCount > 0;
  } catch (err) {
    console.error("[MongoDB Update Webinar Error]:", err);
    return false;
  }
}

/**
 * Registers a student for a specific webinar.
 * Automatically upserts user in users_master and inserts into webinar_registrations.
 */
export async function registerUserForWebinar(payload: {
  webinarId: number;
  name: string;
  email: string;
  phone: string;
  experience?: string;
  ipAddress?: string;
}): Promise<{ success: boolean; registrationId?: number; isNewUser?: boolean; error?: string }> {
  try {
    const db = await getMongoDb();

    // 1. Find or create master user identity
    const userRes = await findOrCreateUser({
      name: payload.name,
      email: payload.email,
      phone: payload.phone,
      experience: payload.experience,
    });

    // 2. Record consent
    await recordConsent({
      userId: userRes.id,
      consentGiven: true,
      allowWhatsApp: true,
      allowEmail: true,
      allowTelegram: true,
      ip: payload.ipAddress,
    });

    // 3. Insert or update webinar registration
    const regCol = db.collection("webinar_registrations");
    const existing = await regCol.findOne({
      webinar_id: Number(payload.webinarId),
      user_id: userRes.id,
    });

    if (existing) {
      await regCol.updateOne(
        { _id: existing._id },
        { $set: { registered_at: new Date().toISOString(), ip_address: payload.ipAddress || null } }
      );
      return {
        success: true,
        registrationId: existing.id || 1,
        isNewUser: userRes.isNew,
      };
    }

    const regId = await getNextSequence("webinar_registrations");
    await regCol.insertOne({
      id: regId,
      webinar_id: Number(payload.webinarId),
      user_id: userRes.id,
      registered_at: new Date().toISOString(),
      attendance_status: "Registered",
      ip_address: payload.ipAddress || null,
    });

    return {
      success: true,
      registrationId: regId,
      isNewUser: userRes.isNew,
    };
  } catch (err: any) {
    console.error("[MongoDB Webinar Registration Error]:", err);
    return { success: false, error: err?.message || "Failed to register for webinar." };
  }
}

/**
 * Deletes a webinar by its ID.
 */
export async function deleteWebinar(id: number): Promise<boolean> {
  try {
    const db = await getMongoDb();
    const res = await db.collection("webinars").deleteOne({ id: Number(id) });
    await db.collection("webinar_registrations").deleteMany({ webinar_id: Number(id) });
    return res.deletedCount > 0;
  } catch (err) {
    console.error("[MongoDB Delete Webinar Error]:", err);
    return false;
  }
}

/**
 * Purges all user-submitted leads, inquiries, and master users, while strictly
 * preserving webinars, admin identities, and CMS content.
 */
export async function purgeAllLeadsAndContacts(): Promise<{
  success: boolean;
  purged: Record<string, number>;
  error?: string;
}> {
  const purged: Record<string, number> = {};
  try {
    const db = await getMongoDb();
    const collectionsToPurge = [
      "leads",
      "leads_contact",
      "leads_newsletter",
      "webinar_registrations",
      "users_master",
      "consent_status",
      "followup_progress",
    ];

    for (const colName of collectionsToPurge) {
      const col = db.collection(colName);
      const count = await col.countDocuments();
      purged[colName] = count;
      await col.deleteMany({});
    }

    return { success: true, purged };
  } catch (err: any) {
    console.error("[MongoDB Purge Error]:", err);
    return { success: false, purged, error: err?.message };
  }
}
