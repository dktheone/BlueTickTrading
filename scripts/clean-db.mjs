#!/usr/bin/env node

/**
 * ==============================================================================
 * Blue Tick Trading School — Database Lead & Contact Purge Script
 * ==============================================================================
 * Uses db.ts export to execute within the unified SQLite lifecycle.
 * Wipes leads, contacts, webinar registrations, users_master, and consent records.
 * STRICTLY PRESERVES webinars, admin accounts, and pages/reviews.
 * ==============================================================================
 */

import path from "node:path";
import fs from "node:fs";
import { purgeAllLeadsAndContacts, getDb } from "../src/lib/db.ts";

console.log("=================================================================");
console.log(" Blue Tick Trading School — Database Lead & Contact Purge");
console.log("=================================================================\n");

const dataDir = path.join(process.cwd(), "data");
const dbPath = path.join(dataDir, "leads.db");

if (fs.existsSync(dbPath)) {
  const backupName = `leads.backup.${new Date().toISOString().replace(/[:.]/g, "-")}.db`;
  const backupPath = path.join(dataDir, backupName);
  try {
    fs.copyFileSync(dbPath, backupPath);
    console.log(`[Backup] Safe database backup created: data/${backupName}`);
  } catch (err) {
    console.warn(`[Backup Warning] Could not copy: ${err.message}`);
  }
}

console.log("[Purge] Purging user-submitted lead and contact tables...");
const result = purgeAllLeadsAndContacts();

if (!result.success) {
  console.error("\n[Error] Purge failed:", result.error);
  process.exit(1);
}

console.log("\nPurge Summary:");
for (const [table, count] of Object.entries(result.purged)) {
  console.log(`  ✓ Table '${table}': Purged ${count} records.`);
}

console.log("\n[Preserved Data Verification]");
const db = getDb();
if (db) {
  const preservedTables = ["webinars", "admin_users", "admin_user_profile", "pages", "reviews"];
  for (const t of preservedTables) {
    try {
      const row = db.prepare(`SELECT COUNT(*) as count FROM "${t}"`).get();
      console.log(`  ✓ Table '${t}': ${row ? row.count : 0} records intact.`);
    } catch {
      // Table may not exist yet
    }
  }
}

console.log("\n=================================================================");
console.log(" SUCCESS: All leads, contacts, and user records have been wiped.");
console.log(" All webinar campaigns and admin accounts remain 100% intact.");
console.log("=================================================================\n");
