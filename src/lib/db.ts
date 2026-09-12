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

    // Initialize Schema
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

  // Mode 1: Native SQLite3 (Node.js >= 22.5.0)
  if (db) {
    try {
      const stmt = db.prepare(`
        INSERT INTO leads (name, email, phone, experience, interest, message, ip_address)
        VALUES (?, ?, ?, ?, ?, ?, ?)
      `);

      const info = stmt.run(
        lead.name,
        lead.email,
        lead.phone,
        lead.experience || null,
        lead.interest || null,
        lead.message || null,
        lead.ip_address || null
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
        SELECT id, name, email, phone, experience, interest, message, ip_address, created_at
        FROM leads
        ORDER BY id DESC
        LIMIT ?
      `);
      return stmt.all(limit) as unknown as LeadRecord[];
    } catch (error) {
      console.error("[Node SQLite Error] Failed to fetch leads:", error);
      return [];
    }
  }

  const leads = readJsonLeads();
  return leads.slice(-limit).reverse();
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
