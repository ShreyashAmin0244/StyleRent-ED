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
  findNextAvailableDate,
  formatDate, 
  formatINR, 
  getDurationDays 
} from '../utils/rentalCalculations';

interface ProductDetailsModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (item: CartItem) => void;
  onRentNow?: (item: CartItem) => void;
  isWishlisted: boolean;
  onToggleWishlist: (productId: string) => void;
  reviews: ReviewItem[];
  onOpenReviewModal: (product: Product) => void;
}

export const ProductDetailsModal: React.FC<ProductDetailsModalProps> = ({
  product,
  onClose,
  onAddToCart,
  onRentNow,
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
  // Smart default start date: automatically pick the first available open date
  const [startDate, setStartDate] = useState<string>(() => {
    return findNextAvailableDate('2026-10-20', '3_days', product.existingBookings);
  });
  
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
      const nextDate = findNextAvailableDate(startDate, duration, product.existingBookings);
      setStartDate(nextDate);
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

  const handleRentNowClick = () => {
    let effectiveStartDate = startDate;
    if (!availabilityCheck.isAvailable) {
      effectiveStartDate = findNextAvailableDate(startDate, duration, product.existingBookings);
      setStartDate(effectiveStartDate);
    }

    const rentalDates = calculateRentalDates(effectiveStartDate, duration);

    const cartItem: CartItem = {
      cartItemId: `item-${Date.now()}`,
      product,
      selectedSize,
      rentalDuration: duration,
      rentalDays: getDurationDays(duration),
      startDate: effectiveStartDate,
      deliveryDate: rentalDates.deliveryDate,
      returnDate: rentalDates.returnPickupDate,
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

    if (onRentNow) {
      onRentNow(cartItem);
    } else {
      onAddToCart(cartItem);
    }
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
            <div className="sticky bottom-0 bg-[#FAF7F2]/95 backdrop-blur-md pt-3 pb-2 border-t border-stone-200 space-y-2">
              
              {!availabilityCheck.isAvailable && (
                <div className="p-2.5 bg-amber-50 border border-amber-300 rounded-xl flex items-center justify-between gap-2 text-xs text-amber-900">
                  <div className="flex items-center gap-1.5 font-medium">
                    <Info className="w-4 h-4 text-amber-700 shrink-0" />
                    <span>Selected date is locked for dry-clean or existing booking.</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      const nextDate = findNextAvailableDate(startDate, duration, product.existingBookings);
                      setStartDate(nextDate);
                    }}
                    className="px-3 py-1 bg-amber-700 hover:bg-amber-800 text-white font-bold rounded-lg text-[11px] shrink-0 transition-all cursor-pointer shadow-xs"
                  >
                    ⚡ Switch to Available Date
                  </button>
                </div>
              )}

              <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="self-start sm:self-auto">
                  <div className="text-[10px] uppercase font-semibold text-stone-400">Total Payable Now</div>
                  <div className="text-2xl font-bold text-[#6B1D2F]">
                    {formatINR(itemTotal)}
                  </div>
                  <div className="text-[10px] text-emerald-700 font-medium">
                    Includes {formatINR(securityDeposit)} refundable deposit
                  </div>
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <button
                    type="button"
                    onClick={() => onToggleWishlist(product.id)}
                    className={`p-3 rounded-xl border transition-all cursor-pointer shrink-0 ${
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
                    className="flex-1 sm:flex-initial px-4 py-3 bg-white hover:bg-stone-100 text-stone-800 font-bold text-xs rounded-xl border border-stone-300 shadow-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <ShoppingBag className="w-4 h-4 text-[#6B1D2F]" />
                    <span>Add to Bag</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleRentNowClick}
                    className="flex-1 sm:flex-initial px-6 py-3 bg-[#450A18] hover:bg-[#340712] text-[#E6CA85] font-bold text-xs rounded-xl shadow-md border border-[#E6CA85]/30 flex items-center justify-center gap-2 transition-transform hover:scale-[1.02] cursor-pointer"
                  >
                    <Sparkles className="w-4 h-4 text-[#E6CA85]" />
                    <span>Rent Now</span>
                  </button>
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
