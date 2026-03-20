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
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [showEditor, setShowEditor] = useState(false)

  const selectedService = services.find((s) => s.id === selectedId)

  const updateService = (id: string, key: keyof typeof selectedService, value: any) => {
    setServices((prev) =>
      prev.map((s) => (s.id === id ? { ...s, [key]: value } : s))
    )
  }

  const removeService = (id: string) => {
    setServices((prev) => prev.filter((s) => s.id !== id))
    setSelectedId(null)
    setShowEditor(false)
  }

  return (
    <div className="p-6 bg-white rounded-xl shadow-sm border">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-bold">Services & Pricing</h2>
          <p className="text-sm text-gray-500">Manage your offerings and default rates.</p>
        </div>
        <button
          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
          onClick={() => {
            const newService = {
              id: crypto.randomUUID(),
              name: 'New Service',
              price: 0,
              duration: 30,
              isActive: true,
            }
            setServices((prev) => [...prev, newService])
            setSelectedId(newService.id)
            setShowEditor(true)
          }}
        >
          + New Service
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {services.map((service) => (
          <div
            key={service.id}
            className={`p-4 border rounded-lg ${!service.isActive ? 'opacity-60 bg-gray-50' : ''}`}
          >
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-bold text-lg">{service.name}</h3>
              <span
                className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                  service.isActive ? 'bg-green-100 text-green-700' : 'bg-gray-200'
                }`}
              >
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
              <button
                className="flex-1 text-sm border py-2 rounded hover:bg-gray-50"
                onClick={() => {
                  setSelectedId(service.id)
                  setShowEditor(true)
                }}
              >
                Edit
              </button>
              <button
                className="flex-1 text-sm bg-red-600 text-white py-2 rounded hover:bg-red-700"
                onClick={() => removeService(service.id)}
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Editor Modal */}
      {showEditor && selectedService && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative">
            <h3 className="text-lg font-bold mb-4">Edit Service</h3>

            <label className="block text-sm font-medium">Name</label>
            <input
              className="w-full border px-2 py-1 rounded mb-2"
              value={selectedService.name}
              onChange={(e) => updateService(selectedService.id, 'name', e.target.value)}
            />

            <label className="block text-sm font-medium">Price</label>
            <input
              type="number"
              className="w-full border px-2 py-1 rounded mb-2"
              value={selectedService.price}
              onChange={(e) => updateService(selectedService.id, 'price', parseInt(e.target.value))}
            />

            <label className="block text-sm font-medium">Duration (mins)</label>
            <input
              type="number"
              className="w-full border px-2 py-1 rounded mb-2"
              value={selectedService.duration}
              onChange={(e) => updateService(selectedService.id, 'duration', parseInt(e.target.value))}
            />

            <label className="block text-sm font-medium">Status</label>
            <select
              className="w-full border px-2 py-1 rounded mb-4"
              value={selectedService.isActive ? 'Active' : 'Inactive'}
              onChange={(e) =>
                updateService(selectedService.id, 'isActive', e.target.value === 'Active')
              }
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>

            <div className="flex justify-end space-x-2">
              <button
                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                onClick={() => setShowEditor(false)}
              >
                Close
              </button>
              <button
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                onClick={() => removeService(selectedService.id)}
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}