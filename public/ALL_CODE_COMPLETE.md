# STYLE-RENT: COMPLETE SOURCE CODE BUNDLE
# College Project: Online Clothing Rental Platform & Relational Database

================================================================================
FILE: /package.json
================================================================================

```json
{
  "name": "react-example",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite --port=3000 --host=0.0.0.0",
    "build": "vite build",
    "preview": "vite preview",
    "clean": "rm -rf dist server.js",
    "lint": "tsc --noEmit"
  },
  "dependencies": {
    "@google/genai": "^2.4.0",
    "@tailwindcss/vite": "^4.3.3",
    "@vitejs/plugin-react": "^6.1.1",
    "lucide-react": "^0.546.0",
    "react": "^19.0.1",
    "react-dom": "^19.0.1",
    "vite": "^8.3.0",
    "express": "^4.21.2",
    "dotenv": "^17.2.3",
    "motion": "^12.23.24"
  },
  "devDependencies": {
    "@types/node": "^22.14.0",
    "@types/react": "^19.3.0",
    "@types/react-dom": "^19.3.0",
    "autoprefixer": "^10.4.21",
    "esbuild": "^0.25.0",
    "tailwindcss": "^4.3.3",
    "tsx": "^4.21.0",
    "typescript": "^7.0.2",
    "@types/express": "^4.17.21"
  }
}

```


================================================================================
FILE: /index.html
================================================================================

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Style-Rent - Online Clothing & Ethnic Rental Platform</title>
    <meta name="description" content="A modern Indian clothing rental web platform for weddings, parties, and college events featuring smart availability calendars, operational buffers, backup sizing, and return logistics." />
    <meta property="og:title" content="Style-Rent - Online Clothing & Ethnic Rental Platform" />
    <meta property="og:description" content="A modern Indian clothing rental web platform for weddings, parties, and college events featuring smart availability calendars, operational buffers, backup sizing, and return logistics." />
    <meta property="og:type" content="website" />
    <meta name="twitter:card" content="summary_large_image" />
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,400&family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400;1,600&display=swap" rel="stylesheet">
  </head>
  <body class="bg-[#FAF7F2] text-stone-800 antialiased selection:bg-rose-900 selection:text-white">
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>


```


================================================================================
FILE: /vite.config.ts
================================================================================

```typescript
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});

```


================================================================================
FILE: /tsconfig.json
================================================================================

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "experimentalDecorators": true,
    "useDefineForClassFields": false,
    "module": "ESNext",
    "types": ["vite/client"],
    "lib": [
      "ES2022",
      "DOM",
      "DOM.Iterable"
    ],
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "isolatedModules": true,
    "moduleDetection": "force",
    "allowJs": true,
    "jsx": "react-jsx",
    "paths": {
      "@/*": [
        "./*"
      ]
    },
    "allowImportingTsExtensions": true,
    "noEmit": true
  }
}

```


================================================================================
FILE: /src/index.css
================================================================================

```css
@import "tailwindcss";

@layer base {
  body {
    font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  }
  h1, h2, h3, .font-serif {
    font-family: 'Playfair Display', Georgia, serif;
  }
}

/* Custom scrollbar */
::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}
::-webkit-scrollbar-track {
  background: #f1ede6;
}
::-webkit-scrollbar-thumb {
  background: #c5a059;
  border-radius: 4px;
}
::-webkit-scrollbar-thumb:hover {
  background: #8e1c38;
}

```


================================================================================
FILE: /src/main.tsx
================================================================================

```typescript
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(<App />);

```


================================================================================
FILE: /src/types/index.ts
================================================================================

```typescript
export type RentalDuration = '3_days' | '7_days' | '10_days';

export type CategoryType = 
  | 'Lehenga'
  | 'Sherwani'
  | 'Saree'
  | 'Gown'
  | 'Anarkali'
  | 'Kurta Set'
  | 'Indo-Western'
  | 'Blazer & Tuxedo'
  | 'Accessories';

export type GenderType = 'Women' | 'Men' | 'Unisex';

export type OccasionType = 
  | 'Sangeet'
  | 'Haldi'
  | 'Wedding'
  | 'Cocktail Party'
  | 'Pre-Wedding Shoot'
  | 'College Function'
  | 'Corporate Gala'
  | 'Festivities';

export type FittingOptionType = 
  | 'standard'
  | 'custom'
  | 'tailor_visit'
  | 'unstitched_margins';

export type BackupOptionType = 'none' | 'backup_size' | 'backup_outfit';

export interface BookingInterval {
  startDate: string; // YYYY-MM-DD
  endDate: string; // YYYY-MM-DD
  bufferStart: string; // YYYY-MM-DD (2 days before)
  bufferEnd: string; // YYYY-MM-DD (2 days after)
  orderId?: string;
}

export interface ReviewItem {
  id: string;
  productId: string;
  customerName: string;
  customerCity: string;
  rating: number;
  reviewDate: string;
  comment: string;
  height: string;
  bodyType: string;
  sizePurchased: string;
  fitFeedback: 'Runs True to Size' | 'Slightly Snug' | 'Loose Fit' | 'Perfect Custom Fit';
  occasionWorn: OccasionType;
  verifiedRental: boolean;
  photoUrl?: string;
}

export interface Product {
  id: string;
  name: string;
  category: CategoryType;
  gender: GenderType;
  rentalPrice3Days: number;
  rentalPrice7Days: number;
  rentalPrice10Days: number;
  retailPrice: number;
  securityDeposit: number;
  sizes: string[];
  color: string;
  fabric: string;
  occasions: OccasionType[];
  description: string;
  careInfo: string[];
  images: string[];
  videoPreviewUrl: string;
  rating: number;
  reviewCount: number;
  hygieneBadges: string[];
  isFeatured?: boolean;
  isPopular?: boolean;
  existingBookings: BookingInterval[];
}

export interface CustomMeasurements {
  chest: string;
  waist: string;
  hip: string;
  shoulder: string;
  sleeveLength: string;
  outfitLength: string;
  notes?: string;
}

export interface CartItem {
  cartItemId: string;
  product: Product;
  selectedSize: string;
  rentalDuration: RentalDuration;
  rentalDays: number;
  startDate: string; // YYYY-MM-DD
  deliveryDate: string; // YYYY-MM-DD
  returnDate: string; // YYYY-MM-DD
  rentalFee: number;
  securityDeposit: number;
  fittingOption: FittingOptionType;
  customMeasurements?: CustomMeasurements;
  backupOption: BackupOptionType;
  backupSize?: string;
  backupPrice: number;
  damageProtection: boolean;
  damageProtectionPrice: number;
}

export interface OrderCustomerDetails {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  pincode: string;
}

export type OrderStatus = 
  | 'Confirmed'
  | 'Preparing'
  | 'Dispatched'
  | 'Delivered'
  | 'Return Scheduled'
  | 'Returned'
  | 'Inspected & Refunded';

export interface OrderTimelineEvent {
  status: OrderStatus;
  label: string;
  timestamp: string;
  description: string;
  completed: boolean;
  current: boolean;
}

export interface Order {
  id: string;
  orderNumber: string;
  createdAt: string;
  customer: OrderCustomerDetails;
  items: CartItem[];
  identityVerification: {
    type: 'Aadhaar' | 'PAN';
    idNumberMasked: string;
    verified: boolean;
    verificationDate: string;
  };
  payment: {
    method: 'UPI' | 'Card' | 'NetBanking' | 'COD';
    upiProvider?: 'PhonePe' | 'GooglePay' | 'Paytm' | 'Other';
    transactionId: string;
    status: 'Paid' | 'Pending';
  };
  pricing: {
    rentalSubtotal: number;
    securityDepositTotal: number;
    backupOptionsTotal: number;
    damageProtectionTotal: number;
    deliveryFee: number;
    grandTotal: number;
  };
  orderStatus: OrderStatus;
  timeline: OrderTimelineEvent[];
  returnBagTracking: string;
  returnBagTrackingNumber?: string;
}

export interface InventoryItem {
  id: string;
  productId: string;
  productName: string;
  category: CategoryType;
  size: string;
  sku: string;
  status: 'Available' | 'Rented' | 'Cleaning' | 'Maintenance';
  currentOrderId?: string;
  nextAvailableDate: string;
  location: string;
}

export interface ReturnInspection {
  id: string;
  orderId: string;
  orderNumber: string;
  productId: string;
  productName: string;
  customerName: string;
  returnCondition: 'good' | 'minor' | 'major';
  damageType?: string;
  damagePhotoUrl?: string;
  damageCharge: number;
  securityDeposit: number;
  refundAmount: number;
  notes: string;
  staffName: string;
  inspectedAt: string;
  isRefundProcessed: boolean;
}

```


================================================================================
FILE: /src/utils/rentalCalculations.ts
================================================================================

```typescript
import { BookingInterval, CartItem, Product, RentalDuration } from '../types';

/**
 * Format number into Indian Rupee format (e.g. ₹1,499)
 */
export function formatINR(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
}

/**
 * Format YYYY-MM-DD to human readable date (e.g. "24 Oct 2026")
 */
export function formatDate(dateString: string): string {
  if (!dateString) return '';
  const date = new Date(dateString + 'T00:00:00');
  return date.toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

/**
 * Add days to a given YYYY-MM-DD string
 */
export function addDays(dateStr: string, days: number): string {
  const d = new Date(dateStr + 'T00:00:00');
  d.setDate(d.getDate() + days);
  return d.toISOString().split('T')[0];
}

/**
 * Get rental duration in integer days
 */
export function getDurationDays(duration: RentalDuration): number {
  switch (duration) {
    case '3_days':
      return 3;
    case '7_days':
      return 7;
    case '10_days':
      return 10;
    default:
      return 3;
  }
}

/**
 * Calculate Return Date and Delivery Date based on Start Date and Duration
 * Delivery is scheduled 1 day before event
 * Return is 1 day after event ends
 */
export function calculateRentalDates(startDate: string, duration: RentalDuration) {
  const days = getDurationDays(duration);
  // Rental starts on startDate, runs for `days`
  // End date is startDate + (days - 1)
  const endDate = addDays(startDate, days - 1);
  const deliveryDate = addDays(startDate, -1);
  const returnPickupDate = addDays(endDate, 1);
  
  // Operational Buffer: 2 days before delivery for dry clean, press, QC & dispatch;
  // 2 days after return pickup for reverse logistics & microbial sanitization
  const bufferStart = addDays(deliveryDate, -2);
  const bufferEnd = addDays(returnPickupDate, 2);

  return {
    startDate,
    endDate,
    deliveryDate,
    returnPickupDate,
    bufferStart,
    bufferEnd,
  };
}

/**
 * Check if a date string (YYYY-MM-DD) falls within an interval [start, end] inclusive
 */
export function isDateWithin(dateStr: string, startStr: string, endStr: string): boolean {
  return dateStr >= startStr && dateStr <= endStr;
}

/**
 * Check if a specific date is unavailable for a product due to existing bookings or operational buffers
 */
export function isDateUnavailable(dateStr: string, existingBookings: BookingInterval[]): {
  unavailable: boolean;
  reason?: 'booked' | 'buffer';
  booking?: BookingInterval;
} {
  for (const b of existingBookings) {
    // Check if directly booked
    if (isDateWithin(dateStr, b.startDate, b.endDate)) {
      return { unavailable: true, reason: 'booked', booking: b };
    }
    // Check if within buffer
    if (isDateWithin(dateStr, b.bufferStart, b.bufferEnd)) {
      return { unavailable: true, reason: 'buffer', booking: b };
    }
  }
  return { unavailable: false };
}

/**
 * Check if a prospective rental period [start, end] conflicts with any booking interval or operational buffer
 */
export function checkIntervalAvailability(
  startDate: string,
  endDate: string,
  existingBookings: BookingInterval[]
): { isAvailable: boolean; conflictReason?: string } {
  // Operational buffer needed for new requested period
  const reqBufferStart = addDays(startDate, -3);
  const reqBufferEnd = addDays(endDate, 3);

  for (const b of existingBookings) {
    // Check overlap between [reqBufferStart, reqBufferEnd] and [b.bufferStart, b.bufferEnd]
    const hasOverlap = !(reqBufferEnd < b.bufferStart || reqBufferStart > b.bufferEnd);
    if (hasOverlap) {
      return {
        isAvailable: false,
        conflictReason: `Overlaps with another booking (${formatDate(b.startDate)} - ${formatDate(b.endDate)}) including hygiene buffer.`,
      };
    }
  }

  return { isAvailable: true };
}

/**
 * Calculate pricing for a product selection
 */
export function calculateItemPrice(
  product: Product,
  duration: RentalDuration,
  backupOption: 'none' | 'backup_size' | 'backup_outfit',
  damageProtection: boolean
) {
  let rentalFee = product.rentalPrice3Days;
  if (duration === '7_days') rentalFee = product.rentalPrice7Days;
  if (duration === '10_days') rentalFee = product.rentalPrice10Days;

  const securityDeposit = product.securityDeposit;
  const backupPrice = backupOption === 'backup_size' ? 399 : backupOption === 'backup_outfit' ? 899 : 0;
  const damageProtectionPrice = damageProtection ? 299 : 0;
  const itemTotal = rentalFee + securityDeposit + backupPrice + damageProtectionPrice;

  return {
    rentalFee,
    securityDeposit,
    backupPrice,
    damageProtectionPrice,
    itemTotal,
  };
}

/**
 * Calculate grand total for cart
 */
export function calculateCartTotals(items: CartItem[]) {
  const rentalSubtotal = items.reduce((acc, item) => acc + item.rentalFee, 0);
  const securityDepositTotal = items.reduce((acc, item) => acc + item.securityDeposit, 0);
  const backupOptionsTotal = items.reduce((acc, item) => acc + item.backupPrice, 0);
  const damageProtectionTotal = items.reduce((acc, item) => acc + item.damageProtectionPrice, 0);
  const deliveryFee = rentalSubtotal > 1500 ? 0 : 199; // Free delivery above 1500
  const grandTotal = rentalSubtotal + securityDepositTotal + backupOptionsTotal + damageProtectionTotal + deliveryFee;

  return {
    rentalSubtotal,
    securityDepositTotal,
    backupOptionsTotal,
    damageProtectionTotal,
    deliveryFee,
    grandTotal,
  };
}

```


================================================================================
FILE: /src/data/mockProducts.ts
================================================================================

```typescript
import { Product } from '../types';

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'prod-01',
    name: 'Emerald Green Designer Zardozi Lehenga',
    category: 'Lehenga',
    gender: 'Women',
    rentalPrice3Days: 1999,
    rentalPrice7Days: 3299,
    rentalPrice10Days: 4199,
    retailPrice: 42000,
    securityDeposit: 2500,
    sizes: ['S', 'M', 'L', 'XL'],
    color: 'Emerald Green & Antique Gold',
    fabric: 'Pure Velvet & Net with Raw Silk Lining',
    occasions: ['Sangeet', 'Wedding', 'Pre-Wedding Shoot'],
    description: 'Bespoke bridal emerald green velvet lehenga hand-embroidered with intricate antique dabka, zardozi and sequins work. Paired with a sweetheart neckline blouse and double dupattas.',
    careInfo: [
      'Professionally dry cleaned before every dispatch',
      'Do not wash at home or apply direct iron',
      'Delivered in anti-dust garment bag with velvet hanger',
      'Return inside the provided reusable waterproof bag'
    ],
    images: [
      'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?auto=format&fit=crop&w=1000&q=80'
    ],
    videoPreviewUrl: 'https://assets.mixkit.co/videos/preview/mixkit-indian-bride-dressed-in-traditional-costume-41680-large.mp4',
    rating: 4.9,
    reviewCount: 38,
    hygieneBadges: ['Hospital Grade UV-C Disinfection', 'Eco Dry Cleaned', 'Steam Sanitized at 100°C', 'Zero-Odor Guarantee'],
    isFeatured: true,
    isPopular: true,
    existingBookings: [
      {
        startDate: '2026-10-25',
        endDate: '2026-10-27',
        bufferStart: '2026-10-23',
        bufferEnd: '2026-10-29',
        orderId: 'SR-10842'
      },
      {
        startDate: '2026-11-12',
        endDate: '2026-11-15',
        bufferStart: '2026-11-10',
        bufferEnd: '2026-11-17',
        orderId: 'SR-10901'
      }
    ]
  },
  {
    id: 'prod-02',
    name: 'Royal Maroon Embroidered Silk Sherwani',
    category: 'Sherwani',
    gender: 'Men',
    rentalPrice3Days: 1499,
    rentalPrice7Days: 2499,
    rentalPrice10Days: 3199,
    retailPrice: 38000,
    securityDeposit: 2000,
    sizes: ['M', 'L', 'XL', 'XXL'],
    color: 'Deep Maroon with Muted Gold',
    fabric: 'Matka Silk with Jacquard Weaving',
    occasions: ['Wedding', 'Sangeet', 'Pre-Wedding Shoot'],
    description: 'Regal maroon silk sherwani tailored with structured shoulders, handcrafted crest buttons, and tonal thread embroidery. Accompanied by ivory churidar pants and a bordered organza stole.',
    careInfo: [
      'Microbially sanitized before every rental',
      'Steam ironed prior to packaging',
      'Includes collar sweat guard strips',
      'Return in the same garment carrier'
    ],
    images: [
      'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?auto=format&fit=crop&w=1000&q=80'
    ],
    videoPreviewUrl: 'https://assets.mixkit.co/videos/preview/mixkit-young-man-in-traditional-attire-dancing-celebrating-41777-large.mp4',
    rating: 4.8,
    reviewCount: 42,
    hygieneBadges: ['Microbially Disinfected', 'Industrial Steam Pressed', 'Tox-Free Ozone Cleaned'],
    isFeatured: true,
    isPopular: true,
    existingBookings: [
      {
        startDate: '2026-10-28',
        endDate: '2026-10-31',
        bufferStart: '2026-10-26',
        bufferEnd: '2026-11-02',
        orderId: 'SR-10855'
      }
    ]
  },
  {
    id: 'prod-03',
    name: 'Blush Pink Mirror Work Organza Lehenga',
    category: 'Lehenga',
    gender: 'Women',
    rentalPrice3Days: 1799,
    rentalPrice7Days: 2999,
    rentalPrice10Days: 3799,
    retailPrice: 35000,
    securityDeposit: 2200,
    sizes: ['XS', 'S', 'M', 'L'],
    color: 'Blush Rose Pink',
    fabric: 'Pure Silk Organza & Shimmer Crepe',
    occasions: ['Sangeet', 'Cocktail Party', 'College Function', 'Festivities'],
    description: 'Ethereal lightweight organza lehenga adorned with real mirror hand-work, thread scallops, and a contemporary backless blouse. Perfect for daytime sangeets or farewell fests.',
    careInfo: [
      'Delicate mirror check conducted pre-dispatch',
      'Sealed in moisture-proof zip sleeve',
      'Gentle steam ironed before shipment'
    ],
    images: [
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1566737236500-c8ac43014a67?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1000&q=80'
    ],
    videoPreviewUrl: 'https://assets.mixkit.co/videos/preview/mixkit-indian-bride-dressed-in-traditional-costume-41680-large.mp4',
    rating: 4.9,
    reviewCount: 29,
    hygieneBadges: ['Microbially Disinfected', 'Steam Ironed', 'Zero-Contact Packaging'],
    isFeatured: true,
    isPopular: false,
    existingBookings: []
  },
  {
    id: 'prod-04',
    name: 'Ivory Raw Silk Sherwani with Zari Stole',
    category: 'Sherwani',
    gender: 'Men',
    rentalPrice3Days: 1899,
    rentalPrice7Days: 3199,
    rentalPrice10Days: 3999,
    retailPrice: 48000,
    securityDeposit: 2500,
    sizes: ['S', 'M', 'L', 'XL'],
    color: 'Ivory Cream & Antique Gold',
    fabric: 'Pure Raw Silk with Cotton Silk Lining',
    occasions: ['Wedding', 'Pre-Wedding Shoot', 'Sangeet'],
    description: 'Timeless ivory groom sherwani crafted in heavy raw silk with tone-on-tone resham embroidery, pearl buttons, and a complementary royal zari dupatta.',
    careInfo: [
      'Ozone treated and 100°C steam pressed',
      'Extra buttons and safety pins provided in pouch',
      'Return inside the tamper-evident return bag'
    ],
    images: [
      'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?auto=format&fit=crop&w=1000&q=80'
    ],
    videoPreviewUrl: 'https://assets.mixkit.co/videos/preview/mixkit-young-man-in-traditional-attire-dancing-celebrating-41777-large.mp4',
    rating: 4.7,
    reviewCount: 31,
    hygieneBadges: ['UV-C Sterilized', 'Eco Dry Cleaned', 'Quality Inspected'],
    isFeatured: false,
    isPopular: true,
    existingBookings: [
      {
        startDate: '2026-11-05',
        endDate: '2026-11-08',
        bufferStart: '2026-11-03',
        bufferEnd: '2026-11-10',
        orderId: 'SR-10890'
      }
    ]
  },
  {
    id: 'prod-05',
    name: 'Crimson Banarasi Katan Silk Heritage Saree',
    category: 'Saree',
    gender: 'Women',
    rentalPrice3Days: 1299,
    rentalPrice7Days: 2099,
    rentalPrice10Days: 2699,
    retailPrice: 28000,
    securityDeposit: 1500,
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    color: 'Crimson Red with Kadwa Zari Weave',
    fabric: 'Pure Katan Silk with Gold Zari Pallu',
    occasions: ['Wedding', 'Festivities', 'Cocktail Party'],
    description: 'Authentic Banarasi handloom saree featuring intricate floral jaal motifs and heavy royal pallu. Comes with an unstitched or pre-stitched bustier blouse (specify in measurements).',
    careInfo: [
      'Handled with specialized silk dry cleaning agents',
      'Crease-free hanger packaging',
      'Includes matching petticoat slip upon request'
    ],
    images: [
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?auto=format&fit=crop&w=1000&q=80'
    ],
    videoPreviewUrl: 'https://assets.mixkit.co/videos/preview/mixkit-indian-bride-dressed-in-traditional-costume-41680-large.mp4',
    rating: 4.9,
    reviewCount: 45,
    hygieneBadges: ['Microbially Disinfected', 'Steam Ironed', 'Heritage Silk Certified'],
    isFeatured: true,
    isPopular: true,
    existingBookings: []
  },
  {
    id: 'prod-06',
    name: 'Champagne Gold Sequin Floor-Length Gown',
    category: 'Gown',
    gender: 'Women',
    rentalPrice3Days: 1699,
    rentalPrice7Days: 2799,
    rentalPrice10Days: 3499,
    retailPrice: 32000,
    securityDeposit: 2000,
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    color: 'Champagne Gold Shimmer',
    fabric: 'Georgette & Net with Micro Sequins',
    occasions: ['Cocktail Party', 'Corporate Gala', 'College Function', 'Pre-Wedding Shoot'],
    description: 'Glamorous red-carpet gown with micro champagne sequins, structured corsetry, built-in cups, and an elegant side trail for evening galas.',
    careInfo: [
      'Ozone disinfected to eliminate odor and microbes',
      'Individual sequin inspection prior to dispatch',
      'Delivered in long bridal hanging carrier'
    ],
    images: [
      'https://images.unsplash.com/photo-1566737236500-c8ac43014a67?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1000&q=80'
    ],
    videoPreviewUrl: 'https://assets.mixkit.co/videos/preview/mixkit-indian-bride-dressed-in-traditional-costume-41680-large.mp4',
    rating: 4.8,
    reviewCount: 24,
    hygieneBadges: ['Hospital Grade Disinfection', 'Steam Pressed', 'Zero-Contact Packaging'],
    isFeatured: false,
    isPopular: true,
    existingBookings: []
  },
  {
    id: 'prod-07',
    name: 'Midnight Black Velvet Bandhgala Jodhpuri Suit',
    category: 'Blazer & Tuxedo',
    gender: 'Men',
    rentalPrice3Days: 1599,
    rentalPrice7Days: 2599,
    rentalPrice10Days: 3299,
    retailPrice: 34000,
    securityDeposit: 2000,
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    color: 'Jet Black with Gunmetal Accents',
    fabric: 'Premium Italian Velvet & Satin Trims',
    occasions: ['Cocktail Party', 'Corporate Gala', 'Sangeet', 'College Function'],
    description: 'Impeccably tailored bandhgala suit crafted in deep midnight black velvet with metallic crest buttons and matching slim-fit trousers.',
    careInfo: [
      'Brushed and steam sanitized',
      'Packed with premium cedarwood sachet',
      'Return with supplied wooden hanger'
    ],
    images: [
      'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?auto=format&fit=crop&w=1000&q=80'
    ],
    videoPreviewUrl: 'https://assets.mixkit.co/videos/preview/mixkit-young-man-in-traditional-attire-dancing-celebrating-41777-large.mp4',
    rating: 4.8,
    reviewCount: 36,
    hygieneBadges: ['Microbially Disinfected', 'Steam Ironed', 'Tox-Free Cleaning'],
    isFeatured: true,
    isPopular: true,
    existingBookings: []
  },
  {
    id: 'prod-08',
    name: 'Sunshine Mustard Yellow Georgette Anarkali Set',
    category: 'Anarkali',
    gender: 'Women',
    rentalPrice3Days: 1199,
    rentalPrice7Days: 1899,
    rentalPrice10Days: 2399,
    retailPrice: 22000,
    securityDeposit: 1500,
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    color: 'Mustard Haldi Yellow',
    fabric: 'Flowing Pure Georgette with Gotapatti',
    occasions: ['Haldi', 'Festivities', 'College Function', 'Sangeet'],
    description: 'Bright and festive floor-touch 32-kali flared Anarkali embellished with traditional Rajasthani gotapatti borders and matching bandhani print dupatta.',
    careInfo: [
      'Sanitized specifically for dye preservation',
      'Pre-steamed ready to wear upon unpacking',
      'Haldi-proof stain repellent treatment applied'
    ],
    images: [
      'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1000&q=80'
    ],
    videoPreviewUrl: 'https://assets.mixkit.co/videos/preview/mixkit-indian-bride-dressed-in-traditional-costume-41680-large.mp4',
    rating: 4.9,
    reviewCount: 51,
    hygieneBadges: ['Eco Dry Cleaned', 'Stain Guard Coated', '100% Sanitized'],
    isFeatured: true,
    isPopular: true,
    existingBookings: [
      {
        startDate: '2026-10-24',
        endDate: '2026-10-26',
        bufferStart: '2026-10-22',
        bufferEnd: '2026-10-28',
        orderId: 'SR-10822'
      }
    ]
  },
  {
    id: 'prod-09',
    name: 'Emerald Green Asymmetric Draped Kurta Set',
    category: 'Kurta Set',
    gender: 'Men',
    rentalPrice3Days: 999,
    rentalPrice7Days: 1699,
    rentalPrice10Days: 2099,
    retailPrice: 19500,
    securityDeposit: 1200,
    sizes: ['S', 'M', 'L', 'XL'],
    color: 'Forest Emerald Green',
    fabric: 'Lustrous Silk Crepe with Churidar',
    occasions: ['Sangeet', 'Haldi', 'Festivities', 'College Function'],
    description: 'Modern asymmetric wrap kurta featuring tonal thread work along the collar and diagonal hemline, paired with stretch churidar pants.',
    careInfo: [
      'Antimicrobial dry wash',
      'Precision ironed collar',
      'Ready to wear packaging'
    ],
    images: [
      'https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=1000&q=80'
    ],
    videoPreviewUrl: 'https://assets.mixkit.co/videos/preview/mixkit-young-man-in-traditional-attire-dancing-celebrating-41777-large.mp4',
    rating: 4.7,
    reviewCount: 19,
    hygieneBadges: ['Microbially Disinfected', 'Steam Ironed', 'Zero-Contact Packaging'],
    isFeatured: false,
    isPopular: true,
    existingBookings: []
  },
  {
    id: 'prod-10',
    name: 'Sapphire Blue Indo-Western Slit Cape & Palazzo',
    category: 'Indo-Western',
    gender: 'Women',
    rentalPrice3Days: 1499,
    rentalPrice7Days: 2399,
    rentalPrice10Days: 2999,
    retailPrice: 27000,
    securityDeposit: 1800,
    sizes: ['S', 'M', 'L', 'XL'],
    color: 'Sapphire Royal Blue',
    fabric: 'Georgette Cape with Silk Crop Top & Palazzo',
    occasions: ['Cocktail Party', 'Sangeet', 'College Function', 'Corporate Gala'],
    description: 'Contemporary 3-piece indo-western ensemble with an embroidered sweetheart bustier, wide-leg satin palazzo, and a flowing sheer floor cape.',
    careInfo: [
      'Cleaned with eco-friendly organic solvents',
      'Packaged in breathable garment cover',
      'Return inside the prepaid reverse logistics bag'
    ],
    images: [
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1566737236500-c8ac43014a67?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1000&q=80'
    ],
    videoPreviewUrl: 'https://assets.mixkit.co/videos/preview/mixkit-indian-bride-dressed-in-traditional-costume-41680-large.mp4',
    rating: 4.8,
    reviewCount: 22,
    hygieneBadges: ['Microbially Disinfected', 'Steam Ironed', 'Quality Checked'],
    isFeatured: true,
    isPopular: false,
    existingBookings: []
  },
  {
    id: 'prod-11',
    name: 'Italian Charcoal Wool 3-Piece Peak Tuxedo',
    category: 'Blazer & Tuxedo',
    gender: 'Men',
    rentalPrice3Days: 1799,
    rentalPrice7Days: 2999,
    rentalPrice10Days: 3699,
    retailPrice: 44000,
    securityDeposit: 2500,
    sizes: ['38R (M)', '40R (L)', '42R (XL)', '44R (XXL)'],
    color: 'Charcoal Grey with Satin Lapels',
    fabric: 'Super 120s Italian Merino Wool Blend',
    occasions: ['Corporate Gala', 'Cocktail Party', 'Pre-Wedding Shoot', 'Wedding'],
    description: 'Distinguished 3-piece tuxedo comprising a single-button peak lapel jacket, double-breasted horseshoe waistcoat, and tailored flat-front trousers.',
    careInfo: [
      'Dry-cleaned by master suit technicians',
      'Comes with bow tie and mother-of-pearl cufflinks',
      'Steam pressed and contoured on molded hanger'
    ],
    images: [
      'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?auto=format&fit=crop&w=1000&q=80'
    ],
    videoPreviewUrl: 'https://assets.mixkit.co/videos/preview/mixkit-young-man-in-traditional-attire-dancing-celebrating-41777-large.mp4',
    rating: 4.9,
    reviewCount: 34,
    hygieneBadges: ['Disinfected', 'Steam Ironed', 'Cuff & Collar Protection'],
    isFeatured: false,
    isPopular: true,
    existingBookings: []
  },
  {
    id: 'prod-12',
    name: 'Mustard Silk Mirror-Embellished Bundi Jacket Set',
    category: 'Kurta Set',
    gender: 'Men',
    rentalPrice3Days: 1099,
    rentalPrice7Days: 1799,
    rentalPrice10Days: 2299,
    retailPrice: 21000,
    securityDeposit: 1400,
    sizes: ['S', 'M', 'L', 'XL'],
    color: 'Mustard & Off-White',
    fabric: 'Raw Silk Bundi with Cotton Silk Kurta Pajama',
    occasions: ['Haldi', 'Sangeet', 'Festivities', 'College Function'],
    description: 'Vibrant sleeveless Nehru jacket decorated with authentic mirror-work geometry, worn over a pristine ivory kurta and churidar.',
    careInfo: [
      'Disinfected after every event',
      'Tested for loose mirrors before dispatch',
      'Delivered in compact travel cover'
    ],
    images: [
      'https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1000&q=80'
    ],
    videoPreviewUrl: 'https://assets.mixkit.co/videos/preview/mixkit-young-man-in-traditional-attire-dancing-celebrating-41777-large.mp4',
    rating: 4.8,
    reviewCount: 28,
    hygieneBadges: ['Microbially Disinfected', 'Steam Ironed', 'Safe For Sensitive Skin'],
    isFeatured: false,
    isPopular: false,
    existingBookings: []
  },
  {
    id: 'prod-13',
    name: 'Pastel Lilac Ruffle Pre-Draped Saree',
    category: 'Saree',
    gender: 'Women',
    rentalPrice3Days: 1399,
    rentalPrice7Days: 2199,
    rentalPrice10Days: 2799,
    retailPrice: 24000,
    securityDeposit: 1500,
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    color: 'Pastel Lilac & Silver',
    fabric: 'Pleated Chiffon & Satin Lycra',
    occasions: ['Cocktail Party', 'College Function', 'Pre-Wedding Shoot', 'Sangeet'],
    description: 'Instant 1-minute pre-stitched cocktail saree with cascading tier ruffles, an embellished metallic belt, and a statement designer blouse.',
    careInfo: [
      'Pleat-locked steam ironing process',
      'Packaged without compression to retain flounces',
      'Disinfected prior to sealing'
    ],
    images: [
      'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1000&q=80'
    ],
    videoPreviewUrl: 'https://assets.mixkit.co/videos/preview/mixkit-indian-bride-dressed-in-traditional-costume-41680-large.mp4',
    rating: 4.9,
    reviewCount: 33,
    hygieneBadges: ['Microbially Disinfected', 'Steam Ironed', 'Ready-to-Wear Guaranteed'],
    isFeatured: true,
    isPopular: true,
    existingBookings: []
  },
  {
    id: 'prod-14',
    name: 'Royal Kundan & Polki Bridal Jewellery Choker Set',
    category: 'Accessories',
    gender: 'Women',
    rentalPrice3Days: 699,
    rentalPrice7Days: 1099,
    rentalPrice10Days: 1499,
    retailPrice: 18000,
    securityDeposit: 1000,
    sizes: ['Free Size'],
    color: 'Antique Gold & Pearl',
    fabric: '22K Gold Plated Brass, Kundan Stones, Green Emerald Beads',
    occasions: ['Wedding', 'Sangeet', 'Festivities'],
    description: 'Handcrafted royal Rajasthani bridal choker set with matching oversized jhumkas and a delicate maang tikka. Sanitized in UV ultrasonic baths.',
    careInfo: [
      'Ultrasonically disinfected & UV sterilized',
      'Store in provided velvet cushioned jewel box',
      'Keep away from sprays and perfumes'
    ],
    images: [
      'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1611591475155-42e929a2e261?auto=format&fit=crop&w=1000&q=80'
    ],
    videoPreviewUrl: '',
    rating: 4.8,
    reviewCount: 17,
    hygieneBadges: ['Ultrasonically Cleaned', 'UV-C Sterilized', 'Hypoallergenic Plating'],
    isFeatured: false,
    isPopular: false,
    existingBookings: []
  },
  {
    id: 'prod-15',
    name: 'Groom Embroidered Raw Silk Safa & Kalgi Brooch',
    category: 'Accessories',
    gender: 'Men',
    rentalPrice3Days: 599,
    rentalPrice7Days: 899,
    rentalPrice10Days: 1199,
    retailPrice: 12000,
    securityDeposit: 800,
    sizes: ['Free Size'],
    color: 'Blush Peach & Antique Gold',
    fabric: 'Chanderi Silk with Kundan Stone Kalgi',
    occasions: ['Wedding', 'Pre-Wedding Shoot'],
    description: 'Pre-tied traditional Rajasthani groom turban embellished with delicate gold borders, accompanied by an antique emerald and kundan kalgi feather brooch.',
    careInfo: [
      'Interior sweat-band sanitized with antibacterial mist',
      'Packed in hard-shell circular box to preserve shape',
      'Return inside the provided protective container'
    ],
    images: [
      'https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1000&q=80'
    ],
    videoPreviewUrl: '',
    rating: 4.7,
    reviewCount: 14,
    hygieneBadges: ['Antibacterial Fogged', 'UV-C Treated', 'Shape-Safe Packing'],
    isFeatured: false,
    isPopular: false,
    existingBookings: []
  },
  {
    id: 'prod-16',
    name: 'Navy Blue Contemporary Asymmetric Indo-Western Achkan',
    category: 'Indo-Western',
    gender: 'Men',
    rentalPrice3Days: 1699,
    rentalPrice7Days: 2699,
    rentalPrice10Days: 3399,
    retailPrice: 36000,
    securityDeposit: 2200,
    sizes: ['M', 'L', 'XL'],
    color: 'Midnight Navy Blue',
    fabric: 'Italian Poly-Viscose with Silk Flaps',
    occasions: ['Sangeet', 'Cocktail Party', 'Corporate Gala', 'Pre-Wedding Shoot'],
    description: 'Architectural silhouette achkan with side-button placket, contrast satin collar, and pleated hemline. Worn over slim tapered trousers.',
    careInfo: [
      'Disinfected and steam pressed',
      'Packed with anti-crease tissue inside sleeves',
      'Return in garment travel carrier'
    ],
    images: [
      'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?auto=format&fit=crop&w=1000&q=80'
    ],
    videoPreviewUrl: 'https://assets.mixkit.co/videos/preview/mixkit-young-man-in-traditional-attire-dancing-celebrating-41777-large.mp4',
    rating: 4.8,
    reviewCount: 27,
    hygieneBadges: ['Microbially Disinfected', 'Steam Ironed', 'Zero-Odor Cleaned'],
    isFeatured: true,
    isPopular: true,
    existingBookings: []
  }
];

```


