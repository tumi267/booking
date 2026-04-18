'use client'

import { useCalendar } from "./useOperationCalendar"
import { useEffect, useState } from "react"

export type CalendarBooking = {
  day: number
  month: number
  count: number
}

export function useAdminCalendar() {
  const {
    month,
    year,
    firstDay,
    daysInMonth,
    monthNames,
    prevMonth,
    nextMonth,
  } = useCalendar()

  const [bookings, setBookings] = useState<CalendarBooking[]>([])
  const [loading, setLoading] = useState(true)

  // ======================
  // FETCH BOOKINGS
  // ======================
  useEffect(() => {
    load()
  }, [month, year])

  async function load() {
    setLoading(true)

    const res = await fetch(
      `/api/adminCal?month=${month}&year=${year}`
    )

    const data = await res.json()
    setBookings(data)
    setLoading(false)
  }

  // ======================
  // HELPERS
  // ======================
  function getBooking(day: number) {
    return bookings.find(
      b => b.day === day && b.month === month
    )
  }

  return {
    month,
    year,
    monthNames,
    firstDay,
    daysInMonth,
    bookings,
    loading,
    prevMonth,
    nextMonth,
    getBooking,
  }
}