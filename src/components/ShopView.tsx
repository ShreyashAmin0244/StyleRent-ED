import React, { useState, useMemo } from 'react';
import { 
  Filter, 
  SlidersHorizontal, 
  Search, 
  X, 
  Sparkles, 
  ArrowUpDown,
  Tag
} from 'lucide-react';
import { CategoryType, GenderType, OccasionType, Product } from '../types';
import { ProductCard } from './ProductCard';

interface ShopViewProps {
  products: Product[];
  onSelectProduct: (product: Product) => void;
  wishlistIds: string[];
  onToggleWishlist: (productId: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  initialOccasion?: OccasionType | 'All';
}

const CATEGORIES: CategoryType[] = [
  'Lehenga',
  'Sherwani',
  'Saree',
  'Gown',
  'Anarkali',
  'Kurta Set',
  'Indo-Western',
  'Blazer & Tuxedo',
  'Accessories'
];

const GENDERS: GenderType[] = ['Women', 'Men', 'Unisex'];

const SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

const OCCASIONS: OccasionType[] = [
  'Sangeet',
  'Haldi',
  'Wedding',
  'Cocktail Party',
  'Pre-Wedding Shoot',
  'College Function',
  'Corporate Gala',
  'Festivities'
];

export const ShopView: React.FC<ShopViewProps> = ({
  products,
  onSelectProduct,
  wishlistIds,
  onToggleWishlist,
  searchQuery,
  setSearchQuery,
  initialOccasion = 'All',
}) => {
  // Filter States
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedGender, setSelectedGender] = useState<string>('All');
  const [selectedSize, setSelectedSize] = useState<string>('All');
  const [selectedOccasion, setSelectedOccasion] = useState<string>(initialOccasion || 'All');
  const [maxPrice, setMaxPrice] = useState<number>(3000);
  const [sortBy, setSortBy] = useState<'popular' | 'price_low' | 'price_high' | 'rating'>('popular');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Sync if initialOccasion prop changes
  React.useEffect(() => {
    if (initialOccasion) {
      setSelectedOccasion(initialOccasion);
    }
  }, [initialOccasion]);

  // Reset filters
  const handleResetFilters = () => {
    setSelectedCategory('All');
    setSelectedGender('All');
    setSelectedSize('All');
    setSelectedOccasion('All');
    setMaxPrice(3000);
    setSearchQuery('');
  };

