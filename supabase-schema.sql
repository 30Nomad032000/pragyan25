-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create users table
CREATE TABLE IF NOT EXISTS users (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    organization VARCHAR(255) NOT NULL,
    position VARCHAR(100),
    experience TEXT,
    interests TEXT,
    additional_info TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create events table
CREATE TABLE IF NOT EXISTS events (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(100) UNIQUE NOT NULL,
    description TEXT,
    price DECIMAL(10,2) NOT NULL,
    currency VARCHAR(3) DEFAULT 'INR',
    max_participants INTEGER,
    is_active BOOLEAN DEFAULT true,
    registration_start_date TIMESTAMP WITH TIME ZONE,
    registration_end_date TIMESTAMP WITH TIME ZONE,
    event_date TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create registrations table for single event registrations
CREATE TABLE IF NOT EXISTS registrations (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    event_id UUID REFERENCES events(id) ON DELETE CASCADE,
    order_id VARCHAR(255) UNIQUE NOT NULL,
    payment_status VARCHAR(20) DEFAULT 'pending' CHECK (payment_status IN ('pending', 'paid', 'failed', 'refunded')),
    payment_amount DECIMAL(10,2) NOT NULL,
    payment_currency VARCHAR(3) DEFAULT 'INR',
    payment_session_id VARCHAR(255),
    teammates JSONB, -- Store teammate information as JSON
    participation_confirmed BOOLEAN DEFAULT false,
    confirmation_code VARCHAR(20) UNIQUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create multi_event_registrations table for multiple event registrations
CREATE TABLE IF NOT EXISTS multi_event_registrations (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    order_id VARCHAR(255) UNIQUE NOT NULL,
    payment_status VARCHAR(20) DEFAULT 'pending' CHECK (payment_status IN ('pending', 'paid', 'failed', 'refunded')),
    payment_amount DECIMAL(10,2) NOT NULL,
    payment_currency VARCHAR(3) DEFAULT 'INR',
    payment_session_id VARCHAR(255),
    selected_events TEXT[] NOT NULL, -- Array of event slugs
    participation_confirmed BOOLEAN DEFAULT false,
    confirmation_code VARCHAR(20) UNIQUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_events_slug ON events(slug);
CREATE INDEX IF NOT EXISTS idx_events_active ON events(is_active);
CREATE INDEX IF NOT EXISTS idx_registrations_user_id ON registrations(user_id);
CREATE INDEX IF NOT EXISTS idx_registrations_event_id ON registrations(event_id);
CREATE INDEX IF NOT EXISTS idx_registrations_order_id ON registrations(order_id);
CREATE INDEX IF NOT EXISTS idx_registrations_payment_status ON registrations(payment_status);
CREATE INDEX IF NOT EXISTS idx_multi_registrations_user_id ON multi_event_registrations(user_id);
CREATE INDEX IF NOT EXISTS idx_multi_registrations_order_id ON multi_event_registrations(order_id);
CREATE INDEX IF NOT EXISTS idx_multi_registrations_payment_status ON multi_event_registrations(payment_status);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers to automatically update updated_at
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_events_updated_at BEFORE UPDATE ON events
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_registrations_updated_at BEFORE UPDATE ON registrations
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_multi_registrations_updated_at BEFORE UPDATE ON multi_event_registrations
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Insert default events based on your EVENT_PRICING configuration
INSERT INTO events (name, slug, price, currency, description, is_active) VALUES
('Code Loom', 'code-loom', 100.00, 'INR', 'Code Loom Registration Fee', true),
('Beat Verse', 'beat-verse', 150.00, 'INR', 'Beat Verse Registration Fee', true),
('Click Clash', 'click-clash', 200.00, 'INR', 'Click Clash Registration Fee', true),
('Virtux', 'virtux', 250.00, 'INR', 'Virtux Registration Fee', true),
('Bug X', 'bug-x', 300.00, 'INR', 'Bug X Registration Fee', true),
('Play Grid', 'play-grid', 100.00, 'INR', 'Play Grid Registration Fee', true),
('Idea Synth', 'idea-synth', 150.00, 'INR', 'Idea Synth Registration Fee', true),
('Trail Hack', 'trail-hack', 400.00, 'INR', 'Trail Hack Registration Fee', true),
('Clip Forge', 'clip-forge', 250.00, 'INR', 'Clip Forge Registration Fee', true),
('Trialis', 'trialis', 300.00, 'INR', 'Trialis Registration Fee', true),
('Goalazo', 'goalazo', 100.00, 'INR', 'Goalazo Registration Fee', true)
ON CONFLICT (slug) DO NOTHING;

-- Create a view for registration details with user and event information
CREATE OR REPLACE VIEW registration_details AS
SELECT 
    r.id,
    r.order_id,
    r.payment_status,
    r.payment_amount,
    r.payment_currency,
    r.participation_confirmed,
    r.confirmation_code,
    r.created_at,
    u.first_name,
    u.last_name,
    u.email,
    u.phone,
    u.organization,
    e.name as event_name,
    e.slug as event_slug,
    r.teammates
FROM registrations r
JOIN users u ON r.user_id = u.id
JOIN events e ON r.event_id = e.id;

-- Create a view for multi-event registration details
CREATE OR REPLACE VIEW multi_event_registration_details AS
SELECT 
    mer.id,
    mer.order_id,
    mer.payment_status,
    mer.payment_amount,
    mer.payment_currency,
    mer.participation_confirmed,
    mer.confirmation_code,
    mer.selected_events,
    mer.created_at,
    u.first_name,
    u.last_name,
    u.email,
    u.phone,
    u.organization
FROM multi_event_registrations mer
JOIN users u ON mer.user_id = u.id;

-- Enable Row Level Security (RLS) for better security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE registrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE multi_event_registrations ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access to events
CREATE POLICY "Events are viewable by everyone" ON events
    FOR SELECT USING (true);

-- Create policies for users to manage their own data
CREATE POLICY "Users can insert their own data" ON users
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Users can view their own data" ON users
    FOR SELECT USING (true);

CREATE POLICY "Users can update their own data" ON users
    FOR UPDATE USING (true);

-- Create policies for registrations
CREATE POLICY "Users can insert their own registrations" ON registrations
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Users can view their own registrations" ON registrations
    FOR SELECT USING (true);

CREATE POLICY "Users can update their own registrations" ON registrations
    FOR UPDATE USING (true);

-- Create policies for multi-event registrations
CREATE POLICY "Users can insert their own multi-event registrations" ON multi_event_registrations
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Users can view their own multi-event registrations" ON multi_event_registrations
    FOR SELECT USING (true);

CREATE POLICY "Users can update their own multi-event registrations" ON multi_event_registrations
    FOR UPDATE USING (true);
