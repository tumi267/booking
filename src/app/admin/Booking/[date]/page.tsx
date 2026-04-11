import BookingCards from '@/app/components/admin/Booking/BookingCards/BookingCards'
import { getBookingsByDate } from '@/app/libs/crud/booking'
import React from 'react'

export default async function Page({ params }: { params: { date: string } }) {

    const [day, month, year] = params.date.split("-")

    const formattedDate = `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`

    const d = new Date(formattedDate)

    const bookings = await getBookingsByDate(d)



    return (
        <div>
            <h2>{d.toLocaleDateString()}</h2>

            <BookingCards bookingData={bookings} />
        </div>
    )
}