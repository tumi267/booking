'use client'

import { useAuth } from '@clerk/nextjs'
import React from 'react'

type BookedDay = {
  date: string
  times: string[]
}
type Team={ id: string
  firstName: string
  lastName: string
  role: string
  bio?: string
  imageurl?: string
  isAvailable?: boolean
  bookedDates: BookedDay[]}
type service={
  serviceId: string
  name: string
  isActive: boolean
  price: number
  duration:number
  assignedTeam: Team[]
}
interface Props {
  currentStep: number
  step: (newStep: number) => void
  bookingdata: { serviceId: string; providerId: string; team: string; dates: BookedDay[] }
  selectedservice:service
}

function Summary({ step, currentStep, bookingdata,selectedservice }: Props) {
  const { userId } = useAuth();
  // 1. Calculate individual totals per day
 const dailyTotals: number[] = bookingdata.dates.map(
  (day) => day.times.length * selectedservice.price
);

// 2. Calculate the grand total
const grandTotal = dailyTotals.reduce((acc, curr) => acc + curr, 0);

// 3. VALIDATION: Check if every day in the array has at least one time slot
const isBookingValid = 
  bookingdata.dates.length > 0 && 
  bookingdata.dates.every((day) => day.times.length > 0);

  const handleSubmit = async () => {
    try {
      // Send the total along with the booking data
      console.log(selectedservice)
      const res = await fetch('/api/booking', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ 
          bookingdata: {
            ...bookingdata,
            total: grandTotal,
            clientId:userId,
            sessionDuration:selectedservice.duration,
            servicename:selectedservice.name
          } 
        })
      });
  
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
 
      // ... dynamic form logic remains the same
      const form = document.createElement('form');
      form.method = 'POST';
      form.action = 'https://sandbox.payfast.co.za/eng/process'; 
  
      Object.keys(data).forEach(key => {
        if (data[key]) { // Ensure we don't append empty values
          const input = document.createElement('input');
          input.type = 'hidden';
          input.name = key;
          input.value = data[key];
          form.appendChild(input);
        }
      });
  
      document.body.appendChild(form);
      form.submit();
    } catch (error) {
      console.error("Payment initiation failed:", error);
    }
  };
  
  
  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md space-y-6">
      <h2 className="text-2xl font-semibold text-center">Booking Summary</h2>

      <div className="space-y-2">

        <div>
          <span className="font-semibold">Team Name:</span> {bookingdata.team}
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="font-semibold text-lg">Selected Dates & Times</h3>
        {bookingdata.dates.length === 0 && (
          <div className="text-gray-500">No dates selected</div>
        )}
        {bookingdata.dates.map((day, i) => (
          <div
            key={i}
            className="p-3 border bg-gray-50 space-y-1"
          >
            <div className="font-medium">{day.date}</div>
            {day.times.length === 0 ? (
              <div className="text-gray-500">No time selected</div>
            ) : (
              <div className='flex justify-between'>
              <span>{day.times[0]}-{day.times[day.times.length-1]}</span>
               <p>{day.times.length*selectedservice.price}</p>
               
              </div>
             
            )}
          </div>
        ))}
        <div className='flex justify-between p-3 border bg-gray-50 space-y-1"'>
          <p>Total</p>
          <p className="font-bold">R{grandTotal}</p>
        </div>
      </div>
      {!isBookingValid&&<p className='text-red-500'>Please Selecte Times For All Dates</p>}
      <div className="flex justify-between mt-6">
        <button
          onClick={() => step(currentStep - 1)}
          className="px-6 py-2 bg-gray-300 hover:bg-gray-400 rounded-md transition"
        >
          Prev
        </button>
        
        <button
          // Button is disabled if any day has 0 times selected
          disabled={!isBookingValid}
          onClick={() => {
            handleSubmit()
          }}
          className={`px-6 py-2 text-white rounded-md transition ${
            isBookingValid 
              ? "bg-blue-600 hover:bg-blue-700" 
              : "bg-gray-400 cursor-not-allowed opacity-50"
          }`}
        >
          
          Confirm Booking
        </button>
      </div>
    </div>
  )
}

export default Summary