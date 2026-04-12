'use client'
import React, { useState } from 'react'
import Timeslots from './Timeslots';

interface BookingItem {
  id: string;
  time: string;
  date: Date | string;
}

// Updated to include the list of providers from the DB
interface Props {
  groupId: string;
  clientName: string;
  contact: string;
  providerId: string; // Changed from 'provider' string to 'providerId'
  serviceId: string;
  sestionDuration:number;
  status: string;
  totalPrice: number;
  items: BookingItem[];
  availableProviders: { id: string, firstName: string, lastName: string }[];
}

function BookingForm({ 
  groupId, 
  clientName, 
  contact, 
  providerId, 
  serviceId, 
  status, 
  totalPrice, 
  items,
  sestionDuration,
  availableProviders 
}: Props) {
  
  const [formState, setFormState] = useState({
    providerId, // Track the ID for the database update
    status,
    date: new Date(items[0].date).toISOString().split('T')[0],
    slots: items.sort((a, b) => a.time.localeCompare(b.time))
  })

  return (
    <form className="space-y-6 p-6 border rounded-xl bg-white shadow-sm">
      {/* ... Header stays the same ... */}
      <div className="grid grid-cols-2 gap-4 border-b pb-4">
        <div>
          <label className="block text-xs font-bold text-gray-400 uppercase">Client</label>
          <p className="font-semibold text-lg">{clientName}</p>
        </div>
        <div>
          <label className="block text-xs font-bold text-gray-400 uppercase">Contact</label>
          <p className="font-semibold">{contact}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-bold mb-1">Provider</label>
          {/* CHANGED: Input replaced with Selector */}
          <select 
            value={formState.providerId}
            onChange={(e) => setFormState({...formState, providerId: e.target.value})}
            className="border p-2 w-full rounded bg-white"
          >
            {availableProviders.map((p) => (
              <option key={p.id} value={p.id}>
                {p.firstName} {p.lastName}
              </option>
            ))}
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-bold mb-1">Status</label>
          <select 
            value={formState.status}
            onChange={(e) => setFormState({...formState, status: e.target.value})}
            className="border p-2 w-full rounded"
          >
            <option value="PENDING">Pending</option>
            <option value="CONFIRMED">Confirmed</option>
            <option value="CANCELLED">Cancelled</option>
          </select>
        </div>
      </div>

      {/* ... Rest of the form (Slots and Price) stays the same ... */}
      <div className="space-y-4">
        <label className="block text-sm font-bold">Reschedule Slots</label>
        <div className="bg-gray-50 p-4 rounded-lg">
          <input 
            type="date" 
            value={formState.date} 
            onChange={(e) => setFormState({...formState, date: e.target.value})}
            className="mb-4 p-2 border rounded w-full"
          />
          
          <div className="w-full">
          <Timeslots 
            slots={formState.slots} 
            providerId={formState.providerId} // Reactive: re-fetches if provider changes
            serviceId={serviceId}             // From Props
            sessionDuration={sestionDuration}
            date={formState.date}             // Reactive: re-fetches if date changes
            daystart="08:00"                  // Hardcoded or from OperatingHours prop
            dayend="17:00"                    // Hardcoded or from OperatingHours prop
            onChange={(newSlots) => setFormState({ ...formState, slots: newSlots })} 
          />

          </div>
        </div>
      </div>

      <div className="flex justify-between items-center p-4 bg-blue-50 rounded-lg">
        <div>
          <p className="text-xs text-blue-600 font-bold uppercase">Total Order</p>
          <p className="text-xl font-bold text-blue-900">R{totalPrice}</p>
        </div>
        <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-blue-700 transition">
          Update Group
        </button>
      </div>
    </form>
  )
}

export default BookingForm;
