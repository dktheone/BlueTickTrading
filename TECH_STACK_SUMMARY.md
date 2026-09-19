# Tech Stack & Architectural Summary — Blue Tick Trading School

> **CRITICAL RULE FOR ALL AI AGENTS & DEVELOPERS:**
> This document is the **Single Source of Truth (SSOT)** for the architecture, tech stack, and conventions of this codebase.
> **MANDATE:** If you introduce, modify, deprecate, or upgrade any major library, database, backend service, payment gateway, CMS collection, or API route, you **MUST** immediately update this document to reflect the changes.

---

## 1. Project Overview
* **Brand Name:** Blue Tick Trading School
* **Lead Educator / Mentor:** Amit Gupta (10+ Years Market Experience • Price Action & Options Trader)
* **Website URL:** `https://blueticktrading.com`
* **Contact Phone / WhatsApp:** `+91 80048 55663`
* **Support Email:** `support@blueticktrading.com`
* **Physical Address Policy:** No physical address displayed publicly on website (remote mentorship & digital operations).
* **Current Operational Phase:** 100% Free Informational & Webinar Lead Generation (Zero payment gateway active currently).

---

## 2. Core Technology Stack

```
┌─────────────────────────────────────────────────────────────┐
│                    FRONTEND LAYER (Next.js 15)              │
│  React 19 • Next.js App Router • Tailwind CSS 3.4 • Lucide  │
└──────────────────────────────┬──────────────────────────────┘
                               │
┌──────────────────────────────▼──────────────────────────────┐
│                    BACKEND & API ROUTES                     │
│  Route Handlers (/api/contact) • Honeypot Bot Protection     │
└──────────────────────────────┬──────────────────────────────┘
                               │
┌──────────────────────────────▼──────────────────────────────┐
│               UPCOMING INTEGRATION ROADMAP                  │
│  Payload CMS 3.0 (Native) • Supabase/PostgreSQL • Razorpay  │
└─────────────────────────────────────────────────────────────┘
```

| Layer | Technology | Version | Purpose & Notes |
| :--- | :--- | :--- | :--- |
| **Framework** | **Next.js** | `15.5.24` | App Router architecture, Server & Client Components, hybrid static pre-rendering + dynamic SSR. |
| **UI Library** | **React** | `19.0.0` | Latest React engine with Server Actions compatibility. |
| **Language** | **TypeScript** | `5.7.2` | Strict type checking enabled (`tsconfig.json`). |
| **Styling** | **Tailwind CSS** | `3.4.16` | Utility-first CSS with custom Traderoom theme tokens. |
| **Database** | **MongoDB Atlas (M0 Free Cluster)** | `mongodb ^6.x` | Managed cloud MongoDB Atlas cluster (`bluetick_trading` on AWS Mumbai) with cached connection singleton (`src/lib/mongodb.ts`) for Next.js App Router. Eliminates file locks, SQLite WAL persistence issues, and Hostinger multi-worker concurrency limits. |
| **Email Service** | **Hostinger Webmail SMTP (SSL/TLS 465)** | `Nodemailer ^6.9.0` | Fully RFC-compliant structured headers with domain FQDN Message-ID, student reply-to routed to `support@blueticktradingschool.com`, and admin alerts delivered to `info@blueticktradingschool.com`. |
| **Messaging API** | **Telegram Bot API** | Native REST | Instant admin alert dispatch into closed channel + Telegram OTP authentication engine. |
| **Forms & State** | **React Hook Form** | `^7.88.0` | Performant, uncontrolled reactive form management with native validation integration. |
| **Validation** | **Zod + @hookform/resolvers** | `^4.6.2` / `^5.9.1` | Type-safe schema validation engine enforcing strict name, email, Indian mobile, and consent rules. |
| **Calendar Engine** | **RFC 5545 iCalendar + Google Calendar** | `Native (@/lib/calendar.ts)` | Zero-dependency .ics invite file generator and 1-click Google Calendar URL builder with automated email attachment dispatch (`method=REQUEST`). |
| **Icons** | **Lucide React** | `1.16.0` | Lightweight, tree-shakeable modern SVG icons. |
| **Class Utilities** | **clsx + tailwind-merge** | `^2.1.1` / `^2.5.5` | Dynamic className merge utility (`src/lib/utils.ts`). |
| **Production Server**| **Custom Node Server (`server.js`)** | `Native Node HTTP` | Production entrypoint binding to `0.0.0.0` and Hostinger's assigned dynamic `process.env.PORT`. |
| **Node Runtime** | **Node.js** | `>=20.0.0` (Active: Node 24) | High-performance runtime for build & execution. |

