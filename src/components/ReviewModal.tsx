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
