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
