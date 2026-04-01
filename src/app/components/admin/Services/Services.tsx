'use client'
import React, { useEffect, useState } from 'react'
import Loading from '../../Loading/Loading'

// Types
type TeamMember = {
  id: string
  lastName: string
  firstName: string
}

type Service = {
  id: string | null
  name: string
  price: number
  duration: number
  description: string
  isActive: boolean
  assignedTeam: TeamMember[]
  tempId: string
}

type Banner = {
  type: 'success' | 'error'
  message: string
}

export default function ServiceManagement() {
  const [services, setServices] = useState<Service[]>([])
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [showEditor, setShowEditor] = useState(false)
  const [banner, setBanner] = useState<Banner | null>(null)
  const [loading, setLoading] = useState(false)
  const [team, setTeam] = useState<TeamMember[]>([])

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      setLoading(true)

      const res = await fetch('/api/service')
      const res2 = await fetch('/api/providers')

      const data = await res.json()
      const data2 = await res2.json()

      setServices(data || [])
      setTeam(data2 || [])
    } catch (err) {
      setBanner({ type: 'error', message: 'Failed to load team members.' })
    } finally {
      setLoading(false)
    }
  }

  const getKey = (s: Service) => s.id || s.tempId

  const selectedService = services.find(
    (s) => s.id === selectedId || s.tempId === selectedId
  )

  // ---------- Update local state ----------
  const updateService = <K extends keyof Service>(
    id: string,
    key: K,
    value: Service[K]
  ) => {
    setServices((prev) =>
      prev.map((s) => (getKey(s) === id ? { ...s, [key]: value } : s))
    )
  }

  const removeService = async (id: string) => {
    try {
      setLoading(true)

      // Call DELETE API if it exists on server
      const service = services.find((s) => getKey(s) === id)
      if (service?.id) {
        await fetch('/api/service', {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: service.id }),
        })
      }

      setServices((prev) => prev.filter((s) => getKey(s) !== id))
      setSelectedId(null)
      setShowEditor(false)
      setBanner({ type: 'success', message: 'Service removed' })
    } catch (err) {
      setBanner({ type: 'error', message: 'Failed to remove service' })
    } finally {
      setLoading(false)
    }
  }

  const saveservice = async () => {
    if (!selectedService) return

    try {
      setLoading(true)

      const payload = {
        name: selectedService.name,
        price: selectedService.price,
        duration: selectedService.duration,
        description: selectedService.description,
        isActive: selectedService.isActive,
        assignedTeamIds: selectedService.assignedTeam.map((t) => t.id),
      }

      // CREATE
      if (!selectedService.id) {
        const res = await fetch('/api/service', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        })

        const newService = await res.json()

        setServices((prev) =>
          prev.map((s) =>
            s.tempId === selectedService.tempId
              ? { ...newService, tempId: '' }
              : s
          )
        )

        setSelectedId(newService.id)
        setBanner({ type: 'success', message: 'Service created' })
      } else {
        // UPDATE
        const res = await fetch('/api/service', {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            id: selectedService.id,
            ...payload,
          }),
        })

        const updated = await res.json()

        setServices((prev) =>
          prev.map((s) =>
            s.id === selectedService.id ? { ...s, ...updated } : s
          )
        )

        setBanner({ type: 'success', message: 'Service updated' })
      }
    } catch (err) {
      console.error(err)
      setBanner({ type: 'error', message: 'Save failed' })
    } finally {
      setLoading(false)
    }
  }

  // ---------- Loading ----------
  if (loading) return <Loading />

  return (
    <div className="p-6 bg-white rounded-xl shadow-sm border">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-bold">Services & Pricing</h2>
          <p className="text-sm text-gray-500">
            Manage your offerings, rates, duration, description, and team assignments.
          </p>
        </div>

        <button
          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
          onClick={() => {
            const newService: Service = {
              id: null,
              tempId: crypto.randomUUID(),
              name: 'New Service',
              price: 0,
              duration: 60,
              description: '',
              isActive: true,
              assignedTeam: [],
            }

            setServices((prev) => [...prev, newService])
            setSelectedId(newService.tempId)
            setShowEditor(true)
          }}
        >
          + New Service
        </button>
      </div>

      {/* Service Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {services.map((service) => (
          <div
            key={getKey(service)}
            className={`p-4 border rounded-lg ${
              !service.isActive ? 'opacity-60 bg-gray-50' : ''
            }`}
          >
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-bold text-lg">{service.name}</h3>

              <span
                className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                  service.isActive
                    ? 'bg-green-100 text-green-700'
                    : 'bg-gray-200'
                }`}
              >
                {service.isActive ? 'ACTIVE' : 'ARCHIVED'}
              </span>
            </div>

            <div className="space-y-1 mb-4">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Rate:</span>
                <span className="font-semibold text-blue-600">
                  R{service.price}
                </span>
              </div>

              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Duration:</span>
                <span className="font-semibold">{service.duration} min</span>
              </div>

              <div className="text-sm text-gray-500">
                {service.description || 'No description'}
              </div>

              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Assigned Team:</span>

                <span className="font-semibold">
                  {service.assignedTeam.length > 0
                    ? service.assignedTeam.map((t) => t.firstName).join(', ')
                    : 'None'}
                </span>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                className="flex-1 text-sm border py-2 rounded hover:bg-gray-50"
                onClick={() => {
                  setSelectedId(getKey(service))
                  setShowEditor(true)
                }}
              >
                Edit
              </button>

              <button
                className="flex-1 text-sm bg-red-600 text-white py-2 rounded hover:bg-red-700"
                onClick={() => removeService(getKey(service))}
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
              onChange={(e) =>
                updateService(getKey(selectedService), 'name', e.target.value)
              }
            />

            <label className="block text-sm font-medium">Price</label>
            <input
              type="number"
              className="w-full border px-2 py-1 rounded mb-2"
              value={selectedService.price}
              onChange={(e) =>
                updateService(
                  getKey(selectedService),
                  'price',
                  Number(e.target.value)
                )
              }
            />

            <label className="block text-sm font-medium">Duration (minutes)</label>
            <input
              type="number"
              className="w-full border px-2 py-1 rounded mb-2"
              value={selectedService.duration}
              onChange={(e) =>
                updateService(
                  getKey(selectedService),
                  'duration',
                  Number(e.target.value)
                )
              }
            />

            <label className="block text-sm font-medium">Description</label>
            <textarea
              className="w-full border px-2 py-1 rounded mb-2"
              value={selectedService.description}
              onChange={(e) =>
                updateService(
                  getKey(selectedService),
                  'description',
                  e.target.value
                )
              }
            />

            <label className="block text-sm font-medium">Status</label>
            <select
              className="w-full border px-2 py-1 rounded mb-4"
              value={selectedService.isActive ? 'Active' : 'Inactive'}
              onChange={(e) =>
                updateService(
                  getKey(selectedService),
                  'isActive',
                  e.target.value === 'Active'
                )
              }
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>

            <label className="block text-sm font-medium mb-1">
              Assign Team Members
            </label>

            <div className="flex flex-col gap-1 max-h-40 overflow-y-auto mb-4 border p-2 rounded">
              {team.map((member) => {
                const checked = selectedService.assignedTeam.some(
                  (t) => t.id === member.id
                )

                return (
                  <label
                    key={member.id}
                    className="flex items-center gap-2 text-sm"
                  >
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={(e) => {
                        let newAssigned: TeamMember[]

                        if (e.target.checked) {
                          newAssigned = [
                            ...selectedService.assignedTeam,
                            member,
                          ]
                        } else {
                          newAssigned = selectedService.assignedTeam.filter(
                            (t) => t.id !== member.id
                          )
                        }

                        updateService(
                          getKey(selectedService),
                          'assignedTeam',
                          newAssigned
                        )
                      }}
                    />

                    {member.firstName} {member.lastName}
                  </label>
                )
              })}
            </div>

            <div className="flex justify-end space-x-2">
              <button
                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                onClick={() => setShowEditor(false)}
              >
                Close
              </button>

              <button
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                onClick={() => removeService(getKey(selectedService))}
              >
                Remove
              </button>

              <button
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                onClick={() => saveservice()}
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