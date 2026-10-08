'use client'
import React from 'react'
import Loading from '@/app/components/Loading/Loading'
import { useTimeslots } from '@/app/hooks/useTimeslots'

interface BookingItem {
  id: string
  time: string
  date: Date | string
}

interface TimeslotsProps {
  slots: BookingItem[]
  providerId: string
  serviceId: string
  sessionDuration: number
  date: Date | string
  groupId: string
  onChange: (newSlots: BookingItem[]) => void
}

function Timeslots(props: TimeslotsProps) {
  const { slots } = props
  // Grab "booked" from your hook
  const { allPossibleSlots, isLoading, handleTimeClick, booked } = useTimeslots(props)

  if (isLoading) return <Loading />

  return (
    <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
      {allPossibleSlots.map((time) => {
        const isSelected = slots.some(s => s.time === time)
        const isBooked = booked.includes(time) // Check if slot is already taken

        return (
          <button
            key={time}
            type="button"
            disabled={isBooked} // Prevent user from clicking booked slots
            onClick={() => handleTimeClick(time)}
            className={`p-2 text-xs font-bold rounded-lg border transition-all
              ${isSelected
                ? 'bg-blue-600 text-white border-blue-600'
                : isBooked
                ? 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed line-through' // Styled booked slots
                : 'bg-white text-gray-700 hover:border-blue-300'
              }
            `}
          >
            {time}
          </button>
        )
      })}
    </div>
  )
}

export default Timeslots