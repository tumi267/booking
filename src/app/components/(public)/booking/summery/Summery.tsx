'use client'

import React from 'react'

type BookedDay = {
  date: string
  times: string[]
}

interface Props {
  currentStep: number
  step: (newStep: number) => void
  bookingdata: { id: string; team: string; dates: BookedDay[] }
}

function Summary({ step, currentStep, bookingdata }: Props) {
  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md space-y-6">
      <h2 className="text-2xl font-semibold text-center">Booking Summary</h2>

      <div className="space-y-2">

        <div>
          <span className="font-semibold">Team Name:</span> {bookingdata.team}
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="font-semibold text-lg">Selected Dates & Times</h3>
        {bookingdata.dates.length === 0 && (
          <div className="text-gray-500">No dates selected</div>
        )}
        {bookingdata.dates.map((day, i) => (
          <div
            key={i}
            className="p-3 border rounded-md bg-gray-50 space-y-1"
          >
            <div className="font-medium">{day.date}</div>
            {day.times.length === 0 ? (
              <div className="text-gray-500">No time selected</div>
            ) : (
              <ul className="list-disc list-inside text-blue-600">
                {day.times.map((time, j) => (
                  <li key={j}>{time}</li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>

      <div className="flex justify-between mt-6">
        <button
          onClick={() => step(currentStep - 1)}
          className="px-6 py-2 bg-gray-300 hover:bg-gray-400 rounded-md transition"
        >
          Prev
        </button>

        <button
          onClick={() => {
            // Booking API call will go here later
            console.log('Booking confirmed!', bookingdata)
          }}
          className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition"
        >
          Confirm Booking
        </button>
      </div>
    </div>
  )
}

export default Summary