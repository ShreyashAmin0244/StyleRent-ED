import React from 'react';
import { 
  Sparkles, 
  ShoppingBag, 
  Heart, 
  Search, 
  Menu, 
  X, 
  MapPin, 
  Database, 
  ShieldCheck, 
  Clock, 
  SlidersHorizontal,
  PackageCheck,
  Lock,
  Unlock
} from 'lucide-react';
import { formatINR } from '../utils/rentalCalculations';

interface NavbarProps {
  activeTab: 'home' | 'shop' | 'how-it-works' | 'hygiene' | 'orders' | 'admin' | 'database';
  setActiveTab: (tab: 'home' | 'shop' | 'how-it-works' | 'hygiene' | 'orders' | 'admin' | 'database') => void;
  cartCount: number;
  wishlistCount: number;
  openCart: () => void;
  openWishlist: () => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCity: string;
  setSelectedCity: (city: string) => void;
  isStaffAuthorized?: boolean;
  onLockStaff?: () => void;
}

export const CITIES = ['Mumbai', 'Bengaluru', 'Delhi NCR', 'Pune', 'Hyderabad', 'Thane'];

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  cartCount,
  wishlistCount,
  openCart,
  openWishlist,
  searchQuery,
  setSearchQuery,
  selectedCity,
  setSelectedCity,
  isStaffAuthorized = false,
  onLockStaff,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const handleNavClick = (tab: NavbarProps['activeTab']) => {
    setActiveTab(tab);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FAF7F2]/95 backdrop-blur-md border-b border-[#E8E1D5] shadow-xs">
      {/* Top Notification Announcement Bar */}
      <div className="bg-[#5C1324] text-[#F3E7D3] text-xs py-1.5 px-4 text-center font-medium flex items-center justify-center gap-2 tracking-wide">
        <Sparkles className="w-3.5 h-3.5 text-[#E6CA85] animate-pulse" />
        <span>Wedding & Festive Season: Rent Designer Wear at 1/10th Retail. Free Dry Cleaning & Doorstep Delivery!</span>
        <span className="hidden md:inline-block bg-[#E6CA85]/20 text-[#E6CA85] px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider ml-2">
          College Project Prototype
        </span>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo */}
          <div 
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#6B1D2F] to-[#450A18] flex items-center justify-center text-[#E6CA85] shadow-md border border-[#E6CA85]/30 group-hover:scale-105 transition-transform">
              <span className="font-serif text-2xl font-bold tracking-tight">SR</span>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-serif text-2xl font-bold tracking-tight text-[#450A18]">
                  Style-Rent
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#C5A059]"></span>
              </div>
              <p className="text-[11px] font-medium tracking-widest uppercase text-[#8C6D46]">
                Couture on Demand
              </p>
            </div>
          </div>

          {/* Desktop Search */}
          <div className="hidden lg:flex items-center flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
              <input
                type="text"
                placeholder="Search Lehengas, Sherwanis, Sarees, Tuxedos..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  if (activeTab !== 'shop') setActiveTab('shop');
                }}
                className="w-full pl-10 pr-4 py-2 bg-stone-100/80 hover:bg-stone-100 focus:bg-white text-sm text-stone-800 placeholder-stone-400 rounded-full border border-stone-200 focus:border-[#6B1D2F] focus:outline-hidden focus:ring-2 focus:ring-[#6B1D2F]/15 transition-all"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-stone-400 hover:text-stone-600 bg-stone-200 rounded-full w-4 h-4 flex items-center justify-center"
                >
                  ×
                </button>
              )}
            </div>
          </div>

          {/* City Selector */}
          <div className="hidden md:flex items-center gap-1.5 text-xs text-stone-600 bg-[#F1EDE5] px-3 py-1.5 rounded-full border border-[#E2DBD0]">
            <MapPin className="w-3.5 h-3.5 text-[#6B1D2F]" />
            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="bg-transparent text-xs font-semibold text-stone-800 cursor-pointer focus:outline-hidden"
            >
              {CITIES.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2 ml-4">
            <button
              onClick={() => handleNavClick('home')}
              className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                activeTab === 'home' 
                  ? 'text-[#6B1D2F] font-semibold bg-[#6B1D2F]/10' 
                  : 'text-stone-700 hover:text-[#6B1D2F] hover:bg-stone-100'
              }`}
            >
              Home
            </button>
            <button
              onClick={() => handleNavClick('shop')}
              className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                activeTab === 'shop' 
                  ? 'text-[#6B1D2F] font-semibold bg-[#6B1D2F]/10' 
                  : 'text-stone-700 hover:text-[#6B1D2F] hover:bg-stone-100'
              }`}
            >
              Browse Shop
            </button>
            <button
              onClick={() => handleNavClick('how-it-works')}
              className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                activeTab === 'how-it-works' 
                  ? 'text-[#6B1D2F] font-semibold bg-[#6B1D2F]/10' 
                  : 'text-stone-700 hover:text-[#6B1D2F] hover:bg-stone-100'
              }`}
            >
              How It Works
            </button>
            <button
              onClick={() => handleNavClick('hygiene')}
              className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                activeTab === 'hygiene' 
                  ? 'text-[#6B1D2F] font-semibold bg-[#6B1D2F]/10' 
                  : 'text-stone-700 hover:text-[#6B1D2F] hover:bg-stone-100'
              }`}
            >
              Hygiene & Safety
            </button>
            <button
              onClick={() => handleNavClick('orders')}
              className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                activeTab === 'orders' 
                  ? 'text-[#6B1D2F] font-semibold bg-[#6B1D2F]/10' 
                  : 'text-stone-700 hover:text-[#6B1D2F] hover:bg-stone-100'
              }`}
            >
              My Orders
            </button>
            
            {/* Admin Portal Tab */}
            <button
              onClick={() => handleNavClick('admin')}
              className={`px-2.5 py-1.5 text-xs font-semibold rounded-lg transition-all border flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'admin'
                  ? 'bg-amber-100 border-amber-300 text-amber-900 shadow-xs'
                  : 'bg-stone-100 border-stone-200 text-stone-600 hover:bg-stone-200'
              }`}
              title={isStaffAuthorized ? "Admin Console (Unlocked)" : "Admin Console (Restricted)"}
            >
              {isStaffAuthorized ? (
                <PackageCheck className="w-3.5 h-3.5 text-emerald-700" />
              ) : (
                <Lock className="w-3.5 h-3.5 text-amber-700" />
              )}
              <span>Admin</span>
              {!isStaffAuthorized && (
                <span className="text-[9px] bg-amber-200/90 text-amber-950 px-1 py-0.2 rounded font-mono font-bold">Lock</span>
              )}
            </button>

            {/* Database & SQL Portal Tab */}
            <button
              onClick={() => handleNavClick('database')}
              className={`px-2.5 py-1.5 text-xs font-semibold rounded-lg transition-all border flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'database'
                  ? 'bg-[#450A18] text-[#E6CA85] border-[#E6CA85]/40 shadow-xs'
                  : 'bg-[#6B1D2F]/10 border-[#6B1D2F]/20 text-[#6B1D2F] hover:bg-[#6B1D2F]/20'
              }`}
              title={isStaffAuthorized ? "Database & SQL Studio (Unlocked)" : "Database & SQL Studio (Restricted)"}
            >
              {isStaffAuthorized ? (
                <Database className="w-3.5 h-3.5" />
              ) : (
                <Lock className="w-3.5 h-3.5 text-[#6B1D2F]" />
              )}
              <span>Database & SQL</span>
              {isStaffAuthorized ? (
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              ) : (
                <span className="text-[9px] bg-[#6B1D2F]/20 text-[#6B1D2F] px-1 py-0.2 rounded font-mono font-bold">Lock</span>
              )}
            </button>
          </nav>

          {/* Action Icons (Wishlist & Cart) */}
          <div className="flex items-center gap-2 sm:gap-3">
            {isStaffAuthorized && onLockStaff && (
              <button
                onClick={onLockStaff}
                className="px-2.5 py-1 text-[11px] rounded-lg bg-rose-50 text-rose-700 border border-rose-200 hover:bg-rose-100 font-semibold flex items-center gap-1 cursor-pointer transition-colors"
                title="Lock Staff Access (Re-lock Admin & Database)"
              >
                <Lock className="w-3 h-3 text-rose-600" />
                <span className="hidden xl:inline">Lock Admin</span>
              </button>
            )}
            <button
              onClick={openWishlist}
              className="relative p-2.5 rounded-full text-stone-700 hover:text-[#6B1D2F] hover:bg-stone-100 transition-colors"
              aria-label="Wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-[#6B1D2F] text-white text-[10px] font-bold flex items-center justify-center animate-scale">
                  {wishlistCount}
                </span>
              )}
            </button>

            <button
              onClick={openCart}
              className="relative flex items-center gap-2 px-3 py-2 rounded-full bg-[#6B1D2F] text-white hover:bg-[#521321] transition-all shadow-sm hover:shadow-md cursor-pointer"
              aria-label="Rental Cart"
            >
              <ShoppingBag className="w-4 h-4 text-[#E6CA85]" />
              <span className="text-xs font-semibold hidden sm:inline-block">Bag</span>
              {cartCount > 0 && (
                <span className="w-5 h-5 rounded-full bg-[#E6CA85] text-[#450A18] text-xs font-bold flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-stone-700 md:hidden hover:bg-stone-100 rounded-lg"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#FAF7F2] border-b border-[#E2DBD0] px-4 pt-2 pb-6 space-y-3">
          {/* Mobile Search */}
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
            <input
              type="text"
              placeholder="Search Lehengas, Sherwanis..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setActiveTab('shop');
              }}
              className="w-full pl-9 pr-3 py-2 bg-stone-100 text-sm rounded-lg border border-stone-200"
            />
          </div>

          {/* City selector mobile */}
          <div className="flex items-center justify-between py-2 border-b border-stone-200 text-xs">
            <span className="text-stone-500 flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-[#6B1D2F]" />
              Delivery Location:
            </span>
            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="bg-transparent font-semibold text-stone-800"
            >
              {CITIES.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-1">
            <button
              onClick={() => handleNavClick('home')}
              className={`p-2.5 text-sm rounded-lg text-left ${activeTab === 'home' ? 'bg-[#6B1D2F] text-white' : 'bg-stone-100 text-stone-800'}`}
            >
              Home
            </button>
            <button
              onClick={() => handleNavClick('shop')}
              className={`p-2.5 text-sm rounded-lg text-left ${activeTab === 'shop' ? 'bg-[#6B1D2F] text-white' : 'bg-stone-100 text-stone-800'}`}
            >
              Browse Shop
            </button>
            <button
              onClick={() => handleNavClick('how-it-works')}
              className={`p-2.5 text-sm rounded-lg text-left ${activeTab === 'how-it-works' ? 'bg-[#6B1D2F] text-white' : 'bg-stone-100 text-stone-800'}`}
            >
              How It Works
            </button>
            <button
              onClick={() => handleNavClick('hygiene')}
              className={`p-2.5 text-sm rounded-lg text-left ${activeTab === 'hygiene' ? 'bg-[#6B1D2F] text-white' : 'bg-stone-100 text-stone-800'}`}
            >
              Hygiene & Safety
            </button>
            <button
              onClick={() => handleNavClick('orders')}
              className={`p-2.5 text-sm rounded-lg text-left ${activeTab === 'orders' ? 'bg-[#6B1D2F] text-white' : 'bg-stone-100 text-stone-800'}`}
            >
              My Orders
            </button>
            <button
              onClick={() => handleNavClick('admin')}
              className={`p-2.5 text-sm rounded-lg text-left flex items-center justify-between ${
                activeTab === 'admin' ? 'bg-amber-800 text-white' : 'bg-amber-100 text-amber-900'
              }`}
            >
              <div className="flex items-center gap-2">
                {isStaffAuthorized ? <PackageCheck className="w-4 h-4 text-emerald-700" /> : <Lock className="w-4 h-4 text-amber-700" />}
                <span>Admin Hub</span>
              </div>
              {!isStaffAuthorized && <Lock className="w-3.5 h-3.5 text-amber-800" />}
            </button>
          </div>

          <button
            onClick={() => handleNavClick('database')}
            className="w-full mt-2 py-2.5 px-3 rounded-lg bg-[#450A18] text-[#E6CA85] text-xs font-semibold flex items-center justify-between border border-[#E6CA85]/30 cursor-pointer"
          >
            <div className="flex items-center gap-2">
              {isStaffAuthorized ? <Database className="w-4 h-4" /> : <Lock className="w-4 h-4 text-[#E6CA85]" />}
              <span>View Database Schema & SQL Studio</span>
            </div>
            {!isStaffAuthorized && (
              <Lock className="w-3.5 h-3.5 text-[#E6CA85]" />
            )}
          </button>
        </div>
      )}
    </header>
  );
};
