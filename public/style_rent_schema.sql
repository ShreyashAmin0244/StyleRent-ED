-- ====================================================================
-- STYLE-RENT: ONLINE CLOTHING RENTAL DATABASE SCHEMA & SEED DATA
-- Target: PostgreSQL / MySQL / SQLite Relational Database
-- Project: College Web Development & Database Engineering Project
-- Platform: Style-Rent (Indian Ethnic & Party Wear Rental Service)
-- ====================================================================

-- DROP EXISTING TABLES IN REVERSE DEPENDENCY ORDER
DROP TABLE IF EXISTS damage_inspections;
DROP TABLE IF EXISTS operational_buffers;
DROP TABLE IF EXISTS order_items;
DROP TABLE IF EXISTS orders;
DROP TABLE IF EXISTS inventory_units;
DROP TABLE IF EXISTS reviews;
DROP TABLE IF EXISTS products;
DROP TABLE IF EXISTS users;

-- 1. USERS & PATRONS
CREATE TABLE users (
    user_id VARCHAR(36) PRIMARY KEY,
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    phone VARCHAR(15) NOT NULL,
    city VARCHAR(50) NOT NULL,
    address_line TEXT NOT NULL,
    pincode VARCHAR(10) NOT NULL,
    is_id_verified BOOLEAN DEFAULT FALSE,
    id_document_type VARCHAR(20), -- 'Aadhaar' or 'PAN'
    id_number_masked VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. PRODUCTS CATALOG
CREATE TABLE products (
    product_id VARCHAR(36) PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    category VARCHAR(50) NOT NULL, -- 'Lehenga', 'Sherwani', 'Saree', 'Gown', etc.
    gender VARCHAR(20) NOT NULL,   -- 'Women', 'Men', 'Unisex'
    rental_price_3d DECIMAL(10,2) NOT NULL,
    rental_price_7d DECIMAL(10,2) NOT NULL,
    rental_price_10d DECIMAL(10,2) NOT NULL,
    retail_price DECIMAL(10,2) NOT NULL,
    security_deposit DECIMAL(10,2) NOT NULL,
    color VARCHAR(50) NOT NULL,
    fabric VARCHAR(100) NOT NULL,
    rating DECIMAL(3,2) DEFAULT 5.00,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 3. INVENTORY UNITS (PHYSICAL GARMENT INSTANCES)
CREATE TABLE inventory_units (
    unit_id VARCHAR(36) PRIMARY KEY,
    product_id VARCHAR(36) NOT NULL REFERENCES products(product_id) ON DELETE CASCADE,
    size VARCHAR(10) NOT NULL,
    sku VARCHAR(30) UNIQUE NOT NULL,
    current_status VARCHAR(30) DEFAULT 'Available', -- 'Available', 'Rented', 'Cleaning', 'Maintenance'
    warehouse_location VARCHAR(50) NOT NULL,
    total_times_rented INT DEFAULT 0,
    last_sanitized_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 4. ORDERS & RENTAL AGREEMENTS
CREATE TABLE orders (
    order_id VARCHAR(36) PRIMARY KEY,
    order_number VARCHAR(20) UNIQUE NOT NULL,
    user_id VARCHAR(36) NOT NULL REFERENCES users(user_id),
    rental_subtotal DECIMAL(10,2) NOT NULL,
    security_deposit_total DECIMAL(10,2) NOT NULL,
    backup_options_total DECIMAL(10,2) DEFAULT 0.00,
    damage_protection_total DECIMAL(10,2) DEFAULT 0.00,
    grand_total DECIMAL(10,2) NOT NULL,
    payment_method VARCHAR(30) NOT NULL, -- 'UPI', 'Card', 'NetBanking', 'COD'
    payment_status VARCHAR(20) DEFAULT 'Paid',
    order_status VARCHAR(30) DEFAULT 'Confirmed',
    return_bag_tracking VARCHAR(50) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 5. ORDER LINE ITEMS & SIZING
CREATE TABLE order_items (
    item_id VARCHAR(36) PRIMARY KEY,
    order_id VARCHAR(36) NOT NULL REFERENCES orders(order_id) ON DELETE CASCADE,
    product_id VARCHAR(36) NOT NULL REFERENCES products(product_id),
    selected_size VARCHAR(10) NOT NULL,
    duration_type VARCHAR(20) NOT NULL,
    start_date DATE NOT NULL,
    delivery_date DATE NOT NULL,
    return_date DATE NOT NULL,
    fitting_option VARCHAR(40) NOT NULL,
    backup_size_selected VARCHAR(10),
    has_damage_protection BOOLEAN DEFAULT TRUE
);

-- 6. SMART OPERATIONAL BUFFERS (PREVENT OVERBOOKING DURING CLEANING & LOGISTICS)
CREATE TABLE operational_buffers (
    buffer_id VARCHAR(36) PRIMARY KEY,
    product_id VARCHAR(36) NOT NULL REFERENCES products(product_id),
    order_id VARCHAR(36) NOT NULL REFERENCES orders(order_id),
    event_start_date DATE NOT NULL,
    event_end_date DATE NOT NULL,
    buffer_block_start DATE NOT NULL,
    buffer_block_end DATE NOT NULL,
    buffer_reason VARCHAR(100) NOT NULL
);

-- 7. REVIEWS & FIT FEEDBACK
CREATE TABLE reviews (
    review_id VARCHAR(36) PRIMARY KEY,
    product_id VARCHAR(36) NOT NULL REFERENCES products(product_id),
    customer_name VARCHAR(100) NOT NULL,
    customer_city VARCHAR(50) NOT NULL,
    rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
    height VARCHAR(20),
    body_type VARCHAR(50),
    size_purchased VARCHAR(10),
    fit_feedback VARCHAR(50),
    comment TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 8. RETURN INSPECTION & SECURITY DEPOSIT REFUND
CREATE TABLE damage_inspections (
    inspection_id VARCHAR(36) PRIMARY KEY,
    order_id VARCHAR(36) NOT NULL REFERENCES orders(order_id),
    unit_id VARCHAR(36) NOT NULL REFERENCES inventory_units(unit_id),
    return_condition VARCHAR(20) NOT NULL, -- 'good', 'minor', 'major'
    damage_type VARCHAR(100),
    damage_charge DECIMAL(10,2) DEFAULT 0.00,
    original_deposit DECIMAL(10,2) NOT NULL,
    refund_amount DECIMAL(10,2) NOT NULL,
    staff_inspector VARCHAR(100) NOT NULL,
    inspected_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ====================================================================
-- SEED DATA INSERTION
-- ====================================================================

INSERT INTO users (user_id, full_name, email, phone, city, address_line, pincode, is_id_verified, id_document_type, id_number_masked) VALUES
('usr-1001', 'Ananya Sharma', 'ananya.sharma@example.com', '+91 98201 44521', 'Mumbai', 'Flat 402, Sea Green Apts, Worli Sea Face', '400018', TRUE, 'Aadhaar', 'XXXX-XXXX-4819'),
('usr-1002', 'Rohan Mehra', 'rohan.mehra@example.com', '+91 98112 33490', 'Delhi NCR', 'B-14, Greater Kailash 1', '110048', TRUE, 'PAN', 'ABCDE7890F'),
('usr-1003', 'Priya Iyer', 'priya.iyer@example.com', '+91 97410 88722', 'Bengaluru', '45/2, 4th Cross, Indiranagar', '560038', TRUE, 'Aadhaar', 'XXXX-XXXX-9021'),
('usr-1004', 'Tanmay Rao', 'tanmay.rao@example.com', '+91 98450 11234', 'Pune', 'Tower 3, Kalyani Nagar', '411006', TRUE, 'Aadhaar', 'XXXX-XXXX-1122');

INSERT INTO products (product_id, name, category, gender, rental_price_3d, rental_price_7d, rental_price_10d, retail_price, security_deposit, color, fabric, rating) VALUES
('prod-01', 'Emerald Green Designer Zardozi Lehenga', 'Lehenga', 'Women', 1999.00, 3299.00, 4199.00, 42000.00, 2500.00, 'Emerald Green & Gold', 'Pure Velvet & Net', 4.90),
('prod-02', 'Royal Maroon Embroidered Silk Sherwani', 'Sherwani', 'Men', 1499.00, 2499.00, 3199.00, 38000.00, 2000.00, 'Deep Maroon & Gold', 'Matka Silk with Jacquard', 4.80),
('prod-03', 'Blush Pink Mirror Work Organza Lehenga', 'Lehenga', 'Women', 1799.00, 2999.00, 3799.00, 35000.00, 2200.00, 'Blush Rose Pink', 'Silk Organza & Crepe', 4.90),
('prod-04', 'Ivory Raw Silk Sherwani with Zari Stole', 'Sherwani', 'Men', 1899.00, 3199.00, 3999.00, 48000.00, 2500.00, 'Ivory & Gold', 'Pure Raw Silk', 4.70),
('prod-05', 'Crimson Banarasi Katan Silk Heritage Saree', 'Saree', 'Women', 1299.00, 2099.00, 2699.00, 28000.00, 1500.00, 'Crimson Red', 'Pure Katan Silk', 4.90),
('prod-06', 'Champagne Gold Sequin Floor-Length Gown', 'Gown', 'Women', 1699.00, 2799.00, 3499.00, 32000.00, 2000.00, 'Champagne Gold', 'Georgette with Sequins', 4.80),
('prod-07', 'Midnight Black Velvet Bandhgala Jodhpuri Suit', 'Blazer & Tuxedo', 'Men', 1599.00, 2599.00, 3299.00, 34000.00, 2000.00, 'Jet Black', 'Italian Velvet', 4.80),
('prod-08', 'Sunshine Mustard Yellow Georgette Anarkali', 'Anarkali', 'Women', 1199.00, 1899.00, 2399.00, 22000.00, 1500.00, 'Mustard Yellow', 'Pure Georgette Gotapatti', 4.90);

INSERT INTO inventory_units (unit_id, product_id, size, sku, current_status, warehouse_location, total_times_rented) VALUES
('inv-001', 'prod-01', 'M', 'SR-LHN-01-M', 'Available', 'Mumbai-Hub-Rack-A4', 4),
('inv-002', 'prod-01', 'L', 'SR-LHN-01-L', 'Rented', 'Transit-Delhivery', 6),
('inv-003', 'prod-02', 'L', 'SR-SHW-02-L', 'Cleaning', 'DryClean-Zone2', 5),
('inv-004', 'prod-05', 'Free Size', 'SR-SAR-05-FS', 'Available', 'Bengaluru-Hub-Bay-C1', 3);

INSERT INTO orders (order_id, order_number, user_id, rental_subtotal, security_deposit_total, backup_options_total, damage_protection_total, grand_total, payment_method, payment_status, order_status, return_bag_tracking) VALUES
('ord-801', 'SR-10842', 'usr-1001', 1999.00, 2500.00, 399.00, 299.00, 5197.00, 'UPI', 'Paid', 'Delivered', 'DELHIVERY-RT-981023'),
('ord-802', 'SR-10855', 'usr-1002', 1499.00, 2000.00, 0.00, 299.00, 3798.00, 'UPI', 'Paid', 'Preparing', 'DELHIVERY-RT-981045');

INSERT INTO order_items (item_id, order_id, product_id, selected_size, duration_type, start_date, delivery_date, return_date, fitting_option, backup_size_selected, has_damage_protection) VALUES
('item-901', 'ord-801', 'prod-01', 'M', '3_days', '2026-10-25', '2026-10-24', '2026-10-28', 'custom', 'L', TRUE),
('item-902', 'ord-802', 'prod-02', 'L', '3_days', '2026-10-28', '2026-10-27', '2026-10-31', 'standard', NULL, TRUE);

INSERT INTO operational_buffers (buffer_id, product_id, order_id, event_start_date, event_end_date, buffer_block_start, buffer_block_end, buffer_reason) VALUES
('buf-101', 'prod-01', 'ord-801', '2026-10-25', '2026-10-27', '2026-10-23', '2026-10-29', 'Dry cleaning, steam press & reverse QC transit buffer'),
('buf-102', 'prod-02', 'ord-802', '2026-10-28', '2026-10-31', '2026-10-26', '2026-11-02', 'Microbial sanitization and logistics buffer');

INSERT INTO reviews (review_id, product_id, customer_name, customer_city, rating, height, body_type, size_purchased, fit_feedback, comment) VALUES
('rev-01', 'prod-01', 'Ananya Sharma', 'Mumbai', 5, '5''5"', 'Hourglass', 'M', 'Runs True to Size', 'Rented for my brother''s sangeet. The M fit like a dream! Everyone thought I bought it from a luxury boutique.'),
('rev-02', 'prod-02', 'Rohan Mehra', 'Delhi NCR', 5, '5''11"', 'Athletic', 'L', 'Runs True to Size', 'Wore this royal maroon sherwani for my sister''s wedding. Seamless return and deposit was refunded next day.');
