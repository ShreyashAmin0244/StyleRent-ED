import React from 'react';
import { Sparkles, MapPin, ShieldCheck, Heart, Database, Phone, Mail } from 'lucide-react';
import { CITIES } from './Navbar';

interface FooterProps {
  onNavClick: (tab: any) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavClick }) => {
  return (
    <footer className="bg-[#1F1D1D] text-stone-300 pt-16 pb-12 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          
          {/* Brand Col (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#6B1D2F] to-[#450A18] flex items-center justify-center text-[#E6CA85] border border-[#E6CA85]/30">
                <span className="font-serif text-xl font-bold">SR</span>
              </div>
              <div>
                <span className="font-serif text-xl font-bold text-white tracking-wide">
                  Style-Rent
                </span>
                <p className="text-[10px] uppercase font-semibold text-[#E6CA85] tracking-widest">
                  Designer Rental Couture
                </p>
              </div>
            </div>

            <p className="text-xs text-stone-400 leading-relaxed max-w-sm">
              Style-Rent empowers wedding guests, bridesmaids, grooms, and fest attendees across India to wear designer lehengas, sherwanis, and gowns at a fraction of retail prices, supported by hospital-grade UV sanitization and reusable zero-waste return logistics.
            </p>

            <div className="flex flex-wrap gap-2 text-[11px] text-[#E6CA85]">
              <span className="bg-stone-800/80 px-2.5 py-1 rounded-md border border-stone-700 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>100% Medical Grade Disinfected</span>
              </span>
              <span className="bg-stone-800/80 px-2.5 py-1 rounded-md border border-stone-700">
                Reusable Zip Bag
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="font-serif font-bold text-white text-sm">Navigation</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => onNavClick('home')} className="hover:text-white transition-colors">
                  Home
                </button>
              </li>
              <li>
                <button onClick={() => onNavClick('shop')} className="hover:text-white transition-colors">
                  Browse Shop & Filters
                </button>
              </li>
              <li>
                <button onClick={() => onNavClick('how-it-works')} className="hover:text-white transition-colors">
                  How Rental Works
                </button>
              </li>
              <li>
                <button onClick={() => onNavClick('hygiene')} className="hover:text-white transition-colors">
                  Hygiene & Sanitization
                </button>
              </li>
              <li>
                <button onClick={() => onNavClick('orders')} className="hover:text-white transition-colors">
                  Track Bookings & Returns
                </button>
              </li>
            </ul>
          </div>

          {/* Project & Staff Tools */}
          <div className="space-y-3">
            <h4 className="font-serif font-bold text-white text-sm">Project & Admin</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button 
                  onClick={() => onNavClick('database')} 
                  className="text-[#E6CA85] hover:underline flex items-center gap-1 font-semibold"
                >
                  <Database className="w-3.5 h-3.5" />
                  <span>Relational Database & SQL</span>
                </button>
              </li>
              <li>
                <button onClick={() => onNavClick('admin')} className="hover:text-white transition-colors">
                  Staff Inventory & QC Hub
                </button>
              </li>
              <li>
                <span className="text-stone-400">Smart Operational Buffer (2-3d)</span>
              </li>
              <li>
                <span className="text-stone-400">At-Home Tailor Measurements</span>
              </li>
              <li>
                <span className="text-stone-400">Peace of Mind Protection (₹299)</span>
              </li>
            </ul>
          </div>

          {/* Metro Hubs */}
          <div className="space-y-3">
            <h4 className="font-serif font-bold text-white text-sm flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-[#E6CA85]" />
              <span>Fulfilment Hubs</span>
            </h4>
            <div className="grid grid-cols-2 gap-1 text-xs text-stone-400">
              {CITIES.map((c) => (
                <span key={c} className="hover:text-stone-200">{c}</span>
              ))}
            </div>
            <div className="pt-2 text-[11px] text-stone-400">
              Same-day courier dispatch in Mumbai, Bengaluru & Delhi NCR.
            </div>
          </div>

        </div>

        {/* College Project Disclaimer Box (Prompt Requirement) */}
        <div className="bg-stone-900/90 rounded-2xl border border-stone-800 p-5 text-xs text-stone-400 space-y-2">
          <div className="flex items-center gap-2 font-bold text-white">
            <Sparkles className="w-4 h-4 text-[#E6CA85]" />
            <span>Academic Project Specification & Evaluation Disclaimer</span>
          </div>
          <p className="leading-relaxed text-[11px]">
            <strong>Style-Rent</strong> is developed as a modern college web development & relational database design project. 
            All payment methods (UPI, Cards), identity verification (Aadhaar, PAN), and delivery logistics tracking are implemented as realistic mock simulations for demonstration and classroom grading without third-party API dependencies or real financial transactions.
          </p>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-stone-800 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-400 gap-3">
          <div>
            © 2026 Style-Rent. Crafted with care for Indian weddings & college celebrations.
          </div>
          <div className="flex items-center gap-1 text-stone-400">
            Built with React, TypeScript & Tailwind CSS
          </div>
        </div>

      </div>
    </footer>
  );
};