---

## 3. Design System & Visual Heritage

* **Design Foundation:** 100% exact visual replica of the **Traderoom — Online Trading Courses** Elementor Template Kit by *1onestrong* (Envato Elements).
* **Typography:**
  * Primary Body Font: `Inter` (loaded via `next/font/google`)
  * Headings Font: `Inter_Tight` (loaded via `next/font/google`)
* **Color Palette Tokens (`tailwind.config.ts`):**
  * `brand.primary`: `#0E3B43` (Signature Deep Teal)
  * `brand.teal`: `#10505C`
  * `brand.dark`: `#082126` (Midnight Dark Teal)
  * `brand.mint`: `#2FFFB9` (High-visibility CTA Accent)
  * `brand.lime`: `#C5FF7C` (Highlight Badge Green)
  * `brand.surface`: `#F8FAFB` / `#F0F5F6` (Light Background Grays)
* **Static Assets Structure (`public/`):**
  * `public/brand/`: `logo-wide.png`, `logo-sq.png`, `logo.svg`, `logo-01.png`
  * `public/images/traderoom/`: All 62 authentic Traderoom images, ebooks, hero graphics (`hero-02.png`, `Heros-04.png`), avatars, and partner logos.

---

## 4. Route Inventory & Pages

| /robots.txt | Static | src/app/robots.ts | Search engines & AI bots crawler rules with sitemap link. |
| /sitemap.xml | Static | src/app/sitemap.ts | Dynamic XML sitemap indexing all valid pages with priorities. |
| /llms.txt | Static | public/llms.txt | AI Engine (ChatGPT/Claude/Perplexity) markdown knowledge file. |

| Route Path | Type | File Location | Purpose & Audience |
| :--- | :--- | :--- | :--- |
| `/` | SSR | `src/app/page.tsx` | Refreshed Homepage featuring Traderoom design system: Live Masterclass Hook, Featured Active Webinar section with seat progress, Indian Market Segments (MCX, Index, Options), Mentor Profile (Time Cycles & TradingView), Why Time Cycles, and 3-field fast registration form. |
| `/webinars` | Static/SSR | `src/app/webinars/page.tsx` | Dedicated Live Masterclass Hub resolving active cohort with 800x400 banner, live countdown, seat capacity counter, and all-cohort archives directory. |
| `/webinars/[slug]` | Dynamic | `src/app/webinars/[slug]/page.tsx` | Dedicated dynamic Webinar Landing Page with countdown timer, masterclass timeline, educator profile, and embedded registration form. |
| `/privacy-policy` | Static | `src/app/privacy-policy/page.tsx` | Meta Ads, Google Ads & DPDP Act 2023 compliant privacy disclosures; explicit statement on no payment data collected. |
| `/terms-conditions` | Static | `src/app/terms-conditions/page.tsx` | Legal agreement, user guidelines, IP rights, and SEBI non-advisory disclaimer. |
| `/data-collection-policy`| Static | `src/app/data-collection-policy/page.tsx` | Disclosures on Meta Pixel, Google Analytics, LinkedIn tags, cookies, and lead capture. |
| `/disclaimer` | Static | `src/app/disclaimer/page.tsx` | Mandatory SEBI Derivatives Risk warning (9/10 loss disclosure) and educational-only notice. |
| `/refund-policy` | Static | `src/app/refund-policy/page.tsx` | Free webinar status + future paid course refund terms (48-hour pre-batch cancellation). |
| `/time-cycles` | Static | `src/app/time-cycles/page.tsx` | Dedicated Core Concept Page: Price-Time Squaring, Turn Date Forecasting, Gann Geometry, and Institutional Traps. |
| `/segments` | Static | `src/app/segments/page.tsx` | Consolidated Market Segments Page: MCX Commodities (Crude, Gold, Silver), Index Spot (Nifty, Bank Nifty), and Derivatives (F&O). |
| `/about-amit` | Static | `src/app/about-amit/page.tsx` | Head Mentor Profile: 15+ years market journey, Time Cycle mastery, TradingView ecosystem badge, and alumni community. |
| `/contact` | Static | `src/app/contact/page.tsx` | Dedicated Student Counseling & Support Desk with topic selector, inquiry form, and WhatsApp direct links. |
| `/admin` | Dynamic SSR | `src/app/admin/page.tsx` | Protected Admin Portal (Shadcn + Material 3 Design) featuring Dual CRM Engine (Webinar Registrants with cohort dropdown + Student Contact Desk inquiries), Masterclass Campaign Studio, Admin Profile & Team Management, and Telegram 2FA OTP Security Controls. |
| `/admin/login` | Static | `src/app/admin/login/page.tsx` | 2-Layer Admin Authentication Gate supporting Telegram OTP and scrypt password login. |
| `/api/contact` | Dynamic API | `src/app/api/contact/route.ts` | Backend handler for form submissions: saves webinar registrations into `leads` & `webinar_registrations`, routes general counseling inquiries into `users_master` + `leads_contact`, and triggers parallel Telegram + Email notifications. |
| `/api/admin/leads/status` | Dynamic API | `src/app/api/admin/leads/status/route.ts` | Authenticated status toggle endpoint (`PATCH`) switching lead & contact inquiry markers between `'New'` and `'Responded'`. |
| `/api/admin/webinars` | Dynamic API | `src/app/api/admin/webinars/route.ts` | Authenticated CRUD endpoint for webinar campaigns (GET, POST, PATCH, DELETE). |
| `/api/admin/*` | Dynamic API | `src/app/api/admin/` | Admin API endpoints (`otp-request`, `otp-verify`, `login-password`, `logout`, `profile`, `change-password`, `webinars`, `leads/status`). |

