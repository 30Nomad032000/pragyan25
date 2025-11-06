## 11. APPENDIX

### 11.1 Git History [Sprint Wise]

Sprint 1 – Project Initialization & Connectivity

- Defined project scope, primary user stories, and acceptance criteria based on `docs/user-stories.md`.
- Initialized Next.js 15 + TypeScript, Tailwind v4, Biome; base routes and layout scaffolded.
- Added Supabase setup docs and environment variable templates; verified connectivity to Supabase.
- Committed initial structure under `app/`, `components/`, `lib/`, and `docs/`.

Sprint 2 – Registration Forms & Schema

- Designed registration flows and validation using `react-hook-form` + `zod`.
- Implemented forms for single/multi-event registration; wired client-side validation and UI states.
- Finalized initial Supabase schema for `users`, `events`, `registrations`, `multi_event_registrations` with RLS guidance.
- Pushed commits for form components, types, and schema docs; reviewed for accessibility and consistency.

Sprint 3 – Payments (Cashfree) Integration

- Implemented `app/api/create-order/route.ts` with Zod validation and Cashfree SDK configuration.
- Built payment success/failure pages and client-side checkout integration.
- Implemented `app/api/payment-webhook/route.ts` with request validation and server-side handling stub (signature verification planned).
- Committed API route handlers, env usage, and logs; added error-handling improvements.

Sprint 4 – Admin Dashboard (MVP)

- Delivered `/admin` dashboard: list, search, filter, and paginate registrations.
- Added participation confirm/unconfirm actions and summary stats (paid/pending/spot).
- Introduced basic access gate placeholder and planned audit logging.
- Pushed UI components and data-fetch logic; refined pagination and debounce behavior.

Sprint 5 – Verification & Certificates

- Added admin verification workflow scaffolding (status flags, filters planned).
- Integrated certificate sender UI and PDF generation pathway using `jspdf` + `html2canvas`.
- Implemented CSV export planning for registrations and payments.
- Committed certificate UI, helper utilities, and docs updates.

Sprint 6 – Notifications, Release & Ops

- Planned Supabase Realtime for admin live updates (status changes without refresh).
- Added notification touchpoints (toasts) and email/SMS notification planning.
- Prepared production readiness tasks: env hardening, monitoring hooks, deployment notes for Vercel.
- Committed `docs/` updates (system design, testing, implementation, business perspective) and finalized sprint artifacts.

Notes

- Each sprint concluded with code review, lint/format passes, and documentation updates in `docs/`.
- Environment variables and secrets remained outside version control; README will link to the docs set.

