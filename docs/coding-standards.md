## 6. CODING

### 6.1 Coding Standards Used in the Project (Next.js + TypeScript)

#### I. TypeScript/JavaScript Conventions

- **Naming Conventions**

  - **Files, directories, and imports**: use `kebab-case` for files and folders (e.g., `event-card.tsx`, `app/admin/certificates/page.tsx`), absolute imports via `@/` where configured.
  - **Components, classes, enums, types**: `UpperCamelCase` (e.g., `TicketConfirmationCard`, `PaymentStatus`).
  - **Variables, functions, params**: `lowerCamelCase` (e.g., `createOrder`, `updatePaymentStatus`).
  - **Constants**: `SCREAMING_SNAKE_CASE` for module‑level constants (e.g., `DEFAULT_PAGE_SIZE`); `const` for locals.

- **Type Safety**

  - Exported functions, React props, and API payloads must be explicitly typed. Avoid `any`; use discriminated unions and `zod` schemas for runtime validation.
  - Prefer `unknown` over `any` and narrow with type guards.

- **Immutability**

  - Prefer `const` for references and immutable updates for state/data. In React, never mutate state directly.

- **Asynchrony**
  - Use `async/await`; avoid raw `.then()` chains in new code. Always handle errors with `try/catch` at the boundary (API routes, server actions, event handlers) and return typed error responses.

#### II. React/Next.js Specific Standards

- **Component Structure**

  - Favor small, focused functional components. Extract reusable UI into `components/ui/`. Keep components presentational; move data fetching and business logic to hooks or server functions.
  - Use Client/Server Components thoughtfully. Server Components for data‑heavy pages; Client Components for interactivity and browser APIs.

- **Hooks**

  - Use React hooks (`useState`, `useEffect`, `useMemo`, `useCallback`) with correct dependency arrays. Extract complex logic into custom hooks (`useRegistrationSearch`, etc.). Avoid side‑effects in render.

- **Routing and Files**

  - App Router conventions: put pages in `app/`; colocate route handlers in `app/api/<route>/route.ts`. Avoid deep nesting beyond two levels where possible.

- **Forms and Validation**

  - Use `react-hook-form` with `zod` resolvers for robust, typed validation. Surface inline errors and disable submit during pending states.

- **Styling and UI**

  - Use Tailwind CSS utilities and Radix UI primitives. Prefer semantic, accessible components. Respect the product’s visual language and soft background colors for readability.

- **Accessibility (A11y)**
  - Use semantic HTML, ARIA attributes as needed, and keyboard navigability. Ensure color contrast and focus states; label inputs via `Label` components.

#### III. Formatting and Style (Managed by Tools)

- **Formatter and Linting**

  - Use Biome for formatting and linting: `npm run lint` and `npm run format`. Keep the codebase passing before merging.
  - Indentation: match project defaults; avoid unrelated reformatting. Line length should remain readable; break long JSX props and objects across lines.

- **Project Conventions**
  - Import order: std libs, external deps, internal `@/` modules, then relative paths. No unused imports/vars. Avoid default exports for shared utilities; prefer named exports.

#### IV. Documentation and Comments

- **Doc Comments**

  - Use concise JSDoc/TSdoc where types or behavior are non‑obvious (public utilities, complex hooks, API handlers). Keep rationale‑focused; avoid restating code.

- **Internal Comments**

  - Only for tricky rationale, invariants, and edge cases (e.g., payment webhook signature handling, RLS caveats). Avoid noisy or obvious comments.

- **README/Docs**
  - Keep `README.md` and docs under `docs/` current (e.g., sprint plan, user stories, system design). Update when flows change (payments, webhooks, schema).

#### V. Error Handling and Observability

- **API Routes**

  - Validate all inputs with `zod`. Return consistent JSON shapes with HTTP status codes. Never leak secrets in error messages. Log server errors with context; redact PII.

- **Client**

  - Surface actionable toasts/messages (`sonner`) and disable UI during async work. Fail closed on payment or registration errors; provide retry where safe.

- **Security**
  - Store secrets in env vars. Verify Cashfree webhook signatures. Enforce Supabase RLS. Sanitize any user‑rendered content.

#### VI. State Management

- Prefer local component state; lift state only as needed. For cross‑cutting concerns (theme, auth session snapshot), use React Context or a lightweight store. Memoize expensive selectors and props.

#### VII. Testing (Pragmatic)

- Unit test pure utilities and schema validators. Exercise critical flows manually in sandbox (registration, payment create‑order, webhook). Add regression tests for bugs that escape.

---

### 6.2 Architectural Role and Benefits (React in this Project)

- **Presentation Layer**: React handles the UI for the event site, registration forms, and admin dashboard, rendering responsive components and interactive states.
- **Component‑Based**: Features (registration forms, admin tables, certificate sender) are composed of reusable components like `Card`, `Button`, and domain components (e.g., `TicketConfirmationCard`).
- **Efficient Updates**: Virtual DOM diffing keeps interactions smooth (e.g., search/filter/pagination in admin dashboard) without full page reloads.
- **Backend Integration**: React components call Next.js API routes and Supabase SDK for data; payments run via Cashfree SDK and webhooks for definitive status.

#### Coding Standards and Best Practices Specific to React/Next

- **JSX/TSX Conventions**: Use `className`, camelCase props, and typed props/interfaces. Avoid inline anonymous functions where memoization matters.
- **Functional Components & Hooks**: Prefer function components with hooks; no new class components. Extract effects; avoid business logic in JSX.
- **Prop Types/TypeScript**: Strongly type all props and server responses. Share types between client and API when possible.
- **Accessibility**: Use semantic HTML and Radix primitives; ensure focus management on dialogs/sheets.
- **Code Separation**: UI in components; data access in `lib/` (e.g., `lib/supabase.ts`, `lib/types/payment.ts`); validations in `lib` with `zod`.

---

### 6.3 Summary

| Area             | Followed Standard                                       | Recommended Improvements                                   |
| ---------------- | ------------------------------------------------------- | ---------------------------------------------------------- |
| Code Naming      | TypeScript/React conventions (files, components, const) | Enforce consistent kebab‑case file names across all routes |
| Folder Structure | App Router, `components/ui`, `lib` separation           | Add `docs/` owners and module READMEs per feature          |
| UI Components    | Tailwind + Radix with soft, readable colors             | Create a shared design tokens guide in `lib/ui-tokens.ts`  |
| Error Handling   | Zod validation, try/catch in API routes                 | Centralize error utilities and redact logs by default      |
| Version Control  | GitHub with scripts for lint/format                     | Add commit message guide and PR checklist                  |
| Testing          | Manual + targeted utility tests                         | Add e2e smoke for registration and payment happy path      |
