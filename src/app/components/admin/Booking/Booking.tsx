'use client'
import React, { useState } from 'react'
import Calendar from './Calendar/Calendar'
import BookingCards from './BookingCards/BookingCards'

function Booking() {
  const [sel,setSel]=useState(0)

  return (
    <div>
        <h2>Booking</h2>
        <div>search smart search{/* module will open*/}</div>
        <span>
          <button onClick={()=>{setSel(0)}}>Calendar</button>
          <button onClick={()=>{setSel(1)}}>Booking</button>
        </span>
        {sel==0&&<Calendar/>}
        {sel==1&&<BookingCards/>}
     
        
    </div>
  )
}

export default Booking