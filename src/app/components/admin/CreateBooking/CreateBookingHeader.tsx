import React from 'react'

interface Props {
  onClose: () => void
}

function CreateBookingHeader({ onClose }: Props) {
  return (
    <div className="flex items-center justify-between border-b pb-4">
      <div>
        <h2 className="text-xl font-semibold">Create Booking</h2>
        <p className="text-sm text-gray-500">
          Enter the client and booking details.
        </p>
      </div>

      <button
        type="button"
        onClick={onClose}
        className="rounded-md px-3 py-2 hover:bg-gray-100"
        aria-label="Close"
      >
        ✕
      </button>
    </div>
  )
}

export default CreateBookingHeader

