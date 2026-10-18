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
  totalOrdersCount?: number;
  lastOrderedAt?: string;
  latestOrderId?: string;
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
    bankName?: string;
    bankIfsc?: string;
    bankBranch?: string;
    accountType?: string;
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

export type ReturnRequestType = 'return' | 'exchange' | 'refund';

export interface ReturnReviewRequest {
  id: string;
  orderId: string;
  orderNumber: string;
  productId: string;
  productName: string;
  productImage?: string;
  selectedSize: string;
  customerName: string;
  customerCity: string;
  customerPhone: string;
  customerEmail: string;
  requestType: ReturnRequestType;
  issueCategory: string;
  issueReason?: string;
  reviewComment: string;
  rating: number;
  damagePhotoUrl: string;
  damagePhotoName?: string;
  securityDeposit: number;
  hasDamageProtection: boolean;
  rentalFee: number;
  requestedRefundAmount?: number;
  upiOrBankDetails: string;
  status: 'Pending Admin Review' | 'Under Inspection' | 'Approved & Refunded' | 'Exchange Approved' | 'Rejected';
  createdAt: string;
  adminInspection?: {
    inspectedAt: string;
    inspectorStaff: string;
    assessedCondition: string;
    damageChargeDeducted: number;
    finalRefundAmount: number;
    actionTaken: 'refund_processed' | 'exchange_approved' | 'rejected';
    adminNotes: string;
    payoutTransactionId?: string;
  };
}