================================================================================
FILE: /src/data/mockReviews.ts
================================================================================

```typescript
import { ReviewItem } from '../types';

export const INITIAL_REVIEWS: ReviewItem[] = [
  {
    id: 'rev-01',
    productId: 'prod-01',
    customerName: 'Ananya Sharma',
    customerCity: 'Mumbai',
    rating: 5,
    reviewDate: '12 Oct 2026',
    comment: 'Rented this emerald lehenga for my brother’s sangeet in Mumbai. I am 5\'5 and usually wear M. The M fit like a dream! Everyone thought I bought it from Sabyasachi. The dry clean quality was so fresh it smelled brand new.',
    height: '5\'5"',
    bodyType: 'Hourglass',
    sizePurchased: 'M',
    fitFeedback: 'Runs True to Size',
    occasionWorn: 'Sangeet',
    verifiedRental: true,
    photoUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'rev-02',
    productId: 'prod-01',
    customerName: 'Priya Iyer',
    customerCity: 'Bengaluru',
    rating: 5,
    reviewDate: '02 Oct 2026',
    comment: 'The velvet fabric is luxurious and heavy. Because I selected custom measurements, the blouse fitting was 100% spot-on. The reusable return bag was super convenient—the delivery guy just picked it up morning after the event.',
    height: '5\'3"',
    bodyType: 'Petite',
    sizePurchased: 'S',
    fitFeedback: 'Perfect Custom Fit',
    occasionWorn: 'Wedding',
    verifiedRental: true,
    photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'rev-03',
    productId: 'prod-02',
    customerName: 'Rohan Mehra',
    customerCity: 'Delhi NCR',
    rating: 5,
    reviewDate: '08 Oct 2026',
    comment: 'Wore this royal maroon sherwani for my sister’s wedding in Delhi. I chose Size L with backup size XL for ₹399 just in case. Ended up wearing L which was tailored neatly. Returning was effortless, security deposit was back in 24 hours.',
    height: '5\'11"',
    bodyType: 'Athletic',
    sizePurchased: 'L',
    fitFeedback: 'Runs True to Size',
    occasionWorn: 'Wedding',
    verifiedRental: true,
    photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'rev-04',
    productId: 'prod-06',
    customerName: 'Natasha Kapoor',
    customerCity: 'Pune',
    rating: 5,
    reviewDate: '28 Sep 2026',
    comment: 'Wore this champagne gown for our university alumni awards gala! I was worried about the length, but it was perfect with 3-inch heels. Saved over ₹30,000 compared to buying an evening gown I would only wear once.',
    height: '5\'7"',
    bodyType: 'Slender',
    sizePurchased: 'S',
    fitFeedback: 'Runs True to Size',
    occasionWorn: 'Corporate Gala',
    verifiedRental: true,
    photoUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'rev-05',
    productId: 'prod-08',
    customerName: 'Sneha Deshmukh',
    customerCity: 'Thane',
    rating: 5,
    reviewDate: '15 Sep 2026',
    comment: 'The mustard anarkali was the highlight of our family Haldi! The Peace of Mind damage protection gave me peace of mind because haldi stains are unpredictable. It washed out easily during their industrial process anyway.',
    height: '5\'4"',
    bodyType: 'Pear-shaped',
    sizePurchased: 'M',
    fitFeedback: 'Runs True to Size',
    occasionWorn: 'Haldi',
    verifiedRental: true,
    photoUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'rev-06',
    productId: 'prod-07',
    customerName: 'Aditya Sen',
    customerCity: 'Hyderabad',
    rating: 5,
    reviewDate: '05 Oct 2026',
    comment: 'Crisp velvet fabric, impeccable cut, and smelled of faint lavender. Felt like royalty at the corporate leadership dinner. Zero regret renting over buying.',
    height: '6\'0"',
    bodyType: 'Broad Shoulders',
    sizePurchased: 'XL',
    fitFeedback: 'Runs True to Size',
    occasionWorn: 'Corporate Gala',
    verifiedRental: true,
    photoUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80'
  }
];

```


================================================================================
FILE: /src/data/databaseSchema.ts
================================================================================

```typescript
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

```


================================================================================
FILE: /src/components/Navbar.tsx
================================================================================

```typescript
import React from 'react';
import { 
  Sparkles, 
  ShoppingBag, 
  Heart, 
  Search, 
  Menu, 
  X, 
  MapPin, 
  Database, 
  ShieldCheck, 
  Clock, 
  SlidersHorizontal,
  PackageCheck
} from 'lucide-react';
import { formatINR } from '../utils/rentalCalculations';

interface NavbarProps {
  activeTab: 'home' | 'shop' | 'how-it-works' | 'hygiene' | 'orders' | 'admin' | 'database';
  setActiveTab: (tab: 'home' | 'shop' | 'how-it-works' | 'hygiene' | 'orders' | 'admin' | 'database') => void;
  cartCount: number;
  wishlistCount: number;
  openCart: () => void;
  openWishlist: () => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCity: string;
  setSelectedCity: (city: string) => void;
}

export const CITIES = ['Mumbai', 'Bengaluru', 'Delhi NCR', 'Pune', 'Hyderabad', 'Thane'];

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  cartCount,
  wishlistCount,
  openCart,
  openWishlist,
  searchQuery,
  setSearchQuery,
  selectedCity,
  setSelectedCity,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const handleNavClick = (tab: NavbarProps['activeTab']) => {
    setActiveTab(tab);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FAF7F2]/95 backdrop-blur-md border-b border-[#E8E1D5] shadow-xs">
      {/* Top Notification Announcement Bar */}
      <div className="bg-[#5C1324] text-[#F3E7D3] text-xs py-1.5 px-4 text-center font-medium flex items-center justify-center gap-2 tracking-wide">
        <Sparkles className="w-3.5 h-3.5 text-[#E6CA85] animate-pulse" />
        <span>Wedding & Festive Season: Rent Designer Wear at 1/10th Retail. Free Dry Cleaning & Doorstep Delivery!</span>
        <span className="hidden md:inline-block bg-[#E6CA85]/20 text-[#E6CA85] px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider ml-2">
          College Project Prototype
        </span>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo */}
          <div 
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#6B1D2F] to-[#450A18] flex items-center justify-center text-[#E6CA85] shadow-md border border-[#E6CA85]/30 group-hover:scale-105 transition-transform">
              <span className="font-serif text-2xl font-bold tracking-tight">SR</span>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-serif text-2xl font-bold tracking-tight text-[#450A18]">
                  Style-Rent
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#C5A059]"></span>
              </div>
              <p className="text-[11px] font-medium tracking-widest uppercase text-[#8C6D46]">
                Couture on Demand
              </p>
            </div>
          </div>

          {/* Desktop Search */}
          <div className="hidden lg:flex items-center flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
              <input
                type="text"
                placeholder="Search Lehengas, Sherwanis, Sarees, Tuxedos..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  if (activeTab !== 'shop') setActiveTab('shop');
                }}
                className="w-full pl-10 pr-4 py-2 bg-stone-100/80 hover:bg-stone-100 focus:bg-white text-sm text-stone-800 placeholder-stone-400 rounded-full border border-stone-200 focus:border-[#6B1D2F] focus:outline-hidden focus:ring-2 focus:ring-[#6B1D2F]/15 transition-all"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-stone-400 hover:text-stone-600 bg-stone-200 rounded-full w-4 h-4 flex items-center justify-center"
                >
                  ×
                </button>
              )}
            </div>
          </div>

          {/* City Selector */}
          <div className="hidden md:flex items-center gap-1.5 text-xs text-stone-600 bg-[#F1EDE5] px-3 py-1.5 rounded-full border border-[#E2DBD0]">
            <MapPin className="w-3.5 h-3.5 text-[#6B1D2F]" />
            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="bg-transparent text-xs font-semibold text-stone-800 cursor-pointer focus:outline-hidden"
            >
              {CITIES.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2 ml-4">
            <button
              onClick={() => handleNavClick('home')}
              className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                activeTab === 'home' 
                  ? 'text-[#6B1D2F] font-semibold bg-[#6B1D2F]/10' 
                  : 'text-stone-700 hover:text-[#6B1D2F] hover:bg-stone-100'
              }`}
            >
              Home
            </button>
            <button
              onClick={() => handleNavClick('shop')}
              className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                activeTab === 'shop' 
                  ? 'text-[#6B1D2F] font-semibold bg-[#6B1D2F]/10' 
                  : 'text-stone-700 hover:text-[#6B1D2F] hover:bg-stone-100'
              }`}
            >
              Browse Shop
            </button>
            <button
              onClick={() => handleNavClick('how-it-works')}
              className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                activeTab === 'how-it-works' 
                  ? 'text-[#6B1D2F] font-semibold bg-[#6B1D2F]/10' 
                  : 'text-stone-700 hover:text-[#6B1D2F] hover:bg-stone-100'
              }`}
            >
              How It Works
            </button>
            <button
              onClick={() => handleNavClick('hygiene')}
              className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                activeTab === 'hygiene' 
                  ? 'text-[#6B1D2F] font-semibold bg-[#6B1D2F]/10' 
                  : 'text-stone-700 hover:text-[#6B1D2F] hover:bg-stone-100'
              }`}
            >
              Hygiene & Safety
            </button>
            <button
              onClick={() => handleNavClick('orders')}
              className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                activeTab === 'orders' 
                  ? 'text-[#6B1D2F] font-semibold bg-[#6B1D2F]/10' 
                  : 'text-stone-700 hover:text-[#6B1D2F] hover:bg-stone-100'
              }`}
            >
              My Orders
            </button>
            
            {/* Admin Portal Tab */}
            <button
              onClick={() => handleNavClick('admin')}
              className={`px-2.5 py-1.5 text-xs font-semibold rounded-lg transition-all border flex items-center gap-1 ${
                activeTab === 'admin'
                  ? 'bg-amber-100 border-amber-300 text-amber-900'
                  : 'bg-stone-100 border-stone-200 text-stone-600 hover:bg-stone-200'
              }`}
              title="Staff / Admin Inventory & Damage Inspection"
            >
              <PackageCheck className="w-3.5 h-3.5 text-amber-700" />
              <span>Admin</span>
            </button>

            {/* Database & SQL Portal Tab */}
            <button
              onClick={() => handleNavClick('database')}
              className={`px-2.5 py-1.5 text-xs font-semibold rounded-lg transition-all border flex items-center gap-1.5 ${
                activeTab === 'database'
                  ? 'bg-[#450A18] text-[#E6CA85] border-[#E6CA85]/40 shadow-xs'
                  : 'bg-[#6B1D2F]/10 border-[#6B1D2F]/20 text-[#6B1D2F] hover:bg-[#6B1D2F]/20'
              }`}
              title="Relational Database, SQL DDL & Schema Visualizer"
            >
              <Database className="w-3.5 h-3.5" />
              <span>Database & SQL</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            </button>
          </nav>

          {/* Action Icons (Wishlist & Cart) */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={openWishlist}
              className="relative p-2.5 rounded-full text-stone-700 hover:text-[#6B1D2F] hover:bg-stone-100 transition-colors"
              aria-label="Wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-[#6B1D2F] text-white text-[10px] font-bold flex items-center justify-center animate-scale">
                  {wishlistCount}
                </span>
              )}
            </button>

            <button
              onClick={openCart}
              className="relative flex items-center gap-2 px-3 py-2 rounded-full bg-[#6B1D2F] text-white hover:bg-[#521321] transition-all shadow-sm hover:shadow-md cursor-pointer"
              aria-label="Rental Cart"
            >
              <ShoppingBag className="w-4 h-4 text-[#E6CA85]" />
              <span className="text-xs font-semibold hidden sm:inline-block">Bag</span>
              {cartCount > 0 && (
                <span className="w-5 h-5 rounded-full bg-[#E6CA85] text-[#450A18] text-xs font-bold flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-stone-700 md:hidden hover:bg-stone-100 rounded-lg"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#FAF7F2] border-b border-[#E2DBD0] px-4 pt-2 pb-6 space-y-3">
          {/* Mobile Search */}
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
            <input
              type="text"
              placeholder="Search Lehengas, Sherwanis..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setActiveTab('shop');
              }}
              className="w-full pl-9 pr-3 py-2 bg-stone-100 text-sm rounded-lg border border-stone-200"
            />
          </div>

          {/* City selector mobile */}
          <div className="flex items-center justify-between py-2 border-b border-stone-200 text-xs">
            <span className="text-stone-500 flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-[#6B1D2F]" />
              Delivery Location:
            </span>
            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="bg-transparent font-semibold text-stone-800"
            >
              {CITIES.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-1">
            <button
              onClick={() => handleNavClick('home')}
              className={`p-2.5 text-sm rounded-lg text-left ${activeTab === 'home' ? 'bg-[#6B1D2F] text-white' : 'bg-stone-100 text-stone-800'}`}
            >
              Home
            </button>
            <button
              onClick={() => handleNavClick('shop')}
              className={`p-2.5 text-sm rounded-lg text-left ${activeTab === 'shop' ? 'bg-[#6B1D2F] text-white' : 'bg-stone-100 text-stone-800'}`}
            >
              Browse Shop
            </button>
            <button
              onClick={() => handleNavClick('how-it-works')}
              className={`p-2.5 text-sm rounded-lg text-left ${activeTab === 'how-it-works' ? 'bg-[#6B1D2F] text-white' : 'bg-stone-100 text-stone-800'}`}
            >
              How It Works
            </button>
            <button
              onClick={() => handleNavClick('hygiene')}
              className={`p-2.5 text-sm rounded-lg text-left ${activeTab === 'hygiene' ? 'bg-[#6B1D2F] text-white' : 'bg-stone-100 text-stone-800'}`}
            >
              Hygiene & Safety
            </button>
            <button
              onClick={() => handleNavClick('orders')}
              className={`p-2.5 text-sm rounded-lg text-left ${activeTab === 'orders' ? 'bg-[#6B1D2F] text-white' : 'bg-stone-100 text-stone-800'}`}
            >
              My Orders
            </button>
            <button
              onClick={() => handleNavClick('admin')}
              className={`p-2.5 text-sm rounded-lg text-left ${activeTab === 'admin' ? 'bg-amber-800 text-white' : 'bg-amber-100 text-amber-900'}`}
            >
              Admin Dashboard
            </button>
          </div>

          <button
            onClick={() => handleNavClick('database')}
            className="w-full mt-2 py-2.5 px-3 rounded-lg bg-[#450A18] text-[#E6CA85] text-xs font-semibold flex items-center justify-center gap-2 border border-[#E6CA85]/30"
          >
            <Database className="w-4 h-4" />
            <span>View Database Schema & SQL Playground</span>
          </button>
        </div>
      )}
    </header>
  );
};

```


================================================================================
FILE: /src/components/HeroSection.tsx
================================================================================

```typescript
import React from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  ShieldCheck, 
  RotateCcw, 
  Scissors, 
  CheckCircle,
  Database,
  CalendarCheck
} from 'lucide-react';

interface HeroSectionProps {
  onExploreShop: () => void;
  onHowItWorks: () => void;
  onOpenDatabase: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExploreShop,
  onHowItWorks,
  onOpenDatabase,
}) => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-[#FAF4EB] via-[#FAF7F2] to-[#FAF7F2] border-b border-[#E8E1D5] py-12 sm:py-16 lg:py-20">
      
      {/* Decorative Background Accents */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-[#6B1D2F]/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-[#E6CA85]/10 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Text Content (7 cols) */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2 bg-[#6B1D2F]/10 border border-[#6B1D2F]/20 text-[#6B1D2F] px-3.5 py-1.5 rounded-full text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-[#8C6D46] animate-pulse" />
              <span>India’s Smart Clothing Rental Platform • Wedding & Party Ready</span>
            </div>

            {/* Main Headline */}
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-stone-900 tracking-tight leading-[1.15]">
              Own the Spotlight. <br />
              <span className="text-[#6B1D2F] italic">Rent the Designer Look.</span>
            </h1>

            {/* Subtitle */}
            <p className="text-stone-600 text-sm sm:text-base max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Why spend ₹40,000 on a lehenga or sherwani you’ll only wear once? Rent authentic bridal couture, reception gowns, and tailored tuxedos from just <strong>₹999</strong> with guaranteed hospital-grade sanitization, backup sizing, and doorstep return pickup.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-2">
              <button
                onClick={onExploreShop}
                className="px-6 py-3.5 bg-[#450A18] hover:bg-[#340712] text-[#E6CA85] font-bold text-sm rounded-xl shadow-lg flex items-center gap-2 border border-[#E6CA85]/30 cursor-pointer transition-all hover:scale-[1.02]"
              >
                <span>Browse Rental Outfits</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onHowItWorks}
                className="px-5 py-3.5 bg-white hover:bg-stone-50 text-stone-800 font-semibold text-sm rounded-xl border border-stone-300 shadow-xs transition-all cursor-pointer"
              >
                How Rental Works
              </button>

              <button
                onClick={onOpenDatabase}
                className="px-4 py-3.5 bg-[#FAF4EB] hover:bg-[#F2E8D7] text-[#6B1D2F] font-bold text-xs rounded-xl border border-[#DFCBB5] flex items-center gap-1.5 shadow-xs transition-all cursor-pointer"
                title="View Database & SQL Architecture for Project Evaluation"
              >
                <Database className="w-4 h-4 text-[#8C6D46]" />
                <span>Project Database & SQL</span>
              </button>
            </div>

            {/* Value Pillars Row */}
            <div className="pt-6 border-t border-stone-200/80 grid grid-cols-2 sm:grid-cols-4 gap-3 text-left">
              <div className="flex items-start gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-xs text-stone-900">100% Sanitized</div>
                  <div className="text-[10px] text-stone-500">UV-C & steam treated</div>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <Scissors className="w-4 h-4 text-[#6B1D2F] shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-xs text-stone-900">Backup Size</div>
                  <div className="text-[10px] text-stone-500">For ₹399 peace of mind</div>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <CalendarCheck className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-xs text-stone-900">Smart Calendar</div>
                  <div className="text-[10px] text-stone-500">2-3d hygiene buffer</div>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <RotateCcw className="w-4 h-4 text-purple-600 shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-xs text-stone-900">Reusable Bag</div>
                  <div className="text-[10px] text-stone-500">Free doorstep pickup</div>
                </div>
              </div>
            </div>

          </div>

          {/* Right Visual Collage (5 cols) */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md">
              
              {/* Main Luxury Outfit Card */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-stone-100 aspect-4/5 group">
                <img
                  src="https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1000&q=80"
                  alt="Emerald Green Bridal Lehenga"
                  className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />

                {/* Floating Price Tag */}
                <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-full shadow-lg border border-stone-200">
                  <span className="text-[10px] uppercase font-bold text-stone-400 block leading-tight">Rent from</span>
                  <span className="text-base font-bold text-[#6B1D2F]">₹1,999</span>
                  <span className="text-[10px] text-stone-400 line-through ml-1.5">₹42,000</span>
                </div>

                {/* Floating Hygiene Badge */}
                <div className="absolute top-4 right-4 bg-emerald-950/80 backdrop-blur-md text-[#E6CA85] px-2.5 py-1 rounded-full text-[10px] font-semibold flex items-center gap-1 border border-emerald-400/30">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Microbially Disinfected</span>
                </div>

                {/* Bottom Card Copy */}
                <div className="absolute bottom-4 inset-x-4 text-white space-y-1">
                  <span className="text-[10px] uppercase tracking-wider text-[#E6CA85] font-bold">
                    Featured Wedding Collection
                  </span>
                  <h3 className="font-serif text-xl font-bold">
                    Emerald Green Zardozi Velvet Lehenga
                  </h3>
                  <p className="text-xs text-stone-300">
                    Hand-embroidered zardozi • Includes blouse & double dupattas
                  </p>
                </div>
              </div>

              {/* Overlapping Groom Sherwani Badge */}
              <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl p-3 shadow-xl border border-stone-200 hidden sm:flex items-center gap-3">
                <img
                  src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=200&q=80"
                  alt="Sherwani"
                  className="w-12 h-14 object-cover object-top rounded-xl"
                />
                <div className="text-xs">
                  <div className="font-serif font-bold text-stone-900">Royal Maroon Sherwani</div>
                  <div className="text-[#6B1D2F] font-bold">₹1,499 / 3 Days</div>
                  <div className="text-[10px] text-emerald-600 font-medium">✓ Available Oct & Nov</div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

```


================================================================================
FILE: /src/components/OccasionSelector.tsx
================================================================================

```typescript
import React from 'react';
import { OccasionType } from '../types';
import { Sparkles } from 'lucide-react';

interface OccasionSelectorProps {
  selectedOccasion: OccasionType | 'All';
  onSelectOccasion: (occasion: OccasionType | 'All') => void;
}

const OCCASIONS: { name: OccasionType; label: string; desc: string; image: string }[] = [
  {
    name: 'Sangeet',
    label: 'Sangeet & Mehendi',
    desc: 'Twirl-friendly lehengas & draped kurta sets',
    image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=400&q=80',
  },
  {
    name: 'Wedding',
    label: 'Big Fat Weddings',
    desc: 'Heavy velvet bridal lehengas & royal silk sherwanis',
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=400&q=80',
  },
  {
    name: 'Haldi',
    label: 'Haldi Ceremony',
    desc: 'Stain-resistant sunshine yellow gotapatti anarkalis & bundis',
    image: 'https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?auto=format&fit=crop&w=400&q=80',
  },
  {
    name: 'Cocktail Party',
    label: 'Cocktail & Reception',
    desc: 'Sequin mermaid gowns, bandhgalas & pre-draped sarees',
    image: 'https://images.unsplash.com/photo-1566737236500-c8ac43014a67?auto=format&fit=crop&w=400&q=80',
  },
  {
    name: 'Pre-Wedding Shoot',
    label: 'Pre-Wedding Shoots',
    desc: 'Cinematic trail gowns, raw silk jackets & flowing drapes',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
  },
  {
    name: 'College Function',
    label: 'College Farewell & Fests',
    desc: 'Trendy indo-western capes, ruffles & pocket-friendly kurtas',
    image: 'https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?auto=format&fit=crop&w=400&q=80',
  },
  {
    name: 'Corporate Gala',
    label: 'Corporate Galas & Dinners',
    desc: 'Tailored 3-piece peak tuxedos & midnight bandhgalas',
    image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=400&q=80',
  },
  {
    name: 'Festivities',
    label: 'Diwali & Navratri',
    desc: 'Authentic Banarasi silks & mirror embellishments',
    image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=400&q=80',
  },
];

export const OccasionSelector: React.FC<OccasionSelectorProps> = ({
  selectedOccasion,
  onSelectOccasion,
}) => {
  return (
    <div className="py-12 bg-white border-b border-[#E8E1D5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="text-xs uppercase font-bold text-[#8C6D46] tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Curated by Event</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 mt-1">
              Browse Outfits by Occasion
            </h2>
          </div>

          <button
            onClick={() => onSelectOccasion('All')}
            className={`text-xs font-semibold px-3 py-1.5 rounded-full border transition-all ${
              selectedOccasion === 'All'
                ? 'bg-[#6B1D2F] text-white border-[#6B1D2F]'
                : 'bg-stone-100 text-stone-700 border-stone-200 hover:bg-stone-200'
            }`}
          >
            Show All Occasions
          </button>
        </div>

        {/* Occasions Horizontal Scroll / Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
          {OCCASIONS.map((occ) => {
            const isSelected = selectedOccasion === occ.name;
            return (
              <button
                key={occ.name}
                type="button"
                onClick={() => onSelectOccasion(isSelected ? 'All' : occ.name)}
                className={`group text-left rounded-2xl overflow-hidden border transition-all flex flex-col cursor-pointer ${
                  isSelected
                    ? 'border-[#6B1D2F] ring-2 ring-[#6B1D2F] shadow-md scale-102'
                    : 'border-stone-200 hover:border-stone-300 hover:shadow-sm'
                }`}
              >
                <div className="aspect-square w-full overflow-hidden bg-stone-100 relative">
                  <img
                    src={occ.image}
                    alt={occ.label}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                  <span className="absolute bottom-2 inset-x-2 text-white font-serif font-bold text-xs leading-tight line-clamp-1">
                    {occ.label}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

      </div>
    </div>
  );
};

```


================================================================================
FILE: /src/components/ProductCard.tsx
================================================================================

```typescript
import React, { useState } from 'react';
import { 
  Heart, 
  Star, 
  Sparkles, 
  ShieldCheck, 
  Eye, 
  Film, 
  ArrowRight,
  Check
} from 'lucide-react';
import { Product } from '../types';
import { formatINR } from '../utils/rentalCalculations';

interface ProductCardProps {
  product: Product;
  onSelect: (product: Product) => void;
  isWishlisted: boolean;
  onToggleWishlist: (productId: string) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onSelect,
  isWishlisted,
  onToggleWishlist,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  return (
    <div 
      className="group bg-white rounded-2xl border border-stone-200/80 hover:border-[#6B1D2F]/40 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden relative"
      onMouseEnter={() => {
        setIsHovered(true);
        if (product.images.length > 1) setActiveImageIndex(1);
      }}
      onMouseLeave={() => {
        setIsHovered(false);
        setActiveImageIndex(0);
      }}
    >
      {/* Image & Video Preview Container */}
      <div className="relative aspect-3/4 w-full overflow-hidden bg-stone-100 cursor-pointer" onClick={() => onSelect(product)}>
        
        {/* Main Image */}
        <img
          src={product.images[activeImageIndex] || product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
          loading="lazy"
        />

        {/* Video Preview Indicator */}
        {product.videoPreviewUrl && (
          <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-md text-white text-[10px] font-semibold px-2 py-1 rounded-full flex items-center gap-1.5 shadow-xs">
            <Film className="w-3 h-3 text-[#E6CA85]" />
            <span>Runway Preview</span>
          </div>
        )}

        {/* Wishlist Button */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onToggleWishlist(product.id);
          }}
          className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-all z-10 ${
            isWishlisted 
              ? 'bg-[#6B1D2F] text-white shadow-md' 
              : 'bg-white/80 hover:bg-white text-stone-700 hover:text-[#6B1D2F] shadow-xs'
          }`}
          aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
        </button>

        {/* Occasion Pill */}
        <div className="absolute bottom-3 left-3">
          <span className="bg-[#FAF7F2]/90 backdrop-blur-xs text-[#5C1324] font-medium text-[11px] px-2.5 py-1 rounded-md shadow-xs border border-[#E8E1D5]">
            {product.occasions[0]}
          </span>
        </div>

        {/* Quick View Button on Hover */}
        <div className={`absolute inset-x-3 bottom-3 transition-all duration-300 transform ${
          isHovered ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0 pointer-events-none'
        }`}>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onSelect(product);
            }}
            className="w-full py-2.5 bg-[#450A18]/95 hover:bg-[#340712] text-[#E6CA85] font-semibold text-xs rounded-xl shadow-lg flex items-center justify-center gap-2 border border-[#E6CA85]/30 cursor-pointer backdrop-blur-xs"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Select Dates & Rent</span>
          </button>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
        
        <div>
          {/* Category & Rating */}
          <div className="flex items-center justify-between text-xs text-stone-500 mb-1">
            <span className="font-semibold uppercase tracking-wider text-[10px] text-stone-500">
              {product.category} • {product.gender}
            </span>
            <div className="flex items-center gap-1 text-stone-700 font-semibold bg-stone-100 px-1.5 py-0.5 rounded-sm">
              <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
              <span>{product.rating}</span>
              <span className="text-stone-400 font-normal">({product.reviewCount})</span>
            </div>
          </div>

          {/* Product Title */}
          <h3 
            onClick={() => onSelect(product)}
            className="font-serif font-bold text-stone-900 text-base line-clamp-1 group-hover:text-[#6B1D2F] transition-colors cursor-pointer"
            title={product.name}
          >
            {product.name}
          </h3>

          {/* Hygiene Assurance Badge */}
          <div className="mt-1.5 flex items-center gap-1 text-[11px] text-emerald-700 font-medium">
            <ShieldCheck className="w-3.5 h-3.5 shrink-0 text-emerald-600" />
            <span className="truncate">{product.hygieneBadges[0]}</span>
          </div>

          {/* Available Sizes */}
          <div className="mt-2.5 flex items-center gap-1 flex-wrap">
            <span className="text-[10px] text-stone-400 font-medium mr-1">Sizes:</span>
            {product.sizes.map((s) => (
              <span 
                key={s} 
                className="text-[10px] font-semibold bg-stone-100 hover:bg-stone-200 text-stone-700 px-1.5 py-0.5 rounded-sm border border-stone-200"
              >
                {s}
              </span>
            ))}
          </div>
        </div>

        {/* Pricing & CTA */}
        <div className="pt-2 border-t border-stone-100">
          <div className="flex items-baseline justify-between">
            <div>
              <div className="flex items-baseline gap-1">
                <span className="text-lg font-bold text-[#6B1D2F]">
                  {formatINR(product.rentalPrice3Days)}
                </span>
                <span className="text-xs text-stone-500 font-medium">
                  / 3 Days
                </span>
              </div>
              <div className="text-[10px] text-stone-400">
                Deposit: {formatINR(product.securityDeposit)} (Refundable)
              </div>
            </div>

            <div className="text-right">
              <span className="text-[11px] text-stone-400 line-through block">
                {formatINR(product.retailPrice)}
              </span>
              <span className="text-[10px] text-emerald-600 font-bold bg-emerald-50 px-1.5 py-0.5 rounded-sm">
                Save 95%
              </span>
            </div>
          </div>

          {/* Direct CTA */}
          <button
            type="button"
            onClick={() => onSelect(product)}
            className="mt-3 w-full py-2 bg-stone-100 hover:bg-[#6B1D2F] text-stone-800 hover:text-white font-medium text-xs rounded-xl transition-all duration-200 flex items-center justify-center gap-1.5 border border-stone-200 group-hover:border-[#6B1D2F]"
          >
            <span>View Details & Fit</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </div>
  );
};

```


================================================================================
FILE: /src/components/RentalDatePicker.tsx
================================================================================

```typescript
import React, { useState } from 'react';
import { 
  Calendar as CalendarIcon, 
  Clock, 
  Info, 
  CheckCircle2, 
  AlertCircle, 
  ShieldAlert, 
  ChevronLeft, 
  ChevronRight,
  Sparkles
} from 'lucide-react';
import { BookingInterval, RentalDuration } from '../types';
import { 
  addDays, 
  calculateRentalDates, 
  formatDate, 
  getDurationDays, 
  isDateUnavailable,
  checkIntervalAvailability 
} from '../utils/rentalCalculations';

interface RentalDatePickerProps {
  duration: RentalDuration;
  setDuration: (dur: RentalDuration) => void;
  startDate: string; // YYYY-MM-DD
  setStartDate: (date: string) => void;
  existingBookings: BookingInterval[];
}

export const RentalDatePicker: React.FC<RentalDatePickerProps> = ({
  duration,
  setDuration,
  startDate,
  setStartDate,
  existingBookings,
}) => {
  // Calendar month state (defaults to Oct 2026 or current selected month)
  const [currentYear, setCurrentYear] = useState<number>(2026);
  const [currentMonth, setCurrentMonth] = useState<number>(9); // 0-indexed: 9 is October, 10 is November

  const {
    endDate,
    deliveryDate,
    returnPickupDate,
    bufferStart,
    bufferEnd
  } = calculateRentalDates(startDate, duration);

  const durationDays = getDurationDays(duration);
  const availabilityCheck = checkIntervalAvailability(startDate, endDate, existingBookings);

  // Month navigation
  const prevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const nextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  // Generate days for calendar month grid
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayOfWeek = new Date(currentYear, currentMonth, 1).getDay(); // 0 is Sunday
  const monthName = new Date(currentYear, currentMonth, 1).toLocaleString('en-US', { month: 'long', year: 'numeric' });

  return (
    <div className="bg-[#FAF7F2] border border-[#E5DECF] rounded-2xl p-5 space-y-5 shadow-xs">
      
      {/* Header & Duration Tabs */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <label className="text-sm font-bold text-stone-900 flex items-center gap-2">
            <CalendarIcon className="w-4 h-4 text-[#6B1D2F]" />
            <span>Select Rental Duration</span>
          </label>
          <span className="text-xs text-stone-500 font-medium bg-stone-100 px-2.5 py-0.5 rounded-full border border-stone-200">
            {durationDays} Days Event Period
          </span>
        </div>

        <div className="grid grid-cols-3 gap-2">
          {(['3_days', '7_days', '10_days'] as RentalDuration[]).map((dur) => {
            const isSelected = duration === dur;
            const daysLabel = dur === '3_days' ? '3 Days' : dur === '7_days' ? '7 Days' : '10 Days';
            const hint = dur === '3_days' ? 'Weekend / Party' : dur === '7_days' ? 'Wedding Week' : 'Destination Fest';
            return (
              <button
                key={dur}
                type="button"
                onClick={() => setDuration(dur)}
                className={`py-2.5 px-3 rounded-xl text-center border transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-[#6B1D2F] text-white border-[#6B1D2F] shadow-sm ring-2 ring-[#6B1D2F]/20'
                    : 'bg-white text-stone-700 border-stone-200 hover:border-stone-300 hover:bg-stone-50'
                }`}
              >
                <div className="font-bold text-sm">{daysLabel}</div>
                <div className={`text-[10px] mt-0.5 ${isSelected ? 'text-[#E6CA85]' : 'text-stone-400'}`}>
                  {hint}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Calendar Grid Header */}
      <div className="bg-white rounded-xl border border-stone-200 p-3.5 space-y-3">
        <div className="flex items-center justify-between">
          <div className="font-semibold text-stone-800 text-sm flex items-center gap-2">
            <span>{monthName}</span>
            <span className="text-[10px] bg-stone-100 text-stone-600 px-2 py-0.5 rounded-md font-mono">
              Live Availability
            </span>
          </div>
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={prevMonth}
              className="p-1.5 rounded-md hover:bg-stone-100 text-stone-600"
              title="Previous month"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={nextMonth}
              className="p-1.5 rounded-md hover:bg-stone-100 text-stone-600"
              title="Next month"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Days of week header */}
        <div className="grid grid-cols-7 gap-1 text-center text-[11px] font-semibold text-stone-400 uppercase tracking-wider">
          <div>Su</div>
          <div>Mo</div>
          <div>Tu</div>
          <div>We</div>
          <div>Th</div>
          <div>Fr</div>
          <div>Sa</div>
        </div>

        {/* Days cells */}
        <div className="grid grid-cols-7 gap-1 text-center">
          {/* Empty cells before month begins */}
          {Array.from({ length: firstDayOfWeek }).map((_, idx) => (
            <div key={`empty-${idx}`} className="h-9" />
          ))}

          {/* Days in month */}
          {Array.from({ length: daysInMonth }).map((_, idx) => {
            const dayNum = idx + 1;
            const dayFormatted = dayNum < 10 ? `0${dayNum}` : `${dayNum}`;
            const monthFormatted = (currentMonth + 1) < 10 ? `0${currentMonth + 1}` : `${currentMonth + 1}`;
            const dateStr = `${currentYear}-${monthFormatted}-${dayFormatted}`;

            const check = isDateUnavailable(dateStr, existingBookings);
            const isBooked = check.unavailable && check.reason === 'booked';
            const isBuffer = check.unavailable && check.reason === 'buffer';
            
            const isSelectedStart = dateStr === startDate;
            const isWithinSelectedRange = dateStr >= startDate && dateStr <= endDate;
            const isDelivery = dateStr === deliveryDate;
            const isReturn = dateStr === returnPickupDate;

            let cellClass = 'h-9 text-xs rounded-lg flex items-center justify-center font-medium transition-all relative ';
            
            if (isBooked) {
              cellClass += 'bg-red-50 text-red-400 line-through cursor-not-allowed border border-red-200/50';
            } else if (isBuffer) {
              cellClass += 'bg-amber-50 text-amber-700/70 cursor-not-allowed border border-amber-200/60 pattern-diagonal';
            } else if (isSelectedStart) {
              cellClass += 'bg-[#6B1D2F] text-white font-bold shadow-md cursor-pointer scale-105 z-10';
            } else if (isWithinSelectedRange) {
              cellClass += 'bg-[#6B1D2F]/15 text-[#6B1D2F] font-semibold cursor-pointer border-t border-b border-[#6B1D2F]/30';
            } else {
              cellClass += 'hover:bg-stone-100 text-stone-700 cursor-pointer';
            }

            return (
              <button
                key={dateStr}
                type="button"
                disabled={isBooked || isBuffer}
                onClick={() => setStartDate(dateStr)}
                title={
                  isBooked 
                    ? `Booked by another customer (${dateStr})` 
                    : isBuffer 
                      ? `Sanitization & Logistics buffer (${dateStr})` 
                      : `Select ${dateStr}`
                }
                className={cellClass}
              >
                <span>{dayNum}</span>
                {isBooked && (
                  <span className="absolute bottom-0.5 right-0.5 w-1.5 h-1.5 rounded-full bg-red-500" />
                )}
                {isBuffer && (
                  <span className="absolute bottom-0.5 right-0.5 w-1.5 h-1.5 rounded-full bg-amber-500" />
                )}
                {isDelivery && (
                  <span className="absolute -top-1 -left-1 text-[8px] bg-blue-600 text-white rounded-full w-3.5 h-3.5 flex items-center justify-center font-mono">
                    D
                  </span>
                )}
                {isReturn && (
                  <span className="absolute -bottom-1 -right-1 text-[8px] bg-purple-600 text-white rounded-full w-3.5 h-3.5 flex items-center justify-center font-mono">
                    R
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Legend */}
        <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-stone-100 text-[11px] text-stone-500">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-sm bg-emerald-100 border border-emerald-300" />
            <span>Available</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-sm bg-red-100 border border-red-300" />
            <span>Booked (Unavailable)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-sm bg-amber-100 border border-amber-300" />
            <span>Operational Buffer (Prep & QC)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-sm bg-[#6B1D2F]" />
            <span>Selected Rental</span>
          </div>
        </div>
      </div>

      {/* Operational Buffer Explanation Box */}
      <div className="bg-[#F4EFE6] border border-[#DFCBB5] rounded-xl p-3 text-xs text-stone-700 space-y-1.5">
        <div className="font-semibold text-stone-900 flex items-center gap-1.5">
          <ShieldAlert className="w-3.5 h-3.5 text-[#8C6D46]" />
          <span>Smart Operational Buffer in Action (College Project Logic)</span>
        </div>
        <p className="text-stone-600 leading-relaxed text-[11px]">
          To guarantee hospital-grade sanitization and zero delays, Style-Rent automatically locks a 
          <strong className="text-stone-900"> 2-3 day buffer </strong> 
          before your delivery date (for dry cleaning & quality check) and after your return date (for reverse transit & disinfection).
        </p>
      </div>

      {/* Selected Timeline Summary Card */}
      <div className="bg-white rounded-xl border border-stone-200 p-3.5 space-y-2">
        <div className="text-xs font-bold text-stone-800 uppercase tracking-wider">
          Your Rental Schedule
        </div>

        <div className="grid grid-cols-3 gap-2 text-center text-xs">
          {/* Delivery Date */}
          <div className="bg-stone-50 p-2 rounded-lg border border-stone-200">
            <span className="text-[10px] uppercase font-semibold text-blue-700 block">
              1. Delivery Day
            </span>
            <span className="font-bold text-stone-800 block mt-0.5">
              {formatDate(deliveryDate)}
            </span>
            <span className="text-[9px] text-stone-500 block">
              Before 2:00 PM (Try-on)
            </span>
          </div>

          {/* Event Period */}
          <div className="bg-[#6B1D2F]/10 p-2 rounded-lg border border-[#6B1D2F]/20">
            <span className="text-[10px] uppercase font-semibold text-[#6B1D2F] block">
              2. Rental Dates
            </span>
            <span className="font-bold text-[#6B1D2F] block mt-0.5">
              {formatDate(startDate)}
            </span>
            <span className="text-[9px] text-[#6B1D2F]/80 block">
              to {formatDate(endDate)} ({durationDays}d)
            </span>
          </div>

          {/* Return Date */}
          <div className="bg-stone-50 p-2 rounded-lg border border-stone-200">
            <span className="text-[10px] uppercase font-semibold text-purple-700 block">
              3. Return Pickup
            </span>
            <span className="font-bold text-stone-800 block mt-0.5">
              {formatDate(returnPickupDate)}
            </span>
            <span className="text-[9px] text-stone-500 block">
              Reusable bag pickup
            </span>
          </div>
        </div>

        {/* Availability Status Badge */}
        <div className="pt-1 flex items-center justify-between text-xs">
          {availabilityCheck.isAvailable ? (
            <div className="flex items-center gap-1.5 text-emerald-700 font-semibold bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Available for selected dates! Guaranteed dispatch.</span>
            </div>
          ) : (
            <div className="flex items-center gap-1.5 text-red-700 font-semibold bg-red-50 px-2.5 py-1 rounded-md border border-red-200">
              <AlertCircle className="w-3.5 h-3.5" />
              <span>{availabilityCheck.conflictReason}</span>
            </div>
          )}
        </div>
      </div>

    </div>
  );
};

```


================================================================================
FILE: /src/components/ProductDetailsModal.tsx
================================================================================

```typescript
import React, { useState } from 'react';
import { 
  X, 
  Star, 
  ShieldCheck, 
  Sparkles, 
  Heart, 
  ShoppingBag, 
  Check, 
  Info, 
  Ruler, 
  Scissors, 
  Home, 
  Play, 
  Pause, 
  Truck, 
  RotateCcw, 
  ChevronRight,
  MessageSquarePlus,
  Layers,
  HelpCircle
} from 'lucide-react';
import { 
  CartItem, 
  CustomMeasurements, 
  FittingOptionType, 
  BackupOptionType, 
  Product, 
  RentalDuration,
  ReviewItem
} from '../types';
import { RentalDatePicker } from './RentalDatePicker';
import { 
  calculateItemPrice, 
  calculateRentalDates, 
  checkIntervalAvailability, 
  formatDate, 
  formatINR, 
  getDurationDays 
} from '../utils/rentalCalculations';

interface ProductDetailsModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (item: CartItem) => void;
  isWishlisted: boolean;
  onToggleWishlist: (productId: string) => void;
  reviews: ReviewItem[];
  onOpenReviewModal: (product: Product) => void;
}

export const ProductDetailsModal: React.FC<ProductDetailsModalProps> = ({
  product,
  onClose,
  onAddToCart,
  isWishlisted,
  onToggleWishlist,
  reviews,
  onOpenReviewModal,
}) => {
  if (!product) return null;

  // Selected State
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState<any>(product.sizes[0] || 'M');
  const [duration, setDuration] = useState<RentalDuration>('3_days');
  // Default start date: 7 days from now (2026-10-25)
  const [startDate, setStartDate] = useState<string>('2026-10-25');
  
  // Fitting state
  const [fittingOption, setFittingOption] = useState<FittingOptionType>('standard');
  const [customMeasurements, setCustomMeasurements] = useState<CustomMeasurements>({
    chest: '36',
    waist: '30',
    hip: '38',
    shoulder: '15',
    sleeveLength: '22',
    outfitLength: '54',
    notes: ''
  });
  const [showSizeGuide, setShowSizeGuide] = useState(false);

  // Backup Size state
  const [backupOption, setBackupOption] = useState<BackupOptionType>('none');
  const [backupSize, setBackupSize] = useState<string>(product.sizes[1] || 'L');

  // Damage protection state
  const [damageProtection, setDamageProtection] = useState(true);

  // Video state
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  // Filter reviews for this product
  const productReviews = reviews.filter((r) => r.productId === product.id);

  // Price calculations
  const { rentalFee, securityDeposit, backupPrice, damageProtectionPrice, itemTotal } = calculateItemPrice(
    product,
    duration,
    backupOption,
    damageProtection
  );

  const {
    endDate,
    deliveryDate,
    returnPickupDate
  } = calculateRentalDates(startDate, duration);

  const availabilityCheck = checkIntervalAvailability(startDate, endDate, product.existingBookings);

  const handleAddToCart = () => {
    if (!availabilityCheck.isAvailable) {
      alert('Selected dates conflict with an existing booking or hygiene buffer. Please select another date on the calendar.');
      return;
    }

    const cartItem: CartItem = {
      cartItemId: `item-${Date.now()}`,
      product,
      selectedSize,
      rentalDuration: duration,
      rentalDays: getDurationDays(duration),
      startDate,
      deliveryDate,
      returnDate: returnPickupDate,
      rentalFee,
      securityDeposit,
      fittingOption,
      customMeasurements: fittingOption === 'custom' ? customMeasurements : undefined,
      backupOption,
      backupSize: backupOption === 'backup_size' ? backupSize : undefined,
      backupPrice,
      damageProtection,
      damageProtectionPrice,
    };

    onAddToCart(cartItem);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 md:p-6 animate-fade-in">
      <div className="bg-[#FAF7F2] rounded-3xl max-w-5xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-[#E5DECF] relative text-stone-800">
        
        {/* Floating Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-white/90 hover:bg-white text-stone-700 shadow-md transition-all hover:scale-105"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 p-6 sm:p-8">
          
          {/* LEFT COLUMN: Gallery & Video Preview (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            
            {/* Main Image / Video Viewport */}
            <div className="relative aspect-3/4 rounded-2xl overflow-hidden bg-stone-100 shadow-sm border border-stone-200">
              {isVideoPlaying && product.videoPreviewUrl ? (
                <video
                  src={product.videoPreviewUrl}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover"
                />
              ) : (
                <img
                  src={product.images[activeImageIndex] || product.images[0]}
                  alt={product.name}
                  className="w-full h-full object-cover object-top"
                />
              )}

              {/* Video Preview Toggle Overlay */}
              {product.videoPreviewUrl && (
                <button
                  type="button"
                  onClick={() => setIsVideoPlaying(!isVideoPlaying)}
                  className="absolute bottom-4 right-4 bg-black/75 hover:bg-black text-[#E6CA85] px-3 py-1.5 rounded-full text-xs font-semibold backdrop-blur-md flex items-center gap-1.5 shadow-md border border-[#E6CA85]/30 cursor-pointer"
                >
                  {isVideoPlaying ? (
                    <>
                      <Pause className="w-3.5 h-3.5" />
                      <span>Pause Runway</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-3.5 h-3.5 fill-current" />
                      <span>Runway Video</span>
                    </>
                  )}
                </button>
              )}

              {/* Occasion Label */}
              <div className="absolute top-4 left-4 flex flex-col gap-1">
                <span className="bg-stone-900/80 backdrop-blur-xs text-white text-xs font-medium px-2.5 py-1 rounded-md">
                  {product.occasions.join(' • ')}
                </span>
              </div>
            </div>

            {/* Thumbnail Row */}
            <div className="flex gap-2 overflow-x-auto pb-1">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => {
                    setActiveImageIndex(idx);
                    setIsVideoPlaying(false);
                  }}
                  className={`w-18 h-22 rounded-xl overflow-hidden shrink-0 border-2 transition-all cursor-pointer ${
                    activeImageIndex === idx && !isVideoPlaying
                      ? 'border-[#6B1D2F] scale-95 shadow-md'
                      : 'border-stone-200 opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
              
              {product.videoPreviewUrl && (
                <button
                  type="button"
                  onClick={() => setIsVideoPlaying(true)}
                  className={`w-18 h-22 rounded-xl shrink-0 border-2 transition-all cursor-pointer bg-stone-900 flex flex-col items-center justify-center text-[#E6CA85] p-2 text-center ${
                    isVideoPlaying ? 'border-[#E6CA85] scale-95' : 'border-stone-400 opacity-80'
                  }`}
                >
                  <Play className="w-5 h-5 fill-current mb-1" />
                  <span className="text-[10px] font-bold leading-tight">Runway Clip</span>
                </button>
              )}
            </div>

            {/* HYGIENE & CARE BADGE SECTION (Prompt Requirement) */}
            <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 space-y-3">
              <div className="flex items-center gap-2 text-emerald-900 font-bold text-sm">
                <ShieldCheck className="w-5 h-5 text-emerald-600" />
                <span>STYLE-RENT HYGIENE & SAFETY ASSURANCE</span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="bg-white/90 p-2.5 rounded-xl border border-emerald-100 flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-stone-900 block">Hospital Grade</span>
                    <span className="text-stone-500 text-[11px]">UV-C chamber sanitized</span>
                  </div>
                </div>

                <div className="bg-white/90 p-2.5 rounded-xl border border-emerald-100 flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-stone-900 block">Eco Dry Cleaned</span>
                    <span className="text-stone-500 text-[11px]">Organic odorless wash</span>
                  </div>
                </div>

                <div className="bg-white/90 p-2.5 rounded-xl border border-emerald-100 flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-stone-900 block">100°C Steam Ironed</span>
                    <span className="text-stone-500 text-[11px]">Crisp crease-free finish</span>
                  </div>
                </div>

                <div className="bg-white/90 p-2.5 rounded-xl border border-emerald-100 flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-stone-900 block">Quality Checked</span>
                    <span className="text-stone-500 text-[11px]">Sealed packaging bag</span>
                  </div>
                </div>
              </div>

              <p className="text-[11px] text-emerald-800 leading-relaxed">
                Every outfit undergoes a strict 4-stage microbial disinfection cycle before sealing in an airtight protective garment carrier.
              </p>
            </div>

            {/* Fabric & Details accordion/box */}
            <div className="bg-white rounded-2xl border border-stone-200 p-4 space-y-2 text-xs">
              <div className="font-bold text-stone-900 text-sm">Garment Specifications</div>
              <div className="grid grid-cols-2 gap-y-1.5 text-stone-600">
                <div><strong className="text-stone-900">Fabric:</strong> {product.fabric}</div>
                <div><strong className="text-stone-900">Color:</strong> {product.color}</div>
                <div><strong className="text-stone-900">Style:</strong> {product.category}</div>
                <div><strong className="text-stone-900">Retail Worth:</strong> {formatINR(product.retailPrice)}</div>
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN: Selection, Sizing, Dates, Backup & Booking (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Header info */}
            <div>
              <div className="flex items-center justify-between text-xs text-stone-500 mb-1">
                <span className="uppercase tracking-wider font-semibold text-[#8C6D46]">
                  {product.category} • {product.gender}
                </span>
                <div className="flex items-center gap-1 text-stone-700 font-semibold bg-stone-100 px-2 py-0.5 rounded-full">
                  <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                  <span>{product.rating}</span>
                  <span className="text-stone-400 font-normal">({product.reviewCount} verified reviews)</span>
                </div>
              </div>

              <h1 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900">
                {product.name}
              </h1>

              <p className="text-stone-600 text-sm mt-2 leading-relaxed">
                {product.description}
              </p>

              {/* Price Display */}
              <div className="mt-4 p-4 rounded-2xl bg-white border border-[#E8E1D5] flex items-baseline justify-between">
                <div>
                  <div className="text-xs text-stone-500 font-medium">Rental Price for {getDurationDays(duration)} Days</div>
                  <div className="flex items-baseline gap-2 mt-0.5">
                    <span className="text-3xl font-bold text-[#6B1D2F]">
                      {formatINR(rentalFee)}
                    </span>
                    <span className="text-stone-400 line-through text-sm">
                      Retail: {formatINR(product.retailPrice)}
                    </span>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-xs font-semibold text-stone-700">
                    Refundable Security Deposit
                  </div>
                  <div className="text-sm font-bold text-stone-900">
                    +{formatINR(securityDeposit)}
                  </div>
                  <div className="text-[10px] text-emerald-600 font-medium">
                    100% Refunded at return pickup
                  </div>
                </div>
              </div>
            </div>

            {/* SECTION 1: RENTAL DATES & SMART OPERATIONAL BUFFER CALENDAR */}
            <div>
              <RentalDatePicker
                duration={duration}
                setDuration={setDuration}
                startDate={startDate}
                setStartDate={setStartDate}
                existingBookings={product.existingBookings}
              />
            </div>

            {/* SECTION 2: SIZE & FITTING SELECTION (Prompt Requirement) */}
            <div className="bg-white rounded-2xl border border-stone-200 p-5 space-y-4 shadow-xs">
              
              <div className="flex items-center justify-between">
                <label className="text-sm font-bold text-stone-900 flex items-center gap-1.5">
                  <Scissors className="w-4 h-4 text-[#6B1D2F]" />
                  <span>Size & Fitting Preference</span>
                </label>
                <button
                  type="button"
                  onClick={() => setShowSizeGuide(!showSizeGuide)}
                  className="text-xs text-[#6B1D2F] font-semibold hover:underline flex items-center gap-1"
                >
                  <Ruler className="w-3.5 h-3.5" />
                  <span>Size Chart Guide</span>
                </button>
              </div>

              {/* Size Chart Modal / Drawer toggle */}
              {showSizeGuide && (
                <div className="bg-[#FAF7F2] p-3 rounded-xl border border-stone-200 text-xs space-y-2">
                  <div className="font-bold text-stone-900">Standard Indian Sizing Chart (Inches)</div>
                  <div className="grid grid-cols-4 gap-1 text-[11px] text-stone-600 font-mono">
                    <div className="font-bold">Size</div>
                    <div className="font-bold">Bust/Chest</div>
                    <div className="font-bold">Waist</div>
                    <div className="font-bold">Hip</div>
                    <div>XS</div><div>32-34"</div><div>26-28"</div><div>34-36"</div>
                    <div>S</div><div>34-36"</div><div>28-30"</div><div>36-38"</div>
                    <div>M</div><div>36-38"</div><div>30-32"</div><div>38-40"</div>
                    <div>L</div><div>38-40"</div><div>32-34"</div><div>40-42"</div>
                    <div>XL</div><div>40-42"</div><div>34-36"</div><div>42-44"</div>
                    <div>XXL</div><div>42-44"</div><div>36-38"</div><div>44-46"</div>
                  </div>
                </div>
              )}

              {/* Fitting Options Tabs */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                {[
                  { id: 'standard', label: 'Standard Size', desc: 'Pre-stitched ready size' },
                  { id: 'custom', label: 'Custom Measurements', desc: 'Made to your exact inches' },
                  { id: 'tailor_visit', label: 'Home Tailor Visit', desc: 'Metro cities only' },
                  { id: 'unstitched_margins', label: 'Unstitched Margins', desc: '2-inch inner margin' },
                ].map((opt) => (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setFittingOption(opt.id as FittingOptionType)}
                    className={`p-2.5 rounded-xl text-left border transition-all cursor-pointer ${
                      fittingOption === opt.id
                        ? 'border-[#6B1D2F] bg-[#6B1D2F]/5 text-[#6B1D2F] ring-1 ring-[#6B1D2F]'
                        : 'border-stone-200 hover:border-stone-300 text-stone-700'
                    }`}
                  >
                    <div className="font-bold text-[12px]">{opt.label}</div>
                    <div className="text-[10px] text-stone-500 mt-0.5">{opt.desc}</div>
                  </button>
                ))}
              </div>

              {/* Standard Size Buttons */}
              {fittingOption === 'standard' && (
                <div className="space-y-2 pt-1">
                  <div className="text-xs text-stone-600 font-medium">Select Standard Size:</div>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((sz) => (
                      <button
                        key={sz}
                        type="button"
                        onClick={() => setSelectedSize(sz)}
                        className={`min-w-12 h-11 px-3 rounded-xl font-bold text-sm border transition-all cursor-pointer ${
                          selectedSize === sz
                            ? 'bg-[#6B1D2F] text-white border-[#6B1D2F] shadow-sm'
                            : 'bg-stone-50 hover:bg-stone-100 text-stone-700 border-stone-200'
                        }`}
                      >
                        {sz}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Custom Measurements Form Inputs */}
              {fittingOption === 'custom' && (
                <div className="space-y-3 p-3.5 bg-[#F9F7F2] rounded-xl border border-stone-200 text-xs">
                  <div className="font-bold text-stone-800 flex items-center gap-1.5">
                    <Ruler className="w-3.5 h-3.5 text-[#6B1D2F]" />
                    <span>Provide Custom Tailoring Inches (Free Customization)</span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                    <div>
                      <label className="text-[11px] font-semibold text-stone-600 block">Chest/Bust (in)</label>
                      <input
                        type="number"
                        value={customMeasurements.chest}
                        onChange={(e) => setCustomMeasurements({ ...customMeasurements, chest: e.target.value })}
                        className="w-full mt-1 px-2.5 py-1.5 bg-white border border-stone-300 rounded-lg text-xs"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-semibold text-stone-600 block">Waist (in)</label>
                      <input
                        type="number"
                        value={customMeasurements.waist}
                        onChange={(e) => setCustomMeasurements({ ...customMeasurements, waist: e.target.value })}
                        className="w-full mt-1 px-2.5 py-1.5 bg-white border border-stone-300 rounded-lg text-xs"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-semibold text-stone-600 block">Hips (in)</label>
                      <input
                        type="number"
                        value={customMeasurements.hip}
                        onChange={(e) => setCustomMeasurements({ ...customMeasurements, hip: e.target.value })}
                        className="w-full mt-1 px-2.5 py-1.5 bg-white border border-stone-300 rounded-lg text-xs"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-semibold text-stone-600 block">Shoulder Width</label>
                      <input
                        type="number"
                        value={customMeasurements.shoulder}
                        onChange={(e) => setCustomMeasurements({ ...customMeasurements, shoulder: e.target.value })}
                        className="w-full mt-1 px-2.5 py-1.5 bg-white border border-stone-300 rounded-lg text-xs"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-semibold text-stone-600 block">Sleeve Length</label>
                      <input
                        type="number"
                        value={customMeasurements.sleeveLength}
                        onChange={(e) => setCustomMeasurements({ ...customMeasurements, sleeveLength: e.target.value })}
                        className="w-full mt-1 px-2.5 py-1.5 bg-white border border-stone-300 rounded-lg text-xs"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-semibold text-stone-600 block">Outfit Length</label>
                      <input
                        type="number"
                        value={customMeasurements.outfitLength}
                        onChange={(e) => setCustomMeasurements({ ...customMeasurements, outfitLength: e.target.value })}
                        className="w-full mt-1 px-2.5 py-1.5 bg-white border border-stone-300 rounded-lg text-xs"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Tailor visit option description */}
              {fittingOption === 'tailor_visit' && (
                <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-900 space-y-1">
                  <div className="font-bold flex items-center gap-1.5">
                    <Home className="w-3.5 h-3.5 text-amber-700" />
                    <span>Doorstep Tailor Fit Assistant</span>
                  </div>
                  <p className="text-[11px] text-amber-800">
                    A certified Style-Rent fit master will visit your home 48 hours before delivery with measuring tapes and alteration pins. 
                    <strong> Available in Mumbai, Bengaluru, Delhi NCR, Pune, Hyderabad, and Thane.</strong>
                  </p>
                </div>
              )}

              {/* Unstitched margins option */}
              {fittingOption === 'unstitched_margins' && (
                <div className="p-3 bg-blue-50 rounded-xl border border-blue-200 text-xs text-blue-900 space-y-1">
                  <div className="font-bold">Includes 2-3 Inch Inbuilt Alteration Margins</div>
                  <p className="text-[11px] text-blue-800">
                    We leave extra inner stitch margin threads so your local tailor can easily loosen or tighten without damaging the designer fabric.
                  </p>
                </div>
              )}

            </div>

            {/* SECTION 3: BACKUP SIZE / WORRIED ABOUT THE FIT? (Prompt Requirement) */}
            <div className="bg-[#FAF4EB] border border-[#E2D2BE] rounded-2xl p-5 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-serif font-bold text-stone-900 text-sm flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-[#8C6D46]" />
                    <span>Worried About the Fit? (Backup Protection)</span>
                  </h4>
                  <p className="text-xs text-stone-600 mt-0.5">
                    Your backup option gives you complete peace of mind if your selected outfit does not fit as expected.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                {/* Option 1: Backup Size */}
                <div 
                  onClick={() => setBackupOption(backupOption === 'backup_size' ? 'none' : 'backup_size')}
                  className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                    backupOption === 'backup_size'
                      ? 'bg-white border-[#6B1D2F] ring-2 ring-[#6B1D2F]/20 shadow-xs'
                      : 'bg-white/70 border-stone-200 hover:border-stone-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-stone-900">Add Backup Size</span>
                    <span className="text-xs font-bold text-[#6B1D2F]">+₹399</span>
                  </div>
                  <p className="text-[11px] text-stone-500 mt-1">
                    Receive a 2nd size in the same package. Wear the one that fits best!
                  </p>

                  {backupOption === 'backup_size' && (
                    <div className="mt-2.5 pt-2 border-t border-stone-100 flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                      <span className="text-[11px] font-semibold text-stone-700">Choose 2nd Size:</span>
                      <select
                        value={backupSize}
                        onChange={(e) => setBackupSize(e.target.value)}
                        className="bg-stone-100 text-xs font-semibold text-stone-900 rounded-md px-2 py-1 border border-stone-300"
                      >
                        {product.sizes.map((s) => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                    </div>
                  )}
                </div>

                {/* Option 2: Backup Outfit */}
                <div 
                  onClick={() => setBackupOption(backupOption === 'backup_outfit' ? 'none' : 'backup_outfit')}
                  className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                    backupOption === 'backup_outfit'
                      ? 'bg-white border-[#6B1D2F] ring-2 ring-[#6B1D2F]/20 shadow-xs'
                      : 'bg-white/70 border-stone-200 hover:border-stone-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-stone-900">Backup Outfit Option</span>
                    <span className="text-xs font-bold text-[#6B1D2F]">+₹899 (Refundable)</span>
                  </div>
                  <p className="text-[11px] text-stone-500 mt-1">
                    Reserve a secondary style of equal value. Unworn backup is 100% refunded!
                  </p>
                </div>
              </div>
            </div>

            {/* SECTION 4: PEACE OF MIND DAMAGE PROTECTION TOGGLE (Prompt Requirement) */}
            <div className="bg-white rounded-2xl border border-stone-200 p-4 flex items-center justify-between">
              <div className="space-y-0.5">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span className="font-bold text-stone-900 text-xs">
                    Peace of Mind Damage Protection (+₹299)
                  </span>
                </div>
                <p className="text-[11px] text-stone-500 max-w-md">
                  Covers eligible accidental wear such as small food/wine stains, broken buttons, and minor zipper issues without security deposit deduction.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setDamageProtection(!damageProtection)}
                className={`w-12 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors ${
                  damageProtection ? 'bg-[#6B1D2F]' : 'bg-stone-300'
                }`}
              >
                <div className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                  damageProtection ? 'translate-x-6' : 'translate-x-0'
                }`} />
              </button>
            </div>

            {/* SECTION 5: CUSTOMER REVIEWS & SOCIAL PROOF */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between">
                <h3 className="font-serif font-bold text-stone-900 text-base flex items-center gap-2">
                  <span>Customer Reviews & Fit Verification</span>
                  <span className="text-xs font-sans font-normal text-stone-500">
                    ({productReviews.length} reviews)
                  </span>
                </h3>
                <button
                  type="button"
                  onClick={() => onOpenReviewModal(product)}
                  className="text-xs font-semibold text-[#6B1D2F] hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <MessageSquarePlus className="w-3.5 h-3.5" />
                  <span>Write a Review</span>
                </button>
              </div>

              {productReviews.length === 0 ? (
                <div className="p-4 bg-stone-50 rounded-xl text-center text-xs text-stone-500">
                  Be the first customer to rent and review this {product.name}!
                </div>
              ) : (
                <div className="space-y-3">
                  {productReviews.slice(0, 2).map((rev) => (
                    <div key={rev.id} className="bg-white p-3.5 rounded-xl border border-stone-200 text-xs space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          {rev.photoUrl && (
                            <img src={rev.photoUrl} alt="" className="w-7 h-7 rounded-full object-cover" />
                          )}
                          <div>
                            <span className="font-bold text-stone-900">{rev.customerName}</span>
                            <span className="text-stone-400 text-[10px] ml-1.5">• {rev.customerCity}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-0.5 text-amber-500">
                          {Array.from({ length: rev.rating }).map((_, i) => (
                            <Star key={i} className="w-3 h-3 fill-current" />
                          ))}
                        </div>
                      </div>

                      {/* Height, Body Type & Fit Tag */}
                      <div className="flex items-center gap-2 text-[10px] text-stone-500 flex-wrap">
                        <span className="bg-stone-100 px-2 py-0.5 rounded-sm">Height: {rev.height}</span>
                        <span className="bg-stone-100 px-2 py-0.5 rounded-sm">Body Type: {rev.bodyType}</span>
                        <span className="bg-stone-100 px-2 py-0.5 rounded-sm">Size: {rev.sizePurchased}</span>
                        <span className="bg-emerald-50 text-emerald-800 font-semibold px-2 py-0.5 rounded-sm border border-emerald-200">
                          Fit: {rev.fitFeedback}
                        </span>
                      </div>

                      <p className="text-stone-700 italic">
                        "{rev.comment}"
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* STICKY BOTTOM ACTION BAR */}
            <div className="sticky bottom-0 bg-[#FAF7F2]/95 backdrop-blur-md pt-3 pb-1 border-t border-stone-200 flex items-center justify-between gap-3">
              <div>
                <div className="text-[10px] uppercase font-semibold text-stone-400">Total Payable Now</div>
                <div className="text-2xl font-bold text-[#6B1D2F]">
                  {formatINR(itemTotal)}
                </div>
                <div className="text-[10px] text-emerald-700 font-medium">
                  Includes {formatINR(securityDeposit)} refundable deposit
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => onToggleWishlist(product.id)}
                  className={`p-3 rounded-xl border transition-all cursor-pointer ${
                    isWishlisted 
                      ? 'bg-[#6B1D2F] text-white border-[#6B1D2F]' 
                      : 'bg-white text-stone-700 border-stone-200 hover:bg-stone-50'
                  }`}
                  title="Save to Wishlist"
                >
                  <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`} />
                </button>

                <button
                  type="button"
                  onClick={handleAddToCart}
                  disabled={!availabilityCheck.isAvailable}
                  className={`px-6 py-3 rounded-xl font-bold text-sm shadow-md transition-all flex items-center gap-2 cursor-pointer ${
                    availabilityCheck.isAvailable
                      ? 'bg-[#450A18] hover:bg-[#340712] text-[#E6CA85] border border-[#E6CA85]/30 hover:scale-[1.02]'
                      : 'bg-stone-300 text-stone-500 cursor-not-allowed'
                  }`}
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add to Rental Bag</span>
                </button>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

```


================================================================================
FILE: /src/components/CartDrawer.tsx
================================================================================

```typescript
import React from 'react';
import { 
  X, 
  Trash2, 
  ShoppingBag, 
  ArrowRight, 
  ShieldCheck, 
  Sparkles, 
  Calendar, 
  Scissors, 
  CheckCircle2, 
  RotateCcw,
  Plus,
  Minus
} from 'lucide-react';
import { CartItem } from '../types';
import { calculateCartTotals, formatDate, formatINR } from '../utils/rentalCalculations';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onRemoveItem: (cartItemId: string) => void;
  onProceedToCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onRemoveItem,
  onProceedToCheckout,
}) => {
  if (!isOpen) return null;

  const {
    rentalSubtotal,
    securityDepositTotal,
    backupOptionsTotal,
    damageProtectionTotal,
    deliveryFee,
    grandTotal,
  } = calculateCartTotals(items);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-xs flex justify-end animate-fade-in">
      <div className="w-full max-w-md bg-[#FAF7F2] h-full shadow-2xl flex flex-col border-l border-[#E5DECF] relative text-stone-800">
        
        {/* Drawer Header */}
        <div className="p-4 sm:p-5 border-b border-[#E2DBD0] bg-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-[#6B1D2F] flex items-center justify-center text-[#E6CA85]">
              <ShoppingBag className="w-4 h-4" />
            </div>
            <div>
              <h2 className="font-serif font-bold text-stone-900 text-lg">Your Rental Bag</h2>
              <span className="text-xs text-stone-500 font-medium">
                {items.length} {items.length === 1 ? 'Outfit' : 'Outfits'} reserved
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-stone-100 text-stone-500 transition-colors"
            aria-label="Close cart"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Delivery Bar */}
        <div className="bg-[#FAF4EB] border-b border-[#E2D2BE] px-4 py-2 text-xs text-stone-700 flex items-center justify-between">
          <span className="flex items-center gap-1.5 font-medium">
            <Sparkles className="w-3.5 h-3.5 text-[#8C6D46]" />
            {rentalSubtotal >= 1500 ? (
              <strong className="text-emerald-700">✓ Eligible for FREE Doorstep Delivery & Return!</strong>
            ) : (
              <span>Add {formatINR(1500 - rentalSubtotal)} more for Free Shipping</span>
            )}
          </span>
          <span className="font-bold text-[#6B1D2F] text-[11px]">Free Return Bag</span>
        </div>

        {/* Cart Items List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-3">
              <div className="w-16 h-16 rounded-full bg-stone-100 flex items-center justify-center text-stone-400">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <div className="font-serif text-lg font-bold text-stone-800">Your bag is empty</div>
              <p className="text-xs text-stone-500 max-w-xs leading-relaxed">
                Discover our royal Lehengas, designer Sherwanis, and luxury Gowns for your upcoming weddings and festivities.
              </p>
              <button
                type="button"
                onClick={onClose}
                className="mt-2 px-5 py-2.5 rounded-xl bg-[#6B1D2F] text-white font-semibold text-xs shadow-sm hover:bg-[#521321]"
              >
                Browse Outfits
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div 
                key={item.cartItemId}
                className="bg-white rounded-2xl border border-stone-200/90 p-3.5 space-y-3 shadow-xs relative"
              >
                {/* Product row */}
                <div className="flex gap-3">
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    className="w-20 h-24 object-cover object-top rounded-xl border border-stone-200 shrink-0"
                  />

                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-1">
                        <h4 className="font-serif font-bold text-stone-900 text-sm line-clamp-1">
                          {item.product.name}
                        </h4>
                        <button
                          type="button"
                          onClick={() => onRemoveItem(item.cartItemId)}
                          className="text-stone-400 hover:text-red-600 transition-colors p-1"
                          title="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="text-xs text-stone-500 flex items-center gap-1.5 mt-0.5">
                        <span className="font-semibold bg-stone-100 text-stone-800 px-1.5 py-0.5 rounded-sm">
                          Size {item.selectedSize}
                        </span>
                        <span>•</span>
                        <span>{item.rentalDays} Days Rental</span>
                      </div>
                    </div>

                    {/* Dates block */}
                    <div className="text-[11px] text-stone-600 bg-stone-50 p-1.5 rounded-lg border border-stone-100 flex items-center gap-1 mt-1">
                      <Calendar className="w-3 h-3 text-[#6B1D2F] shrink-0" />
                      <span className="truncate">
                        Event: {formatDate(item.startDate)} - Return: {formatDate(item.returnDate)}
                      </span>
                    </div>

                    {/* Price line */}
                    <div className="flex items-baseline justify-between pt-1">
                      <span className="font-bold text-[#6B1D2F] text-sm">
                        {formatINR(item.rentalFee)}
                      </span>
                      <span className="text-[10px] text-stone-500">
                        Deposit: {formatINR(item.securityDeposit)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Backup & Addon Badges */}
                <div className="pt-2 border-t border-stone-100 space-y-1 text-[11px]">
                  {item.backupOption === 'backup_size' && (
                    <div className="flex items-center justify-between text-stone-700 bg-amber-50/70 px-2 py-1 rounded-md">
                      <span className="flex items-center gap-1">
                        <Scissors className="w-3 h-3 text-amber-700" />
                        <span>Backup Size: <strong>{item.backupSize}</strong></span>
                      </span>
                      <span className="font-semibold text-amber-900">+₹399</span>
                    </div>
                  )}

                  {item.damageProtection && (
                    <div className="flex items-center justify-between text-emerald-800 bg-emerald-50 px-2 py-1 rounded-md">
                      <span className="flex items-center gap-1">
                        <ShieldCheck className="w-3 h-3 text-emerald-600" />
                        <span>Peace of Mind Protection</span>
                      </span>
                      <span className="font-semibold text-emerald-900">+₹299</span>
                    </div>
                  )}
                </div>

              </div>
            ))
          )}
        </div>

        {/* Cart Footer & Price Breakdown */}
        {items.length > 0 && (
          <div className="p-4 sm:p-5 bg-white border-t border-[#E2DBD0] space-y-3">
            
            <div className="space-y-1.5 text-xs text-stone-600">
              <div className="flex justify-between">
                <span>Rental Fee Subtotal</span>
                <span className="font-semibold text-stone-900">{formatINR(rentalSubtotal)}</span>
              </div>

              <div className="flex justify-between text-stone-600">
                <span className="flex items-center gap-1">
                  <span>Refundable Security Deposit</span>
                  <span className="text-[10px] bg-emerald-100 text-emerald-800 px-1 rounded-sm font-medium">100% Refundable</span>
                </span>
                <span className="font-semibold text-stone-900">+{formatINR(securityDepositTotal)}</span>
              </div>

              {backupOptionsTotal > 0 && (
                <div className="flex justify-between">
                  <span>Backup Sizes / Outfits</span>
                  <span className="font-semibold text-stone-900">+{formatINR(backupOptionsTotal)}</span>
                </div>
              )}

              {damageProtectionTotal > 0 && (
                <div className="flex justify-between">
                  <span>Peace of Mind Protection</span>
                  <span className="font-semibold text-stone-900">+{formatINR(damageProtectionTotal)}</span>
                </div>
              )}

              <div className="flex justify-between">
                <span>Doorstep Delivery & Return Pickup</span>
                <span className="font-semibold text-emerald-700">
                  {deliveryFee === 0 ? 'FREE' : formatINR(deliveryFee)}
                </span>
              </div>

              <div className="pt-2 border-t border-stone-200 flex justify-between items-baseline text-sm">
                <div>
                  <span className="font-bold text-stone-900">Total Payable Now</span>
                  <div className="text-[10px] text-emerald-700">
                    Includes {formatINR(securityDepositTotal)} returned post-inspection
                  </div>
                </div>
                <span className="font-serif text-xl font-bold text-[#6B1D2F]">
                  {formatINR(grandTotal)}
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={onProceedToCheckout}
              className="w-full py-3.5 bg-[#450A18] hover:bg-[#340712] text-[#E6CA85] font-bold text-sm rounded-xl shadow-md flex items-center justify-center gap-2 border border-[#E6CA85]/30 cursor-pointer transition-transform hover:scale-[1.01]"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="text-[10px] text-center text-stone-400">
              Free dry cleaning • Reusable zip return bag included • Instant deposit refund
            </div>

          </div>
        )}

      </div>
    </div>
  );
};

```


================================================================================
FILE: /src/components/CheckoutModal.tsx
================================================================================

```typescript
import React, { useState } from 'react';
import { 
  X, 
  CheckCircle2, 
  ShieldCheck, 
  CreditCard, 
  Smartphone, 
  Building2, 
  Banknote, 
  Sparkles, 
  Lock, 
  ArrowLeft,
  AlertCircle
} from 'lucide-react';
import { CartItem, Order, OrderCustomerDetails, OrderStatus } from '../types';
import { calculateCartTotals, formatINR } from '../utils/rentalCalculations';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  defaultCity: string;
  onOrderCompleted: (newOrder: Order) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  defaultCity,
  onOrderCompleted,
}) => {
  if (!isOpen) return null;

  // Form State
  const [customer, setCustomer] = useState<OrderCustomerDetails>({
    fullName: 'Ananya Sharma',
    email: 'ananya.sharma@example.com',
    phone: '9820144521',
    address: 'Flat 402, Sea Green Apartments, Worli Sea Face',
    city: defaultCity || 'Mumbai',
    pincode: '400018',
  });

  // Identity Verification State
  const [idType, setIdType] = useState<'Aadhaar' | 'PAN'>('Aadhaar');
  const [idNumber, setIdNumber] = useState('8492 4819 9012');
  const [isIdVerified, setIsIdVerified] = useState(true);
  const [isVerifying, setIsVerifying] = useState(false);

  // Payment State
  const [paymentMethod, setPaymentMethod] = useState<'UPI' | 'Card' | 'NetBanking' | 'COD'>('UPI');
  const [upiProvider, setUpiProvider] = useState<'PhonePe' | 'GooglePay' | 'Paytm' | 'Other'>('GooglePay');
  const [upiId, setUpiId] = useState('ananya@okhdfcbank');
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const {
    rentalSubtotal,
    securityDepositTotal,
    backupOptionsTotal,
    damageProtectionTotal,
    deliveryFee,
    grandTotal,
  } = calculateCartTotals(items);

  const handleVerifyIdentity = () => {
    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      setIsIdVerified(true);
    }, 800);
  };

  const handlePayAndConfirm = (e: React.FormEvent) => {
    e.preventDefault();

    if (!customer.fullName || !customer.phone || !customer.address || !customer.pincode) {
      setErrorMessage('Please fill in all delivery details.');
      return;
    }

    if (!isIdVerified) {
      setErrorMessage('Please verify your identity (Academic Mock Verification) to proceed.');
      return;
    }

    setErrorMessage('');
    setIsProcessingPayment(true);

    // Simulate payment transaction
    setTimeout(() => {
      setIsProcessingPayment(false);

      const orderNumber = `SR-${Math.floor(10000 + Math.random() * 90000)}`;
      const newOrder: Order = {
        id: `ord-${Date.now()}`,
        orderNumber,
        createdAt: new Date().toISOString(),
        customer,
        items,
        identityVerification: {
          type: idType,
          idNumberMasked: idType === 'Aadhaar' ? 'XXXX-XXXX-9012' : 'ABCDE9012F',
          verified: true,
          verificationDate: new Date().toLocaleDateString('en-IN'),
        },
        payment: {
          method: paymentMethod,
          upiProvider: paymentMethod === 'UPI' ? upiProvider : undefined,
          transactionId: `TXN_${Date.now().toString().slice(-8)}`,
          status: 'Paid',
        },
        pricing: {
          rentalSubtotal,
          securityDepositTotal,
          backupOptionsTotal,
          damageProtectionTotal,
          deliveryFee,
          grandTotal,
        },
        orderStatus: 'Confirmed',
        returnBagTracking: `DELHIVERY-RT-${Math.floor(100000 + Math.random() * 900000)}`,
        timeline: [
          {
            status: 'Confirmed',
            label: 'Order Confirmed',
            timestamp: 'Just now',
            description: 'Your booking has been registered & garment reserved.',
            completed: true,
            current: true,
          },
          {
            status: 'Preparing',
            label: 'Sanitizing & Pressing',
            timestamp: 'Scheduled',
            description: 'Hospital grade UV-C sterilization & crease-free steam iron.',
            completed: false,
            current: false,
          },
          {
            status: 'Dispatched',
            label: 'Dispatched in Eco Bag',
            timestamp: '1 day prior',
            description: 'Courier dispatch with reusable zip return bag.',
            completed: false,
            current: false,
          },
          {
            status: 'Delivered',
            label: 'Doorstep Delivered',
            timestamp: 'Event day morning',
            description: 'Try-on guarantee & wear the look.',
            completed: false,
            current: false,
          },
          {
            status: 'Returned',
            label: 'Return Pickup & QC',
            timestamp: 'Day after event',
            description: 'Delivery agent collects reusable bag.',
            completed: false,
            current: false,
          },
          {
            status: 'Inspected & Refunded',
            label: 'Security Deposit Refunded',
            timestamp: 'Within 24 hrs',
            description: 'Quality pass -> 100% deposit returned to UPI/bank.',
            completed: false,
            current: false,
          },
        ],
      };

      onOrderCompleted(newOrder);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-fade-in">
      <div className="bg-[#FAF7F2] rounded-3xl max-w-3xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-[#E5DECF] relative text-stone-800">
        
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-[#E2DBD0] bg-white flex items-center justify-between sticky top-0 z-10">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-[#6B1D2F] flex items-center justify-center text-[#E6CA85]">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-serif font-bold text-stone-900 text-xl">Secure Rental Checkout</h2>
              <span className="text-xs text-stone-500 font-medium">
                Prototype Demonstration • 256-Bit SSL Encrypted
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-stone-100 text-stone-500"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handlePayAndConfirm} className="p-5 sm:p-7 space-y-6">
          
          {errorMessage && (
            <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* SECTION 1: CUSTOMER DETAILS */}
          <div className="bg-white rounded-2xl border border-stone-200 p-5 space-y-4">
            <h3 className="font-serif font-bold text-stone-900 text-base flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#6B1D2F] text-white text-xs flex items-center justify-center font-sans font-bold">1</span>
              <span>Delivery & Contact Details</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div>
                <label className="font-semibold text-stone-700 block mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  value={customer.fullName}
                  onChange={(e) => setCustomer({ ...customer, fullName: e.target.value })}
                  placeholder="e.g. Ananya Sharma"
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl focus:bg-white focus:outline-hidden focus:border-[#6B1D2F]"
                />
              </div>

              <div>
                <label className="font-semibold text-stone-700 block mb-1">Mobile Number (For OTP & Delivery)</label>
                <input
                  type="tel"
                  required
                  value={customer.phone}
                  onChange={(e) => setCustomer({ ...customer, phone: e.target.value })}
                  placeholder="e.g. 9820144521"
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl focus:bg-white focus:outline-hidden focus:border-[#6B1D2F]"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="font-semibold text-stone-700 block mb-1">Email Address (Order confirmation & invoice)</label>
                <input
                  type="email"
                  required
                  value={customer.email}
                  onChange={(e) => setCustomer({ ...customer, email: e.target.value })}
                  placeholder="e.g. ananya@example.com"
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl focus:bg-white focus:outline-hidden focus:border-[#6B1D2F]"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="font-semibold text-stone-700 block mb-1">Delivery Street Address</label>
                <input
                  type="text"
                  required
                  value={customer.address}
                  onChange={(e) => setCustomer({ ...customer, address: e.target.value })}
                  placeholder="Flat, House No, Building, Landmark"
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl focus:bg-white focus:outline-hidden focus:border-[#6B1D2F]"
                />
              </div>

              <div>
                <label className="font-semibold text-stone-700 block mb-1">City</label>
                <input
                  type="text"
                  required
                  value={customer.city}
                  onChange={(e) => setCustomer({ ...customer, city: e.target.value })}
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl focus:bg-white focus:outline-hidden focus:border-[#6B1D2F]"
                />
              </div>

              <div>
                <label className="font-semibold text-stone-700 block mb-1">Pincode</label>
                <input
                  type="text"
                  required
                  value={customer.pincode}
                  onChange={(e) => setCustomer({ ...customer, pincode: e.target.value })}
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl focus:bg-white focus:outline-hidden focus:border-[#6B1D2F]"
                />
              </div>
            </div>
          </div>

          {/* SECTION 2: IDENTITY VERIFICATION (Aadhaar / PAN Demo) */}
          <div className="bg-white rounded-2xl border border-stone-200 p-5 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-serif font-bold text-stone-900 text-base flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[#6B1D2F] text-white text-xs flex items-center justify-center font-sans font-bold">2</span>
                <span>Identity Verification</span>
              </h3>
              <span className="text-[10px] bg-amber-100 text-amber-900 px-2 py-0.5 rounded-full font-semibold">
                High-Value Outfit Protection
              </span>
            </div>

            <p className="text-xs text-stone-500 leading-relaxed">
              To safeguard designer heritage lehengas and tuxedos, we simulate an identity confirmation check. No sensitive government records are collected in this college demo.
            </p>

            <div className="p-3.5 bg-stone-50 rounded-xl border border-stone-200 space-y-3">
              <div className="flex gap-4 text-xs font-semibold">
                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input
                    type="radio"
                    name="idType"
                    checked={idType === 'Aadhaar'}
                    onChange={() => {
                      setIdType('Aadhaar');
                      setIdNumber('8492 4819 9012');
                    }}
                    className="accent-[#6B1D2F]"
                  />
                  <span>Aadhaar Card (UIDAI Demo)</span>
                </label>
                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input
                    type="radio"
                    name="idType"
                    checked={idType === 'PAN'}
                    onChange={() => {
                      setIdType('PAN');
                      setIdNumber('ABCDE9012F');
                    }}
                    className="accent-[#6B1D2F]"
                  />
                  <span>PAN Card (Demo)</span>
                </label>
              </div>

              <div className="flex gap-2">
                <input
                  type="text"
                  value={idNumber}
                  onChange={(e) => {
                    setIdNumber(e.target.value);
                    setIsIdVerified(false);
                  }}
                  className="flex-1 px-3 py-2 bg-white border border-stone-300 rounded-xl text-xs font-mono"
                  placeholder={idType === 'Aadhaar' ? '12 Digit Aadhaar Number' : '10 Character PAN'}
                />
                
                <button
                  type="button"
                  onClick={handleVerifyIdentity}
                  disabled={isIdVerified || isVerifying}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    isIdVerified
                      ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                      : 'bg-[#6B1D2F] hover:bg-[#521321] text-white'
                  }`}
                >
                  {isVerifying ? 'Checking...' : isIdVerified ? '✓ Identity Verified' : 'Verify Identity'}
                </button>
              </div>

              {isIdVerified && (
                <div className="text-[11px] text-emerald-700 flex items-center gap-1 font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Verified successfully (Mock simulation for academic demo).</span>
                </div>
              )}
            </div>
          </div>

          {/* SECTION 3: INDIAN PAYMENT OPTIONS */}
          <div className="bg-white rounded-2xl border border-stone-200 p-5 space-y-4">
            <h3 className="font-serif font-bold text-stone-900 text-base flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#6B1D2F] text-white text-xs flex items-center justify-center font-sans font-bold">3</span>
              <span>Payment Method</span>
            </h3>

            {/* Payment Method Tabs */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
              {[
                { id: 'UPI', label: 'UPI (Instant)', icon: Smartphone },
                { id: 'Card', label: 'Cards', icon: CreditCard },
                { id: 'NetBanking', label: 'Net Banking', icon: Building2 },
                { id: 'COD', label: 'Cash on Delivery', icon: Banknote },
              ].map((m) => {
                const Icon = m.icon;
                return (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => setPaymentMethod(m.id as any)}
                    className={`p-3 rounded-xl border flex flex-col items-center justify-center gap-1.5 transition-all cursor-pointer ${
                      paymentMethod === m.id
                        ? 'bg-[#6B1D2F]/5 border-[#6B1D2F] text-[#6B1D2F] font-bold shadow-xs ring-1 ring-[#6B1D2F]'
                        : 'border-stone-200 hover:border-stone-300 text-stone-700'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{m.label}</span>
                  </button>
                );
              })}
            </div>

            {/* UPI Sub-Options */}
            {paymentMethod === 'UPI' && (
              <div className="p-4 bg-stone-50 rounded-xl border border-stone-200 space-y-3 text-xs">
                <span className="font-bold text-stone-800 block">Select Preferred UPI App:</span>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'GooglePay', label: 'Google Pay' },
                    { id: 'PhonePe', label: 'PhonePe' },
                    { id: 'Paytm', label: 'Paytm' },
                  ].map((app) => (
                    <button
                      key={app.id}
                      type="button"
                      onClick={() => setUpiProvider(app.id as any)}
                      className={`p-2 rounded-lg border text-center font-medium transition-all ${
                        upiProvider === app.id
                          ? 'bg-white border-[#6B1D2F] text-[#6B1D2F] shadow-xs font-bold'
                          : 'bg-stone-100 border-stone-200 text-stone-600'
                      }`}
                    >
                      {app.label}
                    </button>
                  ))}
                </div>

                <div>
                  <label className="text-[11px] font-semibold text-stone-600 block mb-1">UPI ID / VPA</label>
                  <input
                    type="text"
                    value={upiId}
                    onChange={(e) => setUpiId(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-stone-300 rounded-lg text-xs"
                    placeholder="username@okhdfcbank"
                  />
                </div>
              </div>
            )}

            {paymentMethod === 'Card' && (
              <div className="p-4 bg-stone-50 rounded-xl border border-stone-200 space-y-2 text-xs">
                <div>
                  <label className="font-semibold text-stone-600 block mb-1">Card Number</label>
                  <input
                    type="text"
                    defaultValue="4532 •••• •••• 8812"
                    className="w-full px-3 py-2 bg-white border border-stone-300 rounded-lg text-xs font-mono"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="font-semibold text-stone-600 block mb-1">Valid Thru</label>
                    <input
                      type="text"
                      defaultValue="12/28"
                      className="w-full px-3 py-2 bg-white border border-stone-300 rounded-lg text-xs font-mono"
                    />
                  </div>
                  <div>
                    <label className="font-semibold text-stone-600 block mb-1">CVV</label>
                    <input
                      type="password"
                      defaultValue="782"
                      className="w-full px-3 py-2 bg-white border border-stone-300 rounded-lg text-xs font-mono"
                    />
                  </div>
                </div>
              </div>
            )}

            {paymentMethod === 'COD' && (
              <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-900">
                <strong>Pay on Delivery:</strong> Pay rental fee + deposit upon arrival using cash or delivery agent QR code.
              </div>
            )}
          </div>

          {/* ORDER SUMMARY ACCORDION & SUBMIT BUTTON */}
          <div className="bg-[#F8F4ED] rounded-2xl border border-[#DFCBB5] p-5 space-y-3">
            <div className="flex justify-between items-center text-xs">
              <span className="font-bold text-stone-900">Total Payable Amount</span>
              <span className="font-serif text-2xl font-bold text-[#6B1D2F]">
                {formatINR(grandTotal)}
              </span>
            </div>

            <div className="text-[11px] text-stone-600 flex justify-between border-t border-[#DFCBB5] pt-2">
              <span>Security Deposit (Refunded within 24h of return):</span>
              <span className="font-bold text-emerald-800">{formatINR(securityDepositTotal)}</span>
            </div>

            <button
              type="submit"
              disabled={isProcessingPayment}
              className="w-full py-4 bg-[#450A18] hover:bg-[#340712] text-[#E6CA85] font-bold text-base rounded-xl shadow-lg flex items-center justify-center gap-2 border border-[#E6CA85]/30 cursor-pointer transition-all hover:scale-[1.01]"
            >
              {isProcessingPayment ? (
                <span>Authorizing Mock Transaction...</span>
              ) : (
                <>
                  <Lock className="w-4 h-4 text-[#E6CA85]" />
                  <span>Confirm Booking & Pay {formatINR(grandTotal)}</span>
                </>
              )}
            </button>

            <div className="text-[10px] text-center text-stone-500">
              By confirming, you agree to Style-Rent's Return Policy and Care Guidelines.
            </div>
          </div>

        </form>

      </div>
    </div>
  );
};

```


================================================================================
FILE: /src/components/OrderConfirmationModal.tsx
================================================================================

```typescript
import React from 'react';
import { 
  CheckCircle, 
  Sparkles, 
  Calendar, 
  Package, 
  RotateCcw, 
  Truck, 
  ShieldCheck, 
  ArrowRight, 
  X,
  Copy,
  Check
} from 'lucide-react';
import { Order } from '../types';
import { formatDate, formatINR } from '../utils/rentalCalculations';

interface OrderConfirmationModalProps {
  order: Order | null;
  onClose: () => void;
  onViewOrders: () => void;
}

export const OrderConfirmationModal: React.FC<OrderConfirmationModalProps> = ({
  order,
  onClose,
  onViewOrders,
}) => {
  if (!order) return null;

  const [copied, setCopied] = React.useState(false);

  const copyOrderNumber = () => {
    navigator.clipboard.writeText(order.orderNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const primaryItem = order.items[0];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-fade-in">
      <div className="bg-[#FAF7F2] rounded-3xl max-w-2xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-[#E5DECF] relative text-stone-800 p-6 sm:p-8 space-y-6">
        
        {/* Top Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-stone-200 text-stone-500"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Celebration Header */}
        <div className="text-center space-y-2">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#6B1D2F] to-[#450A18] text-[#E6CA85] flex items-center justify-center mx-auto shadow-lg border border-[#E6CA85]/30 animate-bounce-subtle">
            <CheckCircle className="w-9 h-9" />
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900">
            Your Style-Rent Order is Confirmed!
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 max-w-md mx-auto">
            Thank you, <strong className="text-stone-900">{order.customer.fullName}</strong>. We're getting your designer ensemble sanitized and prepared for dispatch.
          </p>

          <div className="inline-flex items-center gap-2 bg-stone-100 px-3 py-1.5 rounded-full border border-stone-200 text-xs">
            <span className="text-stone-500">Order ID:</span>
            <span className="font-mono font-bold text-[#6B1D2F]">{order.orderNumber}</span>
            <button
              onClick={copyOrderNumber}
              className="p-1 hover:bg-stone-200 rounded-sm text-stone-600"
              title="Copy Order ID"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>

        {/* Outfit Details Card */}
        {primaryItem && (
          <div className="bg-white rounded-2xl border border-stone-200 p-4 flex gap-4 items-center">
            <img
              src={primaryItem.product.images[0]}
              alt={primaryItem.product.name}
              className="w-20 h-24 object-cover object-top rounded-xl border border-stone-200"
            />
            <div className="flex-1 min-w-0 space-y-1">
              <h4 className="font-serif font-bold text-stone-900 text-base truncate">
                {primaryItem.product.name}
              </h4>
              <div className="text-xs text-stone-600">
                Size: <strong className="text-stone-900">{primaryItem.selectedSize}</strong>
                {primaryItem.backupSize && (
                  <span> • Backup: <strong className="text-amber-800">{primaryItem.backupSize}</strong></span>
                )}
              </div>
              <div className="text-xs text-stone-500">
                Rental: <strong>{formatDate(primaryItem.startDate)}</strong> to <strong>{formatDate(primaryItem.returnDate)}</strong>
              </div>
              <div className="text-xs font-semibold text-[#6B1D2F]">
                Paid: {formatINR(order.pricing.grandTotal)} (Includes {formatINR(order.pricing.securityDepositTotal)} refundable deposit)
              </div>
            </div>
          </div>
        )}

        {/* REUSABLE RETURN BAG HIGHLIGHT (Prompt Requirement) */}
        <div className="bg-[#FAF4EB] border border-[#E2D2BE] rounded-2xl p-4 flex items-start gap-3 text-xs text-stone-700">
          <div className="p-2 rounded-xl bg-[#6B1D2F] text-[#E6CA85] shrink-0 mt-0.5">
            <Package className="w-5 h-5" />
          </div>
          <div className="space-y-1">
            <div className="font-bold text-stone-900 text-sm flex items-center gap-1.5">
              <span>Reusable Return Bag Included</span>
              <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.5 rounded-sm">
                Zero Waste
              </span>
            </div>
            <p className="text-stone-600 leading-relaxed text-[11px]">
              Your order arrives inside our durable waterproof zip-lock return bag with a pre-affixed prepaid Delhivery/BlueDart return label. 
              After your event, simply slip the outfit back into the bag—no washing, ironing, or taping required!
            </p>
            <div className="font-mono text-[10px] text-stone-500 pt-0.5">
              Return Waybill: {order.returnBagTracking}
            </div>
          </div>
        </div>

        {/* 7-STEP RENTAL LIFECYCLE TIMELINE (Prompt Requirement) */}
        <div className="bg-white rounded-2xl border border-stone-200 p-5 space-y-4">
          <h3 className="font-serif font-bold text-stone-900 text-sm uppercase tracking-wider">
            Rental Order Timeline
          </h3>

          <div className="relative pl-6 space-y-6 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-stone-200">
            {order.timeline.map((event, idx) => (
              <div key={idx} className="relative group">
                {/* Node icon */}
                <div className={`absolute -left-6 top-0.5 w-4.5 h-4.5 rounded-full flex items-center justify-center border-2 ${
                  event.completed 
                    ? 'bg-[#6B1D2F] border-[#6B1D2F] text-white' 
                    : event.current
                      ? 'bg-amber-500 border-amber-600 text-white animate-pulse'
                      : 'bg-white border-stone-300'
                }`}>
                  {event.completed && <Check className="w-2.5 h-2.5" />}
                </div>

                <div>
                  <div className="flex items-baseline justify-between">
                    <span className={`text-xs font-bold ${event.completed ? 'text-stone-900' : 'text-stone-500'}`}>
                      {event.label}
                    </span>
                    <span className="text-[10px] text-stone-400 font-medium">
                      {event.timestamp}
                    </span>
                  </div>
                  <p className="text-[11px] text-stone-500 mt-0.5">
                    {event.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <button
            type="button"
            onClick={onViewOrders}
            className="flex-1 py-3 px-4 rounded-xl bg-[#6B1D2F] hover:bg-[#521321] text-white text-xs font-bold flex items-center justify-center gap-2 shadow-sm transition-all"
          >
            <span>Track in My Orders</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={onClose}
            className="py-3 px-5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-semibold transition-all"
          >
            Continue Browsing
          </button>
        </div>

      </div>
    </div>
  );
};

```


================================================================================
FILE: /src/components/OrdersTrackerView.tsx
================================================================================

```typescript
import React from 'react';
import { 
  Package, 
  Calendar, 
  Truck, 
  RotateCcw, 
  ShieldCheck, 
  CheckCircle2, 
  Clock, 
  Copy, 
  ExternalLink,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { Order } from '../types';
import { formatDate, formatINR } from '../utils/rentalCalculations';

interface OrdersTrackerViewProps {
  orders: Order[];
  onExploreShop: () => void;
}

export const OrdersTrackerView: React.FC<OrdersTrackerViewProps> = ({
  orders,
  onExploreShop,
}) => {
  const [expandedOrderId, setExpandedOrderId] = React.useState<string | null>(
    orders.length > 0 ? orders[0].id : null
  );

  const toggleExpand = (id: string) => {
    setExpandedOrderId(expandedOrderId === id ? null : id);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-6">
      
      {/* Page Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E2DBD0] pb-6">
        <div>
          <h1 className="font-serif text-3xl font-bold text-stone-900">
            My Rental Bookings & Returns
          </h1>
          <p className="text-stone-600 text-sm mt-1">
            Track your delivery, scheduled event periods, return pickups, and security deposit refunds.
          </p>
        </div>

        <button
          onClick={onExploreShop}
          className="self-start sm:self-auto px-4 py-2 bg-[#6B1D2F] text-white text-xs font-semibold rounded-xl hover:bg-[#521321] transition-all"
        >
          Rent Another Look
        </button>
      </div>

      {orders.length === 0 ? (
        <div className="bg-white rounded-3xl border border-stone-200 p-12 text-center space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-stone-100 flex items-center justify-center text-stone-400 mx-auto">
            <Package className="w-8 h-8" />
          </div>
          <h3 className="font-serif text-xl font-bold text-stone-800">No active rental orders yet</h3>
          <p className="text-stone-500 text-xs max-w-sm mx-auto">
            Browse our curated ethnic collection of lehengas, sherwanis, and gowns with smart operational calendar availability.
          </p>
          <button
            onClick={onExploreShop}
            className="px-6 py-2.5 rounded-xl bg-[#6B1D2F] text-white text-xs font-bold"
          >
            Start Renting
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => {
            const isExpanded = expandedOrderId === order.id;
            return (
              <div 
                key={order.id} 
                className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-xs hover:border-[#6B1D2F]/30 transition-all"
              >
                {/* Summary Header */}
                <div 
                  onClick={() => toggleExpand(order.id)}
                  className="p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 cursor-pointer hover:bg-stone-50/70"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-[#FAF4EB] border border-[#DFCBB5] text-[#6B1D2F] flex items-center justify-center shrink-0">
                      <Package className="w-6 h-6" />
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-[#6B1D2F] text-sm">
                          {order.orderNumber}
                        </span>
                        <span className="text-xs text-stone-400">•</span>
                        <span className="text-xs text-stone-500">
                          Booked on {new Date(order.createdAt).toLocaleDateString('en-IN')}
                        </span>
                      </div>

                      <h4 className="font-serif font-bold text-stone-900 text-base mt-0.5">
                        {order.items.map((i) => i.product.name).join(', ')}
                      </h4>

                      <div className="text-xs text-stone-600 mt-0.5">
                        Delivering to: <strong>{order.customer.city}</strong> • Total Paid: <strong>{formatINR(order.pricing.grandTotal)}</strong>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between md:justify-end gap-3 border-t md:border-t-0 pt-3 md:pt-0 border-stone-100">
                    <div className="text-right">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${
                        order.orderStatus === 'Delivered'
                          ? 'bg-emerald-100 text-emerald-800'
                          : order.orderStatus === 'Confirmed'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-amber-100 text-amber-900'
                      }`}>
                        <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
                        <span>{order.orderStatus}</span>
                      </span>
                      <div className="text-[11px] text-emerald-700 font-semibold mt-1">
                        Refundable Deposit: {formatINR(order.pricing.securityDepositTotal)}
                      </div>
                    </div>

                    <button className="text-stone-400 hover:text-stone-700 p-1">
                      {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                {/* Expanded Details */}
                {isExpanded && (
                  <div className="p-5 border-t border-stone-200 bg-[#FAF7F2]/50 space-y-6">
                    
                    {/* Items List */}
                    <div className="space-y-3">
                      <div className="text-xs font-bold text-stone-700 uppercase tracking-wider">
                        Rented Garments
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {order.items.map((item) => (
                          <div key={item.cartItemId} className="bg-white p-3.5 rounded-xl border border-stone-200 flex gap-3 text-xs">
                            <img
                              src={item.product.images[0]}
                              alt=""
                              className="w-16 h-20 object-cover object-top rounded-lg border border-stone-200"
                            />
                            <div className="flex-1 min-w-0 space-y-1">
                              <h5 className="font-bold text-stone-900 truncate">{item.product.name}</h5>
                              <div className="text-stone-600">
                                Size: <strong>{item.selectedSize}</strong>
                                {item.backupSize && <span> (Backup: {item.backupSize})</span>}
                              </div>
                              <div className="text-stone-500 text-[11px]">
                                Event Period: {formatDate(item.startDate)} - {formatDate(item.returnDate)}
                              </div>
                              <div className="text-[#6B1D2F] font-semibold">
                                Rental Fee: {formatINR(item.rentalFee)}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Delivery & Return Logistics Banner */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                      <div className="bg-white p-4 rounded-xl border border-stone-200 space-y-1.5">
                        <div className="font-bold text-stone-900 flex items-center gap-1.5">
                          <Truck className="w-4 h-4 text-blue-600" />
                          <span>Doorstep Delivery Schedule</span>
                        </div>
                        <p className="text-stone-600">
                          Arrives 1 day before your event in sanitized garment bag.
                        </p>
                        <div className="font-medium text-stone-800">
                          Target Delivery: <strong>{formatDate(order.items[0]?.deliveryDate)}</strong>
                        </div>
                      </div>

                      <div className="bg-white p-4 rounded-xl border border-stone-200 space-y-1.5">
                        <div className="font-bold text-stone-900 flex items-center gap-1.5">
                          <RotateCcw className="w-4 h-4 text-[#6B1D2F]" />
                          <span>Reusable Return Bag Service</span>
                        </div>
                        <p className="text-stone-600">
                          Return slip is pre-printed. Delivery executive picks up bag the morning after event.
                        </p>
                        <div className="font-mono text-[11px] text-stone-700">
                          Return Waybill: <strong>{order.returnBagTracking}</strong>
                        </div>
                      </div>
                    </div>

                    {/* Timeline */}
                    <div className="bg-white p-4 rounded-xl border border-stone-200 space-y-3">
                      <div className="text-xs font-bold text-stone-800 uppercase tracking-wider">
                        Live Tracking History
                      </div>
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2 text-center text-xs">
                        {order.timeline.map((step, idx) => (
                          <div 
                            key={idx} 
                            className={`p-2.5 rounded-xl border ${
                              step.completed 
                                ? 'bg-[#6B1D2F]/10 border-[#6B1D2F]/30 text-[#6B1D2F]' 
                                : 'bg-stone-50 border-stone-200 text-stone-400'
                            }`}
                          >
                            <div className="text-[10px] font-bold uppercase">{step.label}</div>
                            <div className="text-[9px] mt-1">{step.timestamp}</div>
                          </div>
                        ))}
                      </div>
                    </div>

                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

    </div>
  );
};

```


================================================================================
FILE: /src/components/AdminDashboardView.tsx
================================================================================

```typescript
import React, { useState } from 'react';
import { 
  Package, 
  CheckCircle2, 
  AlertTriangle, 
  XCircle, 
  RotateCcw, 
  Camera, 
  RefreshCw, 
  Layers, 
  ClipboardCheck, 
  ShieldCheck, 
  Check, 
  Eye, 
  FileText 
} from 'lucide-react';
import { InventoryItem, Order, ReturnInspection } from '../types';
import { formatDate, formatINR } from '../utils/rentalCalculations';

interface AdminDashboardViewProps {
  orders: Order[];
  onUpdateOrderStatus: (orderId: string, newStatus: any) => void;
  inventory: InventoryItem[];
  onUpdateInventoryStatus: (itemId: string, newStatus: any) => void;
  inspections: ReturnInspection[];
  onProcessInspection: (inspection: ReturnInspection) => void;
}

export const AdminDashboardView: React.FC<AdminDashboardViewProps> = ({
  orders,
  onUpdateOrderStatus,
  inventory,
  onUpdateInventoryStatus,
  inspections,
  onProcessInspection,
}) => {
  const [activeAdminTab, setActiveAdminTab] = useState<'orders' | 'inventory' | 'inspection'>('orders');

  // Inspection form state
  const [selectedOrderId, setSelectedOrderId] = useState<string>(orders[0]?.id || '');
  const [condition, setCondition] = useState<'good' | 'minor' | 'major'>('good');
  const [damageType, setDamageType] = useState('Minor zipper snag (covered under Peace of Mind Protection)');
  const [damagePhoto, setDamagePhoto] = useState<string | null>(null);
  const [inspectorNotes, setInspectorNotes] = useState('Standard intake check. Dry cleaning initiated.');
  const [inspectionSuccess, setInspectionSuccess] = useState(false);

  // Selected Order for Inspection
  const currentOrderForInspection = orders.find((o) => o.id === selectedOrderId) || orders[0];
  const orderDeposit = currentOrderForInspection?.pricing.securityDepositTotal || 2500;
  const hasDamageProtection = currentOrderForInspection?.pricing.damageProtectionTotal ? true : false;

  // Calculate damage deductions based on condition & protection
  let assessedDamageCharge = 0;
  if (condition === 'minor') {
    assessedDamageCharge = hasDamageProtection ? 0 : 500;
  } else if (condition === 'major') {
    assessedDamageCharge = Math.min(orderDeposit, 2000);
  }
  const calculatedRefund = Math.max(0, orderDeposit - assessedDamageCharge);

  const handleSimulatePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const fakeUrl = URL.createObjectURL(e.target.files[0]);
      setDamagePhoto(fakeUrl);
    }
  };

  const handleSubmitInspection = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentOrderForInspection) return;

    const report: ReturnInspection = {
      id: `insp-${Date.now()}`,
      orderId: currentOrderForInspection.id,
      orderNumber: currentOrderForInspection.orderNumber,
      productId: currentOrderForInspection.items[0]?.product.id || 'prod-01',
      productName: currentOrderForInspection.items[0]?.product.name || 'Designer Outfit',
      customerName: currentOrderForInspection.customer.fullName,
      returnCondition: condition,
      damageType: condition === 'good' ? 'None (Pristine Condition)' : damageType,
      damagePhotoUrl: damagePhoto || undefined,
      damageCharge: assessedDamageCharge,
      securityDeposit: orderDeposit,
      refundAmount: calculatedRefund,
      notes: inspectorNotes,
      staffName: 'Pooja Nair (Senior Quality Inspector)',
      inspectedAt: new Date().toISOString(),
      isRefundProcessed: true,
    };

    onProcessInspection(report);
    onUpdateOrderStatus(currentOrderForInspection.id, 'Inspected & Refunded');
    setInspectionSuccess(true);
    setTimeout(() => setInspectionSuccess(false), 4000);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-6">
      
      {/* Top Banner */}
      <div className="bg-[#450A18] text-[#FAF7F2] rounded-3xl p-6 sm:p-8 border border-[#E6CA85]/30 shadow-lg flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-[#E6CA85] text-xs font-semibold uppercase tracking-wider">
            <ClipboardCheck className="w-4 h-4" />
            <span>Staff & Operations Management Console</span>
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold mt-1 text-white">
            Style-Rent Admin & Quality Hub
          </h1>
          <p className="text-stone-300 text-xs sm:text-sm mt-1 max-w-xl">
            Manage live rental shipments, monitor physical inventory sanitization states, and simulate post-event return damage inspections with automated security deposit refund calculation.
          </p>
        </div>

        {/* Tab switchers */}
        <div className="bg-black/40 backdrop-blur-md p-1.5 rounded-2xl border border-white/10 flex gap-1 self-start md:self-auto">
          <button
            onClick={() => setActiveAdminTab('orders')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
              activeAdminTab === 'orders' 
                ? 'bg-[#E6CA85] text-[#450A18] shadow-xs' 
                : 'text-stone-300 hover:text-white'
            }`}
          >
            Orders ({orders.length})
          </button>
          <button
            onClick={() => setActiveAdminTab('inventory')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
              activeAdminTab === 'inventory' 
                ? 'bg-[#E6CA85] text-[#450A18] shadow-xs' 
                : 'text-stone-300 hover:text-white'
            }`}
          >
            Inventory ({inventory.length})
          </button>
          <button
            onClick={() => setActiveAdminTab('inspection')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
              activeAdminTab === 'inspection' 
                ? 'bg-[#E6CA85] text-[#450A18] shadow-xs' 
                : 'text-stone-300 hover:text-white'
            }`}
          >
            Return Inspection Simulator
          </button>
        </div>
      </div>

      {/* TAB 1: ORDERS MANAGEMENT */}
      {activeAdminTab === 'orders' && (
        <div className="bg-white rounded-3xl border border-stone-200 overflow-hidden shadow-xs space-y-4">
          <div className="p-5 border-b border-stone-100 flex items-center justify-between">
            <div>
              <h3 className="font-serif font-bold text-stone-900 text-lg">Active Rental Orders</h3>
              <p className="text-xs text-stone-500">Update shipping and fulfillment statuses across logistics checkpoints.</p>
            </div>
            <span className="text-xs font-mono font-semibold bg-stone-100 text-stone-700 px-3 py-1 rounded-full">
              {orders.length} Total Records
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-stone-50 text-stone-500 font-semibold border-b border-stone-200">
                <tr>
                  <th className="py-3 px-4">Order ID</th>
                  <th className="py-3 px-4">Customer</th>
                  <th className="py-3 px-4">Outfit & Size</th>
                  <th className="py-3 px-4">Event Dates</th>
                  <th className="py-3 px-4">Deposit</th>
                  <th className="py-3 px-4">Current Status</th>
                  <th className="py-3 px-4 text-right">Update Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {orders.map((ord) => {
                  const item = ord.items[0];
                  return (
                    <tr key={ord.id} className="hover:bg-stone-50/70">
                      <td className="py-3 px-4 font-mono font-bold text-[#6B1D2F]">
                        {ord.orderNumber}
                      </td>
                      <td className="py-3 px-4">
                        <div className="font-semibold text-stone-900">{ord.customer.fullName}</div>
                        <div className="text-[10px] text-stone-400">{ord.customer.city} • {ord.customer.phone}</div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="font-medium text-stone-800 truncate max-w-xs">{item?.product.name}</div>
                        <div className="text-[10px] text-stone-500">Size: {item?.selectedSize}</div>
                      </td>
                      <td className="py-3 px-4 text-stone-600">
                        {item ? `${formatDate(item.startDate)} - ${formatDate(item.returnDate)}` : 'N/A'}
                      </td>
                      <td className="py-3 px-4 font-bold text-emerald-800">
                        {formatINR(ord.pricing.securityDepositTotal)}
                      </td>
                      <td className="py-3 px-4">
                        <span className={`inline-block px-2.5 py-1 rounded-full text-[10px] font-bold ${
                          ord.orderStatus === 'Delivered' 
                            ? 'bg-emerald-100 text-emerald-800' 
                            : ord.orderStatus === 'Returned'
                              ? 'bg-purple-100 text-purple-800'
                              : 'bg-blue-100 text-blue-800'
                        }`}>
                          {ord.orderStatus}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <select
                          value={ord.orderStatus}
                          onChange={(e) => onUpdateOrderStatus(ord.id, e.target.value)}
                          className="bg-stone-100 hover:bg-stone-200 text-stone-800 text-[11px] font-semibold px-2 py-1 rounded-lg border border-stone-300 cursor-pointer focus:outline-hidden"
                        >
                          <option value="Confirmed">Confirmed</option>
                          <option value="Preparing">Preparing & Sanitizing</option>
                          <option value="Dispatched">Dispatched</option>
                          <option value="Delivered">Delivered</option>
                          <option value="Returned">Returned (Warehouse)</option>
                          <option value="Inspected & Refunded">Inspected & Refunded</option>
                        </select>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 2: INVENTORY & GARMENT UNITS */}
      {activeAdminTab === 'inventory' && (
        <div className="bg-white rounded-3xl border border-stone-200 overflow-hidden shadow-xs space-y-4">
          <div className="p-5 border-b border-stone-100 flex items-center justify-between">
            <div>
              <h3 className="font-serif font-bold text-stone-900 text-lg">Physical Garment Inventory & Hygiene Tracking</h3>
              <p className="text-xs text-stone-500">Each garment SKU tracks real-time status: Available, Rented, Cleaning, or Maintenance.</p>
            </div>
            <div className="flex gap-2 text-xs">
              <span className="bg-emerald-50 text-emerald-700 px-2.5 py-1 rounded-md font-semibold border border-emerald-200">
                ● Available
              </span>
              <span className="bg-blue-50 text-blue-700 px-2.5 py-1 rounded-md font-semibold border border-blue-200">
                ● Rented
              </span>
              <span className="bg-amber-50 text-amber-700 px-2.5 py-1 rounded-md font-semibold border border-amber-200">
                ● In Cleaning
              </span>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-stone-50 text-stone-500 font-semibold border-b border-stone-200">
                <tr>
                  <th className="py-3 px-4">Garment SKU</th>
                  <th className="py-3 px-4">Product Name</th>
                  <th className="py-3 px-4">Category</th>
                  <th className="py-3 px-4">Size</th>
                  <th className="py-3 px-4">Hub Location</th>
                  <th className="py-3 px-4">Current Status</th>
                  <th className="py-3 px-4 text-right">Quick Change</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {inventory.map((inv) => (
                  <tr key={inv.id} className="hover:bg-stone-50/70">
                    <td className="py-3 px-4 font-mono font-bold text-stone-700">
                      {inv.sku}
                    </td>
                    <td className="py-3 px-4 font-medium text-stone-900">
                      {inv.productName}
                    </td>
                    <td className="py-3 px-4 text-stone-500">
                      {inv.category}
                    </td>
                    <td className="py-3 px-4 font-bold text-stone-800">
                      {inv.size}
                    </td>
                    <td className="py-3 px-4 text-stone-500 font-mono text-[11px]">
                      {inv.location}
                    </td>
                    <td className="py-3 px-4">
                      <span className={`inline-block px-2.5 py-1 rounded-full text-[10px] font-bold ${
                        inv.status === 'Available'
                          ? 'bg-emerald-100 text-emerald-800'
                          : inv.status === 'Rented'
                            ? 'bg-blue-100 text-blue-800'
                            : inv.status === 'Cleaning'
                              ? 'bg-amber-100 text-amber-800'
                              : 'bg-red-100 text-red-800'
                      }`}>
                        {inv.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <select
                        value={inv.status}
                        onChange={(e) => onUpdateInventoryStatus(inv.id, e.target.value)}
                        className="bg-stone-100 text-stone-800 font-semibold px-2 py-1 rounded-lg border border-stone-300 text-[11px]"
                      >
                        <option value="Available">Available</option>
                        <option value="Rented">Rented</option>
                        <option value="Cleaning">Cleaning & QC</option>
                        <option value="Maintenance">Maintenance</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: RETURN INSPECTION SIMULATOR (Prompt Requirement #17) */}
      {activeAdminTab === 'inspection' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Inspection Form (7 cols) */}
          <div className="lg:col-span-7 bg-white rounded-3xl border border-stone-200 p-6 space-y-5 shadow-xs">
            <div>
              <h3 className="font-serif font-bold text-stone-900 text-lg">
                Post-Return Quality Inspection & Deposit Refund
              </h3>
              <p className="text-xs text-stone-500 mt-0.5">
                Inspect returned garment, assess condition, calculate damage deductions, and process automated refund.
              </p>
            </div>

            {inspectionSuccess && (
              <div className="p-3.5 bg-emerald-50 border border-emerald-300 rounded-xl text-emerald-800 text-xs flex items-center gap-2 animate-fade-in font-medium">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                <span>
                  Return inspection completed! Security deposit of {formatINR(calculatedRefund)} was refunded to customer UPI. Garment transitioned to "Cleaning".
                </span>
              </div>
            )}

            <form onSubmit={handleSubmitInspection} className="space-y-4 text-xs">
              
              {/* Select Return Order */}
              <div>
                <label className="font-bold text-stone-800 block mb-1">Select Returned Order for Intake</label>
                <select
                  value={selectedOrderId}
                  onChange={(e) => setSelectedOrderId(e.target.value)}
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl text-xs font-semibold text-stone-800"
                >
                  {orders.map((o) => (
                    <option key={o.id} value={o.id}>
                      {o.orderNumber} - {o.customer.fullName} ({o.items[0]?.product.name})
                    </option>
                  ))}
                </select>
              </div>

              {/* Garment Condition Picker */}
              <div>
                <label className="font-bold text-stone-800 block mb-1.5">Inspected Return Condition</label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setCondition('good')}
                    className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
                      condition === 'good'
                        ? 'bg-emerald-50 border-emerald-500 text-emerald-900 font-bold ring-1 ring-emerald-500'
                        : 'border-stone-200 hover:bg-stone-50 text-stone-700'
                    }`}
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 mx-auto mb-1" />
                    <span>✓ Good Condition</span>
                    <span className="block text-[10px] text-emerald-700 mt-0.5">100% Refund</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setCondition('minor')}
                    className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
                      condition === 'minor'
                        ? 'bg-amber-50 border-amber-500 text-amber-900 font-bold ring-1 ring-amber-500'
                        : 'border-stone-200 hover:bg-stone-50 text-stone-700'
                    }`}
                  >
                    <AlertTriangle className="w-4 h-4 text-amber-600 mx-auto mb-1" />
                    <span>⚠ Minor Damage</span>
                    <span className="block text-[10px] text-amber-700 mt-0.5">
                      {hasDamageProtection ? 'Protected (₹0)' : '₹500 Fee'}
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setCondition('major')}
                    className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
                      condition === 'major'
                        ? 'bg-red-50 border-red-500 text-red-900 font-bold ring-1 ring-red-500'
                        : 'border-stone-200 hover:bg-stone-50 text-stone-700'
                    }`}
                  >
                    <XCircle className="w-4 h-4 text-red-600 mx-auto mb-1" />
                    <span>✕ Major Damage</span>
                    <span className="block text-[10px] text-red-700 mt-0.5">Deposit Retained</span>
                  </button>
                </div>
              </div>

              {/* Damage Notes if not good */}
              {condition !== 'good' && (
                <div>
                  <label className="font-bold text-stone-800 block mb-1">Damage Description</label>
                  <input
                    type="text"
                    value={damageType}
                    onChange={(e) => setDamageType(e.target.value)}
                    placeholder="e.g. Small stain on dupatta hemline, loose button"
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl"
                  />
                </div>
              )}

              {/* Upload Damage Photo Section */}
              <div>
                <label className="font-bold text-stone-800 block mb-1">
                  Upload Return / Damage Photo (Simulated)
                </label>
                <div className="border-2 border-dashed border-stone-300 rounded-xl p-4 text-center hover:bg-stone-50 cursor-pointer relative">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleSimulatePhotoUpload}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                  />
                  <Camera className="w-6 h-6 text-stone-400 mx-auto mb-1" />
                  <span className="text-stone-600 font-medium">Click to select photo</span>
                  <span className="text-[10px] text-stone-400 block">PNG, JPG up to 10MB</span>
                </div>

                {damagePhoto && (
                  <div className="mt-2 flex items-center gap-2">
                    <img src={damagePhoto} alt="Damage" className="w-12 h-12 rounded-lg object-cover border" />
                    <span className="text-[11px] text-emerald-700 font-medium">Photo attached to inspection file</span>
                  </div>
                )}
              </div>

              {/* Staff Notes */}
              <div>
                <label className="font-bold text-stone-800 block mb-1">Inspector Internal Remarks</label>
                <textarea
                  rows={2}
                  value={inspectorNotes}
                  onChange={(e) => setInspectorNotes(e.target.value)}
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-3.5 bg-[#450A18] hover:bg-[#340712] text-[#E6CA85] font-bold text-xs rounded-xl shadow-md transition-all cursor-pointer border border-[#E6CA85]/30"
              >
                Complete Inspection & Process Refund
              </button>
            </form>
          </div>

          {/* Refund Calculation & Summary Card (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-[#FAF7F2] rounded-3xl border border-[#DFCBB5] p-6 space-y-4 text-xs">
              <h4 className="font-serif font-bold text-stone-900 text-base">
                Security Deposit Settlement Breakdown
              </h4>

              <div className="bg-white p-4 rounded-2xl border border-stone-200 space-y-2.5">
                <div className="flex justify-between text-stone-600">
                  <span>Customer Name:</span>
                  <strong className="text-stone-900">{currentOrderForInspection?.customer.fullName}</strong>
                </div>

                <div className="flex justify-between text-stone-600">
                  <span>Order Reference:</span>
                  <span className="font-mono font-bold text-[#6B1D2F]">{currentOrderForInspection?.orderNumber}</span>
                </div>

                <div className="flex justify-between text-stone-600">
                  <span>Peace of Mind Protection:</span>
                  <span className={`font-semibold ${hasDamageProtection ? 'text-emerald-700' : 'text-stone-500'}`}>
                    {hasDamageProtection ? 'Active (Covers Minor)' : 'Not Opted'}
                  </span>
                </div>

                <div className="pt-2 border-t border-stone-200 flex justify-between">
                  <span>Held Security Deposit:</span>
                  <span className="font-bold text-stone-900">{formatINR(orderDeposit)}</span>
                </div>

                <div className="flex justify-between text-red-600">
                  <span>Damage Charge Deducted:</span>
                  <span className="font-bold">
                    {assessedDamageCharge === 0 ? '₹0 (Waived)' : `-${formatINR(assessedDamageCharge)}`}
                  </span>
                </div>

                <div className="pt-2 border-t border-stone-300 flex justify-between items-baseline text-sm">
                  <span className="font-bold text-stone-900">Refund to Customer UPI:</span>
                  <span className="font-serif text-xl font-bold text-emerald-700">
                    {formatINR(calculatedRefund)}
                  </span>
                </div>
              </div>

              {/* Previous Inspection Logs */}
              <div className="space-y-2 pt-2">
                <div className="text-[11px] font-bold text-stone-700 uppercase tracking-wider">
                  Recent Inspection Logs
                </div>
                {inspections.map((insp) => (
                  <div key={insp.id} className="bg-white p-3 rounded-xl border border-stone-200 text-[11px] space-y-1">
                    <div className="flex justify-between font-semibold">
                      <span>{insp.orderNumber} - {insp.customerName}</span>
                      <span className="text-emerald-700">Refunded {formatINR(insp.refundAmount)}</span>
                    </div>
                    <div className="text-stone-500 text-[10px]">
                      Condition: {insp.returnCondition.toUpperCase()} • {insp.staffName}
                    </div>
                  </div>
                ))}
              </div>

            </div>
          </div>

        </div>
      )}

    </div>
  );
};

```


================================================================================
FILE: /src/components/DatabaseView.tsx
================================================================================

```typescript
import React, { useState } from 'react';
import { 
  Database, 
  Table, 
  Code2, 
  Download, 
  Copy, 
  Check, 
  Layers, 
  Search, 
  Key, 
  Link2, 
  Info, 
  BookOpen,
  Sparkles
} from 'lucide-react';
import { STYLE_RENT_DATABASE_TABLES, SQL_SCHEMA_DDL } from '../data/databaseSchema';

export const DatabaseView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'tables' | 'er-diagram' | 'sql' | 'json' | 'architecture'>('tables');
  const [selectedTable, setSelectedTable] = useState<string>('products');
  const [tableSearch, setTableSearch] = useState<string>('');
  const [copiedSQL, setCopiedSQL] = useState(false);
  const [copiedJSON, setCopiedJSON] = useState(false);

  const currentTable = STYLE_RENT_DATABASE_TABLES.find((t) => t.tableName === selectedTable) || STYLE_RENT_DATABASE_TABLES[0];

  const filteredRows = currentTable.sampleRows.filter((row) => 
    JSON.stringify(row).toLowerCase().includes(tableSearch.toLowerCase())
  );

  const handleCopySQL = () => {
    navigator.clipboard.writeText(SQL_SCHEMA_DDL);
    setCopiedSQL(true);
    setTimeout(() => setCopiedSQL(false), 2000);
  };

  const handleCopyJSON = () => {
    const jsonStr = JSON.stringify(STYLE_RENT_DATABASE_TABLES, null, 2);
    navigator.clipboard.writeText(jsonStr);
    setCopiedJSON(true);
    setTimeout(() => setCopiedJSON(false), 2000);
  };

  const handleDownloadSQL = () => {
    const blob = new Blob([SQL_SCHEMA_DDL], { type: 'text/sql' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'style_rent_schema.sql';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const handleDownloadJSON = () => {
    const jsonStr = JSON.stringify(STYLE_RENT_DATABASE_TABLES, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'style_rent_database.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-6">
      
      {/* Header Banner */}
      <div className="bg-[#450A18] text-[#FAF7F2] rounded-3xl p-6 sm:p-8 border border-[#E6CA85]/30 shadow-lg flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-[#E6CA85] text-xs font-semibold uppercase tracking-wider">
            <Database className="w-4 h-4" />
            <span>Relational Database Management System (RDBMS) Design</span>
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold mt-1 text-white">
            Style-Rent Relational Database Studio
          </h1>
          <p className="text-stone-300 text-xs sm:text-sm mt-1 max-w-xl">
            Complete database architecture designed for college project presentations and viva examinations. Explore schemas, foreign keys, operational buffer tables, and export SQL DDL scripts.
          </p>
        </div>

        {/* Action Download Buttons */}
        <div className="flex flex-wrap items-center gap-2 self-start md:self-auto">
          <button
            onClick={handleDownloadSQL}
            className="px-3.5 py-2 rounded-xl bg-[#E6CA85] text-[#450A18] text-xs font-bold shadow-md flex items-center gap-1.5 hover:bg-[#d8b868] transition-all cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download .SQL</span>
          </button>

          <button
            onClick={handleDownloadJSON}
            className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold border border-white/20 flex items-center gap-1.5 transition-all cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download .JSON</span>
          </button>
        </div>
      </div>

      {/* Tabs Row */}
      <div className="flex gap-2 border-b border-[#DFCBB5] pb-2 overflow-x-auto text-xs font-semibold">
        {[
          { id: 'tables', label: 'Interactive Table Explorer', icon: Table },
          { id: 'er-diagram', label: 'ER Schema & Foreign Keys', icon: Layers },
          { id: 'sql', label: 'SQL DDL Query Script', icon: Code2 },
          { id: 'json', label: 'JSON Dataset', icon: Database },
          { id: 'architecture', label: 'Academic Viva & Design Notes', icon: BookOpen },
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2.5 rounded-xl flex items-center gap-2 transition-all shrink-0 cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-[#6B1D2F] text-white shadow-xs font-bold'
                  : 'bg-white text-stone-600 hover:bg-stone-100 border border-stone-200'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: INTERACTIVE TABLE EXPLORER */}
      {activeTab === 'tables' && (
        <div className="space-y-4">
          
          {/* Table Selector Pills */}
          <div className="flex flex-wrap gap-2 items-center">
            <span className="text-xs font-bold text-stone-600 mr-2">Select Table:</span>
            {STYLE_RENT_DATABASE_TABLES.map((t) => (
              <button
                key={t.tableName}
                onClick={() => {
                  setSelectedTable(t.tableName);
                  setTableSearch('');
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-mono font-semibold transition-all cursor-pointer ${
                  selectedTable === t.tableName
                    ? 'bg-[#6B1D2F] text-white shadow-xs'
                    : 'bg-white text-stone-700 border border-stone-200 hover:bg-stone-50'
                }`}
              >
                {t.tableName} ({t.sampleRows.length})
              </button>
            ))}
          </div>

          {/* Table Container */}
          <div className="bg-white rounded-3xl border border-stone-200 overflow-hidden shadow-xs space-y-4">
            
            {/* Table Meta & Search */}
            <div className="p-5 border-b border-stone-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="font-mono text-base font-bold text-[#6B1D2F] flex items-center gap-2">
                  <Table className="w-4 h-4" />
                  <span>TABLE: {currentTable.tableName}</span>
                </h3>
                <p className="text-xs text-stone-500 mt-0.5">{currentTable.description}</p>
              </div>

              <div className="relative w-full sm:w-64">
                <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
                <input
                  type="text"
                  placeholder="Filter table rows..."
                  value={tableSearch}
                  onChange={(e) => setTableSearch(e.target.value)}
                  className="w-full pl-8 pr-3 py-1.5 text-xs bg-stone-50 border border-stone-200 rounded-lg focus:bg-white focus:outline-hidden"
                />
              </div>
            </div>

            {/* Columns Schema View (Top Summary) */}
            <div className="px-5 py-2 bg-stone-50/70 border-b border-stone-200 text-xs">
              <span className="font-bold text-stone-700 block mb-1">Column Definitions:</span>
              <div className="flex flex-wrap gap-1.5">
                {currentTable.columns.map((c) => (
                  <span 
                    key={c.name}
                    className="inline-flex items-center gap-1 bg-white border border-stone-200 px-2 py-0.5 rounded-md font-mono text-[11px] text-stone-700"
                    title={c.description}
                  >
                    {c.isPrimary && <Key className="w-3 h-3 text-amber-600" />}
                    {c.isForeign && <Link2 className="w-3 h-3 text-blue-600" />}
                    <strong className="text-stone-900">{c.name}</strong>
                    <span className="text-stone-400">({c.type})</span>
                  </span>
                ))}
              </div>
            </div>

            {/* Live Rows Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-stone-50 text-stone-500 font-semibold border-b border-stone-200">
                  <tr>
                    {currentTable.columns.map((c) => (
                      <th key={c.name} className="py-2.5 px-4 font-mono font-bold whitespace-nowrap">
                        <div className="flex items-center gap-1">
                          {c.isPrimary && <Key className="w-3 h-3 text-amber-600" />}
                          {c.isForeign && <Link2 className="w-3 h-3 text-blue-600" />}
                          <span>{c.name}</span>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100 font-mono text-[11px]">
                  {filteredRows.length === 0 ? (
                    <tr>
                      <td colSpan={currentTable.columns.length} className="py-6 text-center text-stone-400">
                        No rows matching filter.
                      </td>
                    </tr>
                  ) : (
                    filteredRows.map((row, rIdx) => (
                      <tr key={rIdx} className="hover:bg-stone-50/80">
                        {currentTable.columns.map((c) => (
                          <td key={c.name} className="py-2.5 px-4 whitespace-nowrap max-w-xs truncate text-stone-700">
                            {typeof row[c.name] === 'boolean' 
                              ? (row[c.name] ? 'TRUE' : 'FALSE') 
                              : row[c.name] === null || row[c.name] === undefined 
                                ? 'NULL' 
                                : String(row[c.name])}
                          </td>
                        ))}
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

          </div>
        </div>
      )}

      {/* TAB 2: ER SCHEMA & FOREIGN KEYS */}
      {activeTab === 'er-diagram' && (
        <div className="space-y-6">
          <div className="bg-[#FAF7F2] p-4 rounded-2xl border border-[#DFCBB5] text-xs text-stone-700">
            <strong>Relational Entity Relationship (ER) Model:</strong> Style-Rent employs a 3rd Normal Form (3NF) relational model. 
            Notice how physical units are detached into <code className="bg-stone-200 px-1 py-0.5 rounded font-mono">inventory_units</code> to track wear count and sterilization, while <code className="bg-stone-200 px-1 py-0.5 rounded font-mono">operational_buffers</code> handles time-based availability without database deadlocks.
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {STYLE_RENT_DATABASE_TABLES.map((t) => (
              <div key={t.tableName} className="bg-white rounded-2xl border border-stone-200 p-4 space-y-3 shadow-xs hover:border-[#6B1D2F]/40 transition-all">
                <div className="flex items-center justify-between border-b border-stone-100 pb-2">
                  <span className="font-mono font-bold text-sm text-[#6B1D2F]">{t.tableName}</span>
                  <span className="text-[10px] bg-stone-100 text-stone-500 px-2 py-0.5 rounded-full font-mono">
                    {t.columns.length} cols
                  </span>
                </div>

                <div className="space-y-1.5 text-xs font-mono">
                  {t.columns.map((c) => (
                    <div key={c.name} className="flex items-center justify-between text-[11px] py-0.5">
                      <div className="flex items-center gap-1">
                        {c.isPrimary && <span title="Primary Key"><Key className="w-3 h-3 text-amber-600 shrink-0" /></span>}
                        {c.isForeign && <span title={`Foreign Key references ${c.references}`}><Link2 className="w-3 h-3 text-blue-600 shrink-0" /></span>}
                        <span className={`font-semibold ${c.isPrimary ? 'text-amber-900' : c.isForeign ? 'text-blue-900' : 'text-stone-800'}`}>
                          {c.name}
                        </span>
                      </div>
                      <span className="text-stone-400 text-[10px]">{c.type}</span>
                    </div>
                  ))}
                </div>

                {t.columns.some((c) => c.isForeign) && (
                  <div className="pt-2 border-t border-stone-100 text-[10px] text-blue-700 font-sans space-y-0.5">
                    <span className="font-semibold block">Foreign Relationships:</span>
                    {t.columns.filter((c) => c.isForeign).map((c) => (
                      <div key={c.name} className="flex items-center gap-1 font-mono">
                        <span>↳ {c.name} ➔ {c.references}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: SQL DDL SCRIPT */}
      {activeTab === 'sql' && (
        <div className="bg-[#1F1D1D] rounded-3xl p-6 text-stone-200 space-y-4 shadow-xl border border-stone-700">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Code2 className="w-5 h-5 text-[#E6CA85]" />
              <span className="font-mono text-sm font-bold text-white">style_rent_schema.sql</span>
              <span className="text-xs text-stone-400 font-mono">(PostgreSQL / MySQL DDL)</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleCopySQL}
                className="px-3 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-xs font-semibold text-stone-200 flex items-center gap-1 border border-stone-700 cursor-pointer"
              >
                {copiedSQL ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedSQL ? 'Copied' : 'Copy SQL'}</span>
              </button>

              <button
                onClick={handleDownloadSQL}
                className="px-3 py-1.5 rounded-lg bg-[#E6CA85] hover:bg-[#d8b868] text-xs font-bold text-[#450A18] flex items-center gap-1 cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Save SQL File</span>
              </button>
            </div>
          </div>

          <pre className="font-mono text-xs text-stone-300 bg-black/60 p-5 rounded-2xl overflow-x-auto max-h-[500px] leading-relaxed">
            {SQL_SCHEMA_DDL}
          </pre>
        </div>
      )}

      {/* TAB 4: JSON DATASET */}
      {activeTab === 'json' && (
        <div className="bg-[#1F1D1D] rounded-3xl p-6 text-stone-200 space-y-4 shadow-xl border border-stone-700">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Database className="w-5 h-5 text-[#E6CA85]" />
              <span className="font-mono text-sm font-bold text-white">db.json (Relational Seed Store)</span>
            </div>

            <button
              onClick={handleCopyJSON}
              className="px-3 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-xs font-semibold text-stone-200 flex items-center gap-1 border border-stone-700 cursor-pointer"
            >
              {copiedJSON ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedJSON ? 'Copied JSON' : 'Copy JSON'}</span>
            </button>
          </div>

          <pre className="font-mono text-xs text-emerald-400 bg-black/60 p-5 rounded-2xl overflow-x-auto max-h-[500px] leading-relaxed">
            {JSON.stringify(STYLE_RENT_DATABASE_TABLES, null, 2)}
          </pre>
        </div>
      )}

      {/* TAB 5: ACADEMIC VIVA & DESIGN NOTES */}
      {activeTab === 'architecture' && (
        <div className="bg-white rounded-3xl border border-stone-200 p-6 sm:p-8 space-y-6 text-stone-800 text-xs leading-relaxed">
          <div className="space-y-1">
            <h3 className="font-serif text-xl font-bold text-stone-900">
              Style-Rent: Database Engineering & Technical Architecture Report
            </h3>
            <p className="text-stone-500">Prepared for College Project Evaluators & Technical Viva</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#DFCBB5] space-y-2">
              <h4 className="font-bold text-sm text-[#6B1D2F]">1. The "Operational Buffer" Innovation</h4>
              <p className="text-stone-600">
                In traditional e-commerce, an item is simply sold and removed from stock. In a clothing rental startup, an outfit returns and must undergo <strong>inspection, hydro-dry cleaning, UV-C sanitization, and packaging</strong> before the next user can wear it. 
                Our <code className="bg-stone-200 px-1 py-0.5 rounded font-mono">operational_buffers</code> table models this 2-3 day pre- and post-event lockout period mathematically to completely eliminate double-booking bugs.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#DFCBB5] space-y-2">
              <h4 className="font-bold text-sm text-[#6B1D2F]">2. Database Normalization (3NF)</h4>
              <p className="text-stone-600">
                Products (catalog templates) are separated from <code className="bg-stone-200 px-1 py-0.5 rounded font-mono">inventory_units</code> (physical barcoded garment assets). 
                This ensures that if one specific Sherwani in Size L is at the dry cleaner, another Sherwani in Size XL remains bookable without duplicating product descriptions or media assets.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#DFCBB5] space-y-2">
              <h4 className="font-bold text-sm text-[#6B1D2F]">3. Security Deposit & Damage Ledger</h4>
              <p className="text-stone-600">
                Every rental agreement includes a refundable collateral deposit stored in <code className="bg-stone-200 px-1 py-0.5 rounded font-mono">orders.security_deposit_total</code>. 
                When the package returns, warehouse staff complete a <code className="bg-stone-200 px-1 py-0.5 rounded font-mono">damage_inspections</code> record. The system calculates net refund = (Deposit - DamageFee) and dispatches automated UPI reversals.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#DFCBB5] space-y-2">
              <h4 className="font-bold text-sm text-[#6B1D2F]">4. Privacy & KYC Mock Implementation</h4>
              <p className="text-stone-600">
                For high-value designer apparel, users undergo mock Aadhaar / PAN confirmation. To comply with privacy best practices, ID numbers are stored with standard masking (<code className="bg-stone-200 px-1 py-0.5 rounded font-mono">XXXX-XXXX-4819</code>) rather than plaintext raw documents.
              </p>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

```


================================================================================
FILE: /src/components/ShopView.tsx
================================================================================

```typescript
import React, { useState, useMemo } from 'react';
import { 
  Filter, 
  SlidersHorizontal, 
  Search, 
  X, 
  Sparkles, 
  ArrowUpDown,
  Tag
} from 'lucide-react';
import { CategoryType, GenderType, OccasionType, Product } from '../types';
import { ProductCard } from './ProductCard';

interface ShopViewProps {
  products: Product[];
  onSelectProduct: (product: Product) => void;
  wishlistIds: string[];
  onToggleWishlist: (productId: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  initialOccasion?: OccasionType | 'All';
}

const CATEGORIES: CategoryType[] = [
  'Lehenga',
  'Sherwani',
  'Saree',
  'Gown',
  'Anarkali',
  'Kurta Set',
  'Indo-Western',
  'Blazer & Tuxedo',
  'Accessories'
];

const GENDERS: GenderType[] = ['Women', 'Men', 'Unisex'];

const SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

const OCCASIONS: OccasionType[] = [
  'Sangeet',
  'Haldi',
  'Wedding',
  'Cocktail Party',
  'Pre-Wedding Shoot',
  'College Function',
  'Corporate Gala',
  'Festivities'
];

export const ShopView: React.FC<ShopViewProps> = ({
  products,
  onSelectProduct,
  wishlistIds,
  onToggleWishlist,
  searchQuery,
  setSearchQuery,
  initialOccasion = 'All',
}) => {
  // Filter States
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedGender, setSelectedGender] = useState<string>('All');
  const [selectedSize, setSelectedSize] = useState<string>('All');
  const [selectedOccasion, setSelectedOccasion] = useState<string>(initialOccasion || 'All');
  const [maxPrice, setMaxPrice] = useState<number>(3000);
  const [sortBy, setSortBy] = useState<'popular' | 'price_low' | 'price_high' | 'rating'>('popular');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Sync if initialOccasion prop changes
  React.useEffect(() => {
    if (initialOccasion) {
      setSelectedOccasion(initialOccasion);
    }
  }, [initialOccasion]);

  // Reset filters
  const handleResetFilters = () => {
    setSelectedCategory('All');
    setSelectedGender('All');
    setSelectedSize('All');
    setSelectedOccasion('All');
    setMaxPrice(3000);
    setSearchQuery('');
  };

  // Filtered & Sorted products
  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        // Search query
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchesTitle = p.name.toLowerCase().includes(q);
          const matchesCat = p.category.toLowerCase().includes(q);
          const matchesOcc = p.occasions.some((o) => o.toLowerCase().includes(q));
          const matchesFabric = p.fabric.toLowerCase().includes(q);
          if (!matchesTitle && !matchesCat && !matchesOcc && !matchesFabric) return false;
        }

        // Category
        if (selectedCategory !== 'All' && p.category !== selectedCategory) return false;

        // Gender
        if (selectedGender !== 'All' && p.gender !== selectedGender && p.gender !== 'Unisex') return false;

        // Size
        if (selectedSize !== 'All' && !p.sizes.includes(selectedSize as any)) return false;

        // Occasion
        if (selectedOccasion !== 'All' && !p.occasions.includes(selectedOccasion as any)) return false;

        // Price
        if (p.rentalPrice3Days > maxPrice) return false;

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price_low') return a.rentalPrice3Days - b.rentalPrice3Days;
        if (sortBy === 'price_high') return b.rentalPrice3Days - a.rentalPrice3Days;
        if (sortBy === 'rating') return b.rating - a.rating;
        // Default popular
        return (b.isPopular ? 1 : 0) - (a.isPopular ? 1 : 0);
      });
  }, [products, searchQuery, selectedCategory, selectedGender, selectedSize, selectedOccasion, maxPrice, sortBy]);

  const activeFiltersCount = [
    selectedCategory !== 'All',
    selectedGender !== 'All',
    selectedSize !== 'All',
    selectedOccasion !== 'All',
    maxPrice < 3000,
    searchQuery.trim() !== '',
  ].filter(Boolean).length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Top Banner / Breadcrumb */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#E2DBD0] pb-6">
        <div>
          <div className="text-xs uppercase font-bold text-[#8C6D46] tracking-wider flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Designer Catalog & Live Rentals</span>
          </div>
          <h1 className="font-serif text-3xl font-bold text-stone-900 mt-1">
            Browse Outfits ({filteredProducts.length})
          </h1>
          <p className="text-stone-500 text-xs sm:text-sm mt-0.5">
            Discover verified couture with 2-3 day operational buffer, backup sizing, and doorstep return pickup.
          </p>
        </div>

        {/* Sort & Mobile Filter Toggle */}
        <div className="flex items-center gap-3 self-start md:self-auto">
          {/* Mobile Filter Button */}
          <button
            onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
            className="lg:hidden px-3.5 py-2 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-xl text-xs font-semibold flex items-center gap-2 border border-stone-300"
          >
            <Filter className="w-3.5 h-3.5 text-[#6B1D2F]" />
            <span>Filters {activeFiltersCount > 0 && `(${activeFiltersCount})`}</span>
          </button>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-1.5 bg-white border border-stone-200 px-3 py-2 rounded-xl text-xs font-semibold text-stone-700 shadow-2xs">
            <ArrowUpDown className="w-3.5 h-3.5 text-stone-400" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-transparent focus:outline-hidden cursor-pointer"
            >
              <option value="popular">Most Popular</option>
              <option value="price_low">Price: Low to High</option>
              <option value="price_high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Content Layout (Sidebar + Grid) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* DESKTOP SIDEBAR FILTERS (3 cols) */}
        <aside className="hidden lg:block lg:col-span-3 bg-white rounded-3xl border border-stone-200 p-5 space-y-6 shadow-xs sticky top-24">
          
          <div className="flex items-center justify-between pb-3 border-b border-stone-100">
            <span className="font-serif font-bold text-stone-900 text-base flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-[#6B1D2F]" />
              <span>Refine Outfits</span>
            </span>
            {activeFiltersCount > 0 && (
              <button
                onClick={handleResetFilters}
                className="text-xs font-semibold text-[#6B1D2F] hover:underline"
              >
                Reset All
              </button>
            )}
          </div>

          {/* Gender Filter */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-stone-800 uppercase tracking-wider block">
              Gender
            </label>
            <div className="flex flex-wrap gap-1.5">
              {['All', ...GENDERS].map((g) => (
                <button
                  key={g}
                  onClick={() => setSelectedGender(g)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    selectedGender === g
                      ? 'bg-[#6B1D2F] text-white shadow-xs'
                      : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                  }`}
                >
                  {g}
                </button>
              ))}
            </div>
          </div>

          {/* Categories */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-stone-800 uppercase tracking-wider block">
              Category
            </label>
            <div className="flex flex-col space-y-1 text-xs">
              <button
                onClick={() => setSelectedCategory('All')}
                className={`py-1.5 px-2.5 rounded-lg text-left transition-colors font-medium ${
                  selectedCategory === 'All' ? 'bg-[#6B1D2F]/10 text-[#6B1D2F] font-bold' : 'text-stone-600 hover:bg-stone-50'
                }`}
              >
                All Categories
              </button>
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`py-1.5 px-2.5 rounded-lg text-left transition-colors font-medium ${
                    selectedCategory === cat ? 'bg-[#6B1D2F]/10 text-[#6B1D2F] font-bold' : 'text-stone-600 hover:bg-stone-50'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Occasions Filter (Prompt Requirement) */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-stone-800 uppercase tracking-wider block">
              Occasion
            </label>
            <div className="flex flex-wrap gap-1.5">
              <button
                onClick={() => setSelectedOccasion('All')}
                className={`px-2.5 py-1 rounded-md text-[11px] font-semibold ${
                  selectedOccasion === 'All'
                    ? 'bg-[#6B1D2F] text-white'
                    : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                }`}
              >
                All
              </button>
              {OCCASIONS.map((occ) => (
                <button
                  key={occ}
                  onClick={() => setSelectedOccasion(occ)}
                  className={`px-2.5 py-1 rounded-md text-[11px] font-semibold transition-all ${
                    selectedOccasion === occ
                      ? 'bg-[#6B1D2F] text-white'
                      : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                  }`}
                >
                  {occ}
                </button>
              ))}
            </div>
          </div>

          {/* Size Filter */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-stone-800 uppercase tracking-wider block">
              Size
            </label>
            <div className="grid grid-cols-4 gap-1.5 text-center">
              <button
                onClick={() => setSelectedSize('All')}
                className={`py-1.5 rounded-lg text-xs font-bold ${
                  selectedSize === 'All'
                    ? 'bg-[#6B1D2F] text-white'
                    : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                }`}
              >
                All
              </button>
              {SIZES.map((sz) => (
                <button
                  key={sz}
                  onClick={() => setSelectedSize(sz)}
                  className={`py-1.5 rounded-lg text-xs font-bold transition-all ${
                    selectedSize === sz
                      ? 'bg-[#6B1D2F] text-white'
                      : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                  }`}
                >
                  {sz}
                </button>
              ))}
            </div>
          </div>

          {/* Price Range Slider */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs">
              <label className="font-bold text-stone-800 uppercase tracking-wider">
                Max Rental Price
              </label>
              <span className="font-bold text-[#6B1D2F]">₹{maxPrice}</span>
            </div>
            <input
              type="range"
              min="800"
              max="3000"
              step="100"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full accent-[#6B1D2F] cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-stone-400">
              <span>₹800</span>
              <span>₹3,000+</span>
            </div>
          </div>

        </aside>

        {/* MOBILE FILTER MODAL */}
        {mobileFilterOpen && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex justify-end lg:hidden">
            <div className="w-full max-w-xs bg-white h-full p-5 overflow-y-auto space-y-6">
              <div className="flex items-center justify-between border-b pb-3">
                <span className="font-serif font-bold text-stone-900 text-lg">Filters</span>
                <button onClick={() => setMobileFilterOpen(false)} className="p-1">
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Mobile filter items */}
              <div className="space-y-4 text-xs">
                <div>
                  <span className="font-bold block mb-1">Gender</span>
                  <div className="flex flex-wrap gap-1">
                    {['All', ...GENDERS].map((g) => (
                      <button
                        key={g}
                        onClick={() => setSelectedGender(g)}
                        className={`px-3 py-1 rounded-md ${selectedGender === g ? 'bg-[#6B1D2F] text-white' : 'bg-stone-100'}`}
                      >
                        {g}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <span className="font-bold block mb-1">Occasion</span>
                  <div className="flex flex-wrap gap-1">
                    {['All', ...OCCASIONS].map((occ) => (
                      <button
                        key={occ}
                        onClick={() => setSelectedOccasion(occ)}
                        className={`px-2 py-1 rounded-md text-[11px] ${selectedOccasion === occ ? 'bg-[#6B1D2F] text-white' : 'bg-stone-100'}`}
                      >
                        {occ}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <span className="font-bold block mb-1">Category</span>
                  <div className="flex flex-wrap gap-1">
                    {['All', ...CATEGORIES].map((cat) => (
                      <button
                        key={cat}
                        onClick={() => setSelectedCategory(cat)}
                        className={`px-2 py-1 rounded-md text-[11px] ${selectedCategory === cat ? 'bg-[#6B1D2F] text-white' : 'bg-stone-100'}`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <button
                onClick={() => setMobileFilterOpen(false)}
                className="w-full py-3 bg-[#6B1D2F] text-white font-bold rounded-xl text-xs"
              >
                Apply Filters ({filteredProducts.length} Results)
              </button>
            </div>
          </div>
        )}

        {/* PRODUCTS GRID (9 cols) */}
        <main className="lg:col-span-9 space-y-6">
          
          {/* Active Filter Badges */}
          {activeFiltersCount > 0 && (
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <span className="text-stone-400 font-medium">Applied:</span>
              {selectedCategory !== 'All' && (
                <span className="bg-stone-200 text-stone-800 px-2.5 py-1 rounded-full flex items-center gap-1 font-semibold">
                  <span>{selectedCategory}</span>
                  <button onClick={() => setSelectedCategory('All')}>×</button>
                </span>
              )}
              {selectedOccasion !== 'All' && (
                <span className="bg-[#FAF4EB] border border-[#DFCBB5] text-[#6B1D2F] px-2.5 py-1 rounded-full flex items-center gap-1 font-semibold">
                  <span>{selectedOccasion}</span>
                  <button onClick={() => setSelectedOccasion('All')}>×</button>
                </span>
              )}
              {selectedGender !== 'All' && (
                <span className="bg-stone-200 text-stone-800 px-2.5 py-1 rounded-full flex items-center gap-1 font-semibold">
                  <span>{selectedGender}</span>
                  <button onClick={() => setSelectedGender('All')}>×</button>
                </span>
              )}
              {selectedSize !== 'All' && (
                <span className="bg-stone-200 text-stone-800 px-2.5 py-1 rounded-full flex items-center gap-1 font-semibold">
                  <span>Size {selectedSize}</span>
                  <button onClick={() => setSelectedSize('All')}>×</button>
                </span>
              )}
              {searchQuery && (
                <span className="bg-stone-200 text-stone-800 px-2.5 py-1 rounded-full flex items-center gap-1 font-semibold">
                  <span>"{searchQuery}"</span>
                  <button onClick={() => setSearchQuery('')}>×</button>
                </span>
              )}
            </div>
          )}

          {/* Grid of Cards */}
          {filteredProducts.length === 0 ? (
            <div className="bg-white rounded-3xl border border-stone-200 p-12 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-stone-100 flex items-center justify-center text-stone-400 mx-auto">
                <Search className="w-8 h-8" />
              </div>
              <h3 className="font-serif text-xl font-bold text-stone-800">No outfits matched your filters</h3>
              <p className="text-stone-500 text-xs max-w-sm mx-auto">
                Try widening your search terms, resetting price caps, or clearing occasion filters.
              </p>
              <button
                onClick={handleResetFilters}
                className="px-5 py-2.5 rounded-xl bg-[#6B1D2F] text-white text-xs font-bold"
              >
                Clear All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((p) => (
                <ProductCard
                  key={p.id}
                  product={p}
                  onSelect={onSelectProduct}
                  isWishlisted={wishlistIds.includes(p.id)}
                  onToggleWishlist={onToggleWishlist}
                />
              ))}
            </div>
          )}

        </main>

      </div>

    </div>
  );
};

```


================================================================================
FILE: /src/components/HowItWorksSection.tsx
================================================================================

```typescript
import React from 'react';
import { 
  Search, 
  CalendarCheck, 
  Scissors, 
  Sparkles, 
  Truck, 
  RotateCcw, 
  ShieldCheck, 
  Smile, 
  CheckCircle2,
  Clock,
  ArrowRight
} from 'lucide-react';

interface HowItWorksSectionProps {
  onExploreShop: () => void;
}

export const HowItWorksSection: React.FC<HowItWorksSectionProps> = ({ onExploreShop }) => {
  const steps = [
    {
      num: '01',
      title: 'Discover & Check Availability',
      desc: 'Browse hundreds of designer lehengas, sherwanis, sarees, and suits. Select your event dates (3, 7, or 10 days). Our smart calendar automatically applies a 2-3 day sanitization buffer to prevent double-booking.',
      icon: CalendarCheck,
      highlight: 'Live Calendar Availability',
    },
    {
      num: '02',
      title: 'Choose Sizing & Fit Options',
      desc: 'Pick your standard size or enter custom body measurements. Worried about the fit? Add a Backup Size for just ₹399 or request an at-home tailor visit in selected metro cities.',
      icon: Scissors,
      highlight: 'Free Custom Sizing & Backup',
    },
    {
      num: '03',
      title: 'Doorstep Delivery & Try-On',
      desc: 'Your outfit arrives 1 day before your event, professionally dry-cleaned, microbially sterilized, and crease-free steam ironed. Try it on immediately with our fit guarantee.',
      icon: Truck,
      highlight: 'Arrives 1 Day Before Event',
    },
    {
      num: '04',
      title: 'Pack in Return Bag & Get Deposit',
      desc: 'No dry cleaning required on your end! Simply place the worn outfit back into the provided reusable waterproof return bag. Courier picks it up, and your security deposit is refunded in 24 hours.',
      icon: RotateCcw,
      highlight: 'Reusable Zero-Hassle Bag',
    },
  ];

  return (
    <div className="py-16 bg-[#FAF7F2] border-b border-[#E8E1D5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 bg-[#6B1D2F]/10 text-[#6B1D2F] px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-[#8C6D46]" />
            <span>The Effortless Rental Process</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900">
            How Style-Rent Works
          </h2>
          <p className="text-stone-600 text-sm leading-relaxed">
            From discovering the dream designer outfit to free doorstep return pickup, here is the seamless 4-step rental experience.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((st) => {
            const Icon = st.icon;
            return (
              <div 
                key={st.num}
                className="bg-white rounded-3xl p-6 border border-stone-200/90 shadow-xs hover:border-[#6B1D2F]/40 hover:shadow-lg transition-all duration-300 flex flex-col justify-between space-y-4 relative group"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-serif text-3xl font-bold text-[#E5DECF] group-hover:text-[#6B1D2F]/30 transition-colors">
                      {st.num}
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-[#FAF4EB] border border-[#DFCBB5] text-[#6B1D2F] flex items-center justify-center">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <h3 className="font-serif font-bold text-stone-900 text-lg mt-4 group-hover:text-[#6B1D2F] transition-colors">
                    {st.title}
                  </h3>

                  <p className="text-stone-600 text-xs mt-2 leading-relaxed">
                    {st.desc}
                  </p>
                </div>

                <div className="pt-3 border-t border-stone-100">
                  <span className="inline-block bg-[#FAF4EB] text-[#8C6D46] text-[10px] font-bold px-2.5 py-1 rounded-md">
                    {st.highlight}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Smart Operational Buffer Feature Highlight Box */}
        <div className="bg-white rounded-3xl border border-stone-200 p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xs">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#6B1D2F]">
              <Clock className="w-4 h-4" />
              <span>Built-in College Project Engineering Concept</span>
            </div>
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-stone-900">
              Why We Lock a 2-3 Day Operational Buffer
            </h3>
            <p className="text-stone-600 text-xs sm:text-sm leading-relaxed">
              Unlike normal products that ship once, rented garments must undergo reverse courier transit, hospital-grade dry cleaning, UV-C sterilisation chamber, and quality inspection before reaching the next customer. Our smart system automatically blocks these transition days on the calendar to guarantee you never receive a late or unhygienic outfit.
            </p>
          </div>

          <button
            onClick={onExploreShop}
            className="px-6 py-3.5 bg-[#450A18] hover:bg-[#340712] text-[#E6CA85] font-bold text-xs rounded-xl shadow-md border border-[#E6CA85]/30 flex items-center gap-2 shrink-0 transition-all hover:scale-[1.02] cursor-pointer"
          >
            <span>Explore Collection Now</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};

```


================================================================================
FILE: /src/components/HygieneSafetySection.tsx
================================================================================

```typescript
import React from 'react';
import { 
  ShieldCheck, 
  Sparkles, 
  Droplets, 
  Wind, 
  CheckCircle2, 
  PackageCheck, 
  SunMedium, 
  Activity 
} from 'lucide-react';

export const HygieneSafetySection: React.FC = () => {
  const protocols = [
    {
      title: 'Hospital-Grade UV-C Chamber',
      desc: 'Each returned outfit spends 20 minutes inside an industrial ultraviolet-C sterilizing chamber, eliminating 99.9% of bacteria, viruses, and pathogens without chemical damage.',
      icon: SunMedium,
      stat: '99.9% Microbial Kill',
    },
    {
      title: 'Eco Hydrocarbon Dry Cleaning',
      desc: 'We utilize gentler organic hydrocarbon solvents that preserve delicate zari weaves, velvet lusters, and silk shines while eliminating lingering body odors and food stains.',
      icon: Droplets,
      stat: 'Zero Chemical Odor',
    },
    {
      title: '100°C High-Pressure Steam Iron',
      desc: 'Garments are pressed with industrial high-pressure steam guns at 100°C, providing a flawless crease-free boutique drape and deep thermal sanitization.',
      icon: Wind,
      stat: 'Thermal Sterilization',
    },
    {
      title: '12-Point Quality & Stitch Audit',
      desc: 'Expert tailors inspect every hook, zipper, can-can skirt layer, mirror embroidery, and button. Any loose thread is reinforced before dispatch.',
      icon: PackageCheck,
      stat: 'Master Tailor Passed',
    },
  ];

  return (
    <div className="py-16 bg-white border-b border-[#E8E1D5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-800 border border-emerald-200 px-3.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Pristine Hygiene Standard</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900">
            Cleaner Than Brand New
          </h2>
          <p className="text-stone-600 text-sm leading-relaxed">
            We understand wearing rented clothing requires total trust. Every Style-Rent outfit undergoes a medical-grade 4-step sanitization cycle before dispatching in sealed anti-dust carriers.
          </p>
        </div>

        {/* 4 Protocol Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {protocols.map((p) => {
            const Icon = p.icon;
            return (
              <div 
                key={p.title}
                className="bg-[#FAF7F2] rounded-3xl p-6 border border-[#E5DECF] space-y-3 hover:border-emerald-300 transition-all shadow-xs flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="w-12 h-12 rounded-2xl bg-white border border-emerald-200 text-emerald-700 flex items-center justify-center shadow-xs">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-serif font-bold text-stone-900 text-base">
                    {p.title}
                  </h3>
                  <p className="text-stone-600 text-xs leading-relaxed">
                    {p.desc}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#DFCBB5]/60 flex items-center gap-1.5 text-[11px] font-bold text-emerald-800">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{p.stat}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Hygiene Certification Banner */}
        <div className="bg-[#FAF4EB] border border-[#DFCBB5] rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-[#6B1D2F] text-[#E6CA85] flex items-center justify-center shrink-0 shadow-md">
              <Activity className="w-7 h-7" />
            </div>
            <div>
              <h4 className="font-serif font-bold text-stone-900 text-lg">
                The Style-Rent Zero-Contact Seal
              </h4>
              <p className="text-stone-600 text-xs max-w-xl mt-0.5">
                After passing final QC, the outfit is placed inside a sealed zip bag with a freshness cedar sachet. 
                If the seal is broken upon arrival, our delivery team replaces your outfit instantly with our backup inventory.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="text-center px-4 py-2 bg-white rounded-xl border border-stone-200">
              <div className="font-bold text-stone-900 text-sm">100%</div>
              <div className="text-[10px] text-stone-500">Odor-Free</div>
            </div>
            <div className="text-center px-4 py-2 bg-white rounded-xl border border-stone-200">
              <div className="font-bold text-stone-900 text-sm">24-Hr</div>
              <div className="text-[10px] text-stone-500">QC Window</div>
            </div>
            <div className="text-center px-4 py-2 bg-white rounded-xl border border-stone-200">
              <div className="font-bold text-emerald-700 text-sm">✓ Passed</div>
              <div className="text-[10px] text-stone-500">UV-C Tested</div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

```


================================================================================
FILE: /src/components/ReviewModal.tsx
================================================================================

```typescript
import React, { useState } from 'react';
import { X, Star, Sparkles, CheckCircle2 } from 'lucide-react';
import { Product, ReviewItem } from '../types';

interface ReviewModalProps {
  product: Product | null;
  onClose: () => void;
  onSubmitReview: (review: ReviewItem) => void;
}

export const ReviewModal: React.FC<ReviewModalProps> = ({
  product,
  onClose,
  onSubmitReview,
}) => {
  if (!product) return null;

  const [customerName, setCustomerName] = useState('');
  const [customerCity, setCustomerCity] = useState('Mumbai');
  const [rating, setRating] = useState(5);
  const [height, setHeight] = useState("5'5\"");
  const [bodyType, setBodyType] = useState('Hourglass');
  const [sizePurchased, setSizePurchased] = useState(product.sizes[0] || 'M');
  const [fitFeedback, setFitFeedback] = useState<ReviewItem['fitFeedback']>('Runs True to Size');
  const [comment, setComment] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !comment) return;

    const newRev: ReviewItem = {
      id: `rev-${Date.now()}`,
      productId: product.id,
      customerName,
      customerCity,
      rating,
      reviewDate: 'Just now',
      comment,
      height,
      bodyType,
      sizePurchased,
      fitFeedback,
      verifiedRental: true,
      occasionWorn: product.occasions[0] || 'Wedding',
    };

    onSubmitReview(newRev);
    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-fade-in">
      <div className="bg-[#FAF7F2] rounded-3xl max-w-lg w-full shadow-2xl border border-[#E5DECF] relative text-stone-800 p-6 space-y-5">
        
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-stone-200 text-stone-500"
        >
          <X className="w-5 h-5" />
        </button>

        <div>
          <div className="text-xs uppercase font-bold text-[#8C6D46] tracking-wider">
            Verified Rental Feedback
          </div>
          <h3 className="font-serif text-xl font-bold text-stone-900 mt-0.5">
            Review: {product.name}
          </h3>
          <p className="text-stone-500 text-xs">
            Help other customers choose the right size and fit for their special occasion.
          </p>
        </div>

        {isSuccess ? (
          <div className="p-8 text-center space-y-2 bg-emerald-50 rounded-2xl border border-emerald-200">
            <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
            <h4 className="font-serif font-bold text-emerald-900 text-lg">Thank You!</h4>
            <p className="text-xs text-emerald-700">Your review and sizing feedback have been published.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            
            {/* Rating Stars */}
            <div>
              <label className="font-bold text-stone-700 block mb-1">Your Rating</label>
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    className="p-1 hover:scale-110 transition-transform"
                  >
                    <Star
                      className={`w-6 h-6 ${
                        star <= rating
                          ? 'text-amber-500 fill-amber-500'
                          : 'text-stone-300'
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Name & City */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="font-bold text-stone-700 block mb-1">Your Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Sneha Patel"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-stone-300 rounded-xl"
                />
              </div>

              <div>
                <label className="font-bold text-stone-700 block mb-1">City</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Pune"
                  value={customerCity}
                  onChange={(e) => setCustomerCity(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-stone-300 rounded-xl"
                />
              </div>
            </div>

            {/* Sizing & Body Type (Prompt Requirement #13) */}
            <div className="grid grid-cols-3 gap-2">
              <div>
                <label className="font-bold text-stone-700 block mb-1">Your Height</label>
                <input
                  type="text"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  placeholder="5'6 in"
                  className="w-full px-2.5 py-1.5 bg-white border border-stone-300 rounded-lg text-xs"
                />
              </div>

              <div>
                <label className="font-bold text-stone-700 block mb-1">Body Type</label>
                <select
                  value={bodyType}
                  onChange={(e) => setBodyType(e.target.value)}
                  className="w-full px-2 py-1.5 bg-white border border-stone-300 rounded-lg text-xs"
                >
                  <option value="Petite">Petite</option>
                  <option value="Hourglass">Hourglass</option>
                  <option value="Athletic">Athletic</option>
                  <option value="Pear-shaped">Pear-shaped</option>
                  <option value="Slender">Slender</option>
                  <option value="Broad Shoulders">Broad Shoulders</option>
                </select>
              </div>

              <div>
                <label className="font-bold text-stone-700 block mb-1">Rented Size</label>
                <select
                  value={sizePurchased}
                  onChange={(e) => setSizePurchased(e.target.value)}
                  className="w-full px-2 py-1.5 bg-white border border-stone-300 rounded-lg text-xs"
                >
                  {product.sizes.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Fit Feedback */}
            <div>
              <label className="font-bold text-stone-700 block mb-1">How Did It Fit?</label>
              <select
                value={fitFeedback}
                onChange={(e) => setFitFeedback(e.target.value as any)}
                className="w-full px-3 py-2 bg-white border border-stone-300 rounded-xl font-semibold text-stone-800"
              >
                <option value="Runs True to Size">Runs True to Size (Perfect)</option>
                <option value="Slightly Snug">Slightly Snug (Order backup size)</option>
                <option value="Loose Fit">Loose Fit</option>
                <option value="Perfect Custom Fit">Perfect Custom Fit</option>
              </select>
            </div>

            {/* Review Comment */}
            <div>
              <label className="font-bold text-stone-700 block mb-1">Your Experience & Compliments Received</label>
              <textarea
                required
                rows={3}
                placeholder="How was the look, quality, dry clean freshness, and return experience?"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="w-full px-3 py-2 bg-white border border-stone-300 rounded-xl"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-[#450A18] hover:bg-[#340712] text-[#E6CA85] font-bold text-xs rounded-xl shadow-md border border-[#E6CA85]/30 cursor-pointer"
            >
              Post Customer Review
            </button>
          </form>
        )}

      </div>
    </div>
  );
};

```


================================================================================
FILE: /src/components/WishlistDrawer.tsx
================================================================================

```typescript
import React from 'react';
import { X, Heart, ShoppingBag, ArrowRight, Trash2 } from 'lucide-react';
import { Product } from '../types';
import { formatINR } from '../utils/rentalCalculations';

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  wishlistProducts: Product[];
  onRemoveFromWishlist: (productId: string) => void;
  onSelectProduct: (product: Product) => void;
}

export const WishlistDrawer: React.FC<WishlistDrawerProps> = ({
  isOpen,
  onClose,
  wishlistProducts,
  onRemoveFromWishlist,
  onSelectProduct,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-xs flex justify-end animate-fade-in">
      <div className="w-full max-w-md bg-[#FAF7F2] h-full shadow-2xl flex flex-col border-l border-[#E5DECF] relative text-stone-800">
        
        {/* Header */}
        <div className="p-5 border-b border-[#E2DBD0] bg-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-[#6B1D2F] flex items-center justify-center text-[#E6CA85]">
              <Heart className="w-4 h-4 fill-current" />
            </div>
            <div>
              <h2 className="font-serif font-bold text-stone-900 text-lg">Saved Outfits</h2>
              <span className="text-xs text-stone-500 font-medium">
                {wishlistProducts.length} Looks Wishlisted
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-stone-100 text-stone-500"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Wishlist Items List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {wishlistProducts.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-3">
              <div className="w-16 h-16 rounded-full bg-stone-100 flex items-center justify-center text-stone-400">
                <Heart className="w-8 h-8" />
              </div>
              <div className="font-serif text-lg font-bold text-stone-800">No saved outfits yet</div>
              <p className="text-xs text-stone-500 max-w-xs leading-relaxed">
                Tap the heart icon on any lehenga, sherwani, or saree to save it for your event date planning.
              </p>
            </div>
          ) : (
            wishlistProducts.map((p) => (
              <div 
                key={p.id}
                className="bg-white rounded-2xl border border-stone-200 p-3 flex gap-3 shadow-xs items-center"
              >
                <img
                  src={p.images[0]}
                  alt={p.name}
                  className="w-16 h-20 object-cover object-top rounded-xl border border-stone-200 shrink-0 cursor-pointer"
                  onClick={() => {
                    onSelectProduct(p);
                    onClose();
                  }}
                />

                <div className="flex-1 min-w-0 space-y-1">
                  <h4 
                    onClick={() => {
                      onSelectProduct(p);
                      onClose();
                    }}
                    className="font-serif font-bold text-stone-900 text-sm truncate cursor-pointer hover:text-[#6B1D2F]"
                  >
                    {p.name}
                  </h4>
                  <div className="text-xs text-stone-500">
                    {p.category} • {p.gender}
                  </div>
                  <div className="text-xs font-bold text-[#6B1D2F]">
                    {formatINR(p.rentalPrice3Days)} / 3 Days
                  </div>

                  <div className="flex items-center gap-2 pt-1">
                    <button
                      type="button"
                      onClick={() => {
                        onSelectProduct(p);
                        onClose();
                      }}
                      className="px-2.5 py-1 bg-[#6B1D2F] text-white text-[11px] font-semibold rounded-lg hover:bg-[#521321] transition-all cursor-pointer"
                    >
                      Book Rental
                    </button>
                    <button
                      type="button"
                      onClick={() => onRemoveFromWishlist(p.id)}
                      className="p-1 text-stone-400 hover:text-red-600 transition-colors"
                      title="Remove from saved"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
};

```


================================================================================
FILE: /src/components/Footer.tsx
================================================================================

```typescript
import React from 'react';
import { Sparkles, MapPin, ShieldCheck, Heart, Database, Phone, Mail } from 'lucide-react';
import { CITIES } from './Navbar';

interface FooterProps {
  onNavClick: (tab: any) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavClick }) => {
  return (
    <footer className="bg-[#1F1D1D] text-stone-300 pt-16 pb-12 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          
          {/* Brand Col (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#6B1D2F] to-[#450A18] flex items-center justify-center text-[#E6CA85] border border-[#E6CA85]/30">
                <span className="font-serif text-xl font-bold">SR</span>
              </div>
              <div>
                <span className="font-serif text-xl font-bold text-white tracking-wide">
                  Style-Rent
                </span>
                <p className="text-[10px] uppercase font-semibold text-[#E6CA85] tracking-widest">
                  Designer Rental Couture
                </p>
              </div>
            </div>

            <p className="text-xs text-stone-400 leading-relaxed max-w-sm">
              Style-Rent empowers wedding guests, bridesmaids, grooms, and fest attendees across India to wear designer lehengas, sherwanis, and gowns at a fraction of retail prices, supported by hospital-grade UV sanitization and reusable zero-waste return logistics.
            </p>

            <div className="flex flex-wrap gap-2 text-[11px] text-[#E6CA85]">
              <span className="bg-stone-800/80 px-2.5 py-1 rounded-md border border-stone-700 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>100% Medical Grade Disinfected</span>
              </span>
              <span className="bg-stone-800/80 px-2.5 py-1 rounded-md border border-stone-700">
                Reusable Zip Bag
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="font-serif font-bold text-white text-sm">Navigation</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => onNavClick('home')} className="hover:text-white transition-colors">
                  Home
                </button>
              </li>
              <li>
                <button onClick={() => onNavClick('shop')} className="hover:text-white transition-colors">
                  Browse Shop & Filters
                </button>
              </li>
              <li>
                <button onClick={() => onNavClick('how-it-works')} className="hover:text-white transition-colors">
                  How Rental Works
                </button>
              </li>
              <li>
                <button onClick={() => onNavClick('hygiene')} className="hover:text-white transition-colors">
                  Hygiene & Sanitization
                </button>
              </li>
              <li>
                <button onClick={() => onNavClick('orders')} className="hover:text-white transition-colors">
                  Track Bookings & Returns
                </button>
              </li>
            </ul>
          </div>

          {/* Project & Staff Tools */}
          <div className="space-y-3">
            <h4 className="font-serif font-bold text-white text-sm">Project & Admin</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button 
                  onClick={() => onNavClick('database')} 
                  className="text-[#E6CA85] hover:underline flex items-center gap-1 font-semibold"
                >
                  <Database className="w-3.5 h-3.5" />
                  <span>Relational Database & SQL</span>
                </button>
              </li>
              <li>
                <button onClick={() => onNavClick('admin')} className="hover:text-white transition-colors">
                  Staff Inventory & QC Hub
                </button>
              </li>
              <li>
                <span className="text-stone-400">Smart Operational Buffer (2-3d)</span>
              </li>
              <li>
                <span className="text-stone-400">At-Home Tailor Measurements</span>
              </li>
              <li>
                <span className="text-stone-400">Peace of Mind Protection (₹299)</span>
              </li>
            </ul>
          </div>

          {/* Metro Hubs */}
          <div className="space-y-3">
            <h4 className="font-serif font-bold text-white text-sm flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-[#E6CA85]" />
              <span>Fulfilment Hubs</span>
            </h4>
            <div className="grid grid-cols-2 gap-1 text-xs text-stone-400">
              {CITIES.map((c) => (
                <span key={c} className="hover:text-stone-200">{c}</span>
              ))}
            </div>
            <div className="pt-2 text-[11px] text-stone-400">
              Same-day courier dispatch in Mumbai, Bengaluru & Delhi NCR.
            </div>
          </div>

        </div>

        {/* College Project Disclaimer Box (Prompt Requirement) */}
        <div className="bg-stone-900/90 rounded-2xl border border-stone-800 p-5 text-xs text-stone-400 space-y-2">
          <div className="flex items-center gap-2 font-bold text-white">
            <Sparkles className="w-4 h-4 text-[#E6CA85]" />
            <span>Academic Project Specification & Evaluation Disclaimer</span>
          </div>
          <p className="leading-relaxed text-[11px]">
            <strong>Style-Rent</strong> is developed as a modern college web development & relational database design project. 
            All payment methods (UPI, Cards), identity verification (Aadhaar, PAN), and delivery logistics tracking are implemented as realistic mock simulations for demonstration and classroom grading without third-party API dependencies or real financial transactions.
          </p>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-stone-800 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-400 gap-3">
          <div>
            © 2026 Style-Rent. Crafted with care for Indian weddings & college celebrations.
          </div>
          <div className="flex items-center gap-1 text-stone-400">
            Built with React, TypeScript & Tailwind CSS
          </div>
        </div>

      </div>
    </footer>
  );
};

```


================================================================================
FILE: /src/App.tsx
================================================================================

```typescript
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  CartItem, 
  InventoryItem, 
  Order, 
  Product, 
  ReturnInspection, 
  ReviewItem,
  OccasionType 
} from './types';
import { INITIAL_PRODUCTS } from './data/mockProducts';
import { INITIAL_REVIEWS } from './data/mockReviews';
import { Navbar, CITIES } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { OccasionSelector } from './components/OccasionSelector';
import { ProductCard } from './components/ProductCard';
import { ProductDetailsModal } from './components/ProductDetailsModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { OrderConfirmationModal } from './components/OrderConfirmationModal';
import { OrdersTrackerView } from './components/OrdersTrackerView';
import { AdminDashboardView } from './components/AdminDashboardView';
import { DatabaseView } from './components/DatabaseView';
import { HowItWorksSection } from './components/HowItWorksSection';
import { HygieneSafetySection } from './components/HygieneSafetySection';
import { WishlistDrawer } from './components/WishlistDrawer';
import { ReviewModal } from './components/ReviewModal';
import { ShopView } from './components/ShopView';
import { Footer } from './components/Footer';
import { 
  Sparkles, 
  ArrowRight, 
  ShieldCheck, 
  Star, 
  ShoppingBag, 
  Heart, 
  Database, 
  ChevronRight,
  TrendingUp,
  Award
} from 'lucide-react';
import { addDays, formatINR } from './utils/rentalCalculations';

// Initial Mock Inventory
const INITIAL_INVENTORY: InventoryItem[] = [
  {
    id: 'inv-01',
    productId: 'prod-01',
    productName: 'Emerald Green Designer Zardozi Lehenga',
    category: 'Lehenga',
    size: 'M',
    sku: 'SR-LHN-01-M',
    status: 'Rented',
    currentOrderId: 'SR-10842',
    nextAvailableDate: '2026-10-30',
    location: 'Mumbai-Hub-Rack-A4',
  },
  {
    id: 'inv-02',
    productId: 'prod-01',
    productName: 'Emerald Green Designer Zardozi Lehenga',
    category: 'Lehenga',
    size: 'L',
    sku: 'SR-LHN-01-L',
    status: 'Available',
    nextAvailableDate: '2026-10-18',
    location: 'Mumbai-Hub-Rack-A5',
  },
  {
    id: 'inv-03',
    productId: 'prod-02',
    productName: 'Royal Maroon Embroidered Silk Sherwani',
    category: 'Sherwani',
    size: 'L',
    sku: 'SR-SHW-02-L',
    status: 'Cleaning',
    nextAvailableDate: '2026-10-21',
    location: 'DryClean-Hub-Zone2',
  },
  {
    id: 'inv-04',
    productId: 'prod-02',
    productName: 'Royal Maroon Embroidered Silk Sherwani',
    category: 'Sherwani',
    size: 'XL',
    sku: 'SR-SHW-02-XL',
    status: 'Available',
    nextAvailableDate: '2026-10-18',
    location: 'Delhi-Hub-Bay-B1',
  },
  {
    id: 'inv-05',
    productId: 'prod-05',
    productName: 'Crimson Banarasi Katan Silk Heritage Saree',
    category: 'Saree',
    size: 'M',
    sku: 'SR-SAR-05-M',
    status: 'Available',
    nextAvailableDate: '2026-10-18',
    location: 'Bengaluru-Hub-Bay-C1',
  },
  {
    id: 'inv-06',
    productId: 'prod-06',
    productName: 'Champagne Gold Sequin Floor-Length Gown',
    category: 'Gown',
    size: 'S',
    sku: 'SR-GWN-06-S',
    status: 'Available',
    nextAvailableDate: '2026-10-18',
    location: 'Pune-Hub-Bay-D2',
  },
  {
    id: 'inv-07',
    productId: 'prod-07',
    productName: 'Midnight Black Velvet Bandhgala Jodhpuri Suit',
    category: 'Blazer & Tuxedo',
    size: 'L',
    sku: 'SR-TUX-07-L',
    status: 'Available',
    nextAvailableDate: '2026-10-18',
    location: 'Mumbai-Hub-Rack-C2',
  },
  {
    id: 'inv-08',
    productId: 'prod-08',
    productName: 'Sunshine Mustard Yellow Georgette Anarkali',
    category: 'Anarkali',
    size: 'M',
    sku: 'SR-ANK-08-M',
    status: 'Available',
    nextAvailableDate: '2026-10-18',
    location: 'Thane-Hub-Bay-E1',
  },
];

// Initial Mock Orders
const INITIAL_ORDERS: Order[] = [
  {
    id: 'ord-801',
    orderNumber: 'SR-10842',
    createdAt: '2026-10-10T14:30:00.000Z',
    customer: {
      fullName: 'Ananya Sharma',
      email: 'ananya.sharma@example.com',
      phone: '9820144521',
      address: 'Flat 402, Sea Green Apartments, Worli Sea Face',
      city: 'Mumbai',
      pincode: '400018',
    },
    items: [
      {
        cartItemId: 'item-801',
        product: INITIAL_PRODUCTS[0],
        selectedSize: 'M',
        rentalDuration: '3_days',
        rentalDays: 3,
        startDate: '2026-10-25',
        deliveryDate: '2026-10-24',
        returnDate: '2026-10-28',
        rentalFee: 1999,
        securityDeposit: 2500,
        fittingOption: 'custom',
        backupOption: 'backup_size',
        backupSize: 'L',
        backupPrice: 399,
        damageProtection: true,
        damageProtectionPrice: 299,
      },
    ],
    identityVerification: {
      type: 'Aadhaar',
      idNumberMasked: 'XXXX-XXXX-4819',
      verified: true,
      verificationDate: '10 Oct 2026',
    },
    payment: {
      method: 'UPI',
      upiProvider: 'PhonePe',
      transactionId: 'TXN_98102381',
      status: 'Paid',
    },
    pricing: {
      rentalSubtotal: 1999,
      securityDepositTotal: 2500,
      backupOptionsTotal: 399,
      damageProtectionTotal: 299,
      deliveryFee: 0,
      grandTotal: 5197,
    },
    orderStatus: 'Delivered',
    returnBagTracking: 'DELHIVERY-RT-981023',
    timeline: [
      { status: 'Confirmed', label: 'Order Confirmed', timestamp: '10 Oct, 02:30 PM', description: 'Booking confirmed.', completed: true, current: false },
      { status: 'Preparing', label: 'UV-C Sanitized', timestamp: '12 Oct, 11:00 AM', description: 'Dry cleaned & ironed.', completed: true, current: false },
      { status: 'Dispatched', label: 'Dispatched', timestamp: '13 Oct, 09:30 AM', description: 'Courier transit with reusable bag.', completed: true, current: false },
      { status: 'Delivered', label: 'Delivered', timestamp: '14 Oct, 01:15 PM', description: 'Received in sealed garment bag.', completed: true, current: true },
      { status: 'Returned', label: 'Return Scheduled', timestamp: '28 Oct', description: 'Courier collects bag.', completed: false, current: false },
      { status: 'Inspected & Refunded', label: 'Deposit Refund', timestamp: '29 Oct', description: '100% deposit returned to UPI.', completed: false, current: false },
    ],
  },
  {
    id: 'ord-802',
    orderNumber: 'SR-10855',
    createdAt: '2026-10-15T18:15:00.000Z',
    customer: {
      fullName: 'Rohan Mehra',
      email: 'rohan.mehra@example.com',
      phone: '9811233490',
      address: 'B-14, Greater Kailash 1',
      city: 'Delhi NCR',
      pincode: '110048',
    },
    items: [
      {
        cartItemId: 'item-802',
        product: INITIAL_PRODUCTS[1],
        selectedSize: 'L',
        rentalDuration: '3_days',
        rentalDays: 3,
        startDate: '2026-10-28',
        deliveryDate: '2026-10-27',
        returnDate: '2026-10-31',
        rentalFee: 1499,
        securityDeposit: 2000,
        fittingOption: 'standard',
        backupOption: 'none',
        backupPrice: 0,
        damageProtection: true,
        damageProtectionPrice: 299,
      },
    ],
    identityVerification: {
      type: 'PAN',
      idNumberMasked: 'ABCDE7890F',
      verified: true,
      verificationDate: '15 Oct 2026',
    },
    payment: {
      method: 'UPI',
      upiProvider: 'GooglePay',
      transactionId: 'TXN_98102450',
      status: 'Paid',
    },
    pricing: {
      rentalSubtotal: 1499,
      securityDepositTotal: 2000,
      backupOptionsTotal: 0,
      damageProtectionTotal: 299,
      deliveryFee: 0,
      grandTotal: 3798,
    },
    orderStatus: 'Preparing',
    returnBagTracking: 'DELHIVERY-RT-981045',
    timeline: [
      { status: 'Confirmed', label: 'Order Confirmed', timestamp: '15 Oct, 06:15 PM', description: 'Garment reserved.', completed: true, current: false },
      { status: 'Preparing', label: 'Sanitizing & Ironing', timestamp: 'In progress', description: 'Hospital grade sterilization.', completed: true, current: true },
      { status: 'Dispatched', label: 'Dispatched', timestamp: 'Scheduled 26 Oct', description: 'With reusable bag.', completed: false, current: false },
      { status: 'Delivered', label: 'Doorstep Delivered', timestamp: 'Scheduled 27 Oct', description: 'Try on guarantee.', completed: false, current: false },
      { status: 'Returned', label: 'Return Pickup', timestamp: 'Scheduled 31 Oct', description: 'Pickup morning after.', completed: false, current: false },
      { status: 'Inspected & Refunded', label: 'Deposit Refunded', timestamp: 'Scheduled 01 Nov', description: 'Security deposit released.', completed: false, current: false },
    ],
  },
];

export default function App() {
  // Navigation & View state
  const [activeTab, setActiveTab] = useState<'home' | 'shop' | 'how-it-works' | 'hygiene' | 'orders' | 'admin' | 'database'>('home');
  const [selectedCity, setSelectedCity] = useState<string>('Mumbai');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedOccasionForShop, setSelectedOccasionForShop] = useState<OccasionType | 'All'>('All');

  // Persistence State
  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('style_rent_products');
    return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
  });

  const [reviews, setReviews] = useState<ReviewItem[]>(() => {
    const saved = localStorage.getItem('style_rent_reviews');
    return saved ? JSON.parse(saved) : INITIAL_REVIEWS;
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('style_rent_orders');
    return saved ? JSON.parse(saved) : INITIAL_ORDERS;
  });

  const [inventory, setInventory] = useState<InventoryItem[]>(() => {
    const saved = localStorage.getItem('style_rent_inventory');
    return saved ? JSON.parse(saved) : INITIAL_INVENTORY;
  });

  const [inspections, setInspections] = useState<ReturnInspection[]>(() => {
    const saved = localStorage.getItem('style_rent_inspections');
    return saved ? JSON.parse(saved) : [];
  });

  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('style_rent_cart');
    return saved ? JSON.parse(saved) : [];
  });

  const [wishlistIds, setWishlistIds] = useState<string[]>(() => {
    const saved = localStorage.getItem('style_rent_wishlist');
    return saved ? JSON.parse(saved) : ['prod-01', 'prod-03'];
  });

  // Modal States
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [confirmedOrder, setConfirmedOrder] = useState<Order | null>(null);
  const [reviewProduct, setReviewProduct] = useState<Product | null>(null);

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('style_rent_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('style_rent_reviews', JSON.stringify(reviews));
  }, [reviews]);

  useEffect(() => {
    localStorage.setItem('style_rent_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('style_rent_inventory', JSON.stringify(inventory));
  }, [inventory]);

  useEffect(() => {
    localStorage.setItem('style_rent_inspections', JSON.stringify(inspections));
  }, [inspections]);

  useEffect(() => {
    localStorage.setItem('style_rent_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('style_rent_wishlist', JSON.stringify(wishlistIds));
  }, [wishlistIds]);

  // Wishlist toggle
  const toggleWishlist = (productId: string) => {
    setWishlistIds((prev) => 
      prev.includes(productId) 
        ? prev.filter((id) => id !== productId) 
        : [...prev, productId]
    );
  };

  // Cart operations
  const handleAddToCart = (item: CartItem) => {
    setCart((prev) => [...prev, item]);
    setIsCartOpen(true);
  };

  const handleRemoveFromCart = (cartItemId: string) => {
    setCart((prev) => prev.filter((i) => i.cartItemId !== cartItemId));
  };

  // Order Placement & Inventory Booking Sync
  const handleOrderCompleted = (newOrder: Order) => {
    setOrders((prev) => [newOrder, ...prev]);
    setCart([]); // Clear cart
    setConfirmedOrder(newOrder); // Open confirmation modal

    // Update Product existingBookings & Operational Buffer!
    setProducts((prev) => 
      prev.map((p) => {
        const matchingItem = newOrder.items.find((item) => item.product.id === p.id);
        if (matchingItem) {
          const bufferStart = addDays(matchingItem.startDate, -2);
          const bufferEnd = addDays(matchingItem.returnDate, 2);
          return {
            ...p,
            existingBookings: [
              ...p.existingBookings,
              {
                startDate: matchingItem.startDate,
                endDate: matchingItem.returnDate,
                bufferStart,
                bufferEnd,
                orderId: newOrder.orderNumber,
              },
            ],
          };
        }
        return p;
      })
    );

    // Update Inventory Unit status to 'Rented'
    setInventory((prev) => 
      prev.map((unit) => {
        const matchingItem = newOrder.items.find((item) => item.product.id === unit.productId && item.selectedSize === unit.size);
        if (matchingItem && unit.status === 'Available') {
          return {
            ...unit,
            status: 'Rented',
            currentOrderId: newOrder.orderNumber,
            nextAvailableDate: addDays(matchingItem.returnDate, 2),
          };
        }
        return unit;
      })
    );
  };

  // Admin order status update
  const handleUpdateOrderStatus = (orderId: string, newStatus: any) => {
    setOrders((prev) => 
      prev.map((o) => (o.id === orderId ? { ...o, orderStatus: newStatus } : o))
    );
  };

  // Admin inventory status update
  const handleUpdateInventoryStatus = (itemId: string, newStatus: any) => {
    setInventory((prev) => 
      prev.map((i) => (i.id === itemId ? { ...i, status: newStatus } : i))
    );
  };

  // Admin Return Inspection
  const handleProcessInspection = (inspection: ReturnInspection) => {
    setInspections((prev) => [inspection, ...prev]);
    // Set inventory item to 'Cleaning' then 'Available'
    setInventory((prev) => 
      prev.map((unit) => 
        unit.productId === inspection.productId ? { ...unit, status: 'Cleaning' } : unit
      )
    );
  };

  // User review submission
  const handleAddReview = (newReview: ReviewItem) => {
    setReviews((prev) => [newReview, ...prev]);
  };

  const wishlistProducts = products.filter((p) => wishlistIds.includes(p.id));
  const featuredProducts = products.filter((p) => p.isFeatured);

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2] text-stone-800 font-sans selection:bg-[#6B1D2F] selection:text-white">
      
      {/* Universal Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        cartCount={cart.length}
        wishlistCount={wishlistIds.length}
        openCart={() => setIsCartOpen(true)}
        openWishlist={() => setIsWishlistOpen(true)}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedCity={selectedCity}
        setSelectedCity={setSelectedCity}
      />

      {/* Main Content Router */}
      <div className="flex-1">
        
        {/* VIEW 1: HOME PAGE */}
        {activeTab === 'home' && (
          <div>
            {/* Hero Section */}
            <HeroSection
              onExploreShop={() => setActiveTab('shop')}
              onHowItWorks={() => setActiveTab('how-it-works')}
              onOpenDatabase={() => setActiveTab('database')}
            />

            {/* Occasion Browser */}
            <OccasionSelector
              selectedOccasion={selectedOccasionForShop}
              onSelectOccasion={(occ) => {
                setSelectedOccasionForShop(occ);
                setActiveTab('shop');
              }}
            />

            {/* Featured Outfits Section */}
            <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                <div>
                  <div className="text-xs uppercase font-bold text-[#8C6D46] tracking-wider flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-[#E6CA85]" />
                    <span>Curated Couture</span>
                  </div>
                  <h2 className="font-serif text-3xl font-bold text-stone-900 mt-1">
                    Trending Bridal & Reception Fits
                  </h2>
                  <p className="text-stone-500 text-xs sm:text-sm mt-0.5">
                    Handcrafted zardozi lehengas, silk sherwanis, and cocktail gowns ready for dispatch.
                  </p>
                </div>

                <button
                  onClick={() => setActiveTab('shop')}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#6B1D2F] hover:text-[#521321] transition-colors group cursor-pointer"
                >
                  <span>View All 16+ Outfits</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {featuredProducts.slice(0, 4).map((p) => (
                  <ProductCard
                    key={p.id}
                    product={p}
                    onSelect={(prod) => setSelectedProduct(prod)}
                    isWishlisted={wishlistIds.includes(p.id)}
                    onToggleWishlist={toggleWishlist}
                  />
                ))}
              </div>
            </section>

            {/* How It Works Teaser */}
            <HowItWorksSection onExploreShop={() => setActiveTab('shop')} />

            {/* Hygiene & Safety Deep Dive */}
            <HygieneSafetySection />

            {/* Social Proof & Customer Reviews Showcase */}
            <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
              <div className="text-center max-w-xl mx-auto space-y-2">
                <div className="inline-flex items-center gap-1.5 bg-amber-50 text-amber-900 border border-amber-200 px-3 py-1 rounded-full text-xs font-bold">
                  <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                  <span>Real Wedding & Event Stories</span>
                </div>
                <h2 className="font-serif text-3xl font-bold text-stone-900">
                  Loved by 4,000+ Patrons
                </h2>
                <p className="text-stone-500 text-xs">
                  Read authentic sizing and fit experiences from customers across India.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {reviews.slice(0, 3).map((r) => (
                  <div 
                    key={r.id}
                    className="bg-white rounded-3xl p-6 border border-stone-200 space-y-4 shadow-xs flex flex-col justify-between"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2.5">
                          {r.photoUrl && (
                            <img src={r.photoUrl} alt="" className="w-9 h-9 rounded-full object-cover border" />
                          )}
                          <div>
                            <span className="font-bold text-stone-900 text-xs block">{r.customerName}</span>
                            <span className="text-[10px] text-stone-400">{r.customerCity} • {r.occasionWorn}</span>
                          </div>
                        </div>

                        <div className="flex text-amber-500">
                          {Array.from({ length: r.rating }).map((_, i) => (
                            <Star key={i} className="w-3.5 h-3.5 fill-current" />
                          ))}
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-1.5 text-[10px] text-stone-600">
                        <span className="bg-stone-100 px-2 py-0.5 rounded-sm">Height: {r.height}</span>
                        <span className="bg-stone-100 px-2 py-0.5 rounded-sm">Body: {r.bodyType}</span>
                        <span className="bg-emerald-50 text-emerald-800 font-semibold px-2 py-0.5 rounded-sm">
                          {r.fitFeedback}
                        </span>
                      </div>

                      <p className="text-stone-700 text-xs italic leading-relaxed">
                        "{r.comment}"
                      </p>
                    </div>

                    <div className="text-[10px] text-stone-400 font-medium pt-2 border-t border-stone-100">
                      ✓ Verified Style-Rent Rental
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Bottom Call To Action */}
            <section className="bg-gradient-to-r from-[#450A18] via-[#5C1324] to-[#450A18] text-[#FAF7F2] py-16 px-4">
              <div className="max-w-4xl mx-auto text-center space-y-6">
                <div className="inline-flex items-center gap-2 bg-[#E6CA85]/20 text-[#E6CA85] px-4 py-1.5 rounded-full text-xs font-bold border border-[#E6CA85]/30">
                  <Sparkles className="w-4 h-4 text-[#E6CA85]" />
                  <span>College Project Prototype Demonstration</span>
                </div>

                <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-white">
                  Ready to Dress Like Royalty for Your Next Celebration?
                </h2>

                <p className="text-stone-300 text-sm max-w-xl mx-auto leading-relaxed">
                  Choose your rental duration, customize your body measurements, add a backup size for ₹399, and enjoy free doorstep return pickup.
                </p>

                <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                  <button
                    onClick={() => setActiveTab('shop')}
                    className="px-8 py-4 bg-[#E6CA85] hover:bg-[#d8b868] text-[#450A18] font-bold text-sm rounded-xl shadow-lg transition-transform hover:scale-105 cursor-pointer"
                  >
                    Start Renting Now
                  </button>
                  <button
                    onClick={() => setActiveTab('database')}
                    className="px-6 py-4 bg-white/10 hover:bg-white/20 text-white font-semibold text-sm rounded-xl border border-white/20 transition-all cursor-pointer flex items-center gap-2"
                  >
                    <Database className="w-4 h-4" />
                    <span>View Project Database & Schema</span>
                  </button>
                </div>
              </div>
            </section>

          </div>
        )}

        {/* VIEW 2: SHOP / BROWSE PAGE */}
        {activeTab === 'shop' && (
          <ShopView
            products={products}
            onSelectProduct={(prod: Product) => setSelectedProduct(prod)}
            wishlistIds={wishlistIds}
            onToggleWishlist={toggleWishlist}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            initialOccasion={selectedOccasionForShop}
          />
        )}

        {/* VIEW 3: HOW IT WORKS */}
        {activeTab === 'how-it-works' && (
          <div className="py-6">
            <HowItWorksSection onExploreShop={() => setActiveTab('shop')} />
          </div>
        )}

        {/* VIEW 4: HYGIENE & SAFETY */}
        {activeTab === 'hygiene' && (
          <div className="py-6">
            <HygieneSafetySection />
          </div>
        )}

        {/* VIEW 5: MY ORDERS TRACKER */}
        {activeTab === 'orders' && (
          <OrdersTrackerView
            orders={orders}
            onExploreShop={() => setActiveTab('shop')}
          />
        )}

        {/* VIEW 6: ADMIN DASHBOARD */}
        {activeTab === 'admin' && (
          <AdminDashboardView
            orders={orders}
            onUpdateOrderStatus={handleUpdateOrderStatus}
            inventory={inventory}
            onUpdateInventoryStatus={handleUpdateInventoryStatus}
            inspections={inspections}
            onProcessInspection={handleProcessInspection}
          />
        )}

        {/* VIEW 7: DATABASE & SQL RELATIONAL STUDIO */}
        {activeTab === 'database' && (
          <DatabaseView />
        )}

      </div>

      {/* Universal Footer */}
      <Footer onNavClick={(tab) => setActiveTab(tab)} />

      {/* MODAL 1: PRODUCT DETAILS MODAL */}
      {selectedProduct && (
        <ProductDetailsModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onAddToCart={handleAddToCart}
          isWishlisted={wishlistIds.includes(selectedProduct.id)}
          onToggleWishlist={toggleWishlist}
          reviews={reviews}
          onOpenReviewModal={(p) => setReviewProduct(p)}
        />
      )}

      {/* MODAL 2: CART DRAWER */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart}
        onRemoveItem={handleRemoveFromCart}
        onProceedToCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
      />

      {/* MODAL 3: WISHLIST DRAWER */}
      <WishlistDrawer
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlistProducts={wishlistProducts}
        onRemoveFromWishlist={toggleWishlist}
        onSelectProduct={(p) => setSelectedProduct(p)}
      />

      {/* MODAL 4: CHECKOUT MODAL */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cart}
        defaultCity={selectedCity}
        onOrderCompleted={handleOrderCompleted}
      />

      {/* MODAL 5: ORDER CONFIRMATION MODAL */}
      {confirmedOrder && (
        <OrderConfirmationModal
          order={confirmedOrder}
          onClose={() => setConfirmedOrder(null)}
          onViewOrders={() => {
            setConfirmedOrder(null);
            setActiveTab('orders');
          }}
        />
      )}

      {/* MODAL 6: WRITE REVIEW MODAL */}
      {reviewProduct && (
        <ReviewModal
          product={reviewProduct}
          onClose={() => setReviewProduct(null)}
          onSubmitReview={handleAddReview}
        />
      )}

    </div>
  );
}

```


================================================================================
FILE: /public/style_rent_schema.sql
================================================================================

```sql
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

```


================================================================================
FILE: /README.md
================================================================================

```md
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

```


