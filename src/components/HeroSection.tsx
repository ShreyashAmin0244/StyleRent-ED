import React from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  ShieldCheck, 
  RotateCcw, 
  Scissors, 
  CheckCircle,
  Database,
  CalendarCheck
} from 'lucide-react';

interface HeroSectionProps {
  onExploreShop: () => void;
  onHowItWorks: () => void;
  onOpenDatabase: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExploreShop,
  onHowItWorks,
  onOpenDatabase,
}) => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-[#FAF4EB] via-[#FAF7F2] to-[#FAF7F2] border-b border-[#E8E1D5] py-12 sm:py-16 lg:py-20">
      
      {/* Decorative Background Accents */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-[#6B1D2F]/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-[#E6CA85]/10 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Text Content (7 cols) */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2 bg-[#6B1D2F]/10 border border-[#6B1D2F]/20 text-[#6B1D2F] px-3.5 py-1.5 rounded-full text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-[#8C6D46] animate-pulse" />
              <span>India’s Smart Clothing Rental Platform • Wedding & Party Ready</span>
            </div>

            {/* Main Headline */}
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-stone-900 tracking-tight leading-[1.15]">
              Own the Spotlight. <br />
              <span className="text-[#6B1D2F] italic">Rent the Designer Look.</span>
            </h1>

            {/* Subtitle */}
            <p className="text-stone-600 text-sm sm:text-base max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Why spend ₹40,000 on a lehenga or sherwani you’ll only wear once? Rent authentic bridal couture, reception gowns, and tailored tuxedos from just <strong>₹999</strong> with guaranteed hospital-grade sanitization, backup sizing, and doorstep return pickup.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-2">
              <button
                onClick={onExploreShop}
                className="px-6 py-3.5 bg-[#450A18] hover:bg-[#340712] text-[#E6CA85] font-bold text-sm rounded-xl shadow-lg flex items-center gap-2 border border-[#E6CA85]/30 cursor-pointer transition-all hover:scale-[1.02]"
              >
                <span>Browse Rental Outfits</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onHowItWorks}
                className="px-5 py-3.5 bg-white hover:bg-stone-50 text-stone-800 font-semibold text-sm rounded-xl border border-stone-300 shadow-xs transition-all cursor-pointer"
              >
                How Rental Works
              </button>

              <button
                onClick={onOpenDatabase}
                className="px-4 py-3.5 bg-[#FAF4EB] hover:bg-[#F2E8D7] text-[#6B1D2F] font-bold text-xs rounded-xl border border-[#DFCBB5] flex items-center gap-1.5 shadow-xs transition-all cursor-pointer"
                title="View Database & SQL Architecture for Project Evaluation"
              >
                <Database className="w-4 h-4 text-[#8C6D46]" />
                <span>Project Database & SQL</span>
              </button>
            </div>

            {/* Value Pillars Row */}
            <div className="pt-6 border-t border-stone-200/80 grid grid-cols-2 sm:grid-cols-4 gap-3 text-left">
              <div className="flex items-start gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-xs text-stone-900">100% Sanitized</div>
                  <div className="text-[10px] text-stone-500">UV-C & steam treated</div>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <Scissors className="w-4 h-4 text-[#6B1D2F] shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-xs text-stone-900">Backup Size</div>
                  <div className="text-[10px] text-stone-500">For ₹399 peace of mind</div>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <CalendarCheck className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-xs text-stone-900">Smart Calendar</div>
                  <div className="text-[10px] text-stone-500">2-3d hygiene buffer</div>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <RotateCcw className="w-4 h-4 text-purple-600 shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-xs text-stone-900">Reusable Bag</div>
                  <div className="text-[10px] text-stone-500">Free doorstep pickup</div>
                </div>
              </div>
            </div>

          </div>

          {/* Right Visual Collage (5 cols) */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md">
              
              {/* Main Luxury Outfit Card */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-stone-100 aspect-4/5 group">
                <img
                  src="https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1000&q=80"
                  alt="Emerald Green Bridal Lehenga"
                  className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />

                {/* Floating Price Tag */}
                <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-full shadow-lg border border-stone-200">
                  <span className="text-[10px] uppercase font-bold text-stone-400 block leading-tight">Rent from</span>
                  <span className="text-base font-bold text-[#6B1D2F]">₹1,999</span>
                  <span className="text-[10px] text-stone-400 line-through ml-1.5">₹42,000</span>
                </div>

                {/* Floating Hygiene Badge */}
                <div className="absolute top-4 right-4 bg-emerald-950/80 backdrop-blur-md text-[#E6CA85] px-2.5 py-1 rounded-full text-[10px] font-semibold flex items-center gap-1 border border-emerald-400/30">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Microbially Disinfected</span>
                </div>

                {/* Bottom Card Copy */}
                <div className="absolute bottom-4 inset-x-4 text-white space-y-1">
                  <span className="text-[10px] uppercase tracking-wider text-[#E6CA85] font-bold">
                    Featured Wedding Collection
                  </span>
                  <h3 className="font-serif text-xl font-bold">
                    Emerald Green Zardozi Velvet Lehenga
                  </h3>
                  <p className="text-xs text-stone-300">
                    Hand-embroidered zardozi • Includes blouse & double dupattas
                  </p>
                </div>
              </div>

              {/* Overlapping Groom Sherwani Badge */}
              <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl p-3 shadow-xl border border-stone-200 hidden sm:flex items-center gap-3">
                <img
                  src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=200&q=80"
                  alt="Sherwani"
                  className="w-12 h-14 object-cover object-top rounded-xl"
                />
                <div className="text-xs">
                  <div className="font-serif font-bold text-stone-900">Royal Maroon Sherwani</div>
                  <div className="text-[#6B1D2F] font-bold">₹1,499 / 3 Days</div>
                  <div className="text-[10px] text-emerald-600 font-medium">✓ Available Oct & Nov</div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
