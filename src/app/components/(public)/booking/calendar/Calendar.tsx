'use client'
import React, { useEffect, useState } from 'react'
import { DayPicker, DateRange } from "react-day-picker"
import "react-day-picker/style.css"
import { findmemberdata } from '@/app/libs/db/team'

/* ---------- TYPES ---------- */

type BookedDay = { date: string; times: string[] }


interface Props {
  currentStep: number
  step: (newStep: number) => void
  bookingdata: { id: string; team: string; dates: BookedDay[] }
  selectedDate: (value: { id: string; team: string; dates: BookedDay[] }) => void
}

/* ---------- CONSTANTS ---------- */

// Define all possible time slots in system
// operating hours split across day
const ALL_SLOTS = ["08:00", "09:00", "12:00", "14:00", "15:00"]

/* ---------- COMPONENT ---------- */

function Calendar({ step, currentStep, selectedDate, bookingdata }: Props) {

  const [selected, setSelected] = useState<DateRange | undefined>()
  const [datesNotAvailable, setDatesNotAvailable] = useState<Date[]>([])

  /* ---------- DISABLE FULLY BOOKED DAYS ---------- */

  useEffect(() => {
    const member = findmemberdata(bookingdata.id)
    if (!member) return

    // A day is unavailable ONLY if all slots are taken
    
    const fullyBookedDates = member.filter((day) => {
    if (!day.times || day.times.length === 0) return false

    // Check that every system slot is included in booked times
    return ALL_SLOTS.every(slot => day.times.includes(slot))
  })
  .map(day => new Date(day.date))


    setDatesNotAvailable(fullyBookedDates)

  }, [bookingdata.id])

  /* ---------- HELPERS ---------- */

  const getDatesInRange = (from: Date, to: Date): string[] => {
    const dates: string[] = []
    let current = new Date(from)

    while (current <= to) {
      dates.push(current.toISOString().split("T")[0])
      current.setDate(current.getDate() + 1)
    }

    return dates
  }

  const rangeIncludesDisabled = (
    from: Date,
    to: Date,
    disabledDates: Date[]
  ) => {
    let current = new Date(from)

    while (current <= to) {
      const isDisabled = disabledDates.some(
        d => d.toDateString() === current.toDateString()
      )

      if (isDisabled) return true

      current.setDate(current.getDate() + 1)
    }

    return false
  }

  /* ---------- HANDLE RANGE SELECTION ---------- */

  const handleDateChange = (range: DateRange | undefined) => {
    if (!range?.from || !range.to) return

    // Prevent selecting range that contains fully booked days
    if (rangeIncludesDisabled(range.from, range.to, datesNotAvailable)) {
      alert("Selected range includes unavailable dates.")
      return
    }

    setSelected(range)

    const allDates = getDatesInRange(range.from, range.to)

    const structuredDates: BookedDay[] = allDates.map(date => ({
      date,
      times: [] // user selects times in next step
    }))

    selectedDate({
      ...bookingdata,
      dates: structuredDates
    })
  }

  /* ---------- UI ---------- */

  return (
    <div>

      <DayPicker
        mode="range"
        selected={selected}
        onSelect={handleDateChange}
        disabled={[
          ...datesNotAvailable,
          { before: new Date() } // disable past dates
        ]}
        footer={
          selected?.from
            ? selected.to
              ? `Selected: ${selected.from.toLocaleDateString()} → ${selected.to.toLocaleDateString()}`
              : `Start: ${selected.from.toLocaleDateString()}`
            : "Pick a date range."
        }
      />

      <button
        disabled={!bookingdata.dates.length}
        onClick={() => step(currentStep + 1)}
      >
        Next
      </button>

      <button onClick={() => step(currentStep - 1)}>
        Prev
      </button>

    </div>
  )
}

export default Calendar

