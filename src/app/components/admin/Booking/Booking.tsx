'use client'
import React, { useState } from 'react'
import Calendar from './Calendar/Calendar'
import BookingCards from './BookingCards/BookingCards'
import getBookingData from '@/app/libs/db/getadminbooking';

function Booking() {
  return (
    <div>
        <h2>Booking</h2>
        <div>search smart search{/* module will open*/}</div>
       <Calendar/>
    </div>
  )
}

export default Booking