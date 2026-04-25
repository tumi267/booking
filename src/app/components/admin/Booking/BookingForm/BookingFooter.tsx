import React from 'react'

function BookingFooter({
  totalPrice,
  submitting,
}: {
  totalPrice: number
  submitting: boolean
}) {
  return (
    <div className="flex justify-between items-center p-4 bg-blue-50 rounded-lg">
      <div>
        <p className="text-xs text-blue-600 font-bold uppercase">
          Total Order
        </p>
        <p className="text-xl font-bold text-blue-900">
          R{totalPrice}
        </p>
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="bg-blue-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-blue-700 transition disabled:opacity-50"
      >
        {submitting ? 'Updating...' : 'Update Group'}
      </button>
    </div>
  )
}
export default BookingFooter