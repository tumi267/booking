import BookingForm from '@/app/components/admin/Booking/BookingForm/BookingForm'
import { getBookingByGroupIdAndDate } from '@/app/libs/crud/booking'
import { getAllProviders, getProvider } from '@/app/libs/crud/provider'
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

async function BookingInfo({ params }: { params: { id: string, date: string } }) {
  const decodedDateString = decodeURIComponent(params.date);
  const rawDate = new Date(decodedDateString);
  const normalizedDate = new Date(Date.UTC(rawDate.getUTCFullYear(), rawDate.getUTCMonth(), rawDate.getUTCDate(), 0, 0, 0));

  const data = await getBookingByGroupIdAndDate(params.id, normalizedDate);
  const allProviders=await getAllProviders()
  if (!data || data.length === 0) return <div>Booking not found</div>;

  // Since all bookings in a group share the same client/service (per your schema), 
  // we pull those details from the first item.
  const firstItem = data[0];

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Edit Group Booking</h1>
      <BookingForm
        groupId={params.id}
        clientName={firstItem.client ? `${firstItem.client.firstName} ${firstItem.client.lastName}` : "Guest"}
        contact={firstItem.client?.phone || "N/A"}
        availableProviders={allProviders} 
        providerId={firstItem.provider.id}
        serviceId={firstItem.serviceId}
        sestionDuration={firstItem.services.defaultSessionDuration}
        status={firstItem.status}
        totalPrice={firstItem.price} // This is your stored group total
        items={data.map(item => ({
          id: item.id,
          time: item.time,
          date: item.date
        }))}
      />
    </div>
  )
}
export default BookingInfo