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
| **CSS Post-Processor**| **PostCSS / Autoprefixer**| `8.4.49` / `10.4.20` | Vendor prefixing and CSS optimization. |
| **Icons** | **Lucide React** | `1.16.0` | Lightweight, tree-shakeable modern SVG icons. |
| **Class Utilities** | **clsx + tailwind-merge** | `^2.1.1` / `^2.5.5` | Dynamic className merge utility (`src/lib/utils.ts`). |
| **Node Runtime** | **Node.js** | `v24.x` | High-performance runtime for build & execution. |

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

| Route Path | Type | File Location | Purpose & Audience |
| :--- | :--- | :--- | :--- |
| `/` | Static | `src/app/page.tsx` | Main Homepage featuring 11 Traderoom sections (Hero, Partners, Services, About Mentor, Benefits, Courses, Reviews, CTA, FAQ, Contact Form, Footer). |
| `/webinars/[slug]` | Dynamic | `src/app/webinars/[slug]/page.tsx` | Dedicated dynamic Webinar Landing Page with countdown timer, masterclass timeline, educator profile, and embedded registration form. |
| `/privacy-policy` | Static | `src/app/privacy-policy/page.tsx` | Meta Ads, Google Ads & DPDP Act 2023 compliant privacy disclosures; explicit statement on no payment data collected. |
| `/terms-conditions` | Static | `src/app/terms-conditions/page.tsx` | Legal agreement, user guidelines, IP rights, and SEBI non-advisory disclaimer. |
| `/data-collection-policy`| Static | `src/app/data-collection-policy/page.tsx` | Disclosures on Meta Pixel, Google Analytics, LinkedIn tags, cookies, and lead capture. |
| `/disclaimer` | Static | `src/app/disclaimer/page.tsx` | Mandatory SEBI Derivatives Risk warning (9/10 loss disclosure) and educational-only notice. |
| `/refund-policy` | Static | `src/app/refund-policy/page.tsx` | Free webinar status + future paid course refund terms (48-hour pre-batch cancellation). |
| `/_not-found` | Static | `src/app/not-found.tsx` | Custom branded 404 error page. |
| `/api/contact` | Dynamic API | `src/app/api/contact/route.ts` | Backend handler for form submissions with spam/honeypot filtering. |

---

## 5. Security & Anti-Bot Infrastructure

All user-facing forms (`ContactForm.tsx`) employ multi-layered security against bot spam:
1. **Hidden Honeypot Field (`website_url_hp`):** Styled invisible to human users (`display: none`, `tabIndex: -1`, `aria-hidden: true`). Automated bots fill this field and are immediately trapped.
2. **Submission Timing Validation:** Calculates time elapsed from page load (`formLoadTime`). Submissions faster than `1,000ms` are rejected.
3. **Data Sanitization & Regex:** Email and phone formats are validated server-side.
4. **Cloudflare Turnstile Support:** Pre-configured placeholder for invisible captcha token validation.

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
│   │   ├── traderoom/           <-- Main Traderoom replica components
│   │   ├── forms/               <-- Protected Contact & Webinar Registration form
│   │   └── layout/              <-- Prototype/Layout headers & footers
│   └── lib/                     <-- Utilities (utils.ts)
│
├── scripts/                     <-- Node helper scripts for asset sync & analysis
├── .gitignore                   <-- Bulletproof exclusions for security
├── TECH_STACK_SUMMARY.md        <-- THIS DOCUMENT (Architecture SSOT)
└── AGENTS.md                    <-- AI Agent Instructions & Rules
```

---

## 7. Upcoming Tech Integrations Roadmap

When scaling to Phase 2 and Phase 3:
1. **Payload CMS 3.0 (Native App Router):**
   * Collections: `Webinars` (slug, title, date, educator, takeaways, price), `Registrations` (leads), `Users` (roles: Admin, Educator, Student), `Media`.
2. **Database:** PostgreSQL via Supabase or MongoDB Atlas.
3. **Transactional Email:** Resend / SendGrid / Amazon SES for instant Zoom link & calendar `.ics` dispatch.
4. **Payment Gateway:** Razorpay / Stripe integration with webhook handlers for paid VIP memberships.

---

## 8. Common Commands

```bash
# Start local development server (port 3000)
npm run dev

# Run full production build test (verifies TypeScript & static generation)
npm run build

# Start production server
npm run start
```