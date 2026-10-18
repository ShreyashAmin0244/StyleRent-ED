import React, { useState } from 'react';
import { 
  Package, 
  Calendar, 
  Truck, 
  RotateCcw, 
  ShieldCheck, 
  CheckCircle2, 
  Clock, 
  ChevronDown, 
  ChevronUp,
  AlertTriangle,
  Camera,
  Upload,
  RefreshCw,
  Star,
  Check,
  X,
  ExternalLink,
  FileText,
  DollarSign,
  Maximize2
} from 'lucide-react';
import { Order, ReturnReviewRequest, ReturnRequestType } from '../types';
import { formatDate, formatINR } from '../utils/rentalCalculations';

interface OrdersTrackerViewProps {
  orders: Order[];
  onExploreShop: () => void;
  returnRequests: ReturnReviewRequest[];
  onSubmitReturnRequest: (newRequest: ReturnReviewRequest) => void;
}

export const OrdersTrackerView: React.FC<OrdersTrackerViewProps> = ({
  orders,
  onExploreShop,
  returnRequests,
  onSubmitReturnRequest,
}) => {
  const [activeTab, setActiveTab] = useState<'orders' | 'returns'>('orders');
  const [expandedOrderId, setExpandedOrderId] = useState<string | null>(
    orders.length > 0 ? orders[0].id : null
  );

  // Return / Exchange / Refund Request Modal State
  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);
  const [selectedOrderIdForRequest, setSelectedOrderIdForRequest] = useState<string>(
    orders[0]?.id || ''
  );
  const [requestType, setRequestType] = useState<ReturnRequestType>('refund');
  const [issueReason, setIssueReason] = useState('Minor zipper snag / thread pull (Covered by Peace of Mind Protection)');
  const [reviewComment, setReviewComment] = useState('');
  const [reviewRating, setReviewRating] = useState(5);
  const [damagePhotoUrl, setDamagePhotoUrl] = useState<string>('');
  const [damagePhotoName, setDamagePhotoName] = useState<string>('');
  const [upiOrBankDetails, setUpiOrBankDetails] = useState('');
  const [formError, setFormError] = useState<string | null>(null);
  const [formSuccess, setFormSuccess] = useState(false);

  // Lightbox for viewing damage photo enlarged
  const [lightboxImage, setLightboxImage] = useState<{ url: string; title: string } | null>(null);

  const toggleExpand = (id: string) => {
    setExpandedOrderId(expandedOrderId === id ? null : id);
  };

  const handleOpenRequestModal = (orderId?: string) => {
    const targetOrder = orders.find((o) => o.id === orderId) || orders[0];
    if (targetOrder) {
      setSelectedOrderIdForRequest(targetOrder.id);
      const paymentInfo = targetOrder.payment.bankName 
        ? `NetBanking: ${targetOrder.payment.bankName} (A/C: ${targetOrder.customer.fullName})` 
        : targetOrder.payment.upiProvider 
          ? `${targetOrder.payment.upiProvider} UPI: ${targetOrder.customer.phone}@upi` 
          : `${targetOrder.customer.phone}@upi`;
      setUpiOrBankDetails(paymentInfo);
    }
    setReviewComment('');
    setFormError(null);
    setFormSuccess(false);
    setIsRequestModalOpen(true);
  };

  const handleCustomFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setDamagePhotoName(file.name);
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          setDamagePhotoUrl(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmitRequest = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    const targetOrder = orders.find((o) => o.id === selectedOrderIdForRequest);
    if (!targetOrder) {
      setFormError('Please select a valid order.');
      return;
    }

    if (!reviewComment.trim()) {
      setFormError('Please provide a review / description describing the outfit condition.');
      return;
    }

    if (!damagePhotoUrl) {
      setFormError('Please attach an image of the damaged or inspected product.');
      return;
    }

    const firstItem = targetOrder.items[0];
    const newRequest: ReturnReviewRequest = {
      id: `ret-${Date.now()}`,
      orderId: targetOrder.id,
      orderNumber: targetOrder.orderNumber,
      productId: firstItem?.product.id || 'prod-01',
      productName: firstItem?.product.name || 'Designer Outfit',
      productImage: firstItem?.product.images[0],
      selectedSize: firstItem?.selectedSize || 'M',
      customerName: targetOrder.customer.fullName,
      customerCity: targetOrder.customer.city,
      customerPhone: targetOrder.customer.phone,
      customerEmail: targetOrder.customer.email,
      requestType,
      issueCategory: issueReason,
      issueReason,
      reviewComment,
      rating: reviewRating,
      damagePhotoUrl,
      damagePhotoName,
      securityDeposit: targetOrder.pricing.securityDepositTotal,
      hasDamageProtection: Boolean(targetOrder.pricing.damageProtectionTotal && targetOrder.pricing.damageProtectionTotal > 0),
      rentalFee: targetOrder.pricing.rentalSubtotal,
      requestedRefundAmount: requestType === 'refund' || requestType === 'return' 
        ? targetOrder.pricing.securityDepositTotal 
        : 0,
      upiOrBankDetails: upiOrBankDetails || `${targetOrder.customer.phone}@upi`,
      status: 'Pending Admin Review',
      createdAt: new Date().toISOString(),
    };

    onSubmitReturnRequest(newRequest);
    setFormSuccess(true);
    setTimeout(() => {
      setFormSuccess(false);
      setIsRequestModalOpen(false);
      setActiveTab('returns');
    }, 1500);
  };

  const selectedOrderObj = orders.find((o) => o.id === selectedOrderIdForRequest) || orders[0];

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-6">
      
      {/* Page Title & Navigation Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E2DBD0] pb-6">
        <div>
          <div className="flex items-center gap-2 text-[#6B1D2F] text-xs font-bold uppercase tracking-wider">
            <span>Customer Portal</span>
            <span>•</span>
            <span>Quality & Logistics</span>
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 mt-1">
            My Rental Bookings & Returns
          </h1>
          <p className="text-stone-600 text-xs sm:text-sm mt-1 max-w-xl">
            Track live deliveries, manage return pickups, and request returns, exchanges, or deposit refunds with photo inspection reviews.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={() => handleOpenRequestModal()}
            className="px-4 py-2.5 bg-[#450A18] text-[#E6CA85] hover:bg-[#340712] text-xs font-bold rounded-xl shadow-sm transition-all cursor-pointer border border-[#E6CA85]/30 flex items-center gap-1.5"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Request Return / Exchange / Refund</span>
          </button>

          <button
            onClick={onExploreShop}
            className="px-4 py-2.5 bg-white text-stone-700 border border-stone-300 text-xs font-semibold rounded-xl hover:bg-stone-50 transition-all cursor-pointer"
          >
            Rent Another Look
          </button>
        </div>
      </div>

      {/* View Switcher Tabs */}
      <div className="flex items-center gap-2 border-b border-stone-200 pb-2">
        <button
          onClick={() => setActiveTab('orders')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
            activeTab === 'orders'
              ? 'bg-[#6B1D2F] text-white shadow-xs'
              : 'text-stone-600 hover:bg-stone-100'
          }`}
        >
          <Package className="w-3.5 h-3.5" />
          <span>All Orders & Bookings ({orders.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('returns')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
            activeTab === 'returns'
              ? 'bg-[#6B1D2F] text-white shadow-xs'
              : 'text-stone-600 hover:bg-stone-100'
          }`}
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Return, Exchange & Refund Reviews ({returnRequests.length})</span>
          {returnRequests.some((r) => r.status === 'Pending Admin Review') && (
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
          )}
        </button>
      </div>

      {/* TAB 1: ALL ORDERS VIEW */}
      {activeTab === 'orders' && (
        <div className="space-y-4">
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
                className="px-6 py-2.5 rounded-xl bg-[#6B1D2F] text-white text-xs font-bold cursor-pointer"
              >
                Start Renting
              </button>
            </div>
          ) : (
            orders.map((order) => {
              const isExpanded = expandedOrderId === order.id;
              const matchingRequest = returnRequests.find((r) => r.orderId === order.id);

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

                  {/* Return Request Active Notice Banner */}
                  {matchingRequest && (
                    <div className="px-5 py-2.5 bg-amber-50/90 border-t border-amber-200 flex flex-wrap items-center justify-between gap-2 text-xs">
                      <div className="flex items-center gap-2 text-amber-900">
                        <RotateCcw className="w-4 h-4 text-amber-700" />
                        <span className="font-semibold">
                          Return / Damage Review Filed:
                        </span>
                        <span className="font-bold bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full text-[10px]">
                          {matchingRequest.status}
                        </span>
                        <span className="text-stone-600 truncate max-w-xs">
                          ("{matchingRequest.issueCategory}")
                        </span>
                      </div>
                      <button
                        onClick={() => setActiveTab('returns')}
                        className="text-[11px] font-bold text-[#6B1D2F] hover:underline"
                      >
                        View Review & Inspection Details →
                      </button>
                    </div>
                  )}

                  {/* Expanded Details */}
                  {isExpanded && (
                    <div className="p-5 border-t border-stone-200 bg-[#FAF7F2]/50 space-y-6">
                      
                      {/* Action Bar for this Order */}
                      <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-3.5 rounded-xl border border-stone-200">
                        <div className="text-xs text-stone-600">
                          Need to return, exchange for another size, or claim a refund for a defect?
                        </div>
                        <button
                          onClick={() => handleOpenRequestModal(order.id)}
                          className="px-3.5 py-1.5 bg-[#450A18] hover:bg-[#340712] text-[#E6CA85] text-xs font-bold rounded-lg transition-all cursor-pointer flex items-center gap-1.5 shadow-xs"
                        >
                          <RotateCcw className="w-3.5 h-3.5" />
                          <span>Post Return / Exchange / Refund Review</span>
                        </button>
                      </div>

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
            })
          )}
        </div>
      )}

      {/* TAB 2: RETURN, EXCHANGE & REFUND REVIEWS SECTION */}
      {activeTab === 'returns' && (
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-[#450A18] to-[#6B1D2F] text-white p-6 rounded-3xl border border-[#E6CA85]/30 shadow-md flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-[#E6CA85] text-xs font-bold uppercase tracking-wider">
                <ShieldCheck className="w-4 h-4" />
                <span>Customer Return & Quality Inspection Desk</span>
              </div>
              <h2 className="font-serif text-xl sm:text-2xl font-bold mt-1">
                Your Return, Exchange & Refund Reviews
              </h2>
              <p className="text-stone-300 text-xs sm:text-sm mt-1 max-w-xl">
                Post reviews with photos of damaged garments or sizing issues. Style-Rent Quality Inspectors inspect your submitted photos in the Admin Hub and process your refund or replacement.
              </p>
            </div>

            <button
              onClick={() => handleOpenRequestModal()}
              className="px-4 py-2.5 bg-[#E6CA85] hover:bg-[#d8b868] text-[#450A18] text-xs font-bold rounded-xl shadow-md transition-all cursor-pointer shrink-0"
            >
              + File New Return / Refund Review
            </button>
          </div>

          {returnRequests.length === 0 ? (
            <div className="bg-white rounded-3xl border border-stone-200 p-12 text-center space-y-4">
              <div className="w-16 h-16 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-700 mx-auto">
                <RotateCcw className="w-8 h-8" />
              </div>
              <h3 className="font-serif text-xl font-bold text-stone-800">No Return or Refund Reviews Filed</h3>
              <p className="text-stone-500 text-xs max-w-md mx-auto">
                Have an outfit you've worn and need to return for your security deposit? Or noticed damage or need an exchange? Post an inspection review with photos here.
              </p>
              <button
                onClick={() => handleOpenRequestModal()}
                className="px-5 py-2.5 rounded-xl bg-[#6B1D2F] text-white text-xs font-bold cursor-pointer"
              >
                Create Return / Refund Review
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {returnRequests.map((req) => (
                <div
                  key={req.id}
                  className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-xs hover:border-[#6B1D2F]/30 transition-all p-5 space-y-4"
                >
                  {/* Top Bar */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-100 pb-4">
                    <div className="flex items-center gap-3">
                      {req.productImage && (
                        <img
                          src={req.productImage}
                          alt=""
                          className="w-12 h-16 object-cover object-top rounded-lg border border-stone-200 shrink-0"
                        />
                      )}
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-bold text-[#6B1D2F] text-xs">
                            Order {req.orderNumber}
                          </span>
                          <span className="text-xs text-stone-300">•</span>
                          <span className="text-[11px] text-stone-500">
                            Submitted on {new Date(req.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                          </span>
                        </div>
                        <h4 className="font-serif font-bold text-stone-900 text-base mt-0.5">
                          {req.productName} (Size {req.selectedSize})
                        </h4>
                        <div className="text-xs text-stone-600 mt-0.5 flex items-center gap-2">
                          <span className="font-semibold text-stone-800">
                            {req.requestType === 'refund' 
                              ? 'Return & Deposit Refund' 
                              : req.requestType === 'exchange' 
                                ? 'Size / Outfit Exchange' 
                                : 'Damage Claim & Refund'}
                          </span>
                          <span>•</span>
                          <span>Held Deposit: <strong>{formatINR(req.securityDeposit)}</strong></span>
                        </div>
                      </div>
                    </div>

                    {/* Status Pill */}
                    <div className="self-start sm:self-auto text-right">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${
                        req.status === 'Approved & Refunded'
                          ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                          : req.status === 'Exchange Approved'
                            ? 'bg-blue-100 text-blue-800 border border-blue-200'
                            : req.status === 'Rejected'
                              ? 'bg-red-100 text-red-800 border border-red-200'
                              : 'bg-amber-100 text-amber-900 border border-amber-200'
                      }`}>
                        <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
                        <span>{req.status}</span>
                      </span>
                      <div className="text-[10px] text-stone-400 mt-1">
                        Refund Target: {req.upiOrBankDetails}
                      </div>
                    </div>
                  </div>

                  {/* Body: Two columns (Review Details + Posted Damage Image) */}
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-5 text-xs">
                    
                    {/* Left: Review Text & Details (7 cols) */}
                    <div className="md:col-span-7 space-y-3">
                      <div>
                        <div className="text-stone-500 font-medium">Reported Category:</div>
                        <div className="font-bold text-stone-800 text-sm mt-0.5">
                          {req.issueReason}
                        </div>
                      </div>

                      <div className="flex items-center gap-1 text-amber-500">
                        {[1, 2, 3, 4, 5].map((s) => (
                          <Star
                            key={s}
                            className={`w-3.5 h-3.5 ${s <= req.rating ? 'fill-amber-400 text-amber-400' : 'text-stone-300'}`}
                          />
                        ))}
                        <span className="text-stone-500 text-[11px] ml-1">({req.rating} / 5 Customer Rating)</span>
                      </div>

                      <div className="bg-[#FAF7F2] p-3.5 rounded-xl border border-stone-200 space-y-1">
                        <div className="text-[10px] font-bold uppercase tracking-wider text-[#8C6D46]">
                          Customer's Written Review & Condition Notes
                        </div>
                        <p className="text-stone-700 italic leading-relaxed">
                          "{req.reviewComment}"
                        </p>
                      </div>

                      <div className="flex flex-wrap items-center gap-2 text-[11px]">
                        <span className={`px-2.5 py-1 rounded-md font-semibold border ${
                          req.hasDamageProtection 
                            ? 'bg-emerald-50 text-emerald-800 border-emerald-200' 
                            : 'bg-stone-100 text-stone-600 border-stone-200'
                        }`}>
                          {req.hasDamageProtection ? '✓ Peace of Mind Protection Active' : 'No Damage Protection'}
                        </span>
                        <span className="text-stone-500">
                          Payout UPI: <strong>{req.upiOrBankDetails}</strong>
                        </span>
                      </div>
                    </div>

                    {/* Right: Posted Damage Photo (5 cols) */}
                    <div className="md:col-span-5 space-y-2">
                      <div className="text-xs font-bold text-stone-800 flex items-center justify-between">
                        <span>📸 Posted Image of Damaged Product:</span>
                        <span className="text-[10px] text-stone-400 font-normal">Click to enlarge</span>
                      </div>

                      <div 
                        onClick={() => setLightboxImage({ url: req.damagePhotoUrl, title: `${req.productName} - Damaged Product Photo` })}
                        className="group relative rounded-xl overflow-hidden border border-stone-300 bg-stone-900 aspect-video sm:aspect-4/3 cursor-pointer shadow-xs"
                      >
                        <img
                          src={req.damagePhotoUrl}
                          alt="Damaged outfit inspected"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                        />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white gap-1.5 text-xs font-medium">
                          <Maximize2 className="w-4 h-4" />
                          <span>View Full Photo</span>
                        </div>
                        <div className="absolute bottom-2 left-2 bg-black/70 backdrop-blur-sm text-white px-2 py-0.5 rounded-md text-[10px] font-mono">
                          {req.damagePhotoName || 'Damage Photo'}
                        </div>
                      </div>
                    </div>

                  </div>

                  {/* ADMIN INSPECTION VERDICT SECTION (If inspected by Admin) */}
                  {req.adminInspection ? (
                    <div className="bg-emerald-50/80 border border-emerald-300 rounded-xl p-4 space-y-2 text-xs">
                      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-emerald-200 pb-2">
                        <div className="flex items-center gap-2 text-emerald-900 font-bold">
                          <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                          <span>Admin Quality Hub Inspection Completed</span>
                        </div>
                        <span className="text-[11px] text-emerald-800">
                          Inspected on {new Date(req.adminInspection.inspectedAt).toLocaleString('en-IN', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                        <div>
                          <span className="text-stone-500 block text-[10px]">Inspector:</span>
                          <strong className="text-stone-900">{req.adminInspection.inspectorStaff}</strong>
                        </div>
                        <div>
                          <span className="text-stone-500 block text-[10px]">Assessed Condition:</span>
                          <span className="font-semibold text-emerald-800">{req.adminInspection.assessedCondition}</span>
                        </div>
                        <div>
                          <span className="text-stone-500 block text-[10px]">Refund Settlement:</span>
                          <strong className="text-emerald-700 text-sm">
                            {formatINR(req.adminInspection.finalRefundAmount)}
                          </strong>
                          {req.adminInspection.damageChargeDeducted > 0 && (
                            <span className="text-stone-400 text-[10px] block">
                              (Fee deducted: {formatINR(req.adminInspection.damageChargeDeducted)})
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="pt-2 border-t border-emerald-200/60">
                        <span className="text-emerald-950 font-bold block text-[11px]">Inspector Remarks:</span>
                        <p className="text-emerald-900 italic mt-0.5">
                          "{req.adminInspection.adminNotes}"
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="bg-amber-50/70 border border-amber-200 rounded-xl p-3.5 flex items-center justify-between gap-3 text-xs text-amber-900">
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-amber-700 shrink-0" />
                        <span>
                          <strong>Pending Admin Review:</strong> Your review and damaged product image are currently queued in the <strong>Admin Hub</strong>. An operations specialist will inspect your photos and issue your refund or exchange.
                        </span>
                      </div>
                    </div>
                  )}

                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* REQUEST RETURN / EXCHANGE / REFUND MODAL */}
      {isRequestModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-fade-in">
          <div className="bg-[#FAF7F2] rounded-3xl max-w-2xl w-full shadow-2xl border border-[#E5DECF] relative text-stone-800 p-6 sm:p-8 space-y-5 my-auto max-h-[92vh] overflow-y-auto">
            
            <button
              onClick={() => setIsRequestModalOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-full hover:bg-stone-200 text-stone-500 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div>
              <div className="text-xs uppercase font-bold text-[#8C6D46] tracking-wider flex items-center gap-1.5">
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Quality Inspection & Refund Request</span>
              </div>
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-stone-900 mt-1">
                Post Return, Exchange or Refund Review
              </h3>
              <p className="text-stone-600 text-xs mt-1">
                Upload a photo of the damaged area or outfit, write your review, and our Admin Hub quality team will inspect and release your deposit or dispatch an exchange.
              </p>
            </div>

            {formSuccess ? (
              <div className="p-8 text-center space-y-3 bg-emerald-50 rounded-2xl border border-emerald-200">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                <h4 className="font-serif font-bold text-emerald-900 text-lg">
                  Review & Damage Request Submitted!
                </h4>
                <p className="text-xs text-emerald-700 max-w-md mx-auto">
                  Your review with the damaged product photo has been forwarded to the <strong>Admin Hub</strong> for quality inspection. Security deposit refund will be processed upon admin signoff.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmitRequest} className="space-y-4 text-xs">
                
                {formError && (
                  <div className="p-3 bg-red-50 border border-red-300 rounded-xl text-red-700 text-xs font-semibold flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 shrink-0 text-red-600" />
                    <span>{formError}</span>
                  </div>
                )}

                {/* Select Order */}
                <div>
                  <label className="font-bold text-stone-800 block mb-1">
                    Select Rental Order to Review
                  </label>
                  <select
                    value={selectedOrderIdForRequest}
                    onChange={(e) => {
                      setSelectedOrderIdForRequest(e.target.value);
                      const target = orders.find((o) => o.id === e.target.value);
                      if (target) {
                        setUpiOrBankDetails(`${target.customer.phone}@upi`);
                      }
                    }}
                    className="w-full px-3 py-2 bg-white border border-stone-300 rounded-xl font-medium text-stone-800"
                  >
                    {orders.map((ord) => (
                      <option key={ord.id} value={ord.id}>
                        {ord.orderNumber} - {ord.items[0]?.product.name} (Deposit: {formatINR(ord.pricing.securityDepositTotal)})
                      </option>
                    ))}
                  </select>
                </div>

                {/* Request Type Selection */}
                <div>
                  <label className="font-bold text-stone-800 block mb-1.5">
                    Choose What You Need
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    <button
                      type="button"
                      onClick={() => setRequestType('refund')}
                      className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                        requestType === 'refund'
                          ? 'bg-[#450A18] text-[#E6CA85] border-[#450A18] font-bold shadow-xs'
                          : 'bg-white border-stone-200 text-stone-700 hover:bg-stone-50'
                      }`}
                    >
                      <div className="font-bold text-xs">💰 Return & Deposit Refund</div>
                      <div className="text-[10px] opacity-80 mt-1">Concluded event; return garment & release deposit</div>
                    </button>

                    <button
                      type="button"
                      onClick={() => setRequestType('exchange')}
                      className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                        requestType === 'exchange'
                          ? 'bg-[#450A18] text-[#E6CA85] border-[#450A18] font-bold shadow-xs'
                          : 'bg-white border-stone-200 text-stone-700 hover:bg-stone-50'
                      }`}
                    >
                      <div className="font-bold text-xs">🔄 Sizing Exchange</div>
                      <div className="text-[10px] opacity-80 mt-1">Swap for backup size or alternative outfit</div>
                    </button>

                    <button
                      type="button"
                      onClick={() => setRequestType('return')}
                      className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                        requestType === 'return'
                          ? 'bg-[#450A18] text-[#E6CA85] border-[#450A18] font-bold shadow-xs'
                          : 'bg-white border-stone-200 text-stone-700 hover:bg-stone-50'
                      }`}
                    >
                      <div className="font-bold text-xs">🛡 Damaged Garment Claim</div>
                      <div className="text-[10px] opacity-80 mt-1">Report tear or stain under damage protection</div>
                    </button>
                  </div>
                </div>

                {/* Issue Category Preset */}
                <div>
                  <label className="font-bold text-stone-800 block mb-1">
                    Specific Issue or Return Reason
                  </label>
                  <select
                    value={issueReason}
                    onChange={(e) => setIssueReason(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-stone-300 rounded-xl font-medium text-stone-800"
                  >
                    <option value="Minor zipper snag / thread pull (Covered by Peace of Mind Protection)">
                      Minor zipper snag / thread pull (Covered by Peace of Mind Protection)
                    </option>
                    <option value="Stain or embroidery defect noticed upon unboxing">
                      Stain or embroidery defect noticed upon unboxing
                    </option>
                    <option value="Chest or waist fitting tighter than expected (Exchange needed)">
                      Chest or waist fitting tighter than expected (Exchange needed)
                    </option>
                    <option value="Loose sequins or zari friction during event">
                      Loose sequins or zari friction during event
                    </option>
                    <option value="Event completed - Returning pristine outfit for full deposit refund">
                      Event completed - Returning pristine outfit for full deposit refund
                    </option>
                    <option value="Other return / damage inspection claim">
                      Other return / damage inspection claim
                    </option>
                  </select>
                </div>

                {/* Rating */}
                <div>
                  <label className="font-bold text-stone-800 block mb-1">
                    Outfit Experience Rating
                  </label>
                  <div className="flex items-center gap-1.5">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setReviewRating(star)}
                        className="p-1 hover:scale-110 transition-transform cursor-pointer"
                      >
                        <Star
                          className={`w-5 h-5 ${
                            star <= reviewRating ? 'fill-amber-400 text-amber-400' : 'text-stone-300'
                          }`}
                        />
                      </button>
                    ))}
                    <span className="text-stone-500 text-xs ml-2">({reviewRating} Stars)</span>
                  </div>
                </div>

                {/* Detailed Written Review Comment */}
                <div>
                  <label className="font-bold text-stone-800 block mb-1">
                    Your Review & Damage Inspection Notes <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    rows={3}
                    value={reviewComment}
                    onChange={(e) => setReviewComment(e.target.value)}
                    placeholder="Describe the outfit condition, what occurred, or details about the damaged area so the Admin inspector can verify..."
                    className="w-full px-3.5 py-2.5 bg-white border border-stone-300 rounded-xl text-stone-800 focus:outline-hidden focus:ring-1 focus:ring-[#6B1D2F]"
                  />
                </div>

                {/* POST IMAGE OF DAMAGED PRODUCT */}
                <div className="space-y-2">
                  <label className="font-bold text-stone-800 block">
                    Post Image of the Damaged Product <span className="text-red-500">*</span>
                  </label>

                  {/* File Upload Zone */}
                  <div className="border-2 border-dashed border-[#DFCBB5] hover:border-[#6B1D2F] rounded-2xl p-4 bg-white/70 text-center relative transition-colors">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleCustomFileUpload}
                      className="absolute inset-0 opacity-0 cursor-pointer z-10"
                    />
                    <Upload className="w-6 h-6 text-[#6B1D2F] mx-auto mb-1" />
                    <span className="font-bold text-stone-800 block">
                      Click to upload photo from your phone or device
                    </span>
                    <span className="text-[10px] text-stone-500">
                      Supports JPG, PNG, WEBP (Instant preview)
                    </span>
                  </div>
                  {damagePhotoUrl && (
                    <div className="bg-white p-3 rounded-xl border border-stone-200 flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <img
                          src={damagePhotoUrl}
                          alt="Damage preview"
                          className="w-14 h-14 rounded-lg object-cover border border-stone-300"
                        />
                        <div>
                          <span className="font-bold text-stone-800 block truncate max-w-xs">
                            {damagePhotoName || 'Damage Photo'}
                          </span>
                          <span className="text-[10px] text-emerald-700 font-medium">
                            ✓ Image ready for Admin Quality Hub inspection
                          </span>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => {
                          setDamagePhotoUrl('');
                          setDamagePhotoName('');
                        }}
                        className="text-stone-400 hover:text-red-600 p-1"
                        title="Remove photo"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>

                {/* Refund Account / UPI */}
                <div>
                  <label className="font-bold text-stone-800 block mb-1">
                    UPI ID or Bank Details for Refund Credit
                  </label>
                  <input
                    type="text"
                    value={upiOrBankDetails}
                    onChange={(e) => setUpiOrBankDetails(e.target.value)}
                    placeholder="e.g. ananya@okhdfcbank or 9820144521@paytm"
                    className="w-full px-3 py-2 bg-white border border-stone-300 rounded-xl font-mono text-stone-800"
                  />
                </div>

                {/* Financial Summary */}
                <div className="bg-stone-100 p-3.5 rounded-xl border border-stone-200 space-y-1.5 text-xs">
                  <div className="flex justify-between text-stone-600">
                    <span>Held Security Deposit:</span>
                    <strong>{formatINR(selectedOrderObj?.pricing.securityDepositTotal || 2500)}</strong>
                  </div>
                  <div className="flex justify-between text-stone-600">
                    <span>Peace of Mind Protection:</span>
                    <strong className={selectedOrderObj?.pricing.damageProtectionTotal ? 'text-emerald-700' : 'text-stone-500'}>
                      {selectedOrderObj?.pricing.damageProtectionTotal ? 'Active (Covers Minor Snags)' : 'Not Opted'}
                    </strong>
                  </div>
                  <div className="flex justify-between text-stone-900 font-bold pt-1 border-t border-stone-200">
                    <span>Target Security Deposit Refund:</span>
                    <span className="text-emerald-700">
                      {formatINR(selectedOrderObj?.pricing.securityDepositTotal || 2500)}
                    </span>
                  </div>
                </div>

                {/* Submit button */}
                <div className="flex items-center justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsRequestModalOpen(false)}
                    className="px-4 py-2.5 rounded-xl border border-stone-300 text-stone-600 hover:bg-stone-100 font-semibold cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-[#450A18] hover:bg-[#340712] text-[#E6CA85] font-bold rounded-xl shadow-md transition-all cursor-pointer border border-[#E6CA85]/30 flex items-center gap-2"
                  >
                    <Check className="w-4 h-4" />
                    <span>Submit Review & Post Damage Image</span>
                  </button>
                </div>

              </form>
            )}

          </div>
        </div>
      )}

      {/* LIGHTBOX FOR DAMAGE PHOTO */}
      {lightboxImage && (
        <div 
          onClick={() => setLightboxImage(null)}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in cursor-pointer"
        >
          <div className="relative max-w-3xl max-h-[90vh] flex flex-col items-center">
            <button
              onClick={() => setLightboxImage(null)}
              className="absolute -top-10 right-0 text-white hover:text-stone-300 p-2"
            >
              <X className="w-6 h-6" />
            </button>
            <img
              src={lightboxImage.url}
              alt="Enlarged damaged outfit"
              className="max-w-full max-h-[80vh] object-contain rounded-2xl shadow-2xl border border-white/20"
            />
            <div className="mt-3 text-white text-xs font-semibold bg-black/60 px-4 py-1.5 rounded-full backdrop-blur-sm">
              {lightboxImage.title}
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
