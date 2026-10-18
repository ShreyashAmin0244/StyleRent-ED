import React from 'react';
import { X, Heart, ShoppingBag, ArrowRight, Trash2 } from 'lucide-react';
import { Product } from '../types';
import { formatINR } from '../utils/rentalCalculations';

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  wishlistProducts: Product[];
  onRemoveFromWishlist: (productId: string) => void;
  onSelectProduct: (product: Product) => void;
}

export const WishlistDrawer: React.FC<WishlistDrawerProps> = ({
  isOpen,
  onClose,
  wishlistProducts,
  onRemoveFromWishlist,
  onSelectProduct,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-xs flex justify-end animate-fade-in">
      <div className="w-full max-w-md bg-[#FAF7F2] h-full shadow-2xl flex flex-col border-l border-[#E5DECF] relative text-stone-800">
        
        {/* Header */}
        <div className="p-5 border-b border-[#E2DBD0] bg-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-[#6B1D2F] flex items-center justify-center text-[#E6CA85]">
              <Heart className="w-4 h-4 fill-current" />
            </div>
            <div>
              <h2 className="font-serif font-bold text-stone-900 text-lg">Saved Outfits</h2>
              <span className="text-xs text-stone-500 font-medium">
                {wishlistProducts.length} Looks Wishlisted
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

        {/* Wishlist Items List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {wishlistProducts.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-3">
              <div className="w-16 h-16 rounded-full bg-stone-100 flex items-center justify-center text-stone-400">
                <Heart className="w-8 h-8" />
              </div>
              <div className="font-serif text-lg font-bold text-stone-800">No saved outfits yet</div>
              <p className="text-xs text-stone-500 max-w-xs leading-relaxed">
                Tap the heart icon on any lehenga, sherwani, or saree to save it for your event date planning.
              </p>
            </div>
          ) : (
            wishlistProducts.map((p) => (
              <div 
                key={p.id}
                className="bg-white rounded-2xl border border-stone-200 p-3 flex gap-3 shadow-xs items-center"
              >
                <img
                  src={p.images[0]}
                  alt={p.name}
                  className="w-16 h-20 object-cover object-top rounded-xl border border-stone-200 shrink-0 cursor-pointer"
                  onClick={() => {
                    onSelectProduct(p);
                    onClose();
                  }}
                />

                <div className="flex-1 min-w-0 space-y-1">
                  <h4 
                    onClick={() => {
                      onSelectProduct(p);
                      onClose();
                    }}
                    className="font-serif font-bold text-stone-900 text-sm truncate cursor-pointer hover:text-[#6B1D2F]"
                  >
                    {p.name}
                  </h4>
                  <div className="text-xs text-stone-500">
                    {p.category} • {p.gender}
                  </div>
                  <div className="text-xs font-bold text-[#6B1D2F]">
                    {formatINR(p.rentalPrice3Days)} / 3 Days
                  </div>

                  <div className="flex items-center gap-2 pt-1">
                    <button
                      type="button"
                      onClick={() => {
                        onSelectProduct(p);
                        onClose();
                      }}
                      className="px-2.5 py-1 bg-[#6B1D2F] text-white text-[11px] font-semibold rounded-lg hover:bg-[#521321] transition-all cursor-pointer"
                    >
                      Book Rental
                    </button>
                    <button
                      type="button"
                      onClick={() => onRemoveFromWishlist(p.id)}
                      className="p-1 text-stone-400 hover:text-red-600 transition-colors"
                      title="Remove from saved"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
};
