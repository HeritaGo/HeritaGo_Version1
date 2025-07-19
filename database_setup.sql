
-- HeritaGo Database Setup Script
-- Run this script to create the database and tables

-- Create database (run this first as superuser)
CREATE DATABASE heritago;

-- Connect to the heritago database before running the rest
\c heritago;

-- Create tables based on the schema
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username TEXT NOT NULL UNIQUE,
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    full_name TEXT NOT NULL,
    role TEXT NOT NULL CHECK (role IN ('tourist', 'guide', 'vendor', 'admin')),
    phone_number TEXT,
    profile_image TEXT,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS destinations (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    category TEXT NOT NULL CHECK (category IN ('heritage', 'beach', 'mountain', 'wildlife', 'cultural')),
    location TEXT NOT NULL,
    latitude DECIMAL(10, 7) NOT NULL,
    longitude DECIMAL(10, 7) NOT NULL,
    image_url TEXT,
    rating DECIMAL(2, 1) DEFAULT 0,
    is_active BOOLEAN DEFAULT true
);

CREATE TABLE IF NOT EXISTS hotels (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    location TEXT NOT NULL,
    price_per_night INTEGER NOT NULL,
    rating DECIMAL(2, 1) DEFAULT 0,
    amenities JSONB DEFAULT '[]',
    image_url TEXT,
    contact_info JSONB DEFAULT '{}',
    is_active BOOLEAN DEFAULT true
);

CREATE TABLE IF NOT EXISTS gear_items (
    id SERIAL PRIMARY KEY,
    vendor_id INTEGER REFERENCES users(id),
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    category TEXT NOT NULL CHECK (category IN ('camping', 'hiking', 'photography', 'water-sports')),
    price_per_day INTEGER NOT NULL,
    availability INTEGER DEFAULT 0,
    image_url TEXT,
    is_active BOOLEAN DEFAULT true
);

CREATE TABLE IF NOT EXISTS tours (
    id SERIAL PRIMARY KEY,
    guide_id INTEGER REFERENCES users(id) NOT NULL,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    destination_id INTEGER REFERENCES destinations(id),
    duration INTEGER NOT NULL,
    max_participants INTEGER DEFAULT 10,
    price_per_person INTEGER NOT NULL,
    is_active BOOLEAN DEFAULT true
);

CREATE TABLE IF NOT EXISTS bookings (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) NOT NULL,
    type TEXT NOT NULL CHECK (type IN ('hotel', 'gear', 'tour')),
    item_id INTEGER NOT NULL,
    start_date TIMESTAMP NOT NULL,
    end_date TIMESTAMP NOT NULL,
    total_amount INTEGER NOT NULL,
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'cancelled', 'completed')),
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS emergency_alerts (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    message TEXT NOT NULL,
    severity TEXT NOT NULL CHECK (severity IN ('low', 'medium', 'high', 'critical')),
    category TEXT NOT NULL CHECK (category IN ('weather', 'safety', 'traffic', 'health')),
    location TEXT,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT NOW(),
    expires_at TIMESTAMP
);

CREATE TABLE IF NOT EXISTS quest_progress (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) NOT NULL,
    destination_id INTEGER REFERENCES destinations(id) NOT NULL,
    is_completed BOOLEAN DEFAULT false,
    completed_at TIMESTAMP,
    points INTEGER DEFAULT 0
);

CREATE TABLE IF NOT EXISTS chat_messages (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    message TEXT NOT NULL,
    response TEXT,
    timestamp TIMESTAMP DEFAULT NOW()
);

-- Insert sample data
INSERT INTO users (username, email, password, full_name, role) VALUES
('tourist', 'tourist@heritago.lk', 'tourist123', 'Tourist User', 'tourist'),
('guide', 'guide@heritago.lk', 'guide123', 'Guide User', 'guide'),
('vendor', 'vendor@heritago.lk', 'vendor123', 'Vendor User', 'vendor'),
('admin', 'admin@heritago.lk', 'admin123', 'Admin User', 'admin');

INSERT INTO destinations (name, description, category, location, latitude, longitude, rating) VALUES
('Sigiriya Rock Fortress', 'Ancient rock fortress and palace ruins', 'heritage', 'Sigiriya', 7.9568, 80.7592, 4.8),
('Galle Fort', 'Historic fortified city built by Portuguese', 'heritage', 'Galle', 6.0328, 80.217, 4.6),
('Temple of the Tooth', 'Sacred Buddhist temple housing tooth relic', 'cultural', 'Kandy', 7.2936, 80.6350, 4.7),
('Yala National Park', 'Wildlife sanctuary famous for leopards', 'wildlife', 'Yala', 6.3725, 81.5185, 4.5),
('Mirissa Beach', 'Beautiful coastal area perfect for whale watching', 'beach', 'Mirissa', 5.9485, 80.4585, 4.4);

INSERT INTO hotels (name, description, location, price_per_night, rating, amenities) VALUES
('Sigiriya Village Hotel', 'Luxury hotel near Sigiriya Rock', 'Sigiriya', 15000, 4.5, '["WiFi", "Pool", "Restaurant", "Spa"]'),
('Galle Face Hotel', 'Historic colonial hotel in Colombo', 'Colombo', 25000, 4.7, '["WiFi", "Ocean View", "Restaurant", "Gym"]'),
('Earl''s Regency Hotel', 'Mountain resort in Kandy', 'Kandy', 12000, 4.3, '["WiFi", "Mountain View", "Restaurant", "Garden"]');

-- Create indexes for better performance
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_username ON users(username);
CREATE INDEX idx_bookings_user_id ON bookings(user_id);
CREATE INDEX idx_bookings_status ON bookings(status);
CREATE INDEX idx_destinations_category ON destinations(category);
CREATE INDEX idx_gear_items_vendor_id ON gear_items(vendor_id);
CREATE INDEX idx_tours_guide_id ON tours(guide_id);
CREATE INDEX idx_quest_progress_user_id ON quest_progress(user_id);

-- Grant permissions (adjust as needed)
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO username;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO username;


CREATE TABLE chat_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  message TEXT NOT NULL,
  response TEXT NOT NULL,
  timestamp TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL
);