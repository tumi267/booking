import { Service, TeamMember } from '@/app/libs/service/types'

type Props = {
  open: boolean
  service?: Service
  team: TeamMember[]
  onClose: () => void
  onUpdate: <K extends keyof Service>(
    id: string,
    key: K,
    value: Service[K]
  ) => void
  onRemove: (id: string) => void
  onSave: () => void
}

export function ServiceEditorModal({
  open,
  service,
  team,
  onClose,
  onUpdate,
  onRemove,
  onSave,
}: Props) {
  if (!open || !service) return null

  const id = service.id || service.tempId

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
      <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
        <h3 className="mb-4 text-lg font-bold">Edit Service</h3>

        <div className="space-y-4">
          <input
            className="w-full rounded border px-3 py-2"
            value={service.name}
            onChange={(e) => onUpdate(id, 'name', e.target.value)}
            placeholder="Service Name"
          />

          <input
            type="number"
            className="w-full rounded border px-3 py-2"
            value={service.price}
            onChange={(e) => onUpdate(id, 'price', Number(e.target.value))}
            placeholder="Price"
          />

          <input
            type="number"
            className="w-full rounded border px-3 py-2"
            value={service.duration}
            onChange={(e) =>
              onUpdate(id, 'duration', Number(e.target.value))
            }
            placeholder="Duration"
          />

          <textarea
            className="w-full rounded border px-3 py-2"
            value={service.description}
            onChange={(e) => onUpdate(id, 'description', e.target.value)}
            placeholder="Description"
          />

          <select
            className="w-full rounded border px-3 py-2"
            value={service.isActive ? 'true' : 'false'}
            onChange={(e) =>
              onUpdate(id, 'isActive', e.target.value === 'true')
            }
          >
            <option value="true">Active</option>
            <option value="false">Inactive</option>
          </select>

          <div className="max-h-40 overflow-y-auto rounded border p-3">
            <p className="mb-2 text-sm font-medium">Assign Team Members</p>

            <div className="space-y-2">
              {team.map((member) => {
                const checked = service.assignedTeam.some(
                  (t) => t.id === member.id
                )

                return (
                  <label key={member.id} className="flex items-center gap-2 text-sm">
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={(e) => {
                        const assigned = e.target.checked
                          ? [...service.assignedTeam, member]
                          : service.assignedTeam.filter((t) => t.id !== member.id)

                        onUpdate(id, 'assignedTeam', assigned)
                      }}
                    />

                    {member.firstName} {member.lastName}
                  </label>
                )}
              )}
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-2">
          <button
            onClick={onClose}
            className="rounded bg-gray-200 px-4 py-2 hover:bg-gray-300"
          >
            Close
          </button>

          <button
            onClick={() => onRemove(id)}
            className="rounded bg-red-600 px-4 py-2 text-white hover:bg-red-700"
          >
            Remove
          </button>

          <button
            onClick={onSave}
            className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  )
}