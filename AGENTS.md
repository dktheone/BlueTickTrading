# Agent Guidelines & Repository Rules — BlueTick Trading

## Mandatory Architectural Rule
Whenever you make any changes to this codebase that affect:
1. Tech stack dependencies (adding/removing npm packages).
2. Database / CMS integration (Payload CMS, Supabase, Prisma, etc.).
3. Authentication or Payment Gateways (Stripe, Razorpay, Auth.js).
4. New routes, API endpoints, or security mechanisms.
5. Brand identity or educator details.

**YOU MUST UPDATE `TECH_STACK_SUMMARY.md` TO REFLECT THE CURRENT ARCHITECTURE.**
`TECH_STACK_SUMMARY.md` is the Single Source of Truth (SSOT) for all human developers and AI assistants.