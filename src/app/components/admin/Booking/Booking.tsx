'use client'
import React, { useState } from 'react'
import Calendar from './Calendar/Calendar'
import BookingCards from './BookingCards/BookingCards'
import getBookingData from '@/app/libs/db/getadminbooking';

function Booking() {
  const [sel,setSel]=useState(0)
  // selection section for now just dummie date
  const day= '2'
  const month= '3'
  const year = '2026'
  const formattedDate = `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`
  const d = new Date(formattedDate)
  const bookings =getBookingData(formattedDate)
  return (
    <div>
        <h2>Booking</h2>
        <div>search smart search{/* module will open*/}</div>
        <span>
          <button onClick={()=>{setSel(0)}}>Calendar</button>
          <button onClick={()=>{setSel(1)}}>Booking</button>
        </span>
        {sel==0&&<Calendar/>}
        {sel==1&&<BookingCards
        bookingData={bookings}/>}
     
        
    </div>
  )
}

export default Booking