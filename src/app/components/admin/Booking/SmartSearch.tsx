'use client'

import React from 'react'

interface Props {
  value: string
  onChange: (
    value: string
  ) => void
  loading?: boolean
}

export default function SmartSearch({value,onChange,loading = false,}: Props) {
  return (
    <div className="relative w-full">
      <input type="text" value={value}
        onChange={(event) =>
          onChange(
            event.target.value
          )
        }
        placeholder="Search bookings..."
        className="w-full px-4 py-3 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
      />

      {loading && (
        <div className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-gray-500">
          Searching...
        </div>
      )}
    </div>
  )
}