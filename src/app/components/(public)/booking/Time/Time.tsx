'use client'
import React, { useState } from 'react'

type BookedDay = {
  date: string
  times: string[]
}

interface Props {
  currentStep: number
  step: (newStep: number) => void
  selectedDate: (value: {
    id: string
    team: string
    dates: BookedDay[]
  }) => void
  bookingdata: {
    id: string
    team: string
    dates: BookedDay[]
  }
}

function Time({ step, currentStep, selectedDate, bookingdata }: Props) {
  const ALL_SLOTS = ["08:00", "09:00", "12:00", "14:00", "15:00"]
  const { dates } = bookingdata

  const [selecteddate, setSelectedDate] = useState(0)

  const handleTimeChange = (time: string) => {
    const newDates = dates.map((d, i) => {
      if (i !== selecteddate) return d

      if (d.times.includes(time)) return d

      return {
        ...d,
        times: [...d.times, time]
      }
    })

    selectedDate({
      ...bookingdata,
      dates: newDates
    })
  }

  return (
    <div>
      Time

      {dates.map((d, i) => (
        <div key={i} onClick={() => setSelectedDate(i)}>
          {d.date}
        </div>
      ))}

      {ALL_SLOTS.map((slot, i) => (
        <div key={i} onClick={() => handleTimeChange(slot)}>
          {slot}
        </div>
      ))}

      <button
        disabled={!dates[selecteddate]?.times.length}
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

export default Time
