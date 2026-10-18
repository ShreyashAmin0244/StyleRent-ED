export interface DatabaseTableColumn {
  name: string;
  type: string;
  isPrimary?: boolean;
  isForeign?: boolean;
  references?: string;
  nullable: boolean;
  description: string;
}

export interface DatabaseTableDefinition {
  tableName: string;
  description: string;
  columns: DatabaseTableColumn[];
  sampleRows: Record<string, any>[];
}

export const STYLE_RENT_DATABASE_TABLES: DatabaseTableDefinition[] = [
  {
    tableName: 'users',
    description: 'Registered customers & rental patrons with identity verification state',
    columns: [
      { name: 'user_id', type: 'VARCHAR(36)', isPrimary: true, nullable: false, description: 'Unique user UUID' },
      { name: 'full_name', type: 'VARCHAR(100)', nullable: false, description: 'Customer full name' },
      { name: 'email', type: 'VARCHAR(150)', nullable: false, description: 'Email address' },
      { name: 'phone', type: 'VARCHAR(15)', nullable: false, description: '10-digit Indian phone number' },
      { name: 'city', type: 'VARCHAR(50)', nullable: false, description: 'Delivery city (e.g., Mumbai, Bengaluru, Delhi)' },
      { name: 'address_line', type: 'TEXT', nullable: false, description: 'Complete delivery address' },
      { name: 'pincode', type: 'VARCHAR(10)', nullable: false, description: 'Postal pincode' },
      { name: 'is_id_verified', type: 'BOOLEAN', nullable: false, description: 'Whether Aadhaar/PAN mock verified' },
      { name: 'id_document_type', type: 'VARCHAR(20)', nullable: true, description: 'Aadhaar or PAN' },
      { name: 'id_number_masked', type: 'VARCHAR(20)', nullable: true, description: 'Masked ID for privacy (e.g. XXXX-XXXX-4819)' },
      { name: 'created_at', type: 'TIMESTAMP', nullable: false, description: 'Account creation timestamp' }
    ],
    sampleRows: [
      {
        user_id: 'usr-1001',
        full_name: 'Ananya Sharma',
        email: 'ananya.sharma@example.com',
        phone: '+91 98201 44521',
        city: 'Mumbai',
        address_line: 'Flat 402, Sea Green Apts, Worli Sea Face',
        pincode: '400018',
        is_id_verified: true,
        id_document_type: 'Aadhaar',
        id_number_masked: 'XXXX-XXXX-4819',
        created_at: '2026-09-15 10:30:00'
      },
      {
        user_id: 'usr-1002',
        full_name: 'Rohan Mehra',
        email: 'rohan.mehra@example.com',
        phone: '+91 98112 33490',
        city: 'Delhi NCR',
        address_line: 'B-14, Greater Kailash 1',
        pincode: '110048',
        is_id_verified: true,
        id_document_type: 'PAN',
        id_number_masked: 'ABCDE7890F',
        created_at: '2026-10-01 14:15:00'
      },
      {
        user_id: 'usr-1003',
        full_name: 'Priya Iyer',
        email: 'priya.iyer@example.com',
        phone: '+91 97410 88722',
        city: 'Bengaluru',
        address_line: '45/2, 4th Cross, Indiranagar',
        pincode: '560038',
        is_id_verified: true,
        id_document_type: 'Aadhaar',
        id_number_masked: 'XXXX-XXXX-9021',
        created_at: '2026-10-04 11:20:00'
      }
    ]
  },
  {
    tableName: 'products',
    description: 'Designer outfits catalog with rental tier prices and security deposits',
    columns: [
      { name: 'product_id', type: 'VARCHAR(36)', isPrimary: true, nullable: false, description: 'Product unique identifier' },
      { name: 'name', type: 'VARCHAR(150)', nullable: false, description: 'Outfit title' },
      { name: 'category', type: 'VARCHAR(50)', nullable: false, description: 'Lehenga, Sherwani, Saree, Gown, Kurta, etc.' },
      { name: 'gender', type: 'VARCHAR(20)', nullable: false, description: 'Women, Men, Unisex' },
      { name: 'rental_price_3d', type: 'DECIMAL(10,2)', nullable: false, description: 'Rental price for 3-day duration' },
      { name: 'rental_price_7d', type: 'DECIMAL(10,2)', nullable: false, description: 'Rental price for 7-day duration' },
      { name: 'rental_price_10d', type: 'DECIMAL(10,2)', nullable: false, description: 'Rental price for 10-day duration' },
      { name: 'retail_price', type: 'DECIMAL(10,2)', nullable: false, description: 'Original retail/designer price' },
      { name: 'security_deposit', type: 'DECIMAL(10,2)', nullable: false, description: 'Refundable security deposit amount' },
      { name: 'color', type: 'VARCHAR(50)', nullable: false, description: 'Color palette' },
      { name: 'fabric', type: 'VARCHAR(100)', nullable: false, description: 'Material and weave details' },
      { name: 'rating', type: 'DECIMAL(3,2)', nullable: false, description: 'Average customer rating (out of 5.0)' },
      { name: 'total_orders_count', type: 'INT', nullable: false, description: 'Number of times ordered / rented' },
      { name: 'last_ordered_at', type: 'TIMESTAMP', nullable: true, description: 'Timestamp when this product was last booked' },
      { name: 'latest_order_id', type: 'VARCHAR(36)', nullable: true, description: 'ID of the most recent order' },
      { name: 'rental_availability_status', type: 'VARCHAR(30)', nullable: false, description: 'Available or Booked' },
      { name: 'created_at', type: 'TIMESTAMP', nullable: false, description: 'Added to catalog' }
    ],
    sampleRows: [
      {
        product_id: 'prod-01',
        name: 'Emerald Green Designer Zardozi Lehenga',
        category: 'Lehenga',
        gender: 'Women',
        rental_price_3d: 1999.00,
        rental_price_7d: 3299.00,
        rental_price_10d: 4199.00,
        retail_price: 42000.00,
        security_deposit: 2500.00,
        color: 'Emerald Green',
        fabric: 'Pure Velvet & Net',
        rating: 4.9,
        total_orders_count: 5,
        last_ordered_at: '2026-10-10 14:30:00',
        latest_order_id: 'SR-10842',
        rental_availability_status: 'Booked (Buffer Active)',
        created_at: '2026-08-01 09:00:00'
      },
      {
        product_id: 'prod-02',
        name: 'Royal Maroon Embroidered Silk Sherwani',
        category: 'Sherwani',
        gender: 'Men',
        rental_price_3d: 1499.00,
        rental_price_7d: 2499.00,
        rental_price_10d: 3199.00,
        retail_price: 38000.00,
        security_deposit: 2000.00,
        color: 'Deep Maroon',
        fabric: 'Matka Silk with Jacquard',
        rating: 4.8,
        total_orders_count: 3,
        last_ordered_at: '2026-10-15 18:15:00',
        latest_order_id: 'SR-10855',
        rental_availability_status: 'Available',
        created_at: '2026-08-01 09:30:00'
      },
      {
        product_id: 'prod-05',
        name: 'Crimson Banarasi Katan Silk Heritage Saree',
        category: 'Saree',
        gender: 'Women',
        rental_price_3d: 1299.00,
        rental_price_7d: 2099.00,
        rental_price_10d: 2699.00,
        retail_price: 28000.00,
        security_deposit: 1500.00,
        color: 'Crimson Red & Gold',
        fabric: 'Pure Katan Silk',
        rating: 4.9,
        total_orders_count: 2,
        last_ordered_at: '2026-09-28 11:20:00',
        latest_order_id: 'SR-10790',
        rental_availability_status: 'Available',
        created_at: '2026-08-05 14:00:00'
      }
    ]
  },
  {
    tableName: 'inventory_units',
    description: 'Physical inventory garments tracked by SKU, size, and hygiene state',
    columns: [
      { name: 'unit_id', type: 'VARCHAR(36)', isPrimary: true, nullable: false, description: 'Individual garment barcode ID' },
      { name: 'product_id', type: 'VARCHAR(36)', isForeign: true, references: 'products(product_id)', nullable: false, description: 'Catalog product link' },
      { name: 'size', type: 'VARCHAR(10)', nullable: false, description: 'XS, S, M, L, XL, XXL' },
      { name: 'sku', type: 'VARCHAR(30)', nullable: false, description: 'Warehouse barcode SKU' },
      { name: 'current_status', type: 'VARCHAR(30)', nullable: false, description: 'Available, Rented, Cleaning, Maintenance' },
      { name: 'warehouse_location', type: 'VARCHAR(50)', nullable: false, description: 'Hub storage bay' },
      { name: 'total_times_rented', type: 'INT', nullable: false, description: 'Rental wear count' },
      { name: 'last_sanitized_at', type: 'TIMESTAMP', nullable: false, description: 'Last ozone/dry clean timestamp' }
    ],
    sampleRows: [
      {
        unit_id: 'inv-001',
        product_id: 'prod-01',
        size: 'M',
        sku: 'SR-LHN-01-M',
        current_status: 'Available',
        warehouse_location: 'Mumbai-Hub-Rack-A4',
        total_times_rented: 4,
        last_sanitized_at: '2026-10-16 11:00:00'
      },
      {
        unit_id: 'inv-002',
        product_id: 'prod-01',
        size: 'L',
        sku: 'SR-LHN-01-L',
        current_status: 'Rented',
        warehouse_location: 'Transit-Delhivery',
        total_times_rented: 6,
        last_sanitized_at: '2026-10-14 09:30:00'
      },
      {
        unit_id: 'inv-003',
        product_id: 'prod-02',
        size: 'L',
        sku: 'SR-SHW-02-L',
        current_status: 'Cleaning',
        warehouse_location: 'DryClean-Facility-Zone2',
        total_times_rented: 5,
        last_sanitized_at: '2026-10-17 16:45:00'
      }
    ]
  },
  {
    tableName: 'orders',
    description: 'Customer bookings, rental agreements, payment records and status tracking',
    columns: [
      { name: 'order_id', type: 'VARCHAR(36)', isPrimary: true, nullable: false, description: 'Primary order UUID' },
      { name: 'order_number', type: 'VARCHAR(20)', nullable: false, description: 'Display reference (e.g. SR-10842)' },
      { name: 'user_id', type: 'VARCHAR(36)', isForeign: true, references: 'users(user_id)', nullable: false, description: 'Customer reference' },
      { name: 'rental_subtotal', type: 'DECIMAL(10,2)', nullable: false, description: 'Rental fees sum' },
      { name: 'security_deposit_total', type: 'DECIMAL(10,2)', nullable: false, description: 'Refundable deposits held' },
      { name: 'backup_options_total', type: 'DECIMAL(10,2)', nullable: false, description: 'Backup size/outfit charge' },
      { name: 'damage_protection_total', type: 'DECIMAL(10,2)', nullable: false, description: 'Peace of mind damage protection' },
      { name: 'grand_total', type: 'DECIMAL(10,2)', nullable: false, description: 'Total amount paid' },
      { name: 'payment_method', type: 'VARCHAR(30)', nullable: false, description: 'UPI, Card, NetBanking, COD' },
      { name: 'payment_status', type: 'VARCHAR(20)', nullable: false, description: 'Paid, Refunded' },
      { name: 'order_status', type: 'VARCHAR(30)', nullable: false, description: 'Confirmed, Preparing, Dispatched, Delivered, Returned, Refunded' },
      { name: 'return_bag_tracking', type: 'VARCHAR(50)', nullable: false, description: 'Reusable return parcel tracking' },
      { name: 'created_at', type: 'TIMESTAMP', nullable: false, description: 'Booking placement timestamp' }
    ],
    sampleRows: [
      {
        order_id: 'ord-801',
        order_number: 'SR-10842',
        user_id: 'usr-1001',
        rental_subtotal: 1999.00,
        security_deposit_total: 2500.00,
        backup_options_total: 399.00,
        damage_protection_total: 299.00,
        grand_total: 5197.00,
        payment_method: 'UPI',
        payment_status: 'Paid',
        order_status: 'Delivered',
        return_bag_tracking: 'DELHIVERY-RT-981023',
        created_at: '2026-10-10 18:24:10'
      },
      {
        order_id: 'ord-802',
        order_number: 'SR-10855',
        user_id: 'usr-1002',
        rental_subtotal: 1499.00,
        security_deposit_total: 2000.00,
        backup_options_total: 0.00,
        damage_protection_total: 299.00,
        grand_total: 3798.00,
        payment_method: 'UPI',
        payment_status: 'Paid',
        order_status: 'Preparing',
        return_bag_tracking: 'DELHIVERY-RT-981045',
        created_at: '2026-10-15 12:40:05'
      }
    ]
  },
  {
    tableName: 'order_items',
    description: 'Specific rented garments, duration, custom measurements, and backup choices',
    columns: [
      { name: 'item_id', type: 'VARCHAR(36)', isPrimary: true, nullable: false, description: 'Line item UUID' },
      { name: 'order_id', type: 'VARCHAR(36)', isForeign: true, references: 'orders(order_id)', nullable: false, description: 'Order reference' },
      { name: 'product_id', type: 'VARCHAR(36)', isForeign: true, references: 'products(product_id)', nullable: false, description: 'Rented product' },
      { name: 'selected_size', type: 'VARCHAR(10)', nullable: false, description: 'Primary size' },
      { name: 'duration_type', type: 'VARCHAR(20)', nullable: false, description: '3_days, 7_days, 10_days' },
      { name: 'start_date', type: 'DATE', nullable: false, description: 'Event start date' },
      { name: 'delivery_date', type: 'DATE', nullable: false, description: 'Target arrival (1 day before)' },
      { name: 'return_date', type: 'DATE', nullable: false, description: 'Pickup date' },
      { name: 'fitting_option', type: 'VARCHAR(40)', nullable: false, description: 'Standard, Custom, Tailor Visit, Unstitched' },
      { name: 'backup_size_selected', type: 'VARCHAR(10)', nullable: true, description: 'Secondary backup size' },
      { name: 'has_damage_protection', type: 'BOOLEAN', nullable: false, description: 'Covers minor stains/zipper repair' }
    ],
    sampleRows: [
      {
        item_id: 'item-901',
        order_id: 'ord-801',
        product_id: 'prod-01',
        selected_size: 'M',
        duration_type: '3_days',
        start_date: '2026-10-25',
        delivery_date: '2026-10-24',
        return_date: '2026-10-28',
        fitting_option: 'custom',
        backup_size_selected: 'L',
        has_damage_protection: true
      },
      {
        item_id: 'item-902',
        order_id: 'ord-802',
        product_id: 'prod-02',
        selected_size: 'L',
        duration_type: '3_days',
        start_date: '2026-10-28',
        delivery_date: '2026-10-27',
        return_date: '2026-10-31',
        fitting_option: 'standard',
        backup_size_selected: null,
        has_damage_protection: true
      }
    ]
  },
  {
    tableName: 'operational_buffers',
    description: 'Smart calendar blocks: 2-3 days prep/cleaning before and after bookings',
    columns: [
      { name: 'buffer_id', type: 'VARCHAR(36)', isPrimary: true, nullable: false, description: 'Unique buffer block' },
      { name: 'product_id', type: 'VARCHAR(36)', isForeign: true, references: 'products(product_id)', nullable: false, description: 'Product blocked' },
      { name: 'order_id', type: 'VARCHAR(36)', isForeign: true, references: 'orders(order_id)', nullable: false, description: 'Associated order' },
      { name: 'event_start_date', type: 'DATE', nullable: false, description: 'Customer rental start' },
      { name: 'event_end_date', type: 'DATE', nullable: false, description: 'Customer rental end' },
      { name: 'buffer_block_start', type: 'DATE', nullable: false, description: 'Blocked from (2 days prior for dry-clean & dispatch)' },
      { name: 'buffer_block_end', type: 'DATE', nullable: false, description: 'Blocked until (2 days post-return for sanitization & QC)' },
      { name: 'buffer_reason', type: 'VARCHAR(100)', nullable: false, description: 'Dry cleaning, UV-C sterilization, reverse transit' }
    ],
    sampleRows: [
      {
        buffer_id: 'buf-101',
        product_id: 'prod-01',
        order_id: 'ord-801',
        event_start_date: '2026-10-25',
        event_end_date: '2026-10-27',
        buffer_block_start: '2026-10-23',
        buffer_block_end: '2026-10-29',
        buffer_reason: 'Pre-dispatch steam ironing & post-event dry cleaning'
      },
      {
        buffer_id: 'buf-102',
        product_id: 'prod-02',
        order_id: 'ord-802',
        event_start_date: '2026-10-28',
        event_end_date: '2026-10-31',
        buffer_block_start: '2026-10-26',
        buffer_block_end: '2026-11-02',
        buffer_reason: 'Antimicrobial sanitization and quality check'
      }
    ]
  },
  {
    tableName: 'damage_inspections',
    description: 'Post-return warehouse quality inspection, damage deductions, and deposit refunds',
    columns: [
      { name: 'inspection_id', type: 'VARCHAR(36)', isPrimary: true, nullable: false, description: 'Inspection report UUID' },
      { name: 'order_id', type: 'VARCHAR(36)', isForeign: true, references: 'orders(order_id)', nullable: false, description: 'Associated order' },
      { name: 'unit_id', type: 'VARCHAR(36)', isForeign: true, references: 'inventory_units(unit_id)', nullable: false, description: 'Physical garment inspected' },
      { name: 'return_condition', type: 'VARCHAR(20)', nullable: false, description: 'good, minor, major' },
      { name: 'damage_type', type: 'VARCHAR(100)', nullable: true, description: 'Wine stain, broken hook, torn seam, None' },
      { name: 'damage_charge', type: 'DECIMAL(10,2)', nullable: false, description: 'Assessed damage charge (₹0 if covered)' },
      { name: 'original_deposit', type: 'DECIMAL(10,2)', nullable: false, description: 'Held security deposit' },
      { name: 'refund_amount', type: 'DECIMAL(10,2)', nullable: false, description: 'Amount refunded to customer bank/UPI' },
      { name: 'staff_inspector', type: 'VARCHAR(100)', nullable: false, description: 'Staff member who audited return' },
      { name: 'inspected_at', type: 'TIMESTAMP', nullable: false, description: 'Timestamp of warehouse intake' }
    ],
    sampleRows: [
      {
        inspection_id: 'insp-401',
        order_id: 'ord-801',
        unit_id: 'inv-001',
        return_condition: 'good',
        damage_type: 'No damage detected - pristine condition',
        damage_charge: 0.00,
        original_deposit: 2500.00,
        refund_amount: 2500.00,
        staff_inspector: 'Karan Verma (Quality Lead)',
        inspected_at: '2026-10-18 10:15:00'
      }
    ]
  }
];

