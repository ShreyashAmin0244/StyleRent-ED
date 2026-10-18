import React from 'react';
import { 
  Search, 
  CalendarCheck, 
  Scissors, 
  Sparkles, 
  Truck, 
  RotateCcw, 
  ShieldCheck, 
  Smile, 
  CheckCircle2,
  Clock,
  ArrowRight
} from 'lucide-react';

interface HowItWorksSectionProps {
  onExploreShop: () => void;
}

export const HowItWorksSection: React.FC<HowItWorksSectionProps> = ({ onExploreShop }) => {
  const steps = [
    {
      num: '01',
      title: 'Discover & Check Availability',
      desc: 'Browse hundreds of designer lehengas, sherwanis, sarees, and suits. Select your event dates (3, 7, or 10 days). Our smart calendar automatically applies a 2-3 day sanitization buffer to prevent double-booking.',
      icon: CalendarCheck,
      highlight: 'Live Calendar Availability',
    },
    {
      num: '02',
      title: 'Choose Sizing & Fit Options',
      desc: 'Pick your standard size or enter custom body measurements. Worried about the fit? Add a Backup Size for just ₹399 or request an at-home tailor visit in selected metro cities.',
      icon: Scissors,
      highlight: 'Free Custom Sizing & Backup',
    },
    {
      num: '03',
      title: 'Doorstep Delivery & Try-On',
      desc: 'Your outfit arrives 1 day before your event, professionally dry-cleaned, microbially sterilized, and crease-free steam ironed. Try it on immediately with our fit guarantee.',
      icon: Truck,
      highlight: 'Arrives 1 Day Before Event',
    },
    {
      num: '04',
      title: 'Pack in Return Bag & Get Deposit',
      desc: 'No dry cleaning required on your end! Simply place the worn outfit back into the provided reusable waterproof return bag. Courier picks it up, and your security deposit is refunded in 24 hours.',
      icon: RotateCcw,
      highlight: 'Reusable Zero-Hassle Bag',
    },
  ];

  return (
    <div className="py-16 bg-[#FAF7F2] border-b border-[#E8E1D5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 bg-[#6B1D2F]/10 text-[#6B1D2F] px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-[#8C6D46]" />
            <span>The Effortless Rental Process</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900">
            How Style-Rent Works
          </h2>
          <p className="text-stone-600 text-sm leading-relaxed">
            From discovering the dream designer outfit to free doorstep return pickup, here is the seamless 4-step rental experience.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((st) => {
            const Icon = st.icon;
            return (
              <div 
                key={st.num}
                className="bg-white rounded-3xl p-6 border border-stone-200/90 shadow-xs hover:border-[#6B1D2F]/40 hover:shadow-lg transition-all duration-300 flex flex-col justify-between space-y-4 relative group"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-serif text-3xl font-bold text-[#E5DECF] group-hover:text-[#6B1D2F]/30 transition-colors">
                      {st.num}
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-[#FAF4EB] border border-[#DFCBB5] text-[#6B1D2F] flex items-center justify-center">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <h3 className="font-serif font-bold text-stone-900 text-lg mt-4 group-hover:text-[#6B1D2F] transition-colors">
                    {st.title}
                  </h3>

                  <p className="text-stone-600 text-xs mt-2 leading-relaxed">
                    {st.desc}
                  </p>
                </div>

                <div className="pt-3 border-t border-stone-100">
                  <span className="inline-block bg-[#FAF4EB] text-[#8C6D46] text-[10px] font-bold px-2.5 py-1 rounded-md">
                    {st.highlight}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Smart Operational Buffer Feature Highlight Box */}
        <div className="bg-white rounded-3xl border border-stone-200 p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xs">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#6B1D2F]">
              <Clock className="w-4 h-4" />
              <span>Built-in College Project Engineering Concept</span>
            </div>
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-stone-900">
              Why We Lock a 2-3 Day Operational Buffer
            </h3>
            <p className="text-stone-600 text-xs sm:text-sm leading-relaxed">
              Unlike normal products that ship once, rented garments must undergo reverse courier transit, hospital-grade dry cleaning, UV-C sterilisation chamber, and quality inspection before reaching the next customer. Our smart system automatically blocks these transition days on the calendar to guarantee you never receive a late or unhygienic outfit.
            </p>
          </div>

          <button
            onClick={onExploreShop}
            className="px-6 py-3.5 bg-[#450A18] hover:bg-[#340712] text-[#E6CA85] font-bold text-xs rounded-xl shadow-md border border-[#E6CA85]/30 flex items-center gap-2 shrink-0 transition-all hover:scale-[1.02] cursor-pointer"
          >
            <span>Explore Collection Now</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};
