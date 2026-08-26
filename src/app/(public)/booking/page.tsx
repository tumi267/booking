import Bookingmain from '@/app/components/(public)/booking/bookingmain/Bookingmain'
import { getAllServices } from '@/app/libs/crud/service'


export const revalidate = 60

export default async function BookingPage() {
  const services = await getAllServices()

  return <Bookingmain data={services} />
}