export const SQL_SCHEMA_DDL = `-- ====================================================================
-- STYLE-RENT: ONLINE ETHNIC & FORMAL CLOTHING RENTAL PLATFORM
-- DATABASE SCHEMA DEFINITION & SEED DATA (PostgreSQL / MySQL Compatible)
-- College Project: Web Development & Relational Database Design
-- ====================================================================

-- 1. USERS & PATRONS TABLE
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

-- 2. PRODUCTS CATALOG TABLE
CREATE TABLE products (
    product_id VARCHAR(36) PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    category VARCHAR(50) NOT NULL, -- 'Lehenga', 'Sherwani', 'Saree', etc.
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

-- 3. INVENTORY UNITS TABLE (Garment instances & Hygiene State)
CREATE TABLE inventory_units (
    unit_id VARCHAR(36) PRIMARY KEY,
    product_id VARCHAR(36) NOT NULL REFERENCES products(product_id) ON DELETE CASCADE,
    size VARCHAR(10) NOT NULL, -- 'XS', 'S', 'M', 'L', 'XL', 'XXL'
    sku VARCHAR(30) UNIQUE NOT NULL,
    current_status VARCHAR(30) DEFAULT 'Available', -- 'Available', 'Rented', 'Cleaning', 'Maintenance'
    warehouse_location VARCHAR(50) NOT NULL,
    total_times_rented INT DEFAULT 0,
    last_sanitized_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 4. ORDERS & RENTAL AGREEMENTS TABLE
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
    order_status VARCHAR(30) DEFAULT 'Confirmed', -- 'Confirmed', 'Preparing', 'Dispatched', 'Delivered', 'Returned', 'Refunded'
    return_bag_tracking VARCHAR(50) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 5. ORDER ITEMS & CUSTOM SIZING
CREATE TABLE order_items (
    item_id VARCHAR(36) PRIMARY KEY,
    order_id VARCHAR(36) NOT NULL REFERENCES orders(order_id) ON DELETE CASCADE,
    product_id VARCHAR(36) NOT NULL REFERENCES products(product_id),
    selected_size VARCHAR(10) NOT NULL,
    duration_type VARCHAR(20) NOT NULL, -- '3_days', '7_days', '10_days'
    start_date DATE NOT NULL,
    delivery_date DATE NOT NULL,
    return_date DATE NOT NULL,
    fitting_option VARCHAR(40) NOT NULL, -- 'standard', 'custom', 'tailor_visit', 'unstitched_margins'
    backup_size_selected VARCHAR(10),
    has_damage_protection BOOLEAN DEFAULT TRUE
);

-- 6. SMART OPERATIONAL BUFFERS TABLE (2-3 days before & after)
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

-- 7. RETURN INSPECTION & DEPOSIT REFUND TABLE
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

-- SAMPLE SEED DATA
INSERT INTO users VALUES ('usr-1001', 'Ananya Sharma', 'ananya.sharma@example.com', '+91 98201 44521', 'Mumbai', 'Flat 402, Sea Green Apts, Worli', '400018', TRUE, 'Aadhaar', 'XXXX-XXXX-4819', NOW());
INSERT INTO users VALUES ('usr-1002', 'Rohan Mehra', 'rohan.mehra@example.com', '+91 98112 33490', 'Delhi NCR', 'B-14, Greater Kailash 1', '110048', TRUE, 'PAN', 'ABCDE7890F', NOW());

INSERT INTO products VALUES ('prod-01', 'Emerald Green Designer Zardozi Lehenga', 'Lehenga', 'Women', 1999.00, 3299.00, 4199.00, 42000.00, 2500.00, 'Emerald Green', 'Pure Velvet & Net', 4.90, NOW());
INSERT INTO products VALUES ('prod-02', 'Royal Maroon Embroidered Silk Sherwani', 'Sherwani', 'Men', 1499.00, 2499.00, 3199.00, 38000.00, 2000.00, 'Deep Maroon', 'Matka Silk', 4.80, NOW());
`;
