'use client'

import React from 'react'
import Loading from '../../Loading/Loading'
import { useOperatingHours } from '@/app/hooks/useOperatingHours'

const weekdays = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'] as const

function OperatingHours() {
  const {
    schedule,
    updateTime,
    toggleWorking,
  } = useOperatingHours()

  if (!schedule) return <Loading />

  return (
    <div className="bg-white border rounded-xl p-4">
      <h3 className="font-bold mb-4">
        Operating Hours
      </h3>

      {weekdays.map(day => {
        const d = schedule[day]

        return (
          <div
            key={day}
            className="flex gap-2 mb-2 items-center"
          >
            <div className="w-12">{day}</div>

            {/* toggle */}
            <input
              type="checkbox"
              checked={d.working}
              onChange={() => toggleWorking(day)}
            />

            {/* open */}
            <input
              type="time"
              disabled={!d.working}
              value={d.open}
              onChange={(e) =>
                updateTime(day, 'open', e.target.value)
              }
              className="border px-2 py-1 rounded"
            />

            <span>-</span>

            {/* close */}
            <input
              type="time"
              disabled={!d.working}
              value={d.close}
              onChange={(e) =>
                updateTime(day, 'close', e.target.value)
              }
              className="border px-2 py-1 rounded"
            />
            {!d.working && (
              <span className="text-xs text-red-500">
                Closed
              </span>
            )}
          </div>
        )
      })}
    </div>
  )
}
export default OperatingHours