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

async function seed() {
  console.log("Connecting to MongoDB Atlas cluster...");
  const client = new MongoClient(uri);
  await client.connect();
  const db = client.db(dbName);
  console.log(`Connected to database: "${db.databaseName}"`);

  // 1. Setup collections & indexes
  const adminUsersCol = db.collection("admin_users");
  const adminProfilesCol = db.collection("admin_user_profile");
  const webinarsCol = db.collection("webinars");
  const leadsCol = db.collection("leads");
  const usersMasterCol = db.collection("users_master");
  const leadsContactCol = db.collection("leads_contact");
  const webinarRegCol = db.collection("webinar_registrations");
  const otpChallengesCol = db.collection("admin_otp_challenges");
  const countersCol = db.collection("counters");

  // Create unique and performance indexes
  await adminUsersCol.createIndex({ username: 1 }, { unique: true });
  await adminUsersCol.createIndex({ mobile: 1 }, { unique: true });
  await adminProfilesCol.createIndex({ admin_user_id: 1 }, { unique: true });
  await webinarsCol.createIndex({ slug: 1 }, { unique: true });
  await webinarsCol.createIndex({ id: 1 }, { unique: true });
  await usersMasterCol.createIndex({ phone: 1, email: 1 }, { unique: true });
  await webinarRegCol.createIndex({ webinar_id: 1, user_id: 1 }, { unique: true });
  await otpChallengesCol.createIndex({ user_id: 1 }, { unique: true });
  await leadsCol.createIndex({ id: 1 });
  await leadsCol.createIndex({ email: 1 });
  await leadsCol.createIndex({ phone: 1 });

  console.log("Indexes ensured.");

  // 2. Seed Admin Users
  // Admin 1: Deepak (Super Admin)
  const deepakMobile = "+91-9140494689";
  const amitMobile = "+91-8004855663";

  const deepakExists = await adminUsersCol.findOne({ username: "deepak" });
  if (!deepakExists) {
    await adminUsersCol.insertOne({
      id: 1,
      username: "deepak",
      display_name: "Deepak",
      role: "super_admin",
      mobile: deepakMobile,
      tg_chat_id: "5036140691",
      hashed_password: null,
      must_change_password: 1,
      is_active: 1,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    });

    await adminProfilesCol.insertOne({
      admin_user_id: 1,
      avatar_url: "/brand/avatar-deepak.png",
      bio: "Platform Architect & Super Administrator for BlueTick Trading School.",
      designation: "Platform Architect & Super Admin",
      updated_at: new Date().toISOString(),
    });
    console.log("Seeded Super Admin: 'deepak'");
  } else {
    console.log("Admin 'deepak' already exists.");
  }

  // Admin 2: Amit Gupta (Lead Mentor)
  const amitExists = await adminUsersCol.findOne({ username: "amit_gupta" });
  if (!amitExists) {
    await adminUsersCol.insertOne({
      id: 2,
      username: "amit_gupta",
      display_name: "Amit Gupta",
      role: "admin",
      mobile: amitMobile,
      tg_chat_id: null,
      hashed_password: null,
      must_change_password: 1,
      is_active: 1,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    });

    await adminProfilesCol.insertOne({
      admin_user_id: 2,
      avatar_url: "/brand/avatar-amit.png",
      bio: "Time-Cycle Strategist & Market Mentor with 15+ years of live trading experience and 10+ years dedicated to Time Cycle mastery.",
      designation: "Lead Mentor & Time-Cycle Strategist",
      updated_at: new Date().toISOString(),
    });
    console.log("Seeded Admin: 'amit_gupta'");
  } else {
    console.log("Admin 'amit_gupta' already exists.");
  }

  // 3. Seed Default Masterclass Webinar
  const webinarSlug = "live-market-masterclass";
  const webinarExists = await webinarsCol.findOne({ slug: webinarSlug });
  if (!webinarExists) {
    const topics = JSON.stringify([
      "Mathematical Price-Time Squaring & Harmonic Equilibrium (W.D. Gann principles)",
      "Forecasting High-Probability Turn Dates in Nifty, Bank Nifty & MCX Crude Oil",
      "Low Implied Volatility (IV) Options Buying Execution with 1:4+ Asymmetric Payoffs",
      "Institutional Liquidity Hunts: Why Retail Support & Resistance Breakouts Get Trapped",
    ]);

    await webinarsCol.insertOne({
      id: 1,
      slug: webinarSlug,
      title: "BankNifty, Nifty & MCX Time Cycle Masterclass: Turn Date Forecasting",
      subtitle: "Master institutional price-time squaring, anticipate explosive trend turns, and eliminate retail indicator traps.",
      date_time: "Upcoming Saturday, 7:00 PM IST",
      duration_minutes: 90,
      banner_image_url: "/images/traderoom/time-cycle-trading.jpg",
      short_description: "Join Amit Gupta for an intensive 90-minute live session on institutional price action, Gann geometry, and multi-market turning points.",
      full_description_html: null,
      topics_json: topics,
      mentor_name: "Amit Gupta",
      mentor_bio: "15+ Years Active Market Veteran • Time Cycle Strategist",
      status: "published",
      is_active: 1,
      max_seats: 500,
      zoom_join_url: "https://zoom.us/j/blueticktrading",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    });
    console.log("Seeded Masterclass Webinar: 'live-market-masterclass'");
  } else {
    console.log("Webinar 'live-market-masterclass' already exists.");
  }

  // 4. Initialize counters for numeric auto-increment sequence compatibility
  await countersCol.updateOne(
    { _id: "leads" },
    { $setOnInsert: { seq: 1 } },
    { upsert: true }
  );
  await countersCol.updateOne(
    { _id: "webinars" },
    { $set: { seq: 1 } },
    { upsert: true }
  );
  await countersCol.updateOne(
    { _id: "users_master" },
    { $setOnInsert: { seq: 1 } },
    { upsert: true }
  );
  await countersCol.updateOne(
    { _id: "leads_contact" },
    { $setOnInsert: { seq: 1 } },
    { upsert: true }
  );
  await countersCol.updateOne(
    { _id: "webinar_registrations" },
    { $setOnInsert: { seq: 1 } },
    { upsert: true }
  );
  await countersCol.updateOne(
    { _id: "admin_users" },
    { $set: { seq: 2 } },
    { upsert: true }
  );

  console.log("Sequence counters initialized.");
  console.log("MongoDB Atlas initialization & seeding completed successfully!");
  await client.close();
}

seed().catch((err) => {
  console.error("Seeding failed:", err);
  process.exit(1);
});
