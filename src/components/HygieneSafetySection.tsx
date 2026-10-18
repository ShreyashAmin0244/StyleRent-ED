import React from 'react';
import { 
  ShieldCheck, 
  Sparkles, 
  Droplets, 
  Wind, 
  CheckCircle2, 
  PackageCheck, 
  SunMedium, 
  Activity 
} from 'lucide-react';

export const HygieneSafetySection: React.FC = () => {
  const protocols = [
    {
      title: 'Hospital-Grade UV-C Chamber',
      desc: 'Each returned outfit spends 20 minutes inside an industrial ultraviolet-C sterilizing chamber, eliminating 99.9% of bacteria, viruses, and pathogens without chemical damage.',
      icon: SunMedium,
      stat: '99.9% Microbial Kill',
    },
    {
      title: 'Eco Hydrocarbon Dry Cleaning',
      desc: 'We utilize gentler organic hydrocarbon solvents that preserve delicate zari weaves, velvet lusters, and silk shines while eliminating lingering body odors and food stains.',
      icon: Droplets,
      stat: 'Zero Chemical Odor',
    },
    {
      title: '100°C High-Pressure Steam Iron',
      desc: 'Garments are pressed with industrial high-pressure steam guns at 100°C, providing a flawless crease-free boutique drape and deep thermal sanitization.',
      icon: Wind,
      stat: 'Thermal Sterilization',
    },
    {
      title: '12-Point Quality & Stitch Audit',
      desc: 'Expert tailors inspect every hook, zipper, can-can skirt layer, mirror embroidery, and button. Any loose thread is reinforced before dispatch.',
      icon: PackageCheck,
      stat: 'Master Tailor Passed',
    },
  ];

  return (
    <div className="py-16 bg-white border-b border-[#E8E1D5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-800 border border-emerald-200 px-3.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Pristine Hygiene Standard</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900">
            Cleaner Than Brand New
          </h2>
          <p className="text-stone-600 text-sm leading-relaxed">
            We understand wearing rented clothing requires total trust. Every Style-Rent outfit undergoes a medical-grade 4-step sanitization cycle before dispatching in sealed anti-dust carriers.
          </p>
        </div>

        {/* 4 Protocol Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {protocols.map((p) => {
            const Icon = p.icon;
            return (
              <div 
                key={p.title}
                className="bg-[#FAF7F2] rounded-3xl p-6 border border-[#E5DECF] space-y-3 hover:border-emerald-300 transition-all shadow-xs flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="w-12 h-12 rounded-2xl bg-white border border-emerald-200 text-emerald-700 flex items-center justify-center shadow-xs">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-serif font-bold text-stone-900 text-base">
                    {p.title}
                  </h3>
                  <p className="text-stone-600 text-xs leading-relaxed">
                    {p.desc}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#DFCBB5]/60 flex items-center gap-1.5 text-[11px] font-bold text-emerald-800">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{p.stat}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Hygiene Certification Banner */}
        <div className="bg-[#FAF4EB] border border-[#DFCBB5] rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-[#6B1D2F] text-[#E6CA85] flex items-center justify-center shrink-0 shadow-md">
              <Activity className="w-7 h-7" />
            </div>
            <div>
              <h4 className="font-serif font-bold text-stone-900 text-lg">
                The Style-Rent Zero-Contact Seal
              </h4>
              <p className="text-stone-600 text-xs max-w-xl mt-0.5">
                After passing final QC, the outfit is placed inside a sealed zip bag with a freshness cedar sachet. 
                If the seal is broken upon arrival, our delivery team replaces your outfit instantly with our backup inventory.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="text-center px-4 py-2 bg-white rounded-xl border border-stone-200">
              <div className="font-bold text-stone-900 text-sm">100%</div>
              <div className="text-[10px] text-stone-500">Odor-Free</div>
            </div>
            <div className="text-center px-4 py-2 bg-white rounded-xl border border-stone-200">
              <div className="font-bold text-stone-900 text-sm">24-Hr</div>
              <div className="text-[10px] text-stone-500">QC Window</div>
            </div>
            <div className="text-center px-4 py-2 bg-white rounded-xl border border-stone-200">
              <div className="font-bold text-emerald-700 text-sm">✓ Passed</div>
              <div className="text-[10px] text-stone-500">UV-C Tested</div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
