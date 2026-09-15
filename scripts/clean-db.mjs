#!/usr/bin/env node

/**
 * ==============================================================================
 * Blue Tick Trading School — Database Lead & Contact Purge Script
 * ==============================================================================
 * Connects to MongoDB Atlas cluster directly.
 * Wipes leads, leads_contact, leads_newsletter, webinar_registrations, users_master,
 * and consent_status records.
 * STRICTLY PRESERVES webinars, admin_users, and admin_user_profile.
 * ==============================================================================
 */

import { MongoClient } from "mongodb";
import fs from "fs";
import path from "path";

// Load environment variables from .env.local or .env
const envLocalPath = path.resolve(".env.local");
let uri = process.env.MONGODB_URI;
let dbName = process.env.MONGODB_DB || "bluetick_trading";

if (fs.existsSync(envLocalPath)) {
  const content = fs.readFileSync(envLocalPath, "utf-8");
  for (const line of content.split("\n")) {
    const trimmed = line.trim();
    if (trimmed.startsWith("MONGODB_URI=") && !uri) {
      uri = trimmed.replace("MONGODB_URI=", "").trim();
    }
    if (trimmed.startsWith("MONGODB_DB=") && (!process.env.MONGODB_DB || dbName === "bluetick_trading")) {
      dbName = trimmed.replace("MONGODB_DB=", "").trim();
    }
  }
}

if (!uri) {
  console.error("Error: MONGODB_URI not found in .env.local or environment.");
  process.exit(1);
}

console.log("=================================================================");
console.log(" Blue Tick Trading School — MongoDB Atlas Lead & Contact Purge");
console.log("=================================================================\n");

async function main() {
  const client = new MongoClient(uri);
  await client.connect();
  const db = client.db(dbName);
  console.log(`[Connected] MongoDB Database: "${db.databaseName}"`);

  const collectionsToPurge = [
    "leads",
    "leads_contact",
    "leads_newsletter",
    "webinar_registrations",
    "users_master",
    "consent_status",
    "followup_progress",
  ];

  console.log("\n[Purge] Purging user-submitted lead and contact collections...");
  for (const colName of collectionsToPurge) {
    const col = db.collection(colName);
    const count = await col.countDocuments();
    await col.deleteMany({});
    console.log(`  ✓ Collection '${colName}': Purged ${count} records.`);
  }

  // Reset leads and registrations counters so IDs start cleanly
  const countersCol = db.collection("counters");
  await countersCol.updateOne({ _id: "leads" }, { $set: { seq: 0 } }, { upsert: true });
  await countersCol.updateOne({ _id: "leads_contact" }, { $set: { seq: 0 } }, { upsert: true });
  await countersCol.updateOne({ _id: "users_master" }, { $set: { seq: 0 } }, { upsert: true });
  await countersCol.updateOne({ _id: "webinar_registrations" }, { $set: { seq: 0 } }, { upsert: true });
  console.log("  ✓ Sequence counters reset for lead collections.");

  console.log("\n[Preserved Data Verification]");
  const preservedCollections = ["webinars", "admin_users", "admin_user_profile"];
  for (const c of preservedCollections) {
    const count = await db.collection(c).countDocuments();
    console.log(`  ✓ Collection '${c}': ${count} records intact.`);
  }

  console.log("\n=================================================================");
  console.log(" SUCCESS: All leads, contacts, and user records have been wiped.");
  console.log(" All webinar campaigns and admin accounts remain 100% intact.");
  console.log("=================================================================\n");

  await client.close();
}

main().catch((err) => {
  console.error("Purge error:", err);
  process.exit(1);
});
