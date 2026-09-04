'use client'

import React, {useState,} from 'react'
import Calendar from './Calendar/Calendar'
import BookingCards from './BookingCards/BookingCards'
import SmartSearch from './SmartSearch'
import { useBookingSearch } from '@/app/hooks/useAdminBookingSearch'
type GroupedBooking = {
  groupId: string
  items: any[]
  totalOrderPrice: number
  todaySessions: number
  time: string
  status: string
  clientName: string
}
export default function Booking() {
  const [search,setSearch,] = useState("")
  const {results,loading,error,} = useBookingSearch(search)
  const isSearching =search.trim().length > 0
  const groupedResults = results.reduce((groups, booking) => {
    const existing = groups.find(
      group => group.groupId === booking.groupId
    )
  
    if (existing) {
      existing.items.push(booking)
      existing.totalOrderPrice += booking.price
      existing.todaySessions += 1
    } else {
      groups.push({
        groupId: booking.groupId,
        items: [booking],
        totalOrderPrice: booking.price,
        todaySessions: 1,
        time: booking.time,
        status: booking.status,
        clientName: booking.client
          ? `${booking.client.firstName} ${booking.client.lastName}`
          : 'Unknown Client',
      })
    }
  
    return groups
  }, [] as GroupedBooking[])
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">
        Booking
      </h2>
      {/* SMART SEARCH */}
      <SmartSearch
        value={search}
        onChange={setSearch}
        loading={loading}
      />
      {/* SEARCH ERROR */}
      {error && (
        <div className="p-3 text-red-500">
          {error}
        </div>
      )}
      {/* SEARCH RESULTS */}
      {isSearching ? (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">
            Search Results
          </h3>
          {results.length ===
          0 && !loading ? (
            <p className="text-gray-500">
              No bookings found.
            </p>
          ) : (
            <BookingCards bookingData={groupedResults} />
          )}

        </div>
      ) : (
        /* NORMAL CALENDAR */

        <Calendar />
      )}

    </div>
  )
}