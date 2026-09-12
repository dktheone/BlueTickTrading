import { DatabaseSync } from "node:sqlite";
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

let dbInstance: DatabaseSync | null = null;

/**
 * Returns a singleton SQLite3 database instance using Node.js's built-in node:sqlite module.
 * Requires ZERO native external binaries, ZERO Python, and ZERO node-gyp compilation!
 */
export function getDb(): DatabaseSync {
  if (!dbInstance) {
    const dbDir = path.join(process.cwd(), "data");
    if (!fs.existsSync(dbDir)) {
      fs.mkdirSync(dbDir, { recursive: true });
    }

    const dbPath = process.env.SQLITE_DB_PATH || path.join(dbDir, "leads.db");
    dbInstance = new DatabaseSync(dbPath);

    // Initialize Schema
    dbInstance.exec(`
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

  return dbInstance;
}

/**
 * Inserts a new webinar registration or contact lead into SQLite3.
 */
export function insertLead(lead: Omit<LeadRecord, "id" | "created_at">): { id: number | bigint; success: boolean } {
  try {
    const db = getDb();
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

/**
 * Retrieves all stored leads ordered by newest first.
 */
export function getAllLeads(limit = 500): LeadRecord[] {
  try {
    const db = getDb();
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

/**
 * Returns total count of registered leads.
 */
export function getLeadsCount(): number {
  try {
    const db = getDb();
    const row = db.prepare(`SELECT COUNT(*) as count FROM leads`).get() as { count: number };
    return row?.count || 0;
  } catch (error) {
    console.error("[Node SQLite Error] Failed to get count:", error);
    return 0;
  }
}
