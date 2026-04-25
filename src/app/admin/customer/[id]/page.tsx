import BookingCards from '@/app/components/admin/Booking/BookingCards/BookingCards';
import { getBookingByClientId } from '@/app/libs/crud/booking'
import React from 'react'

// Define the shape of the URL parameters
interface PageProps {
  params: Promise<{ id: string }>; 
}

async function Page({ params }: PageProps) {
  const { id } = await params;
  // Fetch the data using your CRUD helper
  const data = await getBookingByClientId(id);
 
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Client Bookings</h1>
      <BookingCards 
      bookingData={data}
      />
    </div>
  )
}

export default Page