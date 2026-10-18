import React, { useState } from 'react';
import { 
  Package, 
  CheckCircle2, 
  AlertTriangle, 
  XCircle, 
  RotateCcw, 
  Layers, 
  ClipboardCheck, 
  ShieldCheck, 
  Check, 
  Eye, 
  FileText,
  Lock,
  Star,
  Maximize2,
  X,
  Clock,
  ArrowRight,
  TrendingUp,
  Camera,
  RefreshCw
} from 'lucide-react';
import { InventoryItem, Order, ReturnReviewRequest } from '../types';
import { formatDate, formatINR } from '../utils/rentalCalculations';

interface AdminDashboardViewProps {
  orders: Order[];
  onUpdateOrderStatus: (orderId: string, newStatus: any) => void;
  inventory: InventoryItem[];
  onUpdateInventoryStatus: (itemId: string, newStatus: any) => void;
  returnRequests: ReturnReviewRequest[];
  onInspectReturnRequest: (
    requestId: string,
    inspectionData: {
      assessedCondition: string;
      damageChargeDeducted: number;
      finalRefundAmount: number;
      actionTaken: 'refund_processed' | 'exchange_approved' | 'rejected';
      adminNotes: string;
      inspectorStaff: string;
    }
  ) => void;
  onLockAccess?: () => void;
}

