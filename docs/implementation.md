## 8. IMPLEMENTATION

The implementation follows an agile, modular approach, with parallel development across the public site (registration and payments), the Admin Dashboard, and backend integrations using Next.js API routes and Supabase.

### I. Infrastructure Setup and Backend Development (Cloud Tier)

- **Cloud Initialization**

  - Create a Supabase project; configure Database (PostgreSQL), Authentication (optional for admin auth), and Row Level Security (RLS).
  - Set environment variables in `.env.local` for Supabase and Cashfree:
    - `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`
    - `CASHFREE_APP_ID`, `CASHFREE_SECRET_KEY`, `CASHFREE_ENVIRONMENT`
    - `PAYMENT_SUCCESS_URL`, `WEBHOOK_URL`

- **Database Schema**

  - Implement tables for: `users`, `events`, `registrations`, `multi_event_registrations` (see `supabase-schema.sql`).
  - Add indexes for frequent lookups (by `email`, `slug`, `order_id`).
  - Enforce access rules with RLS: public read on `events`, restricted writes on registration rows, admin-only maintenance functions.

- **Authentication and Access**

  - Public flows operate without account login; admin routes gated (basic gate now; extend with Supabase Auth/JWT scope later).

- **Core APIs (Next.js API Routes)**
  - `app/api/create-order/route.ts`: Validates request (Zod), initializes Cashfree order, returns session/payment info.
  - `app/api/payment-webhook/route.ts`: Validates webhook (Zod), verify signature (to be added), updates payment status for `orderId` in Supabase, idempotent handling.
  - Future: refund endpoint, export endpoints, admin-only data APIs.

### II. Front-End Development (Next.js/React)

- **Public Website (Registration + Payments)**

  - UI/UX: The landing and events pages use Tailwind + Radix with soft, readable color palettes for accessibility.
  - Registration: Forms with `react-hook-form` + `zod` validation; supports single- and multi-event registration; writes to Supabase.
  - Payment: Integrate Cashfree JS checkout on successful order creation; success and failure pages reflect outcome.
  - Notifications: Toast feedback for user actions; email notifications planned for confirmations.

- **Admin Dashboard**

  - Dashboard at `/admin`: list, search, filter, and paginate registrations; summary cards for paid/pending/spot.
  - Actions: Participation confirm/unconfirm, manual refresh, and page-size controls.
  - Extensions: Verification workflow (approve/reject with reason), CSV export, role-gated access, audit logging.

- **Certificates**
  - Certificate sender UI (bulk select, send); PDF generation using `jspdf` + `html2canvas`; planned email delivery integration.

### III. System Integration and Testing

- **Module Integration**

  - Public registration and payments interact with Supabase and Cashfree; webhook finalizes server truth for payment status.
  - Admin dashboard consumes the same Supabase data for near real-time visibility; optional Supabase Realtime for live updates.

- **Real-Time Synchronization**

  - Plan: enable Supabase Realtime on `registrations` to reflect payment status and confirmations in admin without refresh.

- **End-to-End Testing (UAT)**

  - Scenarios:
    - Registration → Order creation → Cashfree checkout → Webhook success → Admin sees `paid` and can confirm participation.
    - Payment failure path: surfaces user-friendly errors; no `paid` state persisted; admin view remains unchanged.
    - Multi-event registration creation and listing in admin.

- **Performance Testing**
  - Validate API latency for create-order/webhook under burst traffic.
  - Verify Supabase query plans for dashboard filters and pagination; add indexes if needed.

### IV. Deployment and Handover

- **Web Deployment**

  - Deploy the Next.js app to Vercel (recommended). Configure production environment variables and secrets. Point domains and enable HTTPS.
  - Set Cashfree credentials to production; update `PAYMENT_SUCCESS_URL` and `WEBHOOK_URL` with production URLs.

- **Data and Admin**

  - Seed `events` with production data. Provide admin credentials/access gate. Document admin flows (search, filter, confirm).

- **Monitoring and Operations**

  - Error tracking: integrate Sentry (or Vercel monitoring) for API routes and client errors.
  - Database monitoring through Supabase dashboard; set alerts for error rates and slow queries.
  - Payment monitoring via Cashfree dashboard and webhook success logs.

- **Training and Runbooks**
  - Create short guides for admin tasks (confirmations, exports, certificate sending).
  - Incident runbook: webhook retries, Cashfree outages, DB hotfix procedures.

---

Deliverables align with `docs/sprint-plan.md` and implemented modules in `app/` and `components/`. This blueprint supports iterative enhancements such as role-based admin auth, richer analytics, and automated certificate delivery.
