import React from 'react'
import Paybtn from './paybtn'

type GroupedBooking = {
  groupId: string
  items: any[]
  totalOrderPrice: number
  todaySessions: number
  time: string
  status: string
  clientName: string
}

interface Props {
  bookingData: GroupedBooking[]
}

function BookingCards({ bookingData }: Props) {
  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'PAID':
        return 'bg-green-100 text-green-700'
      case 'PENDING':
        return 'bg-amber-100 text-amber-700'
      case 'PARTIAL':
        return 'bg-blue-100 text-blue-700'
      case 'CANCELLED':
        return 'bg-red-100 text-red-700'
      default:
        return 'bg-gray-100 text-gray-700'
    }
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {bookingData.map((group) => {
        const firstItem = group.items[0]

        if (!firstItem) return null

        return (
          <div
            key={`${group.groupId}-${firstItem.date}`}
            className="border rounded-xl p-5 shadow-sm bg-white hover:shadow-md transition"
          >
            {/* Header */}
            <div className="flex justify-between items-start mb-4">
              <span className="text-xs font-mono text-gray-400">
                {group.todaySessions}{' '}
                {group.todaySessions > 1 ? 'Sessions' : 'Session'}
              </span>

              <span
                className={`text-[10px] font-bold px-2 py-1 rounded-full uppercase ${getStatusStyle(
                  group.status
                )}`}
              >
                {group.status}
                {group.status=='PENDING'&&<Paybtn
                data={group}
                />}
              </span>
            </div>

            {/* Booking ID */}
            <div className="mb-3">
              <h4 className="text-sm text-gray-600">
                <span className="font-bold">Booking ID:</span>{' '}
                {group.groupId}
              </h4>
            </div>

            {/* Booking information */}
            <div className="space-y-2 mb-6">
              <h3 className="font-bold text-lg leading-tight">
                {firstItem.services?.name || 'Service'}
              </h3>

              <p className="text-sm text-gray-600">
                👤 Client:{' '}
                <span className="font-medium text-gray-900">
                  {group.clientName}
                </span>
              </p>

              <div className="bg-gray-50 p-3 rounded space-y-2">
                <div className="text-xs text-gray-500">
                  📅{' '}
                  {new Date(firstItem.date).toLocaleDateString()}
                </div>

                <div className="text-xs text-gray-500">
                  ⏰ Times:
                </div>

                <div className="flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <span
                      key={item.id}
                      className="px-2 py-1 bg-white border rounded text-xs"
                    >
                      {item.time}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="flex justify-between items-center pt-4 border-t">
              <div className="flex flex-col">
                <span className="font-bold text-blue-600 text-lg">
                  R{group.totalOrderPrice}
                </span>

                <span className="text-[10px] text-gray-400 font-medium">
                  Order Total
                </span>
              </div>

              {/* <OpenBookingInfo
                url={`/admin/BookingInfo/${group.groupId}/${firstItem.date}`}
              /> */}
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default BookingCards