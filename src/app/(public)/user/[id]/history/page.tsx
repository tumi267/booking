import BookingCard from '@/app/components/user/BookingCard/BookingCard'
import Nav from '@/app/components/user/Nav/Nav'
import { GetUserBooking } from '@/app/libs/crud/user/getuserbooking'
import { groupBookingsByDate } from '@/app/libs/groupbydate/groupByDate'

async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const bookings = await GetUserBooking(id)
  return (
    <div>
      <Nav id={id} />
      <div className="p-4">
          <BookingCard
            bookingData={bookings}
          />
    
      </div>
    </div>
  )
}

export default Page