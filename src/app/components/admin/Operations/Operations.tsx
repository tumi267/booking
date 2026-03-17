'use client'
import React from 'react'

const stats = [
  { label: 'Today\'s Bookings', value: '14', change: '+12%', status: 'positive' },
  { label: 'Pending Confirmations', value: '3', change: 'Action Required', status: 'warning' },
  { label: 'Active Providers', value: '8/10', change: 'Live', status: 'neutral' },
  { label: 'Daily Revenue', value: 'R9,450', change: '+5%', status: 'positive' },
]

export default function OperationsDashboard() {
  return (
    <div className="space-y-6 p-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <div key={i} className="p-4 bg-white border rounded-xl shadow-sm">
            <p className="text-sm text-gray-500">{stat.label}</p>
            <p className="text-2xl font-bold">{stat.value}</p>
            <p className={`text-xs mt-1 ${
              stat.status === 'positive' ? 'text-green-600' : 
              stat.status === 'warning' ? 'text-amber-600 font-bold' : 'text-gray-400'
            }`}>
              {stat.change}
            </p>
          </div>
        ))}
      </div>

      {/* Real-time Logistics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white border rounded-xl p-4">
          <h3 className="font-bold mb-4">Upcoming Schedule (Next 4 Hours)</h3>
          {/* List of bookings with "Check-in" buttons */}
          <div className="text-sm text-gray-500 italic">Live feed of today's appointments...</div>
        </div>
        
        <div className="bg-white border rounded-xl p-4">
          <h3 className="font-bold mb-4">System Alerts</h3>
          <ul className="space-y-3">
            <li className="flex items-center text-sm bg-amber-50 p-2 rounded text-amber-800">
              <span className="mr-2">⚠️</span> Provider "Sarah" is overbooked for Tuesday.
            </li>
            <li className="flex items-center text-sm bg-blue-50 p-2 rounded text-blue-800">
              <span className="mr-2">ℹ️</span> 2 New Customer registrations this hour.
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}