## 5. SYSTEM DESIGN

### 5.1 Technology / Framework [Full-Stack Next.js Architecture]

#### 1. Front-End and Back-End Technologies:

| Category            | Technology                                  | Version                                                        |
| ------------------- | ------------------------------------------- | -------------------------------------------------------------- |
| **Front-End**       | Next.js, React, TypeScript, Tailwind CSS    | Next.js 15.5.4, React 19.1.0, TypeScript 5.x, Tailwind CSS 4.x |
| **UI Libraries**    | Radix UI, Framer Motion, GSAP, Lucide Icons | Latest Stable versions                                         |
| **Form Management** | React Hook Form, Zod                        | React Hook Form 7.64.0, Zod 4.1.12                             |
| **Back-End**        | Next.js API Routes, Node.js                 | Next.js 15.5.4, Node.js 18+ LTS                                |
| **Database**        | Supabase (PostgreSQL)                       | Supabase JS SDK 2.75.0                                         |
| **Payment Gateway** | Cashfree                                    | Cashfree SDK 5.1.0, Cashfree JS cíent 1.0.5                    |
| **PDF Generation**  | jsPDF, html2canvas                          | jsPDF 3.0.3, html2canvas 1.4.1                                 |
| **3D Graphics**     | Three.js, React Three Fiber                 | Three.js 0.180.0, React Three Fiber 9.3.0                      |

#### 2. Versioning and Software Tools:

| Purpose                 | Tool                          | Version                 |
| ----------------------- | ----------------------------- | ----------------------- |
| **Version Control**     | Git, GitHub                   | Latest Stable           |
| **Code Editor**         | Visual Studio Code            | Latest Stable           |
| **Code Quality**        | Biome                         | Biome 2.2.0             |
| **Build Tool**          | Turbopack (Next.js)           | Bundled with Next.js 15 |
| **Package Manager**     | npm                           | Latest Stable           |
| **Payment Integration** | Cashfree API                  | Latest API version      |
| **Email Service**       | SMTP / Email Service Provider | To be configured        |
| **Deployment Platform** | Vercel (recommended)          | Latest Stable           |

---

### 5.2 Module Description:

| Module Name                          | Description                                                                                                                                                                                                                                                                                                                      |
| ------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Registration Module**              | Handles single and multi-event registrations for students. Includes form validation using React Hook Form and Zod, user data collection (name, email, phone, organization), and submission to Supabase. Supports both individual event registration and bulk event selection in a single transaction.                            |
| **Payment Module**                   | Implements secure payment processing using Cashfree payment gateway. Creates payment orders, handles payment sessions, processes payment webhooks with signature verification, and updates registration payment status in Supabase. Includes payment success/failure pages and order status tracking.                            |
| **Admin Dashboard Module**           | Comprehensive admin interface for managing event registrations. Features include viewing all registrations with filtering (by payment status, search by name), pagination, participation confirmation toggles, summary statistics, and real-time updates. Includes role-based access control placeholder.                        |
| **User Management Module**           | Manages user profiles and authentication data stored in Supabase. Handles user creation, retrieval by email, profile updates, and maintains relationships between users and their referrals. Integrates with registration and payment modules for seamless user data flow.                                                       |
| **Event Management Module**          | Displays event listings, details, categories, and information pages. Supports event browsing, filtering by category, detailed event pages with schedules, locations, prizes, and participant limits. Includes event poster galleries and responsive layouts for mobile and desktop.                                              |
| **Certificate Management Module**    | Enables generation and distribution of participation certificates. Includes PDF certificate generation using jsPDF, QR code integration for verification, bulk certificate selection interface, email sending functionality, and delivery status tracking. Allows admins to send certificates to confirmed participants.         |
| **Verification Module**              | Provides admin tools for verifying student eligibility and processing registrations. Allows admins to confirm or reject participant applications, update participation status, capture verification reasons, and filter registrations based on verification state. Integrates with the admin dashboard for streamlined workflow. |
| **Notification Module**              | Handles real-time status updates and notifications using Supabase Realtime subscriptions. Sends email notifications for registration confirmations, payment status updates, and verification outcomes. Supports both push notifications and email templates for user communication.                                              |
| **Authentication & Security Module** | Manages secure access control using Supabase Row Level Security (RLS) policies. Handles environment variable management, API route authentication, webhook signature verification, and admin access control. Ensures data privacy and secure payment processing compliance.                                                      |
