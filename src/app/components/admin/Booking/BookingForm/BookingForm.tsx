'use client'
import React, { useState, useEffect } from 'react'

// Updated Interface to match Schema IDs
interface Props {
  id: string
  clientName: string      // From User.firstName + lastName
  contact: string         // From User.phone
  providerId: string      // FK to Provider
  serviceId: string       // FK to Service
  startTime: string       // ISO string from DateTime
  duration: number
  status: string          // Enum: PENDING, CONFIRMED, etc.
  price: number
}

function BookingForm({ id, clientName, contact, providerId, serviceId, startTime, duration, status, price }: Props) {
  
  // Dummy Data (In a real app, these come from your DB via props or fetch)
  const providers = [
    { id: 'p1', name: 'John Trainer' },
    { id: 'p2', name: 'Sarah Specialist' }
  ]
  const services = [
    { id: 's1', name: 'Personal Training', price: 650 },
    { id: 's2', name: 'Nutritional Consultation', price: 450 }
  ]

  const [selectedOptions, setSelectedOptions] = useState({
    id,
    providerId,
    serviceId,
    date: new Date(startTime).toISOString().split('T')[0],
    time: new Date(startTime).toTimeString().slice(0, 5),
    duration,
    status,
    currentPrice: price
  })

  // Update price automatically when service changes
  const handleServiceChange = (id: string) => {
    const service = services.find(s => s.id === id)
    setSelectedOptions(prev => ({ 
      ...prev, 
      serviceId: id, 
      currentPrice: service ? service.price : prev.currentPrice 
    }))
  }

  return (
    <form className="space-y-4 p-4 border rounded-lg">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-bold">Client</label>
          <input type="text" value={clientName} readOnly className="bg-gray-100 p-2 w-full" />
        </div>
        <div>
          <label className="block text-sm font-bold">Contact</label>
          <input type="text" value={contact} readOnly className="bg-gray-100 p-2 w-full" />
        </div>
      </div>

      <div>
        <label className="block text-sm font-bold">Provider</label>
        <select 
          value={selectedOptions.providerId}
          onChange={(e) => setSelectedOptions({...selectedOptions, providerId: e.target.value})}
          className="border p-2 w-full"
        >
          {providers.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
        </select>
      </div>

      <div className="flex gap-4">
        <div className="flex-1">
          <label className="block text-sm font-bold">Date</label>
          <input 
            type="date" 
            value={selectedOptions.date} 
            onChange={(e) => setSelectedOptions({...selectedOptions, date: e.target.value})}
            className="border p-2 w-full"
          />
        </div>
        <div className="flex-1">
          <label className="block text-sm font-bold">Time</label>
          <input 
            type="time" 
            value={selectedOptions.time} 
            onChange={(e) => setSelectedOptions({...selectedOptions, time: e.target.value})}
            className="border p-2 w-full"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-bold">Service</label>
        <select 
          value={selectedOptions.serviceId}
          onChange={(e) => handleServiceChange(e.target.value)}
          className="border p-2 w-full"
        >
          {services.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
        </select>
      </div>

      <div className="p-3 bg-blue-50 rounded">
        <p className="text-sm font-bold text-blue-800">
          Estimated Price: R{selectedOptions.currentPrice}
        </p>
      </div>

      <div>
        <label className="block text-sm font-bold">Status</label>
        <select 
          value={selectedOptions.status}
          onChange={(e) => setSelectedOptions({...selectedOptions, status: e.target.value})}
          className="border p-2 w-full"
        >
          <option value="PENDING">Pending</option>
          <option value="CONFIRMED">Confirmed</option>
          <option value="CANCELLED">Cancelled</option>
        </select>
      </div>

      <button type="submit" className="bg-black text-white px-4 py-2 rounded">
        Update Booking
      </button>
    </form>
  )
}

export default BookingForm