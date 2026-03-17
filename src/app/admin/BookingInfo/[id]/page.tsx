import BookingForm from '@/app/components/admin/Booking/BookingForm/BookingForm'
import React from 'react'

// This type now matches the "Relations" in your Prisma schema
type Booking = {
  id: string
  clientName: string
  contact: string
  providerId: string    // Use IDs for database relations
  serviceId: string     // Use IDs for database relations
  startTime: Date       // Combined Date/Time
  duration: number
  amount: number
  status: string
}

function BookingInfo({ params }: { params: { id: string } }) {
  // Dummy data representing a result from: 
  // prisma.booking.findUnique({ include: { client: true, service: true } })
  const booking: Booking = {
    id: '1',
    clientName: 'Jane Doe',
    contact: '012-345-6789',
    providerId: 'p-101', // ID of 'John'
    serviceId: 's-202',  // ID of 'Consultation'
    startTime: new Date('2026-03-16T13:00:00'),
    duration: 60,
    amount: 650.00,
    status: 'CONFIRMED'
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Edit Booking #{params.id}</h1>
      <BookingForm
        id={booking.id}
        clientName={booking.clientName}
        contact={booking.contact}
        providerId={booking.providerId}
        serviceId={booking.serviceId}
        startTime={booking.startTime.toISOString()}
        price={booking.amount}
        duration={booking.duration}
        status={booking.status}
      />
    </div>
  )
}

export default BookingInfo