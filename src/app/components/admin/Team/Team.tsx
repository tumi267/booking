'use client'

import React, { useEffect, useState } from 'react'
import { ProviderRole } from '@prisma/client'
import Loading from '../../Loading/Loading'

// ---------- Types ----------
type Banner = {
  type: 'success' | 'error'
  message: string
}

type TeamMember = {
  id: string | null
  tempId: string
  firstName: string
  lastName: string
  email: string
  role: ProviderRole
  isAvailable: boolean
}

// ---------- Component ----------
export default function TeamManagement() {
  const [team, setTeam] = useState<TeamMember[]>([])
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [showEditor, setShowEditor] = useState(false)
  const [loading, setLoading] = useState(false)
  const [banner, setBanner] = useState<Banner | null>(null)

  const roles = Object.values(ProviderRole) as ProviderRole[]
  const selectedMember = team.find((m) => m.id === selectedId || m.tempId === selectedId)

  // ---------- Load Providers ----------
  useEffect(() => {
    loadProviders()
  }, [])

  const loadProviders = async () => {
    try {
      setLoading(true)
      const res = await fetch('/api/providers')
      const data = await res.json()
      setTeam(data)
      setLoading(false)
    } catch (err) {
      setLoading(false)
      setBanner({ type: 'error', message: 'Failed to load team members.' })
    }
  }

  // ---------- Update local state ----------
  const updateMember = <K extends keyof TeamMember>(id: string, key: K, value: TeamMember[K]) => {
    setTeam((prev) =>
      prev.map((m) => (m.id === id || m.tempId === id ? { ...m, [key]: value } : m))
    )
  }

  // ---------- Remove member ----------
  const removeMember = async (id: string) => {
    const member = team.find((m) => m.id === id || m.tempId === id)
    if (!member) return

    try {
      setLoading(true)
      if (member.id) {
        await fetch(`/api/providers/${member.id}`, { method: 'DELETE' })
      }
      setTeam((prev) => prev.filter((m) => m.id !== member.id && m.tempId !== member.tempId))
      setSelectedId(null)
      setShowEditor(false)
      setBanner({ type: 'success', message: 'Member removed successfully.' })
      setLoading(false)
    } catch {
      setLoading(false)
      setBanner({ type: 'error', message: 'Failed to remove member.' })
    }
  }

  // ---------- Save member ----------
  const saveMember = async (id: string) => {
    const member = team.find((m) => m.id === id || m.tempId === id)
    if (!member) return

    try {
      setLoading(true)
      let savedMember: TeamMember
      if (!member.id) {
        // CREATE new
        const res = await fetch('/api/providers', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            firstName: member.firstName,
            lastName: member.lastName,
            email: member.email || null,
            role: member.role,
            isAvailable: member.isAvailable,
          }),
        })
        savedMember = await res.json()
      } else {
        // UPDATE existing
        const res = await fetch(`/api/providers`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            id:member.id,
            firstName: member.firstName,
            lastName: member.lastName,
            email: member.email || null,
            role: member.role,
            isAvailable: member.isAvailable,
          }),
        })
        savedMember = await res.json()
      }

      setTeam((prev) =>
        prev.map((m) => (m.id === id || m.tempId === id ? savedMember : m))
      )
      setShowEditor(false)
      setSelectedId(null)
      setLoading(false)
      setBanner({ type: 'success', message: 'Member saved successfully.' })
    } catch {
      setLoading(false)
      setBanner({ type: 'error', message: 'Failed to save member.' })
    }
  }

  // ---------- Loading ----------
  if (loading) return <Loading />

  return (
    <div className="p-6 bg-white rounded-xl shadow-sm border">
      {/* Banner */}
      {banner && (
        <div
          className={`mb-4 px-4 py-2 rounded ${
            banner.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
          }`}
        >
          {banner.message}
        </div>
      )}

      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">Team Members</h2>
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          onClick={() => {
            const newMember: TeamMember = {
              tempId: crypto.randomUUID(),
              id: null,
              firstName: 'New',
              lastName: 'Member',
              email: '',
              role: ProviderRole.TRAINER,
              isAvailable: true,
            }
            setTeam((prev) => [...prev, newMember])
            setSelectedId(newMember.tempId)
            setShowEditor(true)
          }}
        >
          + Add Staff
        </button>
      </div>

      {/* Team Table */}
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
            <tr key={member.id || member.tempId} className="hover:bg-gray-50 transition">
              <td className="py-4">
                <div className="font-semibold">{member.firstName} {member.lastName}</div>
                <div className="text-xs text-gray-400">{member.email}</div>
              </td>
              <td className="py-4 text-sm">
                <span className="bg-gray-100 px-2 py-1 rounded capitalize">
                  {member.role.toLowerCase().replaceAll('_', ' ')}
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
                    setSelectedId(member.id || member.tempId)
                    setShowEditor(true)
                  }}
                >
                  Edit
                </button>
                <button
                  className="text-red-600 text-sm font-medium hover:underline"
                  onClick={() => removeMember(member.id || member.tempId)}
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

            <label className="block text-sm font-medium">First Name</label>
            <input
              className="w-full border px-2 py-1 rounded mb-2"
              value={selectedMember.firstName}
              onChange={(e) =>
                updateMember(selectedMember.id || selectedMember.tempId, 'firstName', e.target.value)
              }
            />

            <label className="block text-sm font-medium">Last Name</label>
            <input
              className="w-full border px-2 py-1 rounded mb-2"
              value={selectedMember.lastName}
              onChange={(e) =>
                updateMember(selectedMember.id || selectedMember.tempId, 'lastName', e.target.value)
              }
            />

            <label className="block text-sm font-medium">Email</label>
            <input
              className="w-full border px-2 py-1 rounded mb-2"
              value={selectedMember.email}
              onChange={(e) =>
                updateMember(selectedMember.id || selectedMember.tempId, 'email', e.target.value)
              }
            />

            <label className="block text-sm font-medium">Role</label>
            <select
              className="w-full border px-2 py-1 rounded mb-2"
              value={selectedMember.role}
              onChange={(e) =>
                updateMember(selectedMember.id || selectedMember.tempId, 'role', e.target.value as ProviderRole)
              }
            >
              {roles.map((role) => (
                <option key={role} value={role}>
                  {role.replaceAll('_', ' ')}
                </option>
              ))}
            </select>

            <label className="block text-sm font-medium">Status</label>
            <select
              className="w-full border px-2 py-1 rounded mb-4"
              value={selectedMember.isAvailable ? 'Active' : 'On Leave'}
              onChange={(e) =>
                updateMember(
                  selectedMember.id || selectedMember.tempId,
                  'isAvailable',
                  e.target.value === 'Active'
                )
              }
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
                onClick={() => removeMember(selectedMember.id || selectedMember.tempId)}
              >
                Remove
              </button>
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                onClick={() => saveMember(selectedMember.id || selectedMember.tempId)}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}