import React from 'react'
import OpenBookingInfo from './OpenBookingInfo/OpenBookingInfo'

type GroupedBooking = {
    groupId: string;
    items: any[]; 
    totalOrderPrice: number; // Updated to match server logic
    todaySessions: number;   // Updated to match server logic
    time: string;
    status: string;
    clientName: string;
}

interface props {
    bookingData: GroupedBooking[]
}

function BookingCards({ bookingData }: props) {
    const getStatusStyle = (status: string) => {
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
            {bookingData.map((group) => {
                // Access first item safely
                const firstItem = group.items[0];
                
                return (
                    <div key={group.groupId} className="border rounded-xl p-5 shadow-sm bg-white hover:shadow-md transition">
                        <div className="flex justify-between items-start mb-4">
                            <span className="text-xs font-mono text-gray-400">
                                {group.todaySessions} {group.todaySessions > 1 ? 'Sessions' : 'Session'}
                            </span>
                            <span className={`text-[10px] font-bold px-2 py-1 rounded-full uppercase ${getStatusStyle(group.status)}`}>
                                {group.status}
                            </span>
                        </div>
                        <div>
                            <h4 className='text-sm text-gray-600'><span className='font-bold'>booking id:</span> {firstItem.groupId}</h4>
                        </div>
                        <div className="space-y-2 mb-6">
                            <h3 className="font-bold text-lg leading-tight">
                                {firstItem?.services?.name || "Service"}
                            </h3>
                            <p className="text-sm text-gray-600">👤 Client: <span className="font-medium text-gray-900">{group.clientName}</span></p>
                            
                            <div className="flex gap-4 text-xs text-gray-500 bg-gray-50 p-2 rounded">
                                <span>📅 {firstItem ? new Date(firstItem.date).toLocaleDateString() : 'N/A'}</span>
                                <span>⏰ {group.items.map((e,i)=>{return <li key={i}>{e.time}</li>})}</span>
                            </div>
                        </div>

                        <div className="flex justify-between items-center pt-4 border-t">
                        <div className="flex flex-col">
                                <span className="font-bold text-blue-600 text-lg">R{group.items.map(()=>{}).length*firstItem.services.defaultPrice}</span>
                                <span className="text-[10px] text-gray-400 font-medium">day Order Total</span>
                            </div>
                            <div className="flex flex-col">
                                <span className="font-bold text-blue-600 text-lg">R{group.totalOrderPrice}</span>
                                <span className="text-[10px] text-gray-400 font-medium">Full Order Total</span>
                            </div>
                            {/* Updated to use group.groupId directly */}
                            <OpenBookingInfo url={`/admin/BookingInfo/${group.groupId}/${firstItem.date}`} />
                        </div>
                    </div>
                )
            })}
        </div>
    )
}
export default BookingCards
