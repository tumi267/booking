'use client'

import Loading from '../../Loading/Loading'
import Link from 'next/link';
import { useAdminCustomer } from '@/app/hooks/useAdminCustomer';
export default function CustomerList() {
const {isloading,customers}=useAdminCustomer()
if(isloading)return<Loading/>
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
            <th className="pb-3 font-semibold text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y">
          {customers.map((c) => (
            <tr key={c.id} className="hover:bg-gray-50 transition">
              <td className="py-4">
                <div className="font-medium text-gray-900"><span>{c.firstName.charAt(0).toUpperCase() + c.firstName.slice(1)}</span>{" "}<span>{c.lastName.charAt(0).toUpperCase() + c.lastName.slice(1)}</span></div>
                <div className="text-xs text-gray-500">ID: {c.id}</div>
              </td>
              <td className="py-4 text-sm">
                <div>{c.email}</div>
                <div className="text-gray-400 text-xs">
                <span>{c.phone}</span>
                <br/>
                <span>{c.email}</span></div>
              </td>
              <td className="py-4">
                <span className="bg-blue-50 text-blue-700 px-2 py-1 rounded text-xs font-bold">
                  {c.sessionCount} Booking
                </span>
              </td>
              <td className="py-4 text-right">
                <button className="text-blue-600 hover:text-blue-800 text-sm font-semibold">
                  <Link href={`/admin/customer/${c.id}`}>View History</Link>
                  </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}