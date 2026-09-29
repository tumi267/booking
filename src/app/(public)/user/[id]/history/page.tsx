import BookingCard from '@/app/components/user/BookingCard/BookingCard'
import Nav from '@/app/components/user/Nav/Nav'
import { GetUserBooking } from '@/app/libs/crud/user/getuserbooking'
import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'

async function Page() {
  const { userId } = auth()

  if (!userId) {
    redirect('/user')
  }

  const bookings = await GetUserBooking(userId)

  return (
    <div className="min-h-screen bg-gray-50">
      <Nav />

      <div className="max-w-4xl mx-auto p-4">
        <BookingCard bookingData={bookings} />
      </div>
    </div>
  )
}

export default Page
