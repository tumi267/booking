import BookingCards from '@/app/components/user/BookingCard/BookingCard'
import Nav from '@/app/components/user/Nav/Nav'
import { GetUserUpcomingBooking } from '@/app/libs/crud/user/getuserbooking'
import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'

export default async function Page() {
const { userId } = auth()

if (!userId) {
redirect('/user')
}

const bookingData = await GetUserUpcomingBooking(userId)

return ( <div className="min-h-screen bg-gray-50"> <Nav />
  <div className="max-w-4xl mx-auto p-4">
    {bookingData.length === 0 ? (
      <div className="text-center py-16">
        <h2 className="text-xl font-semibold text-gray-800">
          No upcoming bookings
        </h2>

        <p className="mt-2 text-gray-500">
          You don't have any upcoming appointments.
        </p>
      </div>
    ) : (
      <BookingCards bookingData={bookingData} />
    )}
  </div>
</div>
)
}
