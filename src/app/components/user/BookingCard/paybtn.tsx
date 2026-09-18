'use client'
import React from 'react'
import { useBooking } from '@/app/hooks/booking/useBooking'
interface props{
data:any
}
function Paybtn({data}:props) {
    const {  submitting ,updateBooking} = useBooking()
    
  return (
    <button
    type="button"
    onClick={() => {updateBooking(data)}}
    disabled={submitting}
    className="rounded-lg bg-green-600 px-4 py-2 text-sm font-semibold text-white disabled:opacity-50"
  >
    {submitting ? 'Loading...' : 'Pay Now'}
  </button>
  )
}

export default Paybtn