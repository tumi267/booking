'use client'
import React, { useState } from 'react'

// Dummy Data matching your Service model
const initialServices = [
  { id: 's1', name: 'Personal Training', price: 650, duration: 60, isActive: true },
  { id: 's2', name: 'Nutritional Plan', price: 450, duration: 30, isActive: true },
  { id: 's3', name: 'Massage Therapy', price: 800, duration: 90, isActive: false },
]

export default function ServiceManagement() {
  const [services, setServices] = useState(initialServices)

  return (
    <div className="p-6 bg-white rounded-xl shadow-sm border">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-bold">Services & Pricing</h2>
          <p className="text-sm text-gray-500">Manage your offerings and default rates.</p>
        </div>
        <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition">
          + New Service
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {services.map((service) => (
          <div key={service.id} className={`p-4 border rounded-lg ${!service.isActive && 'opacity-60 bg-gray-50'}`}>
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-bold text-lg">{service.name}</h3>
              <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${service.isActive ? 'bg-green-100 text-green-700' : 'bg-gray-200'}`}>
                {service.isActive ? 'ACTIVE' : 'ARCHIVED'}
              </span>
            </div>
            
            <div className="space-y-1 mb-4">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Rate:</span>
                <span className="font-semibold text-blue-600">R{service.price}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Duration:</span>
                <span className="font-semibold">{service.duration} mins</span>
              </div>
            </div>

            <div className="flex gap-2">
              <button className="flex-1 text-sm border py-2 rounded hover:bg-gray-50">Edit</button>
              <button className="flex-1 text-sm bg-gray-900 text-white py-2 rounded hover:bg-black">Assign Team</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}