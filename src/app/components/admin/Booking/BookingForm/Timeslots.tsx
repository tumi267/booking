'use client'
import { generateTimeSlots } from '@/app/libs/Time/time';
import React, { useEffect, useState } from 'react'


interface BookingItem {
  id: string;
  time: string;
  date: Date | string;
}

interface TimeslotsProps {
  slots: BookingItem[];
  providerId: string;
  serviceId: string;
  sessionDuration: number;
  date: Date | string;
  daystart: string;
  dayend: string;
  onChange: (newSlots: BookingItem[]) => void;
}

function Timeslots({ slots, providerId, serviceId, sessionDuration, date, daystart, dayend, onChange }: TimeslotsProps) {
  const [allPossibleSlots, setAllPossibleSlots] = useState<string[]>([]);
  const [busySlots, setBusySlots] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  // ✅ Use the library function
  useEffect(() => {
    const generated = generateTimeSlots(daystart, dayend, sessionDuration);
    setAllPossibleSlots(generated);
  }, [daystart, dayend, sessionDuration]);

  // Fetch Busy Slots
  useEffect(() => {
    async function fetchBusy() {
      setLoading(true);
      const res = await fetch(`/api/availability?providerId=${providerId}&date=${date}`);
      const data = await res.json();
      setBusySlots(data.busyTimes || []);
      setLoading(false);
    }
    if (providerId && date) fetchBusy();
  }, [providerId, date]);

  const handleTimeClick = (clickedTime: string) => {
    const currentTimes = slots.map(s => s.time);

    // If 0 or >1 selected, start new selection
    if (currentTimes.length !== 1) {
      onChange([{ ...slots[0], time: clickedTime }]);
      return;
    }

    // Handle range selection
    const startIndex = allPossibleSlots.indexOf(currentTimes[0]);
    const endIndex = allPossibleSlots.indexOf(clickedTime);
    const [from, to] = startIndex < endIndex ? [startIndex, endIndex] : [endIndex, startIndex];
    const range = allPossibleSlots.slice(from, to + 1);

    // Map new range to existing slot IDs
    const updatedSlots = range.map((time, i) => {
      if (slots[i]) return { ...slots[i], time };
      return { id: `new-${i}`, time, date }; 
    });

    onChange(updatedSlots);
  };

  return (
    <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
      {allPossibleSlots.map((time) => {
        const isSelected = slots.some(s => s.time === time);
        const isBusy = busySlots.includes(time) && !isSelected;

        return (
          <button
            key={time}
            type="button"
            disabled={isBusy}
            onClick={() => handleTimeClick(time)}
            className={`p-2 text-xs font-bold rounded-lg border transition-all
              ${isSelected ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-700 hover:border-blue-300'}
              ${isBusy ? 'opacity-20 cursor-not-allowed bg-gray-100' : ''}
            `}
          >
            {time}
          </button>
        );
      })}
    </div>
  );
}

export default Timeslots;