---

## 5. Security, Privacy & Anti-Bot Infrastructure

All user-facing and administrative interfaces employ hardened security, privacy, and anti-abuse safeguards:
1. **Search Engine Gating (`src/app/robots.ts`):** The `/admin/` route tree is disallowed for all web search crawlers (`User-Agent: *`) to ensure administrative endpoints are not publicly indexed.
2. **Hidden Navigation:** All administrative entry points (`/admin`, `/admin/login`) are excluded from public navigation headers, footers, mobile drawers, and public sitemaps.
3. **Data Sanitization & Exposure Mitigation:**
   - Public APIs (`/api/contact`) sanitize responses, omitting internal autoincrement database IDs (`leadId`).
   - Admin APIs (`/api/admin/profile`) redact password hashes (`hashed_password`) from responses.
   - Admin OTP dispatch (`/api/admin/otp-request`) returns uniform responses without leaking internal phone numbers, bot handles, or targeted channels to unauthenticated callers.
   - Admin UI components sanitize internal database storage paths, table schemas, Telegram chat IDs, channel IDs, and bot credentials.
4. **Hidden Honeypot Field (`website_url_hp`):** Styled invisible to human users (`display: none`, `tabIndex: -1`, `aria-hidden: true`). Automated bots fill this field and are immediately trapped.
5. **Submission Timing Validation:** Calculates time elapsed from page load (`formLoadTime`). Submissions faster than `1,000ms` are rejected.
6. **Data Sanitization & Regex:** Email and phone formats are validated server-side.
7. **Cloudflare Turnstile Support:** Pre-configured placeholder for invisible captcha token validation.

---

## 6. Repository Organization & Git Protection

```
d:\ProjectsWeb\BlueTickTrading\
│
├── _raw_assets/                 <-- [100% EXCLUDED FROM GIT VIA .gitignore]
│   ├── client_docs/             <-- Confidential client PDFs & demographic notes
│   ├── template_kit/            <-- Original Elementor template kit JSONs & .zip
│   ├── design_concepts/         <-- Raw concept images and 31MB videos
│   └── branding_source/         <-- Design markdown and master logos
│
├── public/                      <-- Public static assets served by Next.js
│   ├── brand/                   <-- logo-wide.png, logo-sq.png
│   └── images/traderoom/        <-- 62 official UI assets
│
├── src/
│   ├── app/                     <-- Next.js App Router (Pages, Policies, API)
│   ├── components/
│   │   ├── admin/               <-- Modern Shadcn + Material 3 Admin Panel & CRM
│   │   ├── traderoom/           <-- Main Traderoom replica components
│   │   ├── forms/               <-- Protected Contact & Webinar Registration form
│   │   └── layout/              <-- Prototype/Layout headers & footers
│   └── lib/                     <-- Utilities & DB helper functions (db.ts, auth.ts)
│
├── scripts/                     <-- Node helper scripts for migrations & asset sync
├── .gitignore                   <-- Bulletproof exclusions for security
├── TECH_STACK_SUMMARY.md        <-- THIS DOCUMENT (Architecture SSOT)
└── AGENTS.md                    <-- AI Agent Instructions & Rules
```

