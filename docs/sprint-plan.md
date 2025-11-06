### 4.5 Sprint Planner

#### Sprint Backlog - 1

| Product Backlog Item   | Sprint ID | Sprint Task                                                                               | Sprint Goal                                       | Estimated Hours | Acceptance Criteria                                                |
| ---------------------- | --------- | ----------------------------------------------------------------------------------------- | ------------------------------------------------- | --------------: | ------------------------------------------------------------------ |
| Project Initialization | 1.1       | Initialize Next.js 15 + TypeScript, Tailwind v4, Biome; configure base routes and layout. | Establish foundational app structure and tooling. |              10 | App boots locally; lint/format pass; base pages render.            |
|                        | 1.2       | Configure Supabase client and environment variables; connect to project.                  | Enable secure DB connectivity.                    |              10 | `.env.local` loaded; successful Supabase ping; no secrets in repo. |

#### Sprint Backlog - 2

| Product Backlog Item      | Sprint ID | Sprint Task                                                                              | Sprint Goal                                          | Estimated Hours | Acceptance Criteria                                                  |
| ------------------------- | --------- | ---------------------------------------------------------------------------------------- | ---------------------------------------------------- | --------------: | -------------------------------------------------------------------- |
| Registration Flow (Forms) | 2.1       | Implement user registration forms with react-hook-form + Zod validation.                 | Allow students to submit personal and event details. |              12 | Required fields validated; errors shown; form data shaped for API.   |
|                           | 2.2       | Create Supabase schema for users/events/registrations and insert handlers.               | Persist registration data reliably.                  |              10 | Records created; RLS policies in place; tested via sandbox data.     |
|                           | 2.3       | File inputs or eligibility acknowledgements (if docs required) with storage placeholder. | Prepare for verification step.                       |              10 | Upload UI present; metadata linked to registration; limits enforced. |

#### Sprint Backlog - 3

| Product Backlog Item | Sprint ID | Sprint Task                                                                   | Sprint Goal                               | Estimated Hours | Acceptance Criteria                                             |
| -------------------- | --------- | ----------------------------------------------------------------------------- | ----------------------------------------- | --------------: | --------------------------------------------------------------- |
| Payments (Cashfree)  | 3.1       | Implement api/create-order using Cashfree SDK; return session/payment link.   | Enable secure order creation.             |              10 | Valid session ID returned; errors handled; env-driven config.   |
|                      | 3.2       | Implement payment success/failure pages and client-side integration.          | Complete user payment flow.               |               8 | Redirects work; statuses displayed; orderId tracked.            |
|                      | 3.3       | Implement api/payment-webhook with Zod validation and signature verification. | Reliable server-side payment status sync. |              12 | Webhook validates signature; registration status updated in DB. |

#### Sprint Backlog - 4

| Product Backlog Item  | Sprint ID | Sprint Task                                                              | Sprint Goal                        | Estimated Hours | Acceptance Criteria                                              |
| --------------------- | --------- | ------------------------------------------------------------------------ | ---------------------------------- | --------------: | ---------------------------------------------------------------- |
| Admin Dashboard (MVP) | 4.1       | Build /admin dashboard: list, search, filter, paginate registrations.    | Operational visibility for admins. |              12 | Data grid renders; filters by payment/status; pagination stable. |
|                       | 4.2       | Add participation confirmation toggles and summary stats.                | Control and quick insights.        |               8 | Confirm/unconfirm updates DB; stats accurate.                    |
|                       | 4.3       | Implement role gate (basic auth placeholder) and audit logging scaffold. | Prepare for secure ops.            |               6 | Admin-only access; actions logged to table.                      |

#### Sprint Backlog - 5

| Product Backlog Item        | Sprint ID | Sprint Task                                                                                   | Sprint Goal                           | Estimated Hours | Acceptance Criteria                                             |
| --------------------------- | --------- | --------------------------------------------------------------------------------------------- | ------------------------------------- | --------------: | --------------------------------------------------------------- |
| Verification & Certificates | 5.1       | Admin verification workflow: eligibility checks and status flags.                             | Accurate processing of registrations. |              10 | Verified/Rejected statuses; reason capture; filters updated.    |
|                             | 5.2       | Certificate generation UI (existing component wiring) and bulk-send pipeline (email service). | Post-event certificate distribution.  |              12 | Preview, select, send; delivery status tracked per user.        |
|                             | 5.3       | Export CSV for registrations and payments.                                                    | Easy data sharing/reporting.          |               6 | CSV exports match grid filters; UTF-8; numeric formats correct. |

#### Sprint Backlog - 6

| Product Backlog Item    | Sprint ID | Sprint Task                                                                  | Sprint Goal                 | Estimated Hours | Acceptance Criteria                                                |
| ----------------------- | --------- | ---------------------------------------------------------------------------- | --------------------------- | --------------: | ------------------------------------------------------------------ |
| Notifications & Release | 6.1       | Real-time updates using Supabase Realtime for admin and user status.         | Keep stakeholders informed. |              10 | Status changes reflect without refresh; channel security verified. |
|                         | 6.2       | Email/SMS notifications on key events (registration, payment, verification). | Proactive communication.    |               8 | Templates render; throttling/rate limits; delivery logs stored.    |
|                         | 6.3       | Production readiness: env hardening, error monitoring, deployment.           | Stable release.             |               7 | Vercel deploy green; Sentry wired; runbook and docs updated.       |

Notes:

- Estimates are initial and subject to refinement after Sprint 1.
- Payment gateway standardized to Cashfree to match current implementation.
