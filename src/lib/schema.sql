-- ==============================================================================
-- BLUE TICK TRADING SCHOOL — STAGE 3 MASTER RELATIONAL SCHEMA (SQLite3)
-- ==============================================================================

PRAGMA foreign_keys = ON;

-- 1. Static Pages CMS Blocks
CREATE TABLE IF NOT EXISTS pages (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  slug TEXT UNIQUE NOT NULL,             -- e.g. 'home', 'time-cycles', 'segments', 'about-amit'
  title TEXT NOT NULL,
  meta_description TEXT,
  content_blocks_json TEXT NOT NULL,     -- JSON array of structured content blocks
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 2. Master User Registry (Unique Person Identity)
-- Key rule: Unique on (phone, email) composite pair
CREATE TABLE IF NOT EXISTS users_master (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT NOT NULL,
  experience_level TEXT,                 -- e.g. 'Beginner', '1-3 Years', 'Full-time'
  city TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT uq_user_identity UNIQUE (phone, email)
);

CREATE INDEX IF NOT EXISTS idx_users_master_phone ON users_master(phone);
CREATE INDEX IF NOT EXISTS idx_users_master_email ON users_master(email);

-- 3. Webinars Table (Campaign Entity)
CREATE TABLE IF NOT EXISTS webinars (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  slug TEXT UNIQUE NOT NULL,             -- e.g. 'time-cycle-masterclass-24-oct'
  title TEXT NOT NULL,
  subtitle TEXT,
  date_time DATETIME NOT NULL,           -- e.g. '2026-10-24 19:00:00'
  duration_minutes INTEGER DEFAULT 90,
  banner_image_url TEXT,
  short_description TEXT,
  full_description_html TEXT,
  topics_json TEXT,                      -- JSON array of key learning bullets
  mentor_name TEXT DEFAULT 'Amit Gupta',
  mentor_bio TEXT,
  status TEXT DEFAULT 'draft',           -- 'draft', 'published', 'archived'
  is_active INTEGER DEFAULT 0,           -- 1 = Published (active), 0 = Draft/Archived
  max_seats INTEGER DEFAULT 500,
  zoom_join_url TEXT,                    -- Private link sent via Telegram/Email
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_webinars_slug ON webinars(slug);
CREATE INDEX IF NOT EXISTS idx_webinars_date_time ON webinars(date_time);

-- 4. Webinar Registrations (Campaign-Linked Registrations)
CREATE TABLE IF NOT EXISTS webinar_registrations (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  webinar_id INTEGER NOT NULL REFERENCES webinars(id) ON DELETE CASCADE,
  user_id INTEGER NOT NULL REFERENCES users_master(id) ON DELETE CASCADE,
  registered_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  attendance_status TEXT DEFAULT 'Registered', -- 'Registered', 'Attended', 'No-Show'
  campaign_opt_out INTEGER DEFAULT 0,         -- 1 = Opted out of reminders for THIS webinar only
  utm_source TEXT,
  utm_medium TEXT,
  utm_campaign TEXT,
  ip_address TEXT,
  CONSTRAINT uq_webinar_registration UNIQUE (webinar_id, user_id)
);

CREATE INDEX IF NOT EXISTS idx_registrations_webinar ON webinar_registrations(webinar_id);
CREATE INDEX IF NOT EXISTS idx_registrations_user ON webinar_registrations(user_id);

-- 5. Contact Form Leads (Topic/Subject-driven Inquiries)
CREATE TABLE IF NOT EXISTS leads_contact (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL REFERENCES users_master(id) ON DELETE CASCADE,
  subject_topic TEXT NOT NULL,                -- e.g. 'Mentorship', 'Time Cycle Inquiry', 'Webinar Query'
  message TEXT NOT NULL,
  source_url TEXT DEFAULT '/contact',
  status TEXT DEFAULT 'New',                  -- 'New', 'In-Review', 'Contacted', 'Resolved'
  ip_address TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_contact_user ON leads_contact(user_id);
CREATE INDEX IF NOT EXISTS idx_contact_status ON leads_contact(status);

-- 6. Newsletter Leads
CREATE TABLE IF NOT EXISTS leads_newsletter (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL REFERENCES users_master(id) ON DELETE CASCADE,
  status TEXT DEFAULT 'Active',               -- 'Active', 'Unsubscribed'
  source_page TEXT DEFAULT '/',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 7. DPDP Act 2023 Consent & Channel-wise Preference Matrix
CREATE TABLE IF NOT EXISTS consent_status (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL REFERENCES users_master(id) ON DELETE CASCADE,
  consent_given INTEGER DEFAULT 1,            -- 1 = Explicitly opted in via form checkbox
  allow_whatsapp INTEGER DEFAULT 1,
  allow_email INTEGER DEFAULT 1,
  allow_telegram INTEGER DEFAULT 1,
  consent_timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
  opt_out_timestamp DATETIME,
  consent_text_version TEXT DEFAULT 'DPDP_V1_2026',
  ip_address TEXT,
  user_agent TEXT,
  CONSTRAINT uq_consent_user UNIQUE (user_id)
);

CREATE INDEX IF NOT EXISTS idx_consent_user ON consent_status(user_id);

-- 8. Follow-up Step Definitions (Config-Driven Workflow per Webinar)
CREATE TABLE IF NOT EXISTS followup_steps (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  campaign_id INTEGER NOT NULL REFERENCES webinars(id) ON DELETE CASCADE,
  step_order INTEGER NOT NULL,                -- 1, 2, 3, 4...
  step_name TEXT NOT NULL,                    -- e.g. 'Registration Confirmation', '24h Reminder', '1h Alert'
  trigger_condition TEXT NOT NULL,            -- e.g. 'IMMEDIATE', 'HOURS_BEFORE_24', 'HOURS_BEFORE_1', 'POST_EVENT'
  channel TEXT NOT NULL,                      -- 'WHATSAPP', 'TELEGRAM', 'EMAIL'
  template_key TEXT,                          -- Identifier for message copy template
  is_active INTEGER DEFAULT 1,
  CONSTRAINT uq_campaign_step UNIQUE (campaign_id, step_order)
);

-- 9. Follow-up Progress Tracker (Per Registrant State Tracker)
CREATE TABLE IF NOT EXISTS followup_progress (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  registration_id INTEGER NOT NULL REFERENCES webinar_registrations(id) ON DELETE CASCADE,
  step_id INTEGER NOT NULL REFERENCES followup_steps(id) ON DELETE CASCADE,
  status TEXT DEFAULT 'Pending',              -- 'Pending', 'Sent', 'Failed', 'Skipped_OptOut'
  dispatched_at DATETIME,
  response_event TEXT,                        -- e.g. 'DELIVERED', 'READ', 'CLICKED'
  error_message TEXT,
  last_updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT uq_reg_step UNIQUE (registration_id, step_id)
);

CREATE INDEX IF NOT EXISTS idx_progress_reg ON followup_progress(registration_id);
CREATE INDEX IF NOT EXISTS idx_progress_status ON followup_progress(status);

-- 10. Reviews & Social Proof Module
CREATE TABLE IF NOT EXISTS reviews (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  author_name TEXT NOT NULL,
  author_role TEXT,                           -- e.g. 'BankNifty Trader • Lucknow'
  rating INTEGER DEFAULT 5,                   -- 1 to 5 stars
  review_text TEXT NOT NULL,
  tags_json TEXT,                             -- e.g. '["#TimeCycle", "#MCX", "#Options"]'
  avatar_image_url TEXT,
  webinar_snapshot_url TEXT,                  -- Optional screenshot proof of live webinar session
  is_featured INTEGER DEFAULT 1,              -- Display on homepage carousel
  display_order INTEGER DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_reviews_featured ON reviews(is_featured);

-- 11. Admin Identities (2 Whitelisted Admin Identities with 2-Layer Env Security)
CREATE TABLE IF NOT EXISTS admin_users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT UNIQUE NOT NULL,              -- 'deepak', 'amit_gupta'
  display_name TEXT NOT NULL,                -- 'Deepak', 'Amit Gupta'
  role TEXT NOT NULL,                        -- 'super_admin', 'admin'
  mobile TEXT UNIQUE NOT NULL,               -- '+91-9140494689', '+91-8004855663'
  tg_chat_id TEXT,                           -- Private Telegram chat ID for 1-on-1 OTP/alerts
  hashed_password TEXT,                      -- Salted scrypt password hash
  must_change_password INTEGER DEFAULT 1,    -- 1 = Prompt to set password
  is_active INTEGER DEFAULT 1,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_admin_username ON admin_users(username);
CREATE INDEX IF NOT EXISTS idx_admin_mobile ON admin_users(mobile);

-- 11b. Admin Profiles (Avatar, Bio, Designation)
CREATE TABLE IF NOT EXISTS admin_user_profile (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  admin_user_id INTEGER NOT NULL REFERENCES admin_users(id) ON DELETE CASCADE,
  avatar_url TEXT,
  bio TEXT,
  designation TEXT,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT uq_admin_profile UNIQUE (admin_user_id)
);

-- 11c. Admin OTP Challenges (Persistent across multi-worker & Node processes)
CREATE TABLE IF NOT EXISTS admin_otp_challenges (
  user_id INTEGER PRIMARY KEY REFERENCES admin_users(id) ON DELETE CASCADE,
  otp TEXT NOT NULL,
  expires_at INTEGER NOT NULL,
  username TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 12. Stage 9 SEO Rule Engine: Live Meta Table
CREATE TABLE IF NOT EXISTS page_seo_meta (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  page_type TEXT NOT NULL,                    -- 'static' or 'webinar'
  page_ref_id TEXT NOT NULL,                  -- slug for static pages (e.g. 'time-cycles'), webinar id/slug
  title_tag TEXT NOT NULL,
  meta_description TEXT NOT NULL,
  focus_keyword TEXT,
  canonical_url TEXT,
  og_image_url TEXT,
  schema_type TEXT DEFAULT 'WebPage',         -- 'Event', 'EducationalOrganization', etc.
  no_index INTEGER DEFAULT 0,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT uq_page_seo UNIQUE (page_type, page_ref_id)
);

CREATE INDEX IF NOT EXISTS idx_seo_meta_ref ON page_seo_meta(page_type, page_ref_id);

-- 13. Stage 9 SEO Rule Engine: Historical Audits & Compliance Linter Snapshots
CREATE TABLE IF NOT EXISTS seo_audits (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  page_type TEXT NOT NULL,
  page_ref_id TEXT NOT NULL,
  score INTEGER NOT NULL,                     -- 0 to 100
  grade TEXT NOT NULL,                        -- 'Good', 'Needs Improvement', 'Poor'
  breakdown_json TEXT NOT NULL,               -- JSON structure of 15-rule pass/fail evaluation
  compliance_cleared INTEGER DEFAULT 1,       -- 1 = No banned profit claims found
  audited_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_seo_audits_ref ON seo_audits(page_type, page_ref_id);
CREATE INDEX IF NOT EXISTS idx_seo_audits_time ON seo_audits(audited_at);
