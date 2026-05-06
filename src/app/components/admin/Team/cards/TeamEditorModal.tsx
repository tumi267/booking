import { ProviderRole } from '@prisma/client'
import { TeamMember } from '@/app/libs/team/types'
import { Dispatch, SetStateAction } from 'react'

type Props = {
  open: boolean
  member?: TeamMember
  roles: ProviderRole[]
  onClose: () => void
  onUpdate: <K extends keyof TeamMember>(
    id: string,
    key: K,
    value: TeamMember[K]
  ) => void
  onRemove: (id: string) => void
  onSave: (id: string) => void
  showpass:boolean
  setShowpass:Dispatch<SetStateAction<boolean>>
}

export function TeamEditorModal({open,member,roles,onClose,onUpdate,onRemove,onSave,showpass,setShowpass
}: Props) {
  if (!open || !member) return null
  const id = member.id || member.tempId
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
      <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
        <h3 className="mb-4 text-lg font-bold">Edit Member</h3>
        <div className="space-y-4">
          <input
            className="w-full rounded border px-3 py-2"
            value={member.firstName}
            onChange={(e) => onUpdate(id, 'firstName', e.target.value)}
            placeholder="First Name"
          />

          <input
            className="w-full rounded border px-3 py-2"
            value={member.lastName}
            onChange={(e) => onUpdate(id, 'lastName', e.target.value)}
            placeholder="Last Name"
          />

          <input
            className="w-full rounded border px-3 py-2"
            value={member.email}
            onChange={(e) => onUpdate(id, 'email', e.target.value)}
            placeholder="Email"
          />
          <input 
          placeholder="password"
          type={showpass?'text':'password'}
          className="w-full rounded border px-3 py-2 pr-16"
          value={member.password || ''}
          onChange={(e) =>
          onUpdate(id, 'password', e.target.value)
          }
          />
          <button onClick={()=>{setShowpass(prev => !prev)}}>{showpass ? 'Hide' : 'Show'}</button>
          <select
            className="w-full rounded border px-3 py-2"
            value={member.role}
            onChange={(e) =>
              onUpdate(id, 'role', e.target.value as ProviderRole)
            }
          >
            {roles.map((role) => (
              <option key={role} value={role}>
                {role.replaceAll('_', ' ')}
              </option>
            ))}
          </select>

          <select
            className="w-full rounded border px-3 py-2"
            value={member.isAvailable ? 'true' : 'false'}
            onChange={(e) =>
              onUpdate(id, 'isAvailable', e.target.value === 'true')
            }
          >
            <option value="true">Active</option>
            <option value="false">On Leave</option>
          </select>
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
            onClick={() => onSave(id)}
            className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  )
}
