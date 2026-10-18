# Style-Rent: Online Designer Clothing & Ethnic Wear Rental Platform
**College Project: Full-Stack Web Development & Relational Database Engineering**

Style-Rent is an online ethnic & modern clothing rental web platform where users can discover, select, rent, and return authentic designer outfits for weddings, sangeet, haldi, parties, college farewells, festivals, and corporate galas across Indian metro cities.

---

## 🌟 Key Features

1. **Complete Rental Customer Journey**:
   - `Browse` ➔ `Select Outfit` ➔ `Select Size / Custom Sizing` ➔ `Check Availability` ➔ `Select Dates (3, 7, 10 Days)` ➔ `Add Options (Backup Size / Protection)` ➔ `Checkout` ➔ `Order Confirmation` ➔ `Return Pickup`
2. **Smart Operational Buffer (Rental Calendar)**:
   - When an outfit is booked, the system automatically locks an operational buffer of **2–3 days before** (for dry cleaning, pressing, and dispatch transit) and **2–3 days after** (for return transit, microbial disinfection, and QC inspection) to prevent double-booking.
   - Visually indicates available, booked, and buffer days on an interactive calendar.
3. **Size & Fitting Options**:
   - Standard Sizing (XS to XXL) with Size Chart guide.
   - Custom Measurements input (Chest, Waist, Hips, Shoulder, Sleeve, Outfit Length in inches).
   - "Doorstep Tailor Visit" option (available in Mumbai, Bengaluru, Delhi NCR, Pune, Hyderabad, Thane).
   - "Unstitched Margins" option for local alteration.
4. **"Worried About the Fit?" (Backup Options)**:
   - Add a **Backup Size for ₹399** (receive a 2nd size in the same package).
   - Add a **Backup Outfit** (refundable reservation).
5. **Peace of Mind Damage Protection (₹299)**:
   - Covers eligible accidental wear like minor stains, loose buttons, and zipper snags without security deposit deductions.
6. **Realistic Indian Checkout UI**:
   - Delivery address with Indian city selector.
   - **Academic Mock Identity Verification**: Aadhaar or PAN mock verification with masked ID formatting.
   - **Indian Payment Options**: UPI (PhonePe, Google Pay, Paytm, UPI ID), Cards, Net Banking, and Pay on Delivery.
7. **Order Tracking & Reusable Return Bag**:
   - Order tracking with a 7-step timeline.
   - Highlight of the **Reusable Return Bag**: customers receive a pre-labeled, waterproof bag—no cleaning or packing hassle required.
8. **Admin / Staff Operations Hub**:
   - Manage active rental orders and update fulfillment statuses.
   - Real-time Garment Inventory tracking by SKU (Available, Rented, In Cleaning, In Maintenance).
   - **Return Inspection Simulator**: staff can mark condition (Good, Minor, Major), upload damage photos, calculate damage deductions, and process automated security deposit refunds to customer UPI.
9. **Relational Database & SQL Studio**:
   - Live Entity-Relationship (ER) Schema visualizer.
   - Searchable table explorer (`users`, `products`, `inventory_units`, `orders`, `order_items`, `operational_buffers`, `damage_inspections`).
   - Downloadable SQL DDL script (`public/style_rent_schema.sql`) and JSON store (`public/style_rent_db.json`).
10. **Hygiene & Safety Assurance**:
    - 4-stage medical-grade sanitization: Hospital-grade UV-C chamber sterilization, eco hydrocarbon dry cleaning, 100°C steam ironing, and sealed zero-contact packaging.

---

## 💻 Technology Stack

- **Frontend**: React 19, TypeScript, Tailwind CSS v4, Lucide Icons
- **State Management**: React Hooks with `localStorage` persistence
- **Build Tool**: Vite 8
- **Database Architecture**: PostgreSQL / MySQL relational DDL schema with 3NF normalization

---

## 📁 Project Structure

```
├── public/
│   └── style_rent_schema.sql       # Standalone SQL schema & seed script for submission
├── src/
│   ├── components/
│   │   ├── Navbar.tsx              # Responsive navigation, search, wishlist & cart badges
│   │   ├── HeroSection.tsx         # Catchy rental branding & CTA buttons
│   │   ├── OccasionSelector.tsx    # Filter by Sangeet, Haldi, Wedding, Gala, etc.
│   │   ├── ShopView.tsx            # Filterable catalog (category, gender, size, price)
│   │   ├── ProductCard.tsx         # Product card with hover video teaser & hygiene badge
│   │   ├── ProductDetailsModal.tsx # Full product page: gallery, video, fitting, backup
│   │   ├── RentalDatePicker.tsx    # Calendar with 2-3 day operational buffer logic
│   │   ├── CartDrawer.tsx          # Rental bag with refundable deposit callouts
│   │   ├── CheckoutModal.tsx       # Address, mock Aadhaar/PAN verification & UPI checkout
│   │   ├── OrderConfirmationModal.tsx # Order ID, timeline & reusable return bag instructions
│   │   ├── OrdersTrackerView.tsx   # Live order tracking and return schedule
│   │   ├── AdminDashboardView.tsx  # Staff inventory management & return damage simulator
│   │   ├── DatabaseView.tsx        # Relational schema viewer, SQL DDL & JSON explorer
│   │   ├── HowItWorksSection.tsx   # 4-step user journey explanation
│   │   ├── HygieneSafetySection.tsx # Medical grade UV-C & dry cleaning protocol
│   │   ├── WishlistDrawer.tsx      # Saved outfits drawer
│   │   ├── ReviewModal.tsx         # Customer review & sizing fit feedback modal
│   │   └── Footer.tsx              # Project disclaimer, city coverage & quick links
│   ├── data/
│   │   ├── mockProducts.ts         # 16+ curated Indian rental garments
│   │   ├── mockReviews.ts          # Authentic reviews with body type & fit feedback
│   │   └── databaseSchema.ts       # Database table definitions & SQL DDL script
│   ├── types/
│   │   └── index.ts                # TypeScript models (Product, Order, Inventory, etc.)
│   ├── utils/
│   │   └── rentalCalculations.ts   # Buffer calculation, currency & pricing utilities
│   ├── App.tsx                     # Main application container & routing
│   ├── main.tsx                    # React entry point
│   └── index.css                   # Tailwind v4 imports & luxury font styling
├── metadata.json
├── package.json
└── tsconfig.json
```

---

## 🚀 Running the Project Locally

1. Clone or download the repository.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the local development server:
   ```bash
   npm run dev
   ```
4. Open your browser and navigate to `http://localhost:3000`.

---

## 🎓 Academic Project Notes for Viva / Evaluation

- **Why an Operational Buffer?** Rental platforms differ fundamentally from traditional e-commerce because items cycle repeatedly between customers. The `operational_buffers` table prevents double-booking during logistics transit and chemical dry cleaning.
- **Deposit & Damage Ledger**: The refundable security deposit model protects against loss without requiring upfront retail purchase prices.
- **Mock Fallbacks**: All third-party logistics, payment gateways (UPI), and Aadhaar KYC flows are cleanly simulated to run locally without external API keys or recurring charges.
