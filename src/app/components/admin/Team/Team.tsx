'use client'
import React, { useState } from 'react'

// Dummy Team Data (Mocking the Prisma Join)
const initialTeam = [
  { 
    id: 'u1', 
    name: 'John Doe', 
    email: 'john@fit.com', 
    role: 'TRAINER', 
    isAvailable: true 
  },
  { 
    id: 'u2', 
    name: 'Sarah Smith', 
    email: 'sarah@fit.com', 
    role: 'PHYSIOTHERAPIST', 
    isAvailable: false 
  },
]

export default function TeamManagement() {
  const [team, setTeam] = useState(initialTeam)

  return (
    <div className="p-6 bg-white rounded-xl shadow-sm border">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">Team Members</h2>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
          + Add Staff
        </button>
      </div>

      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b text-gray-500 text-sm">
            <th className="pb-3 font-medium">Name</th>
            <th className="pb-3 font-medium">Role</th>
            <th className="pb-3 font-medium">Status</th>
            <th className="pb-3 font-medium text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y">
          {team.map((member) => (
            <tr key={member.id} className="hover:bg-gray-50 transition">
              <td className="py-4">
                <div className="font-semibold">{member.name}</div>
                <div className="text-xs text-gray-400">{member.email}</div>
              </td>
              <td className="py-4 text-sm">
                <span className="bg-gray-100 px-2 py-1 rounded capitalize">
                  {member.role.toLowerCase()}
                </span>
              </td>
              <td className="py-4">
                <span className={`inline-block w-2 h-2 rounded-full mr-2 ${member.isAvailable ? 'bg-green-500' : 'bg-red-500'}`} />
                <span className="text-sm">{member.isAvailable ? 'Active' : 'On Leave'}</span>
              </td>
              <td className="py-4 text-right">
                <button className="text-blue-600 text-sm font-medium hover:underline">Edit Profile</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