export const AdminDashboardView: React.FC<AdminDashboardViewProps> = ({
  orders,
  onUpdateOrderStatus,
  inventory,
  onUpdateInventoryStatus,
  returnRequests,
  onInspectReturnRequest,
  onLockAccess,
}) => {
  // Navigation tabs: Orders, Inventory, Return Reviews (Simulator removed!)
  const [activeAdminTab, setActiveAdminTab] = useState<'orders' | 'inventory' | 'reviews'>('reviews');

  // Filter for Return Reviews tab
  const [reviewFilter, setReviewFilter] = useState<'all' | 'pending' | 'approved' | 'exchange'>('all');

  // Selected review currently being inspected in detail
  const [inspectingRequestId, setInspectingRequestId] = useState<string | null>(
    returnRequests[0]?.id || null
  );

  // Inspector form state for the currently active review
  const activeReview = returnRequests.find((r) => r.id === inspectingRequestId) || returnRequests[0];

  const [assessmentCondition, setAssessmentCondition] = useState<string>(
    'Minor Damage (Covered by Protection)'
  );
  const [damageCharge, setDamageCharge] = useState<number>(0);
  const [inspectorNotes, setInspectorNotes] = useState<string>(
    'Inspected customer uploaded damage photo. Minor fabric snag verified. Covered under Peace of Mind Damage Protection. Releasing 100% security deposit.'
  );
  const [inspectorStaff, setInspectorStaff] = useState<string>('Pooja Nair (Senior Quality Inspector)');
  const [inspectionSuccessMsg, setInspectionSuccessMsg] = useState<string | null>(null);
  const [isEditingInspection, setIsEditingInspection] = useState<boolean>(false);
  const [operationFeedback, setOperationFeedback] = useState<{
    title: string;
    message: string;
    action: 'refund_processed' | 'exchange_approved' | 'rejected';
    timestamp: string;
  } | null>(null);

  // Lightbox for viewing damage photo enlarged
  const [lightboxImage, setLightboxImage] = useState<{ url: string; title: string } | null>(null);

  // Update inspection form defaults whenever activeReview changes
  const handleSelectReviewToInspect = (req: ReturnReviewRequest) => {
    setInspectingRequestId(req.id);
    setIsEditingInspection(false);
    if (req.adminInspection) {
      setAssessmentCondition(req.adminInspection.assessedCondition);
      setDamageCharge(req.adminInspection.damageChargeDeducted);
      setInspectorNotes(req.adminInspection.adminNotes);
      setInspectorStaff(req.adminInspection.inspectorStaff);
    } else {
      if (req.hasDamageProtection) {
        setAssessmentCondition('Minor Damage (Covered by Protection)');
        setDamageCharge(0);
        setInspectorNotes('Inspected customer uploaded damage photo. Minor wear/snag verified. Covered under Peace of Mind Protection. 100% security deposit release approved.');
      } else {
        setAssessmentCondition('Minor Damage (Fee Assessed)');
        setDamageCharge(500);
        setInspectorNotes('Inspected damage photo. Minor snag without protection policy; assessed standard ₹500 repair charge. Remaining deposit refunded.');
      }
    }
  };

  // Quick calculate refund
  const calculateRefund = (req?: ReturnReviewRequest) => {
    if (!req) return 0;
    const deposit = req.securityDeposit || 2500;
    if (assessmentCondition === 'Damaged on Arrival (Full Refund)') {
      return deposit + (req.rentalFee || 1999);
    }
    return Math.max(0, deposit - damageCharge);
  };

  const handleConditionChange = (condition: string) => {
    setAssessmentCondition(condition);
    const deposit = activeReview?.securityDeposit || 2500;
    const hasProtection = activeReview?.hasDamageProtection;

    if (condition === 'Pristine Condition') {
      setDamageCharge(0);
      setInspectorNotes('Inspected garment photo. Outfit is in pristine condition. Full deposit refund released.');
    } else if (condition === 'Minor Damage (Covered by Protection)') {
      setDamageCharge(0);
      setInspectorNotes('Inspected photo. Minor snag/wear detected, fully covered under active Peace of Mind Protection (₹0 fee). Full deposit released.');
    } else if (condition === 'Minor Damage (Fee Assessed)') {
      setDamageCharge(hasProtection ? 0 : 500);
      setInspectorNotes(hasProtection 
        ? 'Customer has Peace of Mind Protection active. Deductions waived.'
        : 'Inspected photo. Minor snag requires mending; ₹500 fee assessed against deposit.');
    } else if (condition === 'Major Damage (Deposit Retained)') {
      setDamageCharge(Math.min(deposit, 2000));
      setInspectorNotes('Inspected photo. Major fabric tear / irreparable damage observed. ₹2,000 retained for fabric replacement.');
    } else if (condition === 'Damaged on Arrival (Full Refund)') {
      setDamageCharge(0);
      setInspectorNotes('Quality claim verified: outfit had defect upon unboxing. Issuing 100% rental subtotal + full deposit refund with courier apology.');
    } else if (condition === 'Exchange Approved (Replacement Dispatched)') {
      setDamageCharge(0);
      setInspectorNotes('Size/fit review verified. Replacement garment unit allocated from inventory and scheduled for express dispatch.');
    }
  };

  const handleProcessInspectionSubmit = (action: 'refund_processed' | 'exchange_approved' | 'rejected') => {
    if (!activeReview) return;

    const finalRefund = action === 'exchange_approved' ? 0 : calculateRefund(activeReview);

    onInspectReturnRequest(activeReview.id, {
      assessedCondition: assessmentCondition,
      damageChargeDeducted: action === 'exchange_approved' ? 0 : damageCharge,
      finalRefundAmount: finalRefund,
      actionTaken: action,
      adminNotes: inspectorNotes,
      inspectorStaff,
    });

    // Update order status
    if (action === 'exchange_approved') {
      onUpdateOrderStatus(activeReview.orderId, 'Preparing');
    } else if (action === 'refund_processed') {
      onUpdateOrderStatus(activeReview.orderId, 'Inspected & Refunded');
    }

    // Update inventory garment unit to 'Cleaning'
    const matchingUnit = inventory.find((i) => i.productId === activeReview.productId);
    if (matchingUnit) {
      onUpdateInventoryStatus(matchingUnit.id, 'Cleaning');
    }

    let feedbackTitle = '';
    let feedbackMsg = '';

    if (action === 'exchange_approved') {
      feedbackTitle = 'Operation Successful: Exchange Approved!';
      feedbackMsg = `Replacement garment unit allocated for ${activeReview.customerName} (Size ${activeReview.selectedSize}). Logistics order status updated to "Preparing".`;
    } else if (action === 'refund_processed') {
      feedbackTitle = 'Operation Successful: Inspection Completed & Refund Issued!';
      feedbackMsg = `Security deposit refund of ${formatINR(finalRefund)} successfully credited to UPI: ${activeReview.upiOrBankDetails}. Order status updated to "Inspected & Refunded".`;
    } else {
      feedbackTitle = 'Operation Successful: Return Claim Declined!';
      feedbackMsg = `Return claim for Order ${activeReview.orderNumber} has been declined. Customer notified with recorded inspector remarks.`;
    }

    setOperationFeedback({
      title: feedbackTitle,
      message: feedbackMsg,
      action,
      timestamp: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
    });

    setInspectionSuccessMsg(feedbackTitle);
    setIsEditingInspection(false);

    // Auto-clear feedback after 7 seconds
    setTimeout(() => {
      setOperationFeedback((prev) => (prev?.title === feedbackTitle ? null : prev));
    }, 7000);
  };

  // Filtered reviews
  const filteredReviews = returnRequests.filter((r) => {
    if (reviewFilter === 'pending') return r.status === 'Pending Admin Review';
    if (reviewFilter === 'approved') return r.status === 'Approved & Refunded';
    if (reviewFilter === 'exchange') return r.status === 'Exchange Approved';
    return true;
  });

  const pendingCount = returnRequests.filter((r) => r.status === 'Pending Admin Review').length;
  const approvedCount = returnRequests.filter((r) => r.status === 'Approved & Refunded').length;
  const exchangeCount = returnRequests.filter((r) => r.status === 'Exchange Approved').length;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-6">
      
      {/* Top Banner */}
      <div className="bg-[#450A18] text-[#FAF7F2] rounded-3xl p-6 sm:p-8 border border-[#E6CA85]/30 shadow-lg flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-[#E6CA85] text-xs font-semibold uppercase tracking-wider">
            <ClipboardCheck className="w-4 h-4" />
            <span>Staff & Quality Operations Console</span>
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold mt-1 text-white">
            Style-Rent Admin & Quality Hub
          </h1>
          <p className="text-stone-300 text-xs sm:text-sm mt-1 max-w-xl">
            Inspect customer-submitted return, exchange & damage refund reviews with attached photos. Verify garment condition and execute automated security deposit settlements.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2 self-start md:self-auto">
          {onLockAccess && (
            <button
              onClick={onLockAccess}
              className="px-3.5 py-2 rounded-xl bg-rose-900/90 hover:bg-rose-800 text-rose-100 text-xs font-bold border border-rose-400/50 flex items-center gap-1.5 transition-all cursor-pointer shadow-md hover:scale-105"
              title="Admin Logout"
            >
              <Lock className="w-3.5 h-3.5 text-rose-300" />
              <span>Admin Logout (Lock Access)</span>
            </button>
          )}

          {/* Tab switchers */}
          <div className="bg-black/40 backdrop-blur-md p-1.5 rounded-2xl border border-white/10 flex gap-1">
            <button
              onClick={() => setActiveAdminTab('reviews')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                activeAdminTab === 'reviews' 
                  ? 'bg-[#E6CA85] text-[#450A18] shadow-xs' 
                  : 'text-stone-300 hover:text-white'
              }`}
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Return & Damage Reviews ({returnRequests.length})</span>
              {pendingCount > 0 && (
                <span className="bg-rose-600 text-white text-[10px] px-1.5 py-0.2 rounded-full font-bold">
                  {pendingCount}
                </span>
              )}
            </button>
            <button
              onClick={() => setActiveAdminTab('orders')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeAdminTab === 'orders' 
                  ? 'bg-[#E6CA85] text-[#450A18] shadow-xs' 
                  : 'text-stone-300 hover:text-white'
              }`}
            >
              Orders ({orders.length})
            </button>
            <button
              onClick={() => setActiveAdminTab('inventory')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeAdminTab === 'inventory' 
                  ? 'bg-[#E6CA85] text-[#450A18] shadow-xs' 
                  : 'text-stone-300 hover:text-white'
              }`}
            >
              Garment Inventory ({inventory.length})
            </button>
          </div>
        </div>
      </div>

      {/* TAB 1: CUSTOMER RETURN & DAMAGE REVIEWS (REPLACED OLD SIMULATOR) */}
      {activeAdminTab === 'reviews' && (
        <div className="space-y-6">
          
          {/* Top Summary Metrics Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-xs">
              <span className="text-stone-500 block text-[11px] font-medium">Total Reviews Filed</span>
              <span className="font-serif text-2xl font-bold text-stone-900 mt-0.5 block">
                {returnRequests.length}
              </span>
              <span className="text-[10px] text-stone-400">Customer returns & claims</span>
            </div>

            <div className="bg-amber-50 p-4 rounded-2xl border border-amber-200 shadow-xs">
              <span className="text-amber-800 block text-[11px] font-semibold">Pending Inspection</span>
              <span className="font-serif text-2xl font-bold text-amber-900 mt-0.5 block">
                {pendingCount}
              </span>
              <span className="text-[10px] text-amber-700">Requires photo verification</span>
            </div>

            <div className="bg-emerald-50 p-4 rounded-2xl border border-emerald-200 shadow-xs">
              <span className="text-emerald-800 block text-[11px] font-semibold">Approved & Refunded</span>
              <span className="font-serif text-2xl font-bold text-emerald-900 mt-0.5 block">
                {approvedCount}
              </span>
              <span className="text-[10px] text-emerald-700">Security deposits returned</span>
            </div>

            <div className="bg-blue-50 p-4 rounded-2xl border border-blue-200 shadow-xs">
              <span className="text-blue-800 block text-[11px] font-semibold">Exchanges Approved</span>
              <span className="font-serif text-2xl font-bold text-blue-900 mt-0.5 block">
                {exchangeCount}
              </span>
              <span className="text-[10px] text-blue-700">Replacement garments allocated</span>
            </div>
          </div>

          {/* Success Banner */}
          {inspectionSuccessMsg && (
            <div className="p-4 bg-emerald-50 border border-emerald-300 rounded-2xl text-emerald-900 text-xs flex items-center gap-3 font-semibold animate-fade-in shadow-xs">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              <span>{inspectionSuccessMsg}</span>
            </div>
          )}

          {/* Filter Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-3 rounded-2xl border border-stone-200">
            <div className="flex items-center gap-1.5 text-xs">
              <span className="text-stone-500 font-semibold px-2">Filter Reviews:</span>
              <button
                onClick={() => setReviewFilter('all')}
                className={`px-3 py-1.5 rounded-xl font-bold cursor-pointer transition-all ${
                  reviewFilter === 'all' ? 'bg-[#450A18] text-[#E6CA85]' : 'text-stone-600 hover:bg-stone-100'
                }`}
              >
                All ({returnRequests.length})
              </button>
              <button
                onClick={() => setReviewFilter('pending')}
                className={`px-3 py-1.5 rounded-xl font-bold cursor-pointer transition-all ${
                  reviewFilter === 'pending' ? 'bg-[#450A18] text-[#E6CA85]' : 'text-stone-600 hover:bg-stone-100'
                }`}
              >
                Pending ({pendingCount})
              </button>
              <button
                onClick={() => setReviewFilter('approved')}
                className={`px-3 py-1.5 rounded-xl font-bold cursor-pointer transition-all ${
                  reviewFilter === 'approved' ? 'bg-[#450A18] text-[#E6CA85]' : 'text-stone-600 hover:bg-stone-100'
                }`}
              >
                Approved ({approvedCount})
              </button>
              <button
                onClick={() => setReviewFilter('exchange')}
                className={`px-3 py-1.5 rounded-xl font-bold cursor-pointer transition-all ${
                  reviewFilter === 'exchange' ? 'bg-[#450A18] text-[#E6CA85]' : 'text-stone-600 hover:bg-stone-100'
                }`}
              >
                Exchanges ({exchangeCount})
              </button>
            </div>

            <div className="text-xs text-stone-400 font-medium px-2">
              Select a customer review below to inspect photo and release refund
            </div>
          </div>

          {/* Main Inspection Layout: Left review list (5 cols) & Right inspector workbench (7 cols) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            
            {/* Reviews List (5 cols) */}
            <div className="lg:col-span-5 space-y-3">
              <div className="text-xs font-bold text-stone-700 uppercase tracking-wider flex items-center justify-between">
                <span>Customer Return Reviews</span>
                <span className="text-stone-400">{filteredReviews.length} found</span>
              </div>

              {filteredReviews.length === 0 ? (
                <div className="bg-white rounded-2xl border border-stone-200 p-8 text-center text-xs text-stone-500">
                  No reviews match the selected filter.
                </div>
              ) : (
                filteredReviews.map((req) => {
                  const isSelected = activeReview?.id === req.id;
                  return (
                    <div
                      key={req.id}
                      onClick={() => handleSelectReviewToInspect(req)}
                      className={`p-4 rounded-2xl border transition-all cursor-pointer text-xs space-y-2.5 ${
                        isSelected
                          ? 'bg-[#FAF4EB] border-[#6B1D2F] ring-2 ring-[#6B1D2F]/20 shadow-md'
                          : 'bg-white border-stone-200 hover:border-stone-400 hover:bg-stone-50/70 shadow-xs'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-bold text-[#6B1D2F]">
                            {req.orderNumber}
                          </span>
                          <span className="text-stone-300">•</span>
                          <span className="font-bold text-stone-900 truncate max-w-[140px]">
                            {req.customerName}
                          </span>
                        </div>
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          req.status === 'Approved & Refunded'
                            ? 'bg-emerald-100 text-emerald-800'
                            : req.status === 'Exchange Approved'
                              ? 'bg-blue-100 text-blue-800'
                              : 'bg-amber-100 text-amber-900'
                        }`}>
                          {req.status}
                        </span>
                      </div>

                      <div className="flex items-center gap-3">
                        <img
                          src={req.damagePhotoUrl}
                          alt="Thumbnail"
                          className="w-12 h-12 rounded-lg object-cover border border-stone-300 shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="font-semibold text-stone-800 truncate">
                            {req.productName}
                          </div>
                          <div className="text-[11px] text-stone-500 truncate">
                            Issue: {req.issueReason}
                          </div>
                          <div className="text-[10px] text-stone-400 mt-0.5">
                            Deposit: {formatINR(req.securityDeposit)} • {req.hasDamageProtection ? '🛡 Protected' : 'No Protection'}
                          </div>
                        </div>
                      </div>

                      <div className="bg-white/80 p-2 rounded-lg border border-stone-200/70 text-[11px] text-stone-700 italic line-clamp-2">
                        "{req.reviewComment}"
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* Inspector Workbench (7 cols) */}
            <div className="lg:col-span-7 bg-white rounded-3xl border border-stone-200 p-6 space-y-6 shadow-xs">
              {activeReview ? (
                <>
                  {/* Top Bar for Selected Review */}
                  <div className="border-b border-stone-100 pb-4 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs uppercase font-bold text-[#8C6D46] tracking-wider">
                        Damage Review Inspection Console
                      </span>
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                        activeReview.status === 'Approved & Refunded'
                          ? 'bg-emerald-100 text-emerald-800'
                          : activeReview.status === 'Exchange Approved'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-amber-100 text-amber-900'
                      }`}>
                        {activeReview.status}
                      </span>
                    </div>

                    <h3 className="font-serif text-xl font-bold text-stone-900">
                      {activeReview.productName} (Size {activeReview.selectedSize})
                    </h3>

                    <div className="text-xs text-stone-500 flex flex-wrap items-center gap-2">
                      <span>Order: <strong className="text-stone-800">{activeReview.orderNumber}</strong></span>
                      <span>•</span>
                      <span>Customer: <strong className="text-stone-800">{activeReview.customerName}</strong> ({activeReview.customerCity})</span>
                      <span>•</span>
                      <span>Phone: <strong className="text-stone-800">{activeReview.customerPhone}</strong></span>
                    </div>
                  </div>

                  {/* Customer Review & Rating Highlight */}
                  <div className="bg-[#FAF7F2] p-4 rounded-2xl border border-stone-200 space-y-2 text-xs">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5 text-amber-500">
                        {[1, 2, 3, 4, 5].map((s) => (
                          <Star
                            key={s}
                            className={`w-4 h-4 ${s <= activeReview.rating ? 'fill-amber-400 text-amber-400' : 'text-stone-300'}`}
                          />
                        ))}
                        <span className="font-bold text-stone-800 ml-1">
                          {activeReview.rating}.0 / 5.0 Review Rating
                        </span>
                      </div>
                      <span className="text-[11px] font-bold text-stone-600 bg-white px-2.5 py-0.5 rounded-full border border-stone-200">
                        {activeReview.requestType === 'refund' 
                          ? 'Return & Deposit Refund' 
                          : activeReview.requestType === 'exchange' 
                            ? 'Size Exchange' 
                            : 'Damaged Product Claim'}
                      </span>
                    </div>

                    <div>
                      <span className="text-stone-500 font-medium block text-[11px]">Reason / Issue Category:</span>
                      <strong className="text-stone-900 text-sm block mt-0.5">{activeReview.issueReason}</strong>
                    </div>

                    <div>
                      <span className="text-stone-500 font-medium block text-[11px]">Customer's Review Remarks:</span>
                      <p className="text-stone-800 italic mt-0.5 leading-relaxed bg-white p-3 rounded-xl border border-stone-200">
                        "{activeReview.reviewComment}"
                      </p>
                    </div>

                    <div className="text-[11px] text-stone-600 flex flex-wrap items-center justify-between gap-2 pt-1 border-t border-stone-200/80">
                      <span>Refund Target: <strong className="font-mono text-stone-900">{activeReview.upiOrBankDetails}</strong></span>
                      <span className={`font-semibold ${activeReview.hasDamageProtection ? 'text-emerald-700' : 'text-stone-500'}`}>
                        {activeReview.hasDamageProtection ? '✓ Peace of Mind Protection Opted' : 'No Damage Protection'}
                      </span>
                    </div>
                  </div>

                  {/* CUSTOMER'S POSTED DAMAGE IMAGE (CRITICAL REQUIREMENT) */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <div className="font-bold text-stone-900 flex items-center gap-1.5">
                        <Camera className="w-4 h-4 text-[#6B1D2F]" />
                        <span>Customer's Uploaded Damaged Product Photo:</span>
                      </div>
                      <button
                        onClick={() => setLightboxImage({ url: activeReview.damagePhotoUrl, title: `${activeReview.productName} - Damaged Product Photo` })}
                        className="text-[11px] text-[#6B1D2F] font-bold hover:underline flex items-center gap-1 cursor-pointer"
                      >
                        <Maximize2 className="w-3 h-3" />
                        <span>Zoom / Fullscreen Photo</span>
                      </button>
                    </div>

                    <div 
                      onClick={() => setLightboxImage({ url: activeReview.damagePhotoUrl, title: `${activeReview.productName} - Damaged Product Photo` })}
                      className="group relative rounded-2xl overflow-hidden border-2 border-stone-300 bg-stone-900 aspect-video max-h-72 cursor-pointer shadow-md"
                    >
                      <img
                        src={activeReview.damagePhotoUrl}
                        alt="Customer uploaded damage photo"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      />
                      <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white gap-2 font-bold text-xs">
                        <Maximize2 className="w-4 h-4" />
                        <span>Click to Inspect Full Photo</span>
                      </div>
                      <div className="absolute bottom-2.5 left-2.5 bg-black/75 backdrop-blur-sm text-white px-2.5 py-1 rounded-lg text-xs font-mono">
                        {activeReview.damagePhotoName || 'damage_photo_attachment.jpg'}
                      </div>
                    </div>
                  </div>

                  {/* OPERATION SUCCESSFUL BANNER / INSPECTION RESULT */}
                  {operationFeedback && (
                    <div className="p-4 bg-emerald-50 border-2 border-emerald-500 rounded-2xl text-emerald-950 text-xs shadow-md animate-fade-in flex items-start justify-between gap-3">
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 border border-emerald-300">
                          <CheckCircle2 className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="bg-emerald-600 text-white font-bold text-[10px] px-2 py-0.5 rounded-full uppercase tracking-wider">
                              Operation Successful
                            </span>
                            <span className="text-[10px] text-emerald-800 font-mono">{operationFeedback.timestamp}</span>
                          </div>
                          <div className="font-bold text-emerald-950 text-sm mt-1">
                            {operationFeedback.title}
                          </div>
                          <p className="text-xs text-emerald-900 mt-0.5">
                            {operationFeedback.message}
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => setOperationFeedback(null)}
                        className="text-emerald-700 hover:text-emerald-950 p-1 cursor-pointer"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  )}

                  {/* IF INSPECTION COMPLETED AND NOT EDITING: SHOW SIGNED-OFF CERTIFICATE */}
                  {activeReview.adminInspection && !isEditingInspection ? (
                    <div className="bg-emerald-50/70 rounded-2xl border-2 border-emerald-300 p-5 space-y-4 text-xs shadow-xs">
                      <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-emerald-200">
                        <div className="flex items-center gap-2 text-emerald-950 font-bold text-sm">
                          <CheckCircle2 className="w-5 h-5 text-emerald-700 shrink-0" />
                          <span>Operation Successful: Quality Inspection Finalized</span>
                        </div>
                        <span className="bg-emerald-600 text-white font-bold px-3 py-1 rounded-full text-xs">
                          {activeReview.status}
                        </span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-white p-4 rounded-xl border border-emerald-200">
                        <div>
                          <span className="text-stone-500 text-[10px] block">Inspector:</span>
                          <strong className="text-stone-900 text-xs">{activeReview.adminInspection.inspectorStaff}</strong>
                        </div>
                        <div>
                          <span className="text-stone-500 text-[10px] block">Timestamp:</span>
                          <strong className="text-stone-900 text-xs">
                            {new Date(activeReview.adminInspection.inspectedAt).toLocaleString('en-IN', {
                              day: 'numeric',
                              month: 'short',
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </strong>
                        </div>
                        <div>
                          <span className="text-stone-500 text-[10px] block">Condition Assessed:</span>
                          <span className="font-semibold text-emerald-800 text-xs">{activeReview.adminInspection.assessedCondition}</span>
                        </div>
                        <div>
                          <span className="text-stone-500 text-[10px] block">Settlement Action:</span>
                          <strong className="text-emerald-700 text-sm font-serif">
                            {activeReview.adminInspection.actionTaken === 'exchange_approved'
                              ? 'Exchange Dispatched'
                              : formatINR(activeReview.adminInspection.finalRefundAmount) + ' Refunded'}
                          </strong>
                        </div>
                      </div>

                      <div className="bg-white p-3.5 rounded-xl border border-emerald-200 space-y-1">
                        <span className="text-stone-700 font-bold text-[11px]">Inspector Recorded Remarks:</span>
                        <p className="text-stone-800 italic leading-relaxed">
                          "{activeReview.adminInspection.adminNotes}"
                        </p>
                        {activeReview.adminInspection.payoutTransactionId && (
                          <div className="text-[10px] text-stone-500 font-mono pt-1 border-t border-stone-100">
                            Transaction Ref: {activeReview.adminInspection.payoutTransactionId}
                          </div>
                        )}
                      </div>

                      <div className="flex items-center justify-between pt-2 border-t border-emerald-200">
                        <span className="text-[11px] text-emerald-800 font-semibold">
                          ✓ Reflected live on Customer "My Orders" Portal
                        </span>
                        <button
                          type="button"
                          onClick={() => setIsEditingInspection(true)}
                          className="px-4 py-2 bg-white hover:bg-stone-100 text-stone-800 font-bold rounded-xl border border-stone-300 text-xs transition-all cursor-pointer flex items-center gap-1.5 shadow-xs"
                        >
                          <RotateCcw className="w-3.5 h-3.5" />
                          <span>Re-inspect or Modify Decision</span>
                        </button>
                      </div>
                    </div>
                  ) : (
                    /* ADMIN INSPECTION DECISION & REFUND FORM */
                    <div className="bg-[#FAF7F2] rounded-2xl border border-stone-200 p-5 space-y-4 text-xs">
                      <div className="font-bold text-stone-900 text-sm flex items-center justify-between">
                        <span>Quality Hub Inspection Assessment</span>
                        <span className="text-[11px] text-stone-500 font-normal">
                          Held Deposit: <strong className="text-stone-800">{formatINR(activeReview.securityDeposit)}</strong>
                        </span>
                      </div>

                      {/* Condition Assessment Grid */}
                      <div className="space-y-1.5">
                        <label className="font-bold text-stone-700 block text-[11px]">
                          Select Assessed Garment Condition
                        </label>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          <button
                            type="button"
                            onClick={() => handleConditionChange('Pristine Condition')}
                            className={`p-2.5 rounded-xl border text-left cursor-pointer transition-all ${
                              assessmentCondition === 'Pristine Condition'
                                ? 'bg-emerald-50 border-emerald-500 text-emerald-950 font-bold ring-1 ring-emerald-500'
                                : 'bg-white border-stone-200 text-stone-700 hover:bg-stone-50'
                            }`}
                          >
                            <div className="font-bold text-xs text-emerald-800">✓ Pristine / Normal Wear</div>
                            <div className="text-[10px] text-stone-500">100% Deposit Refund (₹0 Fee)</div>
                          </button>

                          <button
                            type="button"
                            onClick={() => handleConditionChange('Minor Damage (Covered by Protection)')}
                            className={`p-2.5 rounded-xl border text-left cursor-pointer transition-all ${
                              assessmentCondition === 'Minor Damage (Covered by Protection)'
                                ? 'bg-emerald-50 border-emerald-500 text-emerald-950 font-bold ring-1 ring-emerald-500'
                                : 'bg-white border-stone-200 text-stone-700 hover:bg-stone-50'
                            }`}
                          >
                            <div className="font-bold text-xs text-emerald-800">🛡 Minor Snag (Protected)</div>
                            <div className="text-[10px] text-stone-500">Covered by Protection (₹0 Fee)</div>
                          </button>

                          <button
                            type="button"
                            onClick={() => handleConditionChange('Minor Damage (Fee Assessed)')}
                            className={`p-2.5 rounded-xl border text-left cursor-pointer transition-all ${
                              assessmentCondition === 'Minor Damage (Fee Assessed)'
                                ? 'bg-amber-50 border-amber-500 text-amber-950 font-bold ring-1 ring-amber-500'
                                : 'bg-white border-stone-200 text-stone-700 hover:bg-stone-50'
                            }`}
                          >
                            <div className="font-bold text-xs text-amber-800">⚠ Minor Damage (Unprotected)</div>
                            <div className="text-[10px] text-stone-500">Assessed ₹500 Mending Fee</div>
                          </button>

                          <button
                            type="button"
                            onClick={() => handleConditionChange('Major Damage (Deposit Retained)')}
                            className={`p-2.5 rounded-xl border text-left cursor-pointer transition-all ${
                              assessmentCondition === 'Major Damage (Deposit Retained)'
                                ? 'bg-red-50 border-red-500 text-red-950 font-bold ring-1 ring-red-500'
                                : 'bg-white border-stone-200 text-stone-700 hover:bg-stone-50'
                            }`}
                          >
                            <div className="font-bold text-xs text-red-800">✕ Major Irreparable Tear</div>
                            <div className="text-[10px] text-stone-500">Retain ₹2,000 replacement fee</div>
                          </button>

                          <button
                            type="button"
                            onClick={() => handleConditionChange('Damaged on Arrival (Full Refund)')}
                            className={`p-2.5 rounded-xl border text-left cursor-pointer transition-all ${
                              assessmentCondition === 'Damaged on Arrival (Full Refund)'
                                ? 'bg-purple-50 border-purple-500 text-purple-950 font-bold ring-1 ring-purple-500'
                                : 'bg-white border-stone-200 text-stone-700 hover:bg-stone-50'
                            }`}
                          >
                            <div className="font-bold text-xs text-purple-800">⚠️ Damaged on Delivery</div>
                            <div className="text-[10px] text-stone-500">Full Rental + Deposit Refund</div>
                          </button>

                          <button
                            type="button"
                            onClick={() => handleConditionChange('Exchange Approved (Replacement Dispatched)')}
                            className={`p-2.5 rounded-xl border text-left cursor-pointer transition-all ${
                              assessmentCondition === 'Exchange Approved (Replacement Dispatched)'
                                ? 'bg-blue-50 border-blue-500 text-blue-950 font-bold ring-1 ring-blue-500'
                                : 'bg-white border-stone-200 text-stone-700 hover:bg-stone-50'
                            }`}
                          >
                            <div className="font-bold text-xs text-blue-800">🔄 Approve Size Exchange</div>
                            <div className="text-[10px] text-stone-500">Dispatch replacement unit</div>
                          </button>
                        </div>
                      </div>

                      {/* Inspector Remarks */}
                      <div>
                        <label className="font-bold text-stone-700 block mb-1 text-[11px]">
                          Quality Inspector Internal & Customer Remarks
                        </label>
                        <textarea
                          rows={2}
                          value={inspectorNotes}
                          onChange={(e) => setInspectorNotes(e.target.value)}
                          className="w-full px-3 py-2 bg-white border border-stone-300 rounded-xl text-stone-800 text-xs"
                        />
                      </div>

                      {/* Inspector Name */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="font-bold text-stone-700 block mb-1 text-[11px]">
                            Inspector Staff Name
                          </label>
                          <input
                            type="text"
                            value={inspectorStaff}
                            onChange={(e) => setInspectorStaff(e.target.value)}
                            className="w-full px-3 py-1.5 bg-white border border-stone-300 rounded-xl text-xs font-semibold text-stone-800"
                          />
                        </div>

                        {/* Refund settlement summary */}
                        <div className="bg-white p-3 rounded-xl border border-stone-200 flex flex-col justify-center">
                          <span className="text-[10px] text-stone-500 font-semibold uppercase">
                            Refund to UPI: {activeReview.upiOrBankDetails}
                          </span>
                          <div className="flex items-baseline justify-between mt-1">
                            <span className="text-stone-700 font-medium">Approved Settlement:</span>
                            <span className="font-serif text-lg font-bold text-emerald-700">
                              {formatINR(calculateRefund(activeReview))}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Action buttons with prominent Operation Successful feedback */}
                      <div className="flex flex-wrap items-center justify-end gap-2 pt-2 border-t border-stone-200">
                        {isEditingInspection && (
                          <button
                            type="button"
                            onClick={() => setIsEditingInspection(false)}
                            className="px-3 py-2 rounded-xl border border-stone-300 text-stone-600 hover:bg-stone-100 font-semibold cursor-pointer mr-auto text-xs"
                          >
                            Cancel Edit
                          </button>
                        )}

                        <button
                          type="button"
                          onClick={() => handleProcessInspectionSubmit('rejected')}
                          className="px-4 py-2.5 rounded-xl border border-stone-300 text-stone-600 hover:bg-stone-100 font-semibold cursor-pointer"
                        >
                          Decline Claim
                        </button>

                        <button
                          type="button"
                          onClick={() => handleProcessInspectionSubmit('exchange_approved')}
                          className="px-4 py-2.5 bg-blue-700 hover:bg-blue-800 text-white font-bold rounded-xl shadow-xs transition-all cursor-pointer flex items-center gap-1.5"
                        >
                          <RefreshCw className="w-3.5 h-3.5" />
                          <span>Approve Exchange</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => handleProcessInspectionSubmit('refund_processed')}
                          className="px-5 py-2.5 bg-[#450A18] hover:bg-[#340712] text-[#E6CA85] font-bold rounded-xl shadow-md transition-all cursor-pointer border border-[#E6CA85]/30 flex items-center gap-1.5"
                        >
                          <Check className="w-4 h-4" />
                          <span>Complete Inspection & Issue Refund</span>
                        </button>
                      </div>

                    </div>
                  )}

                </>
              ) : (
                <div className="p-12 text-center text-xs text-stone-500">
                  Select a review from the left list to inspect details.
                </div>
              )}
            </div>

          </div>

        </div>
      )}

      {/* TAB 2: ORDERS MANAGEMENT */}
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
                              : ord.orderStatus === 'Inspected & Refunded'
                                ? 'bg-teal-100 text-teal-800'
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

      {/* TAB 3: INVENTORY & GARMENT UNITS */}
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
                        className="bg-stone-100 text-stone-800 font-semibold px-2 py-1 rounded-lg border border-stone-300 text-[11px] cursor-pointer"
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

      {/* LIGHTBOX FOR DAMAGE PHOTO ZOOM */}
      {lightboxImage && (
        <div 
          onClick={() => setLightboxImage(null)}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in cursor-pointer"
        >
          <div className="relative max-w-3xl max-h-[90vh] flex flex-col items-center">
            <button
              onClick={() => setLightboxImage(null)}
              className="absolute -top-10 right-0 text-white hover:text-stone-300 p-2 cursor-pointer"
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

      {/* FLOATING OPERATION SUCCESSFUL TOAST */}
      {operationFeedback && (
        <div className="fixed top-6 right-6 z-50 max-w-md bg-stone-900 text-white p-4 sm:p-5 rounded-2xl shadow-2xl border-2 border-emerald-400 flex items-start gap-3.5 animate-bounce-once">
          <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-400/40">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div className="flex-1 pr-1">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400 font-bold bg-emerald-950 px-2 py-0.5 rounded-md border border-emerald-500/40">
                Operation Successful
              </span>
              <span className="text-[10px] text-stone-400">{operationFeedback.timestamp}</span>
            </div>
            <h4 className="font-bold text-sm text-white mt-1">
              {operationFeedback.title}
            </h4>
            <p className="text-xs text-stone-300 mt-0.5 leading-relaxed">
              {operationFeedback.message}
            </p>
          </div>
          <button
            onClick={() => setOperationFeedback(null)}
            className="text-stone-400 hover:text-white p-1 rounded-lg hover:bg-white/10 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

    </div>
  );
};
