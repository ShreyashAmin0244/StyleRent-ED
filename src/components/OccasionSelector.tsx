import React from 'react';
import { OccasionType } from '../types';
import { Sparkles } from 'lucide-react';

interface OccasionSelectorProps {
  selectedOccasion: OccasionType | 'All';
  onSelectOccasion: (occasion: OccasionType | 'All') => void;
}

const OCCASIONS: { name: OccasionType; label: string; desc: string; image: string }[] = [
  {
    name: 'Sangeet',
    label: 'Sangeet & Mehendi',
    desc: 'Twirl-friendly lehengas & draped kurta sets',
    image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=400&q=80',
  },
  {
    name: 'Wedding',
    label: 'Big Fat Weddings',
    desc: 'Heavy velvet bridal lehengas & royal silk sherwanis',
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=400&q=80',
  },
  {
    name: 'Haldi',
    label: 'Haldi Ceremony',
    desc: 'Stain-resistant sunshine yellow gotapatti anarkalis & bundis',
    image: 'https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?auto=format&fit=crop&w=400&q=80',
  },
  {
    name: 'Cocktail Party',
    label: 'Cocktail & Reception',
    desc: 'Sequin mermaid gowns, bandhgalas & pre-draped sarees',
    image: 'https://images.unsplash.com/photo-1566737236500-c8ac43014a67?auto=format&fit=crop&w=400&q=80',
  },
  {
    name: 'Pre-Wedding Shoot',
    label: 'Pre-Wedding Shoots',
    desc: 'Cinematic trail gowns, raw silk jackets & flowing drapes',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
  },
  {
    name: 'College Function',
    label: 'College Farewell & Fests',
    desc: 'Trendy indo-western capes, ruffles & pocket-friendly kurtas',
    image: 'https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?auto=format&fit=crop&w=400&q=80',
  },
  {
    name: 'Corporate Gala',
    label: 'Corporate Galas & Dinners',
    desc: 'Tailored 3-piece peak tuxedos & midnight bandhgalas',
    image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=400&q=80',
  },
  {
    name: 'Festivities',
    label: 'Diwali & Navratri',
    desc: 'Authentic Banarasi silks & mirror embellishments',
    image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=400&q=80',
  },
];

export const OccasionSelector: React.FC<OccasionSelectorProps> = ({
  selectedOccasion,
  onSelectOccasion,
}) => {
  return (
    <div className="py-12 bg-white border-b border-[#E8E1D5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="text-xs uppercase font-bold text-[#8C6D46] tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Curated by Event</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 mt-1">
              Browse Outfits by Occasion
            </h2>
          </div>

          <button
            onClick={() => onSelectOccasion('All')}
            className={`text-xs font-semibold px-3 py-1.5 rounded-full border transition-all ${
              selectedOccasion === 'All'
                ? 'bg-[#6B1D2F] text-white border-[#6B1D2F]'
                : 'bg-stone-100 text-stone-700 border-stone-200 hover:bg-stone-200'
            }`}
          >
            Show All Occasions
          </button>
        </div>

        {/* Occasions Horizontal Scroll / Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
          {OCCASIONS.map((occ) => {
            const isSelected = selectedOccasion === occ.name;
            return (
              <button
                key={occ.name}
                type="button"
                onClick={() => onSelectOccasion(isSelected ? 'All' : occ.name)}
                className={`group text-left rounded-2xl overflow-hidden border transition-all flex flex-col cursor-pointer ${
                  isSelected
                    ? 'border-[#6B1D2F] ring-2 ring-[#6B1D2F] shadow-md scale-102'
                    : 'border-stone-200 hover:border-stone-300 hover:shadow-sm'
                }`}
              >
                <div className="aspect-square w-full overflow-hidden bg-stone-100 relative">
                  <img
                    src={occ.image}
                    alt={occ.label}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                  <span className="absolute bottom-2 inset-x-2 text-white font-serif font-bold text-xs leading-tight line-clamp-1">
                    {occ.label}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

      </div>
    </div>
  );
};
