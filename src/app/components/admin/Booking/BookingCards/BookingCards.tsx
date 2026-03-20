import React from 'react'
import OpenBookingInfo from './OpenBookingInfo/OpenBookingInfo'

// Matching your Prisma Schema Enums
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
interface props{
    bookingData:Booking[]
}

function BookingCards({bookingData}:props) {

    const getStatusStyle = (status: BookingStatus) => {
        switch (status) {
            case 'PAID': return 'bg-green-100 text-green-700';
            case 'PENDING': return 'bg-amber-100 text-amber-700';
            case 'PARTIAL': return 'bg-blue-100 text-blue-700';
            case 'CANCELLED': return 'bg-red-100 text-red-700';
            default: return 'bg-gray-100 text-gray-700';
        }
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
            {bookingData.map((booking,i) => (
                <div key={i} className="border rounded-xl p-5 shadow-sm bg-white hover:shadow-md transition">
                    <div className="flex justify-between items-start mb-4">
                        <span className="text-xs font-mono text-gray-400">#{booking.id}</span>
                        <span className={`text-[10px] font-bold px-2 py-1 rounded-full uppercase ${getStatusStyle(booking.status)}`}>
                            {booking.status.replace('_', ' ')}
                        </span>
                    </div>
                    
                    <div className="space-y-2 mb-6">
                        <h3 className="font-bold text-lg leading-tight">{booking.serviceName}</h3>
                        <p className="text-sm text-gray-600">👤 Provider: <span className="font-medium text-gray-900">{booking.providerName}</span></p>
                        
                        <div className="flex gap-4 text-xs text-gray-500 bg-gray-50 p-2 rounded">
                            <span>📅 {booking.date.toLocaleDateString()}</span>
                            <span>⏰ {booking.time}</span>
                        </div>
                    </div>

                    <div className="flex justify-between items-center pt-4 border-t">
                        <span className="font-bold text-blue-600 text-lg">R{booking.amount}</span>
                        <OpenBookingInfo url={`/admin/BookingInfo${booking.url}`} />
                    </div>
                </div>
            ))}
        </div>
    )
}

export default BookingCards