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
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [showEditor, setShowEditor] = useState(false)

  const selectedMember = team.find((m) => m.id === selectedId)

  const updateMember = (id: string, key: keyof typeof selectedMember, value: any) => {
    setTeam((prev) =>
      prev.map((m) => (m.id === id ? { ...m, [key]: value } : m))
    )
  }

  const removeMember = (id: string) => {
    setTeam((prev) => prev.filter((m) => m.id !== id))
    setSelectedId(null)
    setShowEditor(false)
  }

  return (
    <div className="p-6 bg-white rounded-xl shadow-sm border">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">Team Members</h2>
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          onClick={() => {
            const newMember = {
              id: crypto.randomUUID(),
              name: 'New Member',
              email: '',
              role: 'TRAINER',
              isAvailable: true,
            }
            setTeam((prev) => [...prev, newMember])
            setSelectedId(newMember.id)
            setShowEditor(true)
          }}
        >
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
                <span
                  className={`inline-block w-2 h-2 rounded-full mr-2 ${
                    member.isAvailable ? 'bg-green-500' : 'bg-red-500'
                  }`}
                />
                <span className="text-sm">{member.isAvailable ? 'Active' : 'On Leave'}</span>
              </td>
              <td className="py-4 text-right space-x-2">
                <button
                  className="text-blue-600 text-sm font-medium hover:underline"
                  onClick={() => {
                    setSelectedId(member.id)
                    setShowEditor(true)
                  }}
                >
                  Edit
                </button>
                <button
                  className="text-red-600 text-sm font-medium hover:underline"
                  onClick={() => removeMember(member.id)}
                >
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Editor Modal */}
      {showEditor && selectedMember && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative">
            <h3 className="text-lg font-bold mb-4">Edit Member</h3>

            <label className="block text-sm font-medium">Name</label>
            <input
              className="w-full border px-2 py-1 rounded mb-2"
              value={selectedMember.name}
              onChange={(e) => updateMember(selectedMember.id, 'name', e.target.value)}
            />

            <label className="block text-sm font-medium">Email</label>
            <input
              className="w-full border px-2 py-1 rounded mb-2"
              value={selectedMember.email}
              onChange={(e) => updateMember(selectedMember.id, 'email', e.target.value)}
            />

            <label className="block text-sm font-medium">Role</label>
            <select
              className="w-full border px-2 py-1 rounded mb-2"
              value={selectedMember.role}
              onChange={(e) => updateMember(selectedMember.id, 'role', e.target.value)}
            >
              <option value="TRAINER">Trainer</option>
              <option value="PHYSIOTHERAPIST">Physiotherapist</option>
              <option value="ADMIN">Admin</option>
            </select>

            <label className="block text-sm font-medium">Status</label>
            <select
              className="w-full border px-2 py-1 rounded mb-4"
              value={selectedMember.isAvailable ? 'Active' : 'On Leave'}
              onChange={(e) => updateMember(selectedMember.id, 'isAvailable', e.target.value === 'Active')}
            >
              <option value="Active">Active</option>
              <option value="On Leave">On Leave</option>
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
                onClick={() => removeMember(selectedMember.id)}
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
