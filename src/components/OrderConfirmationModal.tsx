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
