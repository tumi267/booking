'use client'

import React from 'react'

import type {BookingData,Service,} from '@/app/types/booking'

interface Props {
  currentStep: number
  step: (newStep: number) => void
  bookingdata: BookingData
  selectedservice: Service
  onConfirm: () => Promise<void>
  submitting: boolean
}

export default function Summary({step,currentStep,bookingdata,selectedservice,onConfirm,submitting,}: Props) {
  const dailyTotals = bookingdata.dates.map((day) =>day.times.length *selectedservice.price)

  const grandTotal = dailyTotals.reduce((total, amount) => total + amount, 0)

  const isBookingValid =bookingdata.dates.length > 0 &&bookingdata.dates.every(
      (day) => day.times.length > 0
    )

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md space-y-6">

      <h2 className="text-2xl font-semibold text-center">
        Booking Summary
      </h2>

      {/* TEAM */}

      <div>
        <span className="font-semibold">
          Team Member:
        </span>{' '}
        {bookingdata.team}
      </div>

      {/* SERVICE */}

      <div>
        <span className="font-semibold">
          Service:
        </span>{' '}
        {selectedservice.name}
      </div>

      <div>
        <span className="font-semibold">
          Price:
        </span>{' '}
        R{selectedservice.price}
      </div>

      {/* DATES */}

      <div className="space-y-4">

        <h3 className="font-semibold text-lg">
          Selected Dates & Times
        </h3>

        {bookingdata.dates.length === 0 && (
          <div className="text-gray-500">
            No dates selected
          </div>
        )}

        {bookingdata.dates.map(
          (day, index) => (
            <div
              key={`${day.date}-${index}`}
              className="
                p-3
                border
                bg-gray-50
                space-y-1
              "
            >
              <div className="font-medium">
                {day.date}
              </div>

              {day.times.length === 0 ? (
                <div className="text-gray-500">
                  No time selected
                </div>
              ) : (
                <div className="flex justify-between">
                  <span>
                    {day.times[0]} -{' '}
                    {day.times[
                      day.times.length - 1
                    ]}
                  </span>

                  <p>
                    R
                    {day.times.length *
                      selectedservice.price}
                  </p>
                </div>
              )}
            </div>
          )
        )}

        {/* TOTAL */}

        <div className="flex justify-between p-3 border bg-gray-50">
          <p>Total</p>

          <p className="font-bold">
            R{grandTotal}
          </p>
        </div>

      </div>

      {/* VALIDATION */}

      {!isBookingValid && (
        <p className="text-red-500">
          Please select times for all dates
        </p>
      )}

      {/* ACTIONS */}

      <div className="flex justify-between mt-6">

        <button
          onClick={() =>
            step(currentStep - 1)
          }
          className="
            px-6 py-2
            bg-gray-300
            hover:bg-gray-400
            rounded-md
            transition
          "
        >
          Prev
        </button>

        <button
          disabled={
            !isBookingValid ||
            submitting
          }
          onClick={onConfirm}
          className={`
            px-6 py-2
            text-white
            rounded-md
            transition

            ${
              isBookingValid &&
              !submitting
                ? 'bg-blue-600 hover:bg-blue-700'
                : 'bg-gray-400 cursor-not-allowed opacity-50'
            }
          `}
        >
          {submitting
            ? 'Processing...'
            : 'Confirm Booking'}
        </button>

      </div>

    </div>
  )
}