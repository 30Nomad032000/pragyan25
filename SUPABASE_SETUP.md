# Supabase Integration Setup

This project now includes Supabase integration for tracking user registrations and managing participation confirmations.

## Setup Instructions

### 1. Supabase Project Setup

1. Create a new Supabase project at [supabase.com](https://supabase.com)
2. Go to your project dashboard and copy the following:
   - Project URL
   - Anon public key

### 2. Environment Variables

Create a `.env.local` file in your project root with the following variables:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Cashfree Payment Gateway Configuration (existing)
CASHFREE_APP_ID=your_cashfree_app_id
CASHFREE_SECRET_KEY=your_cashfree_secret_key
CASHFREE_ENVIRONMENT=sandbox

# Payment URLs (existing)
PAYMENT_SUCCESS_URL=http://localhost:3000/payment-success
WEBHOOK_URL=http://localhost:3000/api/payment-webhook
```

### 3. Database Setup

1. In your Supabase project dashboard, go to the SQL Editor
2. Copy and paste the contents of `supabase-schema.sql` into the SQL editor
3. Run the SQL script to create all necessary tables, indexes, and policies

### 4. Features Implemented

#### Client-Side Registration Tracking

- **Single Event Registration**: Automatically saves user data and registration details to Supabase when users register for individual events
- **Multi-Event Registration**: Tracks registrations for multiple events in a single transaction
- **User Management**: Creates user records or retrieves existing users by email
- **Payment Status Updates**: Updates payment status in Supabase when payments are confirmed

#### Admin Dashboard

- **Registration Management**: View all registrations with filtering options
- **Payment Status Tracking**: See payment status (paid, pending, failed) for each registration
- **Participation Confirmation**: Confirm or unconfirm user participation in events
- **Statistics**: View summary statistics of registrations and confirmations

#### Database Schema

- **Users Table**: Stores user information (name, email, phone, organization, etc.)
- **Events Table**: Contains event details (name, slug, price, description)
- **Registrations Table**: Single event registrations with payment and participation status
- **Multi-Event Registrations Table**: Multiple event registrations in one transaction
- **Row Level Security**: Proper security policies for data access

### 5. Usage

#### For Users

1. Register for events through the existing registration forms
2. Complete payment through Cashfree
3. Registration data is automatically saved to Supabase
4. Payment status is updated when payment is confirmed

#### For Admins

1. Access the admin dashboard at `/admin`
2. View all registrations with filtering options
3. Confirm participation for paid registrations
4. Track payment status and registration statistics

### 6. Key Functions

The following helper functions are available in `lib/supabase.ts`:

- `registerUser()`: Create or retrieve user records
- `createRegistration()`: Create single event registrations
- `createMultiEventRegistration()`: Create multi-event registrations
- `updateRegistrationPaymentStatus()`: Update payment status
- `getRegistrationByOrderId()`: Retrieve registration details
- `getEventBySlug()`: Get event information
- `getUserByEmail()`: Find user by email

### 7. Security

- Row Level Security (RLS) is enabled on all tables
- Public read access to events
- Users can only manage their own data
- Admin functions require proper authentication (implement as needed)

### 8. Next Steps

1. Set up your Supabase project and environment variables
2. Run the database schema
3. Test the registration flow
4. Access the admin dashboard to manage registrations
5. Implement additional authentication for admin access if needed

The integration is designed to work seamlessly with your existing payment flow while adding comprehensive registration tracking and management capabilities.
