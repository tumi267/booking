'use client'
import React, { useState } from 'react'

const stats = [
  { label: "Today's Bookings", value: '14', change: '+12%', status: 'positive' },
  { label: 'Pending Confirmations', value: '3', change: 'Action Required', status: 'warning' },
  { label: 'Active Providers', value: '8/10', change: 'Live', status: 'neutral' },
  { label: 'Daily Revenue', value: 'R9,450', change: '+5%', status: 'positive' },
]

export default function OperationsDashboard() {
  // Business hours state
  const [openingTime, setOpeningTime] = useState('08:00')
  const [closingTime, setClosingTime] = useState('18:00')
  
  // Blocked days state (dates in YYYY-MM-DD format)
  const [blockedDays, setBlockedDays] = useState<string[]>(['2026-03-21', '2026-03-25'])

  // Add/remove blocked day
  const toggleBlockedDay = (date: string) => {
    setBlockedDays((prev) =>
      prev.includes(date)
        ? prev.filter((d) => d !== date)
        : [...prev, date]
    )
  }

  // Simple calendar for current month
  const today = new Date()
  const year = today.getFullYear()
  const month = today.getMonth() // 0-indexed
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const dates = Array.from({ length: daysInMonth }, (_, i) => i + 1)
  const monthString = (month + 1).toString().padStart(2, '0')

  return (
    <div className="space-y-6 p-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <div key={i} className="p-4 bg-white border rounded-xl shadow-sm">
            <p className="text-sm text-gray-500">{stat.label}</p>
            <p className="text-2xl font-bold">{stat.value}</p>
            <p
              className={`text-xs mt-1 ${
                stat.status === 'positive'
                  ? 'text-green-600'
                  : stat.status === 'warning'
                  ? 'text-amber-600 font-bold'
                  : 'text-gray-400'
              }`}
            >
              {stat.change}
            </p>
          </div>
        ))}
      </div>

      {/* Operations Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Business Hours */}
        <div className="bg-white border rounded-xl p-4">
          <h3 className="font-bold mb-4">Business Hours</h3>
          <div className="flex gap-4 items-center">
            <label className="text-sm">Open:</label>
            <input
              type="time"
              value={openingTime}
              onChange={(e) => setOpeningTime(e.target.value)}
              className="border px-2 py-1 rounded"
            />
            <label className="text-sm">Close:</label>
            <input
              type="time"
              value={closingTime}
              onChange={(e) => setClosingTime(e.target.value)}
              className="border px-2 py-1 rounded"
            />
          </div>
        </div>

        {/* Blocked Days / Calendar */}
        <div className="bg-white border rounded-xl p-4">
          <h3 className="font-bold mb-4">Blocked Days (Holidays / Off Days)</h3>
          <div className="grid grid-cols-7 gap-1 text-center text-sm">
            {dates.map((d) => {
              const dateString = `${year}-${monthString}-${d.toString().padStart(2, '0')}`
              const isBlocked = blockedDays.includes(dateString)
              return (
                <div
                  key={d}
                  className={`p-2 border rounded cursor-pointer ${
                    isBlocked ? 'bg-red-500 text-white' : 'bg-gray-100'
                  }`}
                  onClick={() => toggleBlockedDay(dateString)}
                  title={dateString}
                >
                  {d}
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}