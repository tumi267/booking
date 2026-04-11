type BookingStatus = 'PENDING' | 'PARTIAL' | 'PAID' | 'CANCELLED' | 'COMPLETED';

type Booking = {
  id: string
  providerName: string
  date: Date
  time: string
  serviceName: string
  amount: number
  status: BookingStatus
  url: string
}

// Default export as a function
export default function getBookingData(date: string): Booking[] {
  // Mock data — in real usage, filter from DB where booking.date == date
  // const res=await getBookingsByDate(datefromat)
  // const data =await res
  return [
    { id: 'BK-001', providerName: 'John Doe', date: new Date('2026-03-16'), time: '13:00', serviceName: 'Personal Training', amount: 650, status: 'PAID', url: '/1' },
    { id: 'BK-002', providerName: 'Sarah Smith', date: new Date('2026-03-16'), time: '14:30', serviceName: 'Consultation', amount: 450, status: 'PENDING', url: '/2' },
    { id: 'BK-003', providerName: 'John Doe', date: new Date('2026-03-16'), time: '16:00', serviceName: 'Therapy', amount: 800, status: 'PARTIAL', url: '/3' },
  ]
}