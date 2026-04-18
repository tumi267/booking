import BookingCards from '@/app/components/admin/Booking/BookingCards/BookingCards'
import { getBookingsByDate } from '@/app/libs/crud/booking'
import { parseBookingDate } from '@/app/libs/dates/parseBookingDate'

export default async function Page({params,}: {params: { date: string }}) {
  const { date, iso } = parseBookingDate(params.date)
  const bookings = await getBookingsByDate(date)
  return (
    <div>
      <h2>{date.toLocaleDateString()}</h2>
      <BookingCards bookingData={bookings} />
    </div>
  )
}