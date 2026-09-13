import { DatabaseSync } from "node:sqlite";
import path from "path";
import fs from "fs";

const dbPath = path.join(process.cwd(), "data", "leads.db");
console.log("Connecting to database at:", dbPath);

const db = new DatabaseSync(dbPath);

// Create webinars table
db.exec(`
  CREATE TABLE IF NOT EXISTS webinars (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    slug TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    subtitle TEXT,
    date_time TEXT NOT NULL,
    duration_minutes INTEGER DEFAULT 90,
    banner_image_url TEXT,
    short_description TEXT,
    full_description_html TEXT,
    topics_json TEXT,
    mentor_name TEXT DEFAULT 'Amit Gupta',
    mentor_bio TEXT,
    is_active INTEGER DEFAULT 1,
    max_seats INTEGER DEFAULT 500,
    zoom_join_url TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE INDEX IF NOT EXISTS idx_webinars_slug ON webinars(slug);
  CREATE INDEX IF NOT EXISTS idx_webinars_is_active ON webinars(is_active);

  CREATE TABLE IF NOT EXISTS webinar_registrations (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    webinar_id INTEGER NOT NULL REFERENCES webinars(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    registered_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    attendance_status TEXT DEFAULT 'Registered',
    ip_address TEXT,
    CONSTRAINT uq_webinar_user_reg UNIQUE (webinar_id, phone)
  );

  CREATE INDEX IF NOT EXISTS idx_webinar_reg_webinar_id ON webinar_registrations(webinar_id);
`);

console.log("Webinar tables created successfully.");

// Check if default masterclass exists
const existing = db.prepare("SELECT id, slug, title FROM webinars WHERE slug = ?").get("live-market-masterclass");

if (!existing) {
  const topics = JSON.stringify([
    "Mathematical Price-Time Squaring & Harmonic Equilibrium (W.D. Gann principles)",
    "Forecasting High-Probability Turn Dates in Nifty, Bank Nifty & MCX Crude Oil",
    "Low Implied Volatility (IV) Options Buying Execution with 1:4+ Asymmetric Payoffs",
    "Institutional Liquidity Hunts: Why Retail Support & Resistance Breakouts Get Trapped",
  ]);

  db.prepare(`
    INSERT INTO webinars (
      slug, title, subtitle, date_time, duration_minutes,
      banner_image_url, short_description, topics_json,
      mentor_name, mentor_bio, is_active, max_seats, zoom_join_url
    ) VALUES (
      ?, ?, ?, ?, ?,
      ?, ?, ?,
      ?, ?, ?, ?, ?
    )
  `).run(
    "live-market-masterclass",
    "BankNifty, Nifty & MCX Time Cycle Masterclass: Turn Date Forecasting",
    "Master institutional price-time squaring, anticipate explosive trend turns, and eliminate retail indicator traps.",
    "Upcoming Saturday, 7:00 PM IST",
    90,
    "/images/traderoom/time-cycle-trading.jpg",
    "Join Amit Gupta for an intensive 90-minute live session on institutional price action, Gann geometry, and multi-market turning points.",
    topics,
    "Amit Gupta",
    "15+ Years Active Market Veteran • SEBI / NISM Certified Research Analyst",
    1,
    500,
    "https://zoom.us/j/blueticktrading"
  );
  console.log("Seeded default masterclass: 'live-market-masterclass'");
} else {
  console.log("Default masterclass already exists:", existing);
}

const allWebinars = db.prepare("SELECT id, slug, title, date_time, is_active FROM webinars").all();
console.log("Current webinars in database:", allWebinars);
