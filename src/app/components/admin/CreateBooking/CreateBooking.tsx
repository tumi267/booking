'use client'

import React, { useState } from 'react'
import CreateBookingForm from './CreateBookingForm'

function CreateBooking() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
      >
        + Create Booking
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-xl bg-white shadow-xl">
            <CreateBookingForm
              onClose={() => setIsOpen(false)}
            />
          </div>
        </div>
      )}
    </>
  )
}

export default CreateBooking

