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
 * Find the next available rental date starting from a given date
 */
export function findNextAvailableDate(
  startFromDate: string,
  duration: RentalDuration,
  existingBookings: BookingInterval[]
): string {
  const days = getDurationDays(duration);
  let candidate = startFromDate;
  // Look ahead up to 90 days for an available slot
  for (let i = 0; i < 90; i++) {
    const end = addDays(candidate, days - 1);
    const check = checkIntervalAvailability(candidate, end, existingBookings);
    if (check.isAvailable) {
      return candidate;
    }
    candidate = addDays(candidate, 1);
  }
  return startFromDate;
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
