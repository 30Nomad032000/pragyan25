-- SQL command to add 'spot' to payment_status enum in existing database
-- Run this command in your Supabase SQL editor or database client

-- Step 1: Add 'spot' to the payment_status CHECK constraint for registrations table
ALTER TABLE registrations 
DROP CONSTRAINT IF EXISTS registrations_payment_status_check;

ALTER TABLE registrations 
ADD CONSTRAINT registrations_payment_status_check 
CHECK (payment_status IN ('pending', 'paid', 'failed', 'refunded', 'spot'));

-- Step 2: Add 'spot' to the payment_status CHECK constraint for multi_event_registrations table
ALTER TABLE multi_event_registrations 
DROP CONSTRAINT IF EXISTS multi_event_registrations_payment_status_check;

ALTER TABLE multi_event_registrations 
ADD CONSTRAINT multi_event_registrations_payment_status_check 
CHECK (payment_status IN ('pending', 'paid', 'failed', 'refunded', 'spot'));

-- Step 3: Verify the changes
-- Check the constraints on both tables
SELECT 
    tc.table_name,
    tc.constraint_name,
    cc.check_clause
FROM information_schema.table_constraints tc
JOIN information_schema.check_constraints cc 
    ON tc.constraint_name = cc.constraint_name
WHERE tc.constraint_type = 'CHECK' 
    AND tc.table_name IN ('registrations', 'multi_event_registrations')
    AND tc.constraint_name LIKE '%payment_status%';

-- Step 4: Test inserting a spot registration (optional)
-- This will verify the constraint works
-- INSERT INTO registrations (user_id, event_id, order_id, payment_amount, payment_currency, payment_status)
-- VALUES (
--     (SELECT id FROM users LIMIT 1),
--     (SELECT id FROM events LIMIT 1),
--     'TEST_SPOT_' || EXTRACT(EPOCH FROM NOW())::text,
--     100.00,
--     'INR',
--     'spot'
-- );

-- Step 5: Check current payment status distribution
SELECT 
    payment_status,
    COUNT(*) as count,
    CASE 
        WHEN payment_status = 'spot' THEN 'Spot Registrations'
        WHEN payment_status = 'paid' THEN 'Paid Registrations'
        WHEN payment_status = 'pending' THEN 'Pending Registrations'
        WHEN payment_status = 'failed' THEN 'Failed Registrations'
        WHEN payment_status = 'refunded' THEN 'Refunded Registrations'
        ELSE 'Other'
    END as status_description
FROM registrations 
GROUP BY payment_status
ORDER BY count DESC;
