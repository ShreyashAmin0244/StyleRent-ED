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

  // Pre-configured Indian Bank details for NetBanking
  const INDIAN_BANKS: Record<string, { ifsc: string; branch: string; code: string; type: string }> = {
    'HDFC Bank': { ifsc: 'HDFC0000060', branch: 'Worli Branch, Mumbai', code: 'HDFC', type: 'Savings Account' },
    'State Bank of India': { ifsc: 'SBIN0000300', branch: 'Main Branch, Fort, Mumbai', code: 'SBI', type: 'Savings Account' },
    'ICICI Bank': { ifsc: 'ICIC0000011', branch: 'Nariman Point, Mumbai', code: 'ICICI', type: 'Savings Account' },
    'Axis Bank': { ifsc: 'UTIB0000005', branch: 'Bandra West, Mumbai', code: 'AXIS', type: 'Savings Account' },
    'Kotak Mahindra Bank': { ifsc: 'KKBK0000631', branch: 'BKC Complex, Mumbai', code: 'KOTAK', type: 'Savings Account' },
    'Punjab National Bank': { ifsc: 'PUNB0123400', branch: 'Connaught Place, New Delhi', code: 'PNB', type: 'Savings Account' },
    'Bank of Baroda': { ifsc: 'BARB0WORLIM', branch: 'Worli, Mumbai', code: 'BOB', type: 'Savings Account' },
    'Canara Bank': { ifsc: 'CNRB0000123', branch: 'MG Road, Bengaluru', code: 'CANARA', type: 'Savings Account' },
    'Union Bank of India': { ifsc: 'UBIN0530018', branch: 'Kala Ghoda, Mumbai', code: 'UNION', type: 'Savings Account' },
    'IndusInd Bank': { ifsc: 'INDB0000001', branch: 'Opera House, Mumbai', code: 'INDUS', type: 'Savings Account' },
    'Federal Bank': { ifsc: 'FDRL0001123', branch: 'Marine Lines, Mumbai', code: 'FED', type: 'Savings Account' },
    'IDFC FIRST Bank': { ifsc: 'IDFB0040101', branch: 'BKC, Mumbai', code: 'IDFC', type: 'Savings Account' },
    'Yes Bank': { ifsc: 'YESB0000001', branch: 'Worli, Mumbai', code: 'YES', type: 'Savings Account' },
  };

  // Payment State
  const [paymentMethod, setPaymentMethod] = useState<'UPI' | 'Card' | 'NetBanking' | 'COD'>('UPI');
  const [upiProvider, setUpiProvider] = useState<'PhonePe' | 'GooglePay' | 'Paytm' | 'Other'>('GooglePay');
  const [upiId, setUpiId] = useState('ananya@okhdfcbank');
  
  // NetBanking Detailed State
  const [selectedBank, setSelectedBank] = useState('HDFC Bank');
  const [netBankingCustomerId, setNetBankingCustomerId] = useState('98201445');
  const [bankIfsc, setBankIfsc] = useState('HDFC0000060');
  const [bankBranch, setBankBranch] = useState('Worli Branch, Mumbai');
  const [accountType, setAccountType] = useState('Savings Account');
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Handle bank selection change
  const handleBankChange = (bankName: string) => {
    setSelectedBank(bankName);
    const bankMeta = INDIAN_BANKS[bankName];
    if (bankMeta) {
      setBankIfsc(bankMeta.ifsc);
      setBankBranch(bankMeta.branch);
      setAccountType(bankMeta.type);
    }
  };

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
    }, 400);
  };

  const handlePayAndConfirm = (e: React.FormEvent) => {
    e.preventDefault();

    if (!customer.fullName || !customer.phone || !customer.address) {
      setErrorMessage('Please fill in customer name, phone, and delivery address.');
      return;
    }

    // Auto-verify identity if user didn't explicitly click verify button
    if (!isIdVerified) {
      setIsIdVerified(true);
    }

    setErrorMessage('');
    setIsProcessingPayment(true);

    // Simulate payment transaction
    setTimeout(() => {
      setIsProcessingPayment(false);

      const orderNumber = `SR-${Math.floor(10000 + Math.random() * 90000)}`;
      const bankMeta = INDIAN_BANKS[selectedBank];
      const bankCode = bankMeta ? bankMeta.code : 'BNK';

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
          bankName: paymentMethod === 'NetBanking' ? selectedBank : undefined,
          bankIfsc: paymentMethod === 'NetBanking' ? bankIfsc : undefined,
          bankBranch: paymentMethod === 'NetBanking' ? bankBranch : undefined,
          accountType: paymentMethod === 'NetBanking' ? accountType : undefined,
          transactionId: paymentMethod === 'NetBanking' 
            ? `NETBNK_${bankCode}_${Date.now().toString().slice(-6)}` 
            : paymentMethod === 'UPI' 
              ? `UPI_${Date.now().toString().slice(-8)}`
              : `TXN_${Date.now().toString().slice(-8)}`,
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

            {paymentMethod === 'NetBanking' && (
              <div className="p-4 bg-stone-50 rounded-xl border border-stone-200 space-y-3.5 text-xs">
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="font-bold text-stone-800">
                      Select Your Bank (Direct NetBanking Portal)
                    </label>
                    <span className="text-[10px] text-emerald-800 bg-emerald-100 font-semibold px-2 py-0.5 rounded-full">
                      ✓ Instant Auth
                    </span>
                  </div>
                  
                  {/* Popular Indian Banks Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {[
                      { id: 'HDFC Bank', label: 'HDFC Bank', code: 'HDFC' },
                      { id: 'State Bank of India', label: 'SBI (State Bank)', code: 'SBI' },
                      { id: 'ICICI Bank', label: 'ICICI Bank', code: 'ICICI' },
                      { id: 'Axis Bank', label: 'Axis Bank', code: 'AXIS' },
                      { id: 'Kotak Mahindra Bank', label: 'Kotak Bank', code: 'KOTAK' },
                      { id: 'Punjab National Bank', label: 'PNB (Punjab Nat.)', code: 'PNB' },
                    ].map((bank) => (
                      <button
                        key={bank.id}
                        type="button"
                        onClick={() => handleBankChange(bank.id)}
                        className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                          selectedBank === bank.id
                            ? 'bg-white border-[#6B1D2F] text-[#6B1D2F] ring-1 ring-[#6B1D2F] shadow-xs font-bold'
                            : 'bg-white/80 border-stone-200 text-stone-700 hover:border-stone-300'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-mono font-bold bg-stone-100 text-stone-600 px-1.5 py-0.5 rounded">
                            {bank.code}
                          </span>
                          {selectedBank === bank.id && (
                            <span className="w-1.5 h-1.5 rounded-full bg-[#6B1D2F]"></span>
                          )}
                        </div>
                        <div className="text-xs font-semibold mt-1 truncate">{bank.label}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Other Banks Dropdown */}
                <div>
                  <label className="text-[11px] font-semibold text-stone-600 block mb-1">
                    Or Select from Other Scheduled Commercial Banks
                  </label>
                  <select
                    value={selectedBank}
                    onChange={(e) => handleBankChange(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-stone-300 rounded-xl text-xs font-medium text-stone-800 cursor-pointer focus:outline-hidden focus:border-[#6B1D2F]"
                  >
                    {Object.keys(INDIAN_BANKS).map((b) => (
                      <option key={b} value={b}>{b}</option>
                    ))}
                  </select>
                </div>

                {/* NetBanking Credentials & IFSC details */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                  <div>
                    <label className="text-[11px] font-semibold text-stone-600 block mb-1">
                      Customer ID / NetBanking Username
                    </label>
                    <input
                      type="text"
                      value={netBankingCustomerId}
                      onChange={(e) => setNetBankingCustomerId(e.target.value)}
                      placeholder="e.g. 98201445"
                      className="w-full px-3 py-2 bg-white border border-stone-300 rounded-xl text-xs font-mono"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-semibold text-stone-600 block mb-1">
                      Account Type
                    </label>
                    <select
                      value={accountType}
                      onChange={(e) => setAccountType(e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-stone-300 rounded-xl text-xs font-medium"
                    >
                      <option value="Savings Account">Savings Account</option>
                      <option value="Current Account">Current Account</option>
                      <option value="Salary Account">Salary Account</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-[11px] font-semibold text-stone-600 block mb-1">
                      Bank IFSC Code
                    </label>
                    <input
                      type="text"
                      value={bankIfsc}
                      onChange={(e) => setBankIfsc(e.target.value)}
                      placeholder="e.g. HDFC0000060"
                      className="w-full px-3 py-2 bg-white border border-stone-300 rounded-xl text-xs font-mono uppercase"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-semibold text-stone-600 block mb-1">
                      Registered Branch Location
                    </label>
                    <input
                      type="text"
                      value={bankBranch}
                      onChange={(e) => setBankBranch(e.target.value)}
                      placeholder="e.g. Worli Branch, Mumbai"
                      className="w-full px-3 py-2 bg-white border border-stone-300 rounded-xl text-xs"
                    />
                  </div>
                </div>

                {/* NetBanking Security Notice */}
                <div className="p-2.5 bg-blue-50/80 rounded-xl border border-blue-200/80 text-[11px] text-blue-900 flex items-start gap-2">
                  <ShieldCheck className="w-4 h-4 text-blue-700 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold">256-Bit SSL Encrypted Direct Bank Gateway:</span>
                    <p className="text-blue-800 text-[10px] mt-0.5 leading-relaxed">
                      You will authenticate using <strong>{selectedBank}</strong> (IFSC: {bankIfsc}). Rented security deposits of {formatINR(securityDepositTotal)} will be auto-credited to this account upon garment inspection.
                    </p>
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
