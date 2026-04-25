import React from 'react'
import Timeslots from './Timeslots'
interface Props {
  formState: any
  setFormState: any
  serviceId: string
  sessionDuration: number
  groupId: string
}
function BookingSlots({formState,setFormState,serviceId,sessionDuration,groupId,}: Props) {
    
  return (
    <div className="space-y-4">
      <label className="block text-sm font-bold">Reschedule Slots</label>
      <div className="bg-gray-50 p-4 rounded-lg">
        <input
          type="date"
          value={formState.date}
          onChange={(e) =>
            setFormState({ ...formState, date: e.target.value })
          }
          className="mb-4 p-2 border rounded w-full"
        />
        <Timeslots
          slots={formState.slots}
          providerId={formState.providerId}
          serviceId={serviceId}
          sessionDuration={sessionDuration}
          date={formState.date}
          groupId={groupId}
          onChange={(newSlots) =>
            setFormState({ ...formState, slots: newSlots })
          }
        />
      </div>
    </div>
  )
}

export default BookingSlots