---

## 7. Dynamic Webinar Engine & Compliance Architecture (v2 Roadmap)

The platform is engineered around a 10-stage dynamic webinar funnel and administrative CRM:
* **Webinar Landing Engine (`/webinars/[slug]`):** Dynamic SSR generation driven by SQLite campaign records (`webinars` table). 
  * Displays custom uploaded banner (`banner_image_url`), title, subtitle, schedule, duration, takeaways, mentor profile, and dynamic seat capacity.
  * **Draft & Preview Architecture:** Draft webinars are gated from the public. Admins can view and inspect unpublished webinars using `?preview=true` (complete with an admin preview sticky bar).
* **Banner Image Upload Engine (`/api/admin/upload-banner`):**
  * Native multipart/form-data upload handler saving directly to `public/uploads/banners/`.
  * Validates file size (max 5MB) and mime types (JPEG, PNG, WebP, SVG) with secure sanitized naming. Zero external cloud storage dependencies.
* **Multi-Status Campaign Lifecycle (`draft` ➔ `published` ➔ `archived`):**
  * **Default State:** All newly scheduled webinars strictly default to `status: 'draft'` (`is_active: 0`) preventing unintended public disclosure.
  * **Status Transitions:** Admin can dynamically transition status between Draft, Published, and Archived from the dashboard table dropdown or edit modal.
  * **Seat Capacity & Progress:** Displays total registrants against `max_seats` with a real-time color-coded progress bar (Mint green < 70%, Amber >= 70%, Rose red >= 90%).
  * **Intuitive Controls:** Includes datetime picker and minute duration quick-chips (45, 60, 90, 120 mins).
* **End-to-End Webinar Registration & Identity Sync (`/api/contact`):**
  * Submissions from webinar pages include `webinarId`.
  * Automatically provisions master identity in `users_master`, records compliance opt-in in `consent_status`, inserts into `webinar_registrations` with conflict deduplication, and persists lead record in `leads`.
  * Dispatches confirmation emails and real-time Telegram alerts to administrators.
* **Dual-Engine CRM & Status Marker Architecture (Webinar Leads vs Student Contact Desk):**
  * **Table Separation:** Webinar registrations persist into `leads` (with foreign key `webinar_id`) and `webinar_registrations`, while general counseling inquiries from `/contact` persist into `users_master` + `leads_contact` with `subject_topic`, `message`, and `source_url`.
  * **Dedicated Admin Tabs:** The admin portal provides independent, tailored views for `Webinar Registrants` (cohort dropdown, search, status chips) and `Contact Inquiries` (message preview, search, status chips, WhatsApp direct trigger).
  * **Status Lifecycle (`NEW` vs `RESPONDED`):** Each row in both tables features a high-visibility badge (pulsing emerald `NEW` vs slate `RESPONDED`) with an instant 1-click toggle button calling `/api/admin/leads/status`.
  * **Direct WhatsApp Communication:** Phone numbers in both CRM views link directly to `https://wa.me/[cleanPhone]` enabling 1-click mobile chat from the admin dashboard.
* **Database Schema (`data/leads.db`):**
  * `webinars`: Stores `id`, `slug`, `title`, `subtitle`, `date_time`, `duration_minutes`, `banner_image_url`, `short_description`, `topics_json`, `mentor_name`, `mentor_bio`, `status` (`'draft' | 'published' | 'archived'`), `is_active`, `max_seats`, `zoom_join_url`, timestamps.
  * `webinar_registrations`: Stores `id`, `webinar_id`, `user_id`, `registered_at`, `attendance_status`, `ip_address`.
  * `leads`: Stores `id`, `name`, `email`, `phone`, `experience`, `interest`, `message`, `ip_address`, `status` (`'New' | 'Responded'`), `webinar_id`, `created_at`.
  * `leads_contact`: Stores `id`, `user_id`, `subject_topic`, `message`, `source_url`, `status` (`'New' | 'Responded'`), `ip_address`, `created_at`.
  * `users_master`: Stores student phone, email, name, experience, total webinars attended.
  * `consent_status`: DPDP Act 2023 compliance audit record (timestamp, IP, WhatsApp/Email/Telegram opt-in).
* **DPDP Act 2023 Consent Matrix:** Explicit opt-in logging (timestamp, IP, channel toggles: WhatsApp/Email/Telegram) and one-click `/opt-out` preference center.
* **2-Layer Admin Authentication Engine (Stage 7):**
  * **Identities:** Exactly 2 authorized admin users (`deepak` as `super_admin` and `amit_gupta` as `admin`).
  * **2nd-Layer Security Whitelist (.env):** SQLite database records (`mobile`) are cryptographically cross-verified against server environment variables (`ADMIN_SUPERADMIN_MOBILE=+91-9140494689` and `ADMIN_AMIT_MOBILE=+91-8004855663`). Any database tampering or unauthorized insertion immediately halts authentication and logs a critical security alert.
  * **Relational Profile Store:** `admin_users` table joined with `admin_user_profile` storing avatar photo, bio, and designation, editable in real time from the dashboard.
  * **Dual Authentication Modes & Password Recovery:**
    1. **Direct Telegram Bot OTP:** Delivers 6-digit numeric passcodes directly to the admin's personal 1-on-1 Telegram chat (`tg_chat_id` via bot `@bttschool_bot`) or falls back to the closed Admin Channel (`TELEGRAM_CHAT_ID`). Pure bot API execution with zero OAuth redirect or HTTPS domain constraints.
    2. **Cryptographic Password:** Zero-dependency native salted `crypto.scryptSync` password hashing with first-login setup and OTP-verified password changes.
    3. **Forgot / Reset Password Flow:** Dedicated self-service recovery directly on `/admin/login` using 6-digit Telegram recovery codes (`/api/admin/change-password`), with automatic session cookie issuance upon reset.
  * **Session Persistence:** HMAC-SHA256 signed `btt_admin_session` cookie (7-day TTL) carrying admin roles and profile details.
* **Decoupled Follow-Up Pipeline:** Config-driven campaign step definitions (`followup_steps`) and per-person milestone tracker (`followup_progress`).
* **SEO Rule Engine & Compliance Linter (Stage 9):** Hybrid `page_seo_meta` + `seo_audits` tracking with 15-rule automated scoring (0–100) and automated compliance scanning against banned financial guarantee phrases.

---

## 8. Master Project Backlog & Future Roadmap

All deferred options and remaining architectural tasks are preserved here as the SSOT:

### A. Deferred Operational Tasks (Saved for Later)
1. **Option 2 — Meta Pixel & GA4 Tracking:** Client-side tracking (`fbq('track', 'Lead')`), Google Analytics 4 lead event dispatch, and UTM campaign parameter persistence.
2. **Option 3 — SEO Rich Snippets & Schema:** `EducationEvent` JSON-LD schema for webinars, `Person` schema for Amit Gupta, `EducationalOrganization` schema, and OpenGraph preview cards.
3. **Option 4 — Hostinger Production Deployment & Smoke Test:** Production PM2 setup, Node dynamic port binding verification (`server.js`), and live domain SSL smoke testing.

### B. Remaining Tasks from Master Architecture Blueprint
1. **Webinar Cohort Registrants Viewer & CSV Export (Admin CRM):** Cohort viewer modal displaying registered student list (Name, WhatsApp, Email, Date) per webinar with 1-click batch CSV export.
2. **1-Click Live Zoom Meeting Broadcast Engine:** Admin action button to blast the live Zoom join URL and session alert to all registered batch students via SMTP email & Telegram.
3. **All-Webinars Public Directory (`/webinars`):** Public hub page displaying all upcoming scheduled masterclasses alongside past batch archives.
4. **Post-Webinar Concluded / Archived State (`/webinars/[slug]`):** Dynamic state switcher displaying "Session Concluded — View Highlights or Join Next Batch" when status is `archived`.
5. **DPDP Act 2023 Preference & Opt-Out Center (`/opt-out`):** Self-service communication preference center backed by `consent_status`.
6. **Student Reviews & Proof Gallery (`/reviews`):** Standalone social proof page backed by the `reviews` table.

### C. Future Phase 2 & 3 Scale Integrations
1. **Payload CMS 3.0 (Native App Router):** Collections: `Webinars`, `Registrations`, `Users`, `Media`.
2. **Database Migration:** PostgreSQL via Supabase or MongoDB Atlas when scaling beyond single-instance SQLite.
3. **Payment Gateway Integration:** Razorpay / Stripe integration with webhooks for paid VIP batches.

---

## 8. Common Commands

```bash
# Start local development server (port 3000)
npm run dev

# Run full production build test (verifies TypeScript & static generation)
npm run build

# Start production server
npm run start

# Purge test leads and contact inquiries (strictly preserves webinars & admin accounts)
npm run db:clean
```