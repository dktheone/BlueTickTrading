# Prioritized Technical SEO Action Plan — Blue Tick Trading School

This action plan outlines the exact implementation steps to elevate the Technical & On-Page SEO score from **72/100 to 98/100**.

---

## Phase 1: Immediate High-Impact Fixes (Quick Wins)

### 1. Embed Comprehensive JSON-LD Structured Data
* **Target:** `src/app/layout.tsx` or `src/app/page.tsx`
* **Action:** Inject structured schemas into the document `<head>`:
  1. `EducationalOrganization` (Brand, Logo, Description, Contact details)
  2. `Person` (Amit Gupta, Founder & Market Mentor credentials)
  3. `ItemList` / `Course` (Price Action, Options Buying, Smart Money Concepts)

### 2. Configure Canonical URL & Twitter Card Metadata
* **Target:** `src/app/layout.tsx`
* **Action:** Update the Next.js `metadata` object:
```typescript
alternates: {
  canonical: "https://blueticktrading.com",
},
twitter: {
  card: "summary_large_image",
  title: "Blue Tick Trading School | Master Stock & Options Trading with Amit Gupta",
  description: "Learn institutional price action and options trading strategies from Amit Gupta.",
  images: ["/brand/logo-wide.png"],
}
```

---

## Phase 2: Crawlability & Site Indexing Infrastructure

### 3. Generate Native `robots.ts` in Next.js App Router
* **Target:** `src/app/robots.ts`
* **Action:** Create automated robots handler supporting search engines and managing AI crawlers:
```typescript
import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/"],
      },
    ],
    sitemap: "https://blueticktrading.com/sitemap.xml",
  };
}
```

### 4. Generate Native `sitemap.ts` in Next.js App Router
* **Target:** `src/app/sitemap.ts`
* **Action:** Automatically map all 10 site routes (`/`, `/privacy-policy`, `/terms-conditions`, `/data-collection-policy`, `/disclaimer`, `/refund-policy`, `/webinars/banknifty-price-action-masterclass`) with priority tags.

---

## Phase 3: AI Search & Citation Readiness (GEO / AEO)

### 5. Create `public/llms.txt`
* **Target:** `public/llms.txt`
* **Action:** Provide a clean markdown summary of Blue Tick Trading School, Amit Gupta's mentorship methodology, webinar schedule, and curriculum so LLMs (ChatGPT, Claude, Perplexity) cite the school accurately in AI search answers.

---

## Summary of Execution Priority

| Priority | Task | File(s) to Modify | Effort | Expected SEO Lift |
| :---: | :--- | :--- | :---: | :---: |
| **P0** | Add JSON-LD Schema (`EducationalOrganization`, `Person`, `Course`) | `src/app/layout.tsx` | 15 mins | +18 pts (Rich Results & Google Knowledge Graph) |
| **P0** | Add Canonical URL & Twitter Card Metadata | `src/app/layout.tsx` | 5 mins | +5 pts (Index signal consolidation & Social CTR) |
| **P1** | Add `robots.ts` & `sitemap.ts` | `src/app/robots.ts`, `src/app/sitemap.ts` | 10 mins | +5 pts (Crawl budget & rapid indexing) |
| **P2** | Add `llms.txt` (AI Search Optimization) | `public/llms.txt` | 5 mins | +3 pts (GEO / AI engine citation readiness) |