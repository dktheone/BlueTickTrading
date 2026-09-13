import { DatabaseSync } from "node:sqlite";
import path from "path";
import fs from "fs";

const dbPath = path.resolve("data", "leads.db");
console.log(`Connecting to database at: ${dbPath}`);

const db = new DatabaseSync(dbPath);

db.exec(`
  -- Ensure foreign keys are enabled
  PRAGMA foreign_keys = ON;

  -- Create backup or drop previous admin_users table to recreate with complete schema
  DROP TABLE IF EXISTS admin_user_profile;
  DROP TABLE IF EXISTS admin_users;

  CREATE TABLE admin_users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE NOT NULL,
    display_name TEXT NOT NULL,
    role TEXT NOT NULL,
    mobile TEXT UNIQUE NOT NULL,
    tg_chat_id TEXT,
    hashed_password TEXT,
    must_change_password INTEGER DEFAULT 1,
    is_active INTEGER DEFAULT 1,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE INDEX idx_admin_username ON admin_users(username);
  CREATE INDEX idx_admin_mobile ON admin_users(mobile);

  CREATE TABLE admin_user_profile (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    admin_user_id INTEGER NOT NULL REFERENCES admin_users(id) ON DELETE CASCADE,
    avatar_url TEXT,
    bio TEXT,
    designation TEXT,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT uq_admin_profile UNIQUE (admin_user_id)
  );
`);

console.log("Created admin_users and admin_user_profile tables.");

// Seed User 1: Deepak (Super Admin)
const insertAdminStmt = db.prepare(`
  INSERT INTO admin_users (username, display_name, role, mobile, tg_chat_id, must_change_password, is_active)
  VALUES (?, ?, ?, ?, ?, ?, ?)
`);

const insertProfileStmt = db.prepare(`
  INSERT INTO admin_user_profile (admin_user_id, avatar_url, bio, designation)
  VALUES (?, ?, ?, ?)
`);

// 1. Deepak
const deepakResult = insertAdminStmt.run(
  "deepak",
  "Deepak",
  "super_admin",
  "+91-9140494689",
  "5036140691",
  1,
  1
);
const deepakId = Number(deepakResult.lastInsertRowid);
insertProfileStmt.run(
  deepakId,
  "/brand/avatar-deepak.png",
  "Platform Architect & Super Administrator for BlueTick Trading School.",
  "Platform Architect & Super Admin"
);
console.log(`Seeded Deepak (ID: ${deepakId}, Role: super_admin, Mobile: +91-9140494689)`);

// 2. Amit Gupta
const amitResult = insertAdminStmt.run(
  "amit_gupta",
  "Amit Gupta",
  "admin",
  "+91-8004855663",
  null,
  1,
  1
);
const amitId = Number(amitResult.lastInsertRowid);
insertProfileStmt.run(
  amitId,
  "/brand/avatar-amit.png",
  "SEBI & NISM Certified Market Mentor with 15+ years of live trading experience and 10+ years dedicated to Time Cycle mastery.",
  "Lead Mentor & Time-Cycle Strategist"
);
console.log(`Seeded Amit Gupta (ID: ${amitId}, Role: admin, Mobile: +91-8004855663)`);

// Query verification
const users = db.prepare(`
  SELECT u.id, u.username, u.display_name, u.role, u.mobile, u.tg_chat_id, p.designation, p.bio
  FROM admin_users u
  LEFT JOIN admin_user_profile p ON u.id = p.admin_user_id
`).all();

console.log("Verification Query:", JSON.stringify(users, null, 2));
console.log("Admin migration and seeding completed successfully.");
