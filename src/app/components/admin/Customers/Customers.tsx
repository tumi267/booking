'use client'
import React, { useState } from 'react'

// Dummy Data mimicking a Prisma join: 
// prisma.user.findMany({ where: { role: 'CLIENT' }, include: { _count: { select: { bookings: true } } } })
const initialCustomers = [
  { id: 'c1', name: 'Alice Walker', email: 'alice@example.com', phone: '082-111-2222', totalBookings: 5, status: 'Active' },
  { id: 'c2', name: 'Bob Roberts', email: 'bob@gmail.com', phone: '071-333-4444', totalBookings: 12, status: 'VIP' },
  { id: 'c3', name: 'Charlie Day', email: 'charlie@outlook.com', phone: '060-555-6666', totalBookings: 0, status: 'New' },
]

export default function CustomerList() {
  const [customers] = useState(initialCustomers)

  return (
    <div className="p-6 bg-white rounded-xl shadow-sm border">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">Customers</h2>
        <div className="flex gap-2">
           <input type="text" placeholder="Search by name or email..." className="border p-2 rounded-lg text-sm w-64" />
        </div>
      </div>

      <table className="w-full text-left">
        <thead>
          <tr className="border-b text-gray-400 text-xs uppercase tracking-wider">
            <th className="pb-3 font-semibold">Customer</th>
            <th className="pb-3 font-semibold">Contact</th>
            <th className="pb-3 font-semibold">Bookings</th>
            <th className="pb-3 font-semibold">Status</th>
            <th className="pb-3 font-semibold text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y">
          {customers.map((c) => (
            <tr key={c.id} className="hover:bg-gray-50 transition">
              <td className="py-4">
                <div className="font-medium text-gray-900">{c.name}</div>
                <div className="text-xs text-gray-500">ID: {c.id}</div>
              </td>
              <td className="py-4 text-sm">
                <div>{c.email}</div>
                <div className="text-gray-400 text-xs">{c.phone}</div>
              </td>
              <td className="py-4">
                <span className="bg-blue-50 text-blue-700 px-2 py-1 rounded text-xs font-bold">
                  {c.totalBookings} Slots
                </span>
              </td>
              <td className="py-4 text-sm">
                <span className={`px-2 py-1 rounded-full text-[10px] font-bold ${
                  c.status === 'VIP' ? 'bg-purple-100 text-purple-700' : 'bg-gray-100 text-gray-600'
                }`}>
                  {c.status}
                </span>
              </td>
              <td className="py-4 text-right">
                <button className="text-blue-600 hover:text-blue-800 text-sm font-semibold">View History</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}