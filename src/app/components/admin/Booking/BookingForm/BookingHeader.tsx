import React from 'react'

function BookingHeader({
  clientName,
  contact,
}: {
  clientName: string
  contact: string
}) {
  return (
    <div className="grid grid-cols-2 gap-4 border-b pb-4">
      <div>
        <label className="block text-xs font-bold text-gray-400 uppercase">
          Client
        </label>
        <p className="font-semibold text-lg">{clientName}</p>
      </div>

      <div>
        <label className="block text-xs font-bold text-gray-400 uppercase">
          Contact
        </label>
        <p className="font-semibold">{contact}</p>
      </div>
    </div>
  )
}
export default BookingHeader