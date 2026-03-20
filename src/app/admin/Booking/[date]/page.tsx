import BookingCards from '@/app/components/admin/Booking/BookingCards/BookingCards'
import getBookingData from '@/app/libs/db/getadminbooking';
import React from 'react'
type BookingStatus = 'PENDING' | 'PARTIAL' | 'PAID' | 'CANCELLED' | 'COMPLETED';
type Booking = {
    id: string | number
    providerName: string
    date: Date
    time: string
    serviceName: string
    amount: number
    status: BookingStatus
    url: string
}
function page({ params }: { params: { date: string } }) {
    const [day, month, year] = params.date.split("-")

    // Pad day and month to 2 digits
    const formattedDate = `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`

    const d = new Date(formattedDate)
    
    const bookings=getBookingData(formattedDate)

    return (
        <div>
            <h2>{d.toLocaleDateString()}</h2>
            <BookingCards
                bookingData={bookings}
            />
        </div>
    )
}

export default page