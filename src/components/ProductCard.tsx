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
            className="mt-3 w-full py-2.5 bg-[#450A18] hover:bg-[#340712] text-[#E6CA85] font-bold text-xs rounded-xl shadow-xs transition-all duration-200 flex items-center justify-center gap-1.5 border border-[#E6CA85]/30 cursor-pointer"
          >
            <span>Rent Look • {formatINR(product.rentalPrice3Days)}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </div>
  );
};
