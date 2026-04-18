'use client'
import { useState } from "react"
export function useCalendar() {
  const today = new Date()
  const [month, setMonth] = useState(today.getMonth())
  const [year, setYear] = useState(today.getFullYear())
  const [blockedDays, setBlockedDays] = useState<string[]>([])
  // TOGGLE BLOCKED DAY
  function toggleBlockedDay(date: string) {
    setBlockedDays(prev =>
      prev.includes(date)
        ? prev.filter(d => d !== date)
        : [...prev, date]
    )
  }
  // NAVIGATION
  function prevMonth() {
    setMonth(prev => {
      if (prev === 0) {
        setYear(y => y - 1)
        return 11
      }
      return prev - 1
    })
  }
  function nextMonth() {
    setMonth(prev => {
      if (prev === 11) {
        setYear(y => y + 1)
        return 0
      }
      return prev + 1
    })
  }
  // DERIVED VALUES
  const firstDay = new Date(year, month, 1).getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const monthNames = [
    'January','February','March','April','May','June',
    'July','August','September','October','November','December'
  ]
  return {
    month,
    year,
    blockedDays,
    firstDay,
    daysInMonth,
    monthNames,
    toggleBlockedDay,
    prevMonth,
    nextMonth,
  }
}