  // Filtered & Sorted products
  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        // Search query
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchesTitle = p.name.toLowerCase().includes(q);
          const matchesCat = p.category.toLowerCase().includes(q);
          const matchesOcc = p.occasions.some((o) => o.toLowerCase().includes(q));
          const matchesFabric = p.fabric.toLowerCase().includes(q);
          if (!matchesTitle && !matchesCat && !matchesOcc && !matchesFabric) return false;
        }

        // Category
        if (selectedCategory !== 'All' && p.category !== selectedCategory) return false;

        // Gender
        if (selectedGender !== 'All' && p.gender !== selectedGender && p.gender !== 'Unisex') return false;

        // Size
        if (selectedSize !== 'All' && !p.sizes.includes(selectedSize as any)) return false;

        // Occasion
        if (selectedOccasion !== 'All' && !p.occasions.includes(selectedOccasion as any)) return false;

        // Price
        if (p.rentalPrice3Days > maxPrice) return false;

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price_low') return a.rentalPrice3Days - b.rentalPrice3Days;
        if (sortBy === 'price_high') return b.rentalPrice3Days - a.rentalPrice3Days;
        if (sortBy === 'rating') return b.rating - a.rating;
        // Default popular
        return (b.isPopular ? 1 : 0) - (a.isPopular ? 1 : 0);
      });
  }, [products, searchQuery, selectedCategory, selectedGender, selectedSize, selectedOccasion, maxPrice, sortBy]);

  const activeFiltersCount = [
    selectedCategory !== 'All',
    selectedGender !== 'All',
    selectedSize !== 'All',
    selectedOccasion !== 'All',
    maxPrice < 3000,
    searchQuery.trim() !== '',
  ].filter(Boolean).length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Top Banner / Breadcrumb */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#E2DBD0] pb-6">
        <div>
          <div className="text-xs uppercase font-bold text-[#8C6D46] tracking-wider flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Designer Catalog & Live Rentals</span>
          </div>
          <h1 className="font-serif text-3xl font-bold text-stone-900 mt-1">
            Browse Outfits ({filteredProducts.length})
          </h1>
          <p className="text-stone-500 text-xs sm:text-sm mt-0.5">
            Discover verified couture with 2-3 day operational buffer, backup sizing, and doorstep return pickup.
          </p>
        </div>

        {/* Sort & Mobile Filter Toggle */}
        <div className="flex items-center gap-3 self-start md:self-auto">
          {/* Mobile Filter Button */}
          <button
            onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
            className="lg:hidden px-3.5 py-2 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-xl text-xs font-semibold flex items-center gap-2 border border-stone-300"
          >
            <Filter className="w-3.5 h-3.5 text-[#6B1D2F]" />
            <span>Filters {activeFiltersCount > 0 && `(${activeFiltersCount})`}</span>
          </button>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-1.5 bg-white border border-stone-200 px-3 py-2 rounded-xl text-xs font-semibold text-stone-700 shadow-2xs">
            <ArrowUpDown className="w-3.5 h-3.5 text-stone-400" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-transparent focus:outline-hidden cursor-pointer"
            >
              <option value="popular">Most Popular</option>
              <option value="price_low">Price: Low to High</option>
              <option value="price_high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Content Layout (Sidebar + Grid) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* DESKTOP SIDEBAR FILTERS (3 cols) */}
        <aside className="hidden lg:block lg:col-span-3 bg-white rounded-3xl border border-stone-200 p-5 space-y-6 shadow-xs sticky top-24">
          
          <div className="flex items-center justify-between pb-3 border-b border-stone-100">
            <span className="font-serif font-bold text-stone-900 text-base flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-[#6B1D2F]" />
              <span>Refine Outfits</span>
            </span>
            {activeFiltersCount > 0 && (
              <button
                onClick={handleResetFilters}
                className="text-xs font-semibold text-[#6B1D2F] hover:underline"
              >
                Reset All
              </button>
            )}
          </div>

          {/* Gender Filter */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-stone-800 uppercase tracking-wider block">
              Gender
            </label>
            <div className="flex flex-wrap gap-1.5">
              {['All', ...GENDERS].map((g) => (
                <button
                  key={g}
                  onClick={() => setSelectedGender(g)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    selectedGender === g
                      ? 'bg-[#6B1D2F] text-white shadow-xs'
                      : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                  }`}
                >
                  {g}
                </button>
              ))}
            </div>
          </div>

          {/* Categories */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-stone-800 uppercase tracking-wider block">
              Category
            </label>
            <div className="flex flex-col space-y-1 text-xs">
              <button
                onClick={() => setSelectedCategory('All')}
                className={`py-1.5 px-2.5 rounded-lg text-left transition-colors font-medium ${
                  selectedCategory === 'All' ? 'bg-[#6B1D2F]/10 text-[#6B1D2F] font-bold' : 'text-stone-600 hover:bg-stone-50'
                }`}
              >
                All Categories
              </button>
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`py-1.5 px-2.5 rounded-lg text-left transition-colors font-medium ${
                    selectedCategory === cat ? 'bg-[#6B1D2F]/10 text-[#6B1D2F] font-bold' : 'text-stone-600 hover:bg-stone-50'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Occasions Filter (Prompt Requirement) */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-stone-800 uppercase tracking-wider block">
              Occasion
            </label>
            <div className="flex flex-wrap gap-1.5">
              <button
                onClick={() => setSelectedOccasion('All')}
                className={`px-2.5 py-1 rounded-md text-[11px] font-semibold ${
                  selectedOccasion === 'All'
                    ? 'bg-[#6B1D2F] text-white'
                    : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                }`}
              >
                All
              </button>
              {OCCASIONS.map((occ) => (
                <button
                  key={occ}
                  onClick={() => setSelectedOccasion(occ)}
                  className={`px-2.5 py-1 rounded-md text-[11px] font-semibold transition-all ${
                    selectedOccasion === occ
                      ? 'bg-[#6B1D2F] text-white'
                      : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                  }`}
                >
                  {occ}
                </button>
              ))}
            </div>
          </div>

          {/* Size Filter */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-stone-800 uppercase tracking-wider block">
              Size
            </label>
            <div className="grid grid-cols-4 gap-1.5 text-center">
              <button
                onClick={() => setSelectedSize('All')}
                className={`py-1.5 rounded-lg text-xs font-bold ${
                  selectedSize === 'All'
                    ? 'bg-[#6B1D2F] text-white'
                    : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                }`}
              >
                All
              </button>
              {SIZES.map((sz) => (
                <button
                  key={sz}
                  onClick={() => setSelectedSize(sz)}
                  className={`py-1.5 rounded-lg text-xs font-bold transition-all ${
                    selectedSize === sz
                      ? 'bg-[#6B1D2F] text-white'
                      : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                  }`}
                >
                  {sz}
                </button>
              ))}
            </div>
          </div>

          {/* Price Range Slider */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs">
              <label className="font-bold text-stone-800 uppercase tracking-wider">
                Max Rental Price
              </label>
              <span className="font-bold text-[#6B1D2F]">₹{maxPrice}</span>
            </div>
            <input
              type="range"
              min="800"
              max="3000"
              step="100"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full accent-[#6B1D2F] cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-stone-400">
              <span>₹800</span>
              <span>₹3,000+</span>
            </div>
          </div>

        </aside>

        {/* MOBILE FILTER MODAL */}
        {mobileFilterOpen && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex justify-end lg:hidden">
            <div className="w-full max-w-xs bg-white h-full p-5 overflow-y-auto space-y-6">
              <div className="flex items-center justify-between border-b pb-3">
                <span className="font-serif font-bold text-stone-900 text-lg">Filters</span>
                <button onClick={() => setMobileFilterOpen(false)} className="p-1">
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Mobile filter items */}
              <div className="space-y-4 text-xs">
                <div>
                  <span className="font-bold block mb-1">Gender</span>
                  <div className="flex flex-wrap gap-1">
                    {['All', ...GENDERS].map((g) => (
                      <button
                        key={g}
                        onClick={() => setSelectedGender(g)}
                        className={`px-3 py-1 rounded-md ${selectedGender === g ? 'bg-[#6B1D2F] text-white' : 'bg-stone-100'}`}
                      >
                        {g}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <span className="font-bold block mb-1">Occasion</span>
                  <div className="flex flex-wrap gap-1">
                    {['All', ...OCCASIONS].map((occ) => (
                      <button
                        key={occ}
                        onClick={() => setSelectedOccasion(occ)}
                        className={`px-2 py-1 rounded-md text-[11px] ${selectedOccasion === occ ? 'bg-[#6B1D2F] text-white' : 'bg-stone-100'}`}
                      >
                        {occ}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <span className="font-bold block mb-1">Category</span>
                  <div className="flex flex-wrap gap-1">
                    {['All', ...CATEGORIES].map((cat) => (
                      <button
                        key={cat}
                        onClick={() => setSelectedCategory(cat)}
                        className={`px-2 py-1 rounded-md text-[11px] ${selectedCategory === cat ? 'bg-[#6B1D2F] text-white' : 'bg-stone-100'}`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <button
                onClick={() => setMobileFilterOpen(false)}
                className="w-full py-3 bg-[#6B1D2F] text-white font-bold rounded-xl text-xs"
              >
                Apply Filters ({filteredProducts.length} Results)
              </button>
            </div>
          </div>
        )}

        {/* PRODUCTS GRID (9 cols) */}
        <main className="lg:col-span-9 space-y-6">
          
          {/* Active Filter Badges */}
          {activeFiltersCount > 0 && (
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <span className="text-stone-400 font-medium">Applied:</span>
              {selectedCategory !== 'All' && (
                <span className="bg-stone-200 text-stone-800 px-2.5 py-1 rounded-full flex items-center gap-1 font-semibold">
                  <span>{selectedCategory}</span>
                  <button onClick={() => setSelectedCategory('All')}>×</button>
                </span>
              )}
              {selectedOccasion !== 'All' && (
                <span className="bg-[#FAF4EB] border border-[#DFCBB5] text-[#6B1D2F] px-2.5 py-1 rounded-full flex items-center gap-1 font-semibold">
                  <span>{selectedOccasion}</span>
                  <button onClick={() => setSelectedOccasion('All')}>×</button>
                </span>
              )}
              {selectedGender !== 'All' && (
                <span className="bg-stone-200 text-stone-800 px-2.5 py-1 rounded-full flex items-center gap-1 font-semibold">
                  <span>{selectedGender}</span>
                  <button onClick={() => setSelectedGender('All')}>×</button>
                </span>
              )}
              {selectedSize !== 'All' && (
                <span className="bg-stone-200 text-stone-800 px-2.5 py-1 rounded-full flex items-center gap-1 font-semibold">
                  <span>Size {selectedSize}</span>
                  <button onClick={() => setSelectedSize('All')}>×</button>
                </span>
              )}
              {searchQuery && (
                <span className="bg-stone-200 text-stone-800 px-2.5 py-1 rounded-full flex items-center gap-1 font-semibold">
                  <span>"{searchQuery}"</span>
                  <button onClick={() => setSearchQuery('')}>×</button>
                </span>
              )}
            </div>
          )}

          {/* Grid of Cards */}
          {filteredProducts.length === 0 ? (
            <div className="bg-white rounded-3xl border border-stone-200 p-12 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-stone-100 flex items-center justify-center text-stone-400 mx-auto">
                <Search className="w-8 h-8" />
              </div>
              <h3 className="font-serif text-xl font-bold text-stone-800">No outfits matched your filters</h3>
              <p className="text-stone-500 text-xs max-w-sm mx-auto">
                Try widening your search terms, resetting price caps, or clearing occasion filters.
              </p>
              <button
                onClick={handleResetFilters}
                className="px-5 py-2.5 rounded-xl bg-[#6B1D2F] text-white text-xs font-bold"
              >
                Clear All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((p) => (
                <ProductCard
                  key={p.id}
                  product={p}
                  onSelect={onSelectProduct}
                  isWishlisted={wishlistIds.includes(p.id)}
                  onToggleWishlist={onToggleWishlist}
                />
              ))}
            </div>
          )}

        </main>

      </div>

    </div>
  );
};
