import React from 'react'

interface Props {
  submitting: boolean
  onClose: () => void
}

function CreateBookingFooter({ submitting, onClose }: Props) {
  return (
    <div className="flex justify-end gap-3 border-t pt-4">
      <button
        type="button"
        onClick={onClose}
        disabled={submitting}
        className="rounded-lg border px-4 py-2"
      >
        Cancel
      </button>

      <button
        type="submit"
        disabled={submitting}
        className="rounded-lg bg-blue-600 px-4 py-2 text-white disabled:opacity-50"
      >
        {submitting ? 'Creating...' : 'Create Booking'}
      </button>
    </div>
  )
}

export default CreateBookingFooter
