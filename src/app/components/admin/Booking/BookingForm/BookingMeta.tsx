import React from 'react'
import { BookingStatus } from '@prisma/client'
interface Props {
  formState: any
  setFormState: any
  availableProviders: { id: string; firstName: string; lastName: string }[]
}

function BookingMeta({ formState, setFormState, availableProviders }: Props) {
  return (
    <div className="grid grid-cols-2 gap-4">
      <div>
        <label className="block text-sm font-bold mb-1">Provider</label>
        <select
          value={formState.providerId}
          onChange={(e) =>
            setFormState({ ...formState, providerId: e.target.value })
          }
          className="border p-2 w-full rounded bg-white"
        >
          {availableProviders.map((p) => (
            <option key={p.id} value={p.id}>
              {p.firstName} {p.lastName}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className="block text-sm font-bold mb-1">Status</label>
        <select
            value={formState.status}
            onChange={(e) =>
            setFormState({ ...formState, status: e.target.value as BookingStatus })
            } className="border p-2 w-full rounded"
            >
        {Object.values(BookingStatus).map((status) => (
            <option key={status} value={status}>
            {status.charAt(0) + status.slice(1).toLowerCase()}
            </option>
        ))}
        </select>
      </div>
    </div>
  )
}
export default BookingMeta