import React, { useState } from 'react';
import { 
  Calendar as CalendarIcon, 
  Clock, 
  Info, 
  CheckCircle2, 
  AlertCircle, 
  ShieldAlert, 
  ChevronLeft, 
  ChevronRight,
  Sparkles
} from 'lucide-react';
import { BookingInterval, RentalDuration } from '../types';
import { 
  addDays, 
  calculateRentalDates, 
  formatDate, 
  getDurationDays, 
  isDateUnavailable,
  checkIntervalAvailability 
} from '../utils/rentalCalculations';

interface RentalDatePickerProps {
  duration: RentalDuration;
  setDuration: (dur: RentalDuration) => void;
  startDate: string; // YYYY-MM-DD
  setStartDate: (date: string) => void;
  existingBookings: BookingInterval[];
}

export const RentalDatePicker: React.FC<RentalDatePickerProps> = ({
  duration,
  setDuration,
  startDate,
  setStartDate,
  existingBookings,
}) => {
  // Calendar month state (defaults to Oct 2026 or current selected month)
  const [currentYear, setCurrentYear] = useState<number>(2026);
  const [currentMonth, setCurrentMonth] = useState<number>(9); // 0-indexed: 9 is October, 10 is November

  const {
    endDate,
    deliveryDate,
    returnPickupDate,
    bufferStart,
    bufferEnd
  } = calculateRentalDates(startDate, duration);

  const durationDays = getDurationDays(duration);
  const availabilityCheck = checkIntervalAvailability(startDate, endDate, existingBookings);

  // Month navigation
  const prevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const nextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  // Generate days for calendar month grid
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayOfWeek = new Date(currentYear, currentMonth, 1).getDay(); // 0 is Sunday
  const monthName = new Date(currentYear, currentMonth, 1).toLocaleString('en-US', { month: 'long', year: 'numeric' });

  return (
    <div className="bg-[#FAF7F2] border border-[#E5DECF] rounded-2xl p-5 space-y-5 shadow-xs">
      
      {/* Header & Duration Tabs */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <label className="text-sm font-bold text-stone-900 flex items-center gap-2">
            <CalendarIcon className="w-4 h-4 text-[#6B1D2F]" />
            <span>Select Rental Duration</span>
          </label>
          <span className="text-xs text-stone-500 font-medium bg-stone-100 px-2.5 py-0.5 rounded-full border border-stone-200">
            {durationDays} Days Event Period
          </span>
        </div>

        <div className="grid grid-cols-3 gap-2">
          {(['3_days', '7_days', '10_days'] as RentalDuration[]).map((dur) => {
            const isSelected = duration === dur;
            const daysLabel = dur === '3_days' ? '3 Days' : dur === '7_days' ? '7 Days' : '10 Days';
            const hint = dur === '3_days' ? 'Weekend / Party' : dur === '7_days' ? 'Wedding Week' : 'Destination Fest';
            return (
              <button
                key={dur}
                type="button"
                onClick={() => setDuration(dur)}
                className={`py-2.5 px-3 rounded-xl text-center border transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-[#6B1D2F] text-white border-[#6B1D2F] shadow-sm ring-2 ring-[#6B1D2F]/20'
                    : 'bg-white text-stone-700 border-stone-200 hover:border-stone-300 hover:bg-stone-50'
                }`}
              >
                <div className="font-bold text-sm">{daysLabel}</div>
                <div className={`text-[10px] mt-0.5 ${isSelected ? 'text-[#E6CA85]' : 'text-stone-400'}`}>
                  {hint}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Calendar Grid Header */}
      <div className="bg-white rounded-xl border border-stone-200 p-3.5 space-y-3">
        <div className="flex items-center justify-between">
          <div className="font-semibold text-stone-800 text-sm flex items-center gap-2">
            <span>{monthName}</span>
            <span className="text-[10px] bg-stone-100 text-stone-600 px-2 py-0.5 rounded-md font-mono">
              Live Availability
            </span>
          </div>
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={prevMonth}
              className="p-1.5 rounded-md hover:bg-stone-100 text-stone-600"
              title="Previous month"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={nextMonth}
              className="p-1.5 rounded-md hover:bg-stone-100 text-stone-600"
              title="Next month"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Days of week header */}
        <div className="grid grid-cols-7 gap-1 text-center text-[11px] font-semibold text-stone-400 uppercase tracking-wider">
          <div>Su</div>
          <div>Mo</div>
          <div>Tu</div>
          <div>We</div>
          <div>Th</div>
          <div>Fr</div>
          <div>Sa</div>
        </div>

        {/* Days cells */}
        <div className="grid grid-cols-7 gap-1 text-center">
          {/* Empty cells before month begins */}
          {Array.from({ length: firstDayOfWeek }).map((_, idx) => (
            <div key={`empty-${idx}`} className="h-9" />
          ))}

          {/* Days in month */}
          {Array.from({ length: daysInMonth }).map((_, idx) => {
            const dayNum = idx + 1;
            const dayFormatted = dayNum < 10 ? `0${dayNum}` : `${dayNum}`;
            const monthFormatted = (currentMonth + 1) < 10 ? `0${currentMonth + 1}` : `${currentMonth + 1}`;
            const dateStr = `${currentYear}-${monthFormatted}-${dayFormatted}`;

            const check = isDateUnavailable(dateStr, existingBookings);
            const isBooked = check.unavailable && check.reason === 'booked';
            const isBuffer = check.unavailable && check.reason === 'buffer';
            
            const isSelectedStart = dateStr === startDate;
            const isWithinSelectedRange = dateStr >= startDate && dateStr <= endDate;
            const isDelivery = dateStr === deliveryDate;
            const isReturn = dateStr === returnPickupDate;

            let cellClass = 'h-9 text-xs rounded-lg flex items-center justify-center font-medium transition-all relative ';
            
            if (isBooked) {
              cellClass += 'bg-red-50 text-red-400 line-through cursor-not-allowed border border-red-200/50';
            } else if (isBuffer) {
              cellClass += 'bg-amber-50 text-amber-700/70 cursor-not-allowed border border-amber-200/60 pattern-diagonal';
            } else if (isSelectedStart) {
              cellClass += 'bg-[#6B1D2F] text-white font-bold shadow-md cursor-pointer scale-105 z-10';
            } else if (isWithinSelectedRange) {
              cellClass += 'bg-[#6B1D2F]/15 text-[#6B1D2F] font-semibold cursor-pointer border-t border-b border-[#6B1D2F]/30';
            } else {
              cellClass += 'hover:bg-stone-100 text-stone-700 cursor-pointer';
            }

            return (
              <button
                key={dateStr}
                type="button"
                disabled={isBooked || isBuffer}
                onClick={() => setStartDate(dateStr)}
                title={
                  isBooked 
                    ? `Booked by another customer (${dateStr})` 
                    : isBuffer 
                      ? `Sanitization & Logistics buffer (${dateStr})` 
                      : `Select ${dateStr}`
                }
                className={cellClass}
              >
                <span>{dayNum}</span>
                {isBooked && (
                  <span className="absolute bottom-0.5 right-0.5 w-1.5 h-1.5 rounded-full bg-red-500" />
                )}
                {isBuffer && (
                  <span className="absolute bottom-0.5 right-0.5 w-1.5 h-1.5 rounded-full bg-amber-500" />
                )}
                {isDelivery && (
                  <span className="absolute -top-1 -left-1 text-[8px] bg-blue-600 text-white rounded-full w-3.5 h-3.5 flex items-center justify-center font-mono">
                    D
                  </span>
                )}
                {isReturn && (
                  <span className="absolute -bottom-1 -right-1 text-[8px] bg-purple-600 text-white rounded-full w-3.5 h-3.5 flex items-center justify-center font-mono">
                    R
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Legend */}
        <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-stone-100 text-[11px] text-stone-500">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-sm bg-emerald-100 border border-emerald-300" />
            <span>Available</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-sm bg-red-100 border border-red-300" />
            <span>Booked (Unavailable)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-sm bg-amber-100 border border-amber-300" />
            <span>Operational Buffer (Prep & QC)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-sm bg-[#6B1D2F]" />
            <span>Selected Rental</span>
          </div>
        </div>
      </div>

      {/* Operational Buffer Explanation Box */}
      <div className="bg-[#F4EFE6] border border-[#DFCBB5] rounded-xl p-3 text-xs text-stone-700 space-y-1.5">
        <div className="font-semibold text-stone-900 flex items-center gap-1.5">
          <ShieldAlert className="w-3.5 h-3.5 text-[#8C6D46]" />
          <span>Smart Operational Buffer in Action (College Project Logic)</span>
        </div>
        <p className="text-stone-600 leading-relaxed text-[11px]">
          To guarantee hospital-grade sanitization and zero delays, Style-Rent automatically locks a 
          <strong className="text-stone-900"> 2-3 day buffer </strong> 
          before your delivery date (for dry cleaning & quality check) and after your return date (for reverse transit & disinfection).
        </p>
      </div>

      {/* Selected Timeline Summary Card */}
      <div className="bg-white rounded-xl border border-stone-200 p-3.5 space-y-2">
        <div className="text-xs font-bold text-stone-800 uppercase tracking-wider">
          Your Rental Schedule
        </div>

        <div className="grid grid-cols-3 gap-2 text-center text-xs">
          {/* Delivery Date */}
          <div className="bg-stone-50 p-2 rounded-lg border border-stone-200">
            <span className="text-[10px] uppercase font-semibold text-blue-700 block">
              1. Delivery Day
            </span>
            <span className="font-bold text-stone-800 block mt-0.5">
              {formatDate(deliveryDate)}
            </span>
            <span className="text-[9px] text-stone-500 block">
              Before 2:00 PM (Try-on)
            </span>
          </div>

          {/* Event Period */}
          <div className="bg-[#6B1D2F]/10 p-2 rounded-lg border border-[#6B1D2F]/20">
            <span className="text-[10px] uppercase font-semibold text-[#6B1D2F] block">
              2. Rental Dates
            </span>
            <span className="font-bold text-[#6B1D2F] block mt-0.5">
              {formatDate(startDate)}
            </span>
            <span className="text-[9px] text-[#6B1D2F]/80 block">
              to {formatDate(endDate)} ({durationDays}d)
            </span>
          </div>

          {/* Return Date */}
          <div className="bg-stone-50 p-2 rounded-lg border border-stone-200">
            <span className="text-[10px] uppercase font-semibold text-purple-700 block">
              3. Return Pickup
            </span>
            <span className="font-bold text-stone-800 block mt-0.5">
              {formatDate(returnPickupDate)}
            </span>
            <span className="text-[9px] text-stone-500 block">
              Reusable bag pickup
            </span>
          </div>
        </div>

        {/* Availability Status Badge */}
        <div className="pt-1 flex items-center justify-between text-xs">
          {availabilityCheck.isAvailable ? (
            <div className="flex items-center gap-1.5 text-emerald-700 font-semibold bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Available for selected dates! Guaranteed dispatch.</span>
            </div>
          ) : (
            <div className="flex items-center gap-1.5 text-red-700 font-semibold bg-red-50 px-2.5 py-1 rounded-md border border-red-200">
              <AlertCircle className="w-3.5 h-3.5" />
              <span>{availabilityCheck.conflictReason}</span>
            </div>
          )}
        </div>
      </div>

    </div>
  );
};
