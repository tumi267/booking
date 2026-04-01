'use client'
import React, { useEffect, useState } from 'react'
import { findmemberdata } from '@/app/libs/db/team'

type BookedDay = { date: string; times: string[]; dayOfWeek: number }

interface Props {
  currentStep: number
  step: (newStep: number) => void
  bookingdata: { id: string; team: string; dates: BookedDay[] }
  selectedDate: (value: { id: string; team: string; dates: BookedDay[] }) => void
}

const ALL_SLOTS = ["08:00", "09:00", "12:00", "14:00", "15:00"]

function CustomCalendar({ step, currentStep, selectedDate, bookingdata }: Props) {
  const today = new Date()
  const [month, setMonth] = useState(today.getMonth())
  const [year, setYear] = useState(today.getFullYear())
  const [disabledDays, setDisabledDays] = useState<Date[]>([])
  const [selectedRange, setSelectedRange] = useState<{ from?: Date; to?: Date }>({})

  // Fetch disabled/fully booked days
  useEffect(() => {
    const member = findmemberdata(bookingdata.id)
    const fetchData = async () => {
      try {
        const res = await fetch('/api/publicCal')
        const data = await res.json()
        if (!data) return
        const offDays = data.gethours.filter((e: any) => !e.isActive)
          .map((d: any) => {
            const day = new Date()
            day.setDate(day.getDate() + d.dayOfWeek) // approximate weekday
            return day
          })
        setDisabledDays(offDays)
      } catch (err) {
        console.error(err)
      }
    }
    fetchData()

    if (!member) return

    const fullyBooked = member
      .filter(day => day.times && ALL_SLOTS.every(slot => day.times.includes(slot)))
      .map(day => new Date(day.date))
    setDisabledDays(prev => [...prev, ...fullyBooked])
  }, [bookingdata.id])

  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const firstDayOfWeek = new Date(year, month, 1).getDay()
  const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1)
  const blanks = Array.from({ length: firstDayOfWeek }, (_, i) => i)

  const isDisabled = (date: Date) => {
    return disabledDays.some(d => d.toDateString() === date.toDateString()) || date < today
  }

  const handleDayClick = (day: number) => {
    const date = new Date(year, month, day)
    if (isDisabled(date)) return

    // Select range
    if (!selectedRange.from || (selectedRange.from && selectedRange.to)) {
      setSelectedRange({ from: date, to: undefined })
      selectedDate({ ...bookingdata, dates: [{ date: date.toISOString().split("T")[0], times: [], dayOfWeek: date.getDay() }] })
    } else if (selectedRange.from && !selectedRange.to) {
      // Prevent selecting disabled days in range
      const start = selectedRange.from
      const end = date < start ? start : date
      const startDate = date < start ? date : start

      const rangeArray: BookedDay[] = []
      let current = new Date(startDate)
      while (current <= end) {
        if (!isDisabled(current)) {
          rangeArray.push({ date: current.toISOString().split("T")[0], times: [], dayOfWeek: current.getDay() })
        }
        current.setDate(current.getDate() + 1)
      }
      setSelectedRange({ from: startDate, to: end })
      selectedDate({ ...bookingdata, dates: rangeArray })
    }
  }

  const changeMonth = (offset: number) => {
    const newDate = new Date(year, month + offset, 1)
    setMonth(newDate.getMonth())
    setYear(newDate.getFullYear())
    setSelectedRange({})
  }

  return (
    <div className="w-full p-4 border rounded-lg shadow">
      <div className="flex justify-between items-center mb-4">
        <button onClick={() => changeMonth(-1)}>Prev</button>
        <h3 className="font-semibold">{`${year} - ${month + 1}`}</h3>
        <button onClick={() => changeMonth(1)}>Next</button>
      </div>

      <div className="grid grid-cols-7 text-center mb-2 text-gray-500 font-semibold">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => (
          <div key={d}>{d}</div>
        ))}
      </div>

      <div className="grid grid-cols-7 text-center gap-1">
        {blanks.map(b => <div key={`b-${b}`} />)}
        {daysArray.map(day => {
          const date = new Date(year, month, day)
          const disabled = isDisabled(date)
          const isToday = date.toDateString() === today.toDateString()
          const inRange =
            selectedRange.from &&
            selectedRange.to &&
            date >= selectedRange.from &&
            date <= selectedRange.to
          const isStart = selectedRange.from && date.toDateString() === selectedRange.from.toDateString()
          const isEnd = selectedRange.to && date.toDateString() === selectedRange.to.toDateString()

          return (
            <div
              key={day}
              onClick={() => handleDayClick(day)}
              className={`
                cursor-pointer p-2 
                min-h-[80px]
                ${disabled ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'hover:bg-blue-100'}
                ${isToday ? 'border border-red-500 font-bold' : ''}
                ${inRange ? 'bg-blue-300 text-white' : ''}
                ${isStart ? 'bg-blue-500 text-white ' : ''}
                ${isEnd ? 'bg-blue-500 text-white ' : ''}
              `}
            >
              {day}
            </div>
          )
        })}
      </div>

      <div className="flex gap-6 justify-center mt-4">
        <button onClick={() => step(currentStep - 1)} className="px-4 py-2 bg-gray-300 hover:bg-gray-400">Prev</button>
        <button
          disabled={!bookingdata.dates.length}
          onClick={() => step(currentStep + 1)}
          className={`px-4 py-2  ${bookingdata.dates.length ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}
        >
          Next
        </button>
      </div>
    </div>
  )
}

export default CustomCalendar
