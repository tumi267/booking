'use client'

import React, { useEffect, useState } from 'react'
import { findmemberdata } from '@/app/libs/db/team'
import Loading from '@/app/components/Loading/Loading'

type BookedDay = { date: string; times: string[]; dayOfWeek: number }
type BookingData = {
  serviceId: string
  providerId: string
  team: string
  dates: BookedDay[]
}
interface Props {
  currentStep: number
  step: (newStep: number) => void
  bookingdata: { serviceId: string; providerId: string; team: string; dates: BookedDay[] }
  selectedDate: React.Dispatch<React.SetStateAction<BookingData>>
}

function CustomCalendar({ step, currentStep, selectedDate, bookingdata }: Props) {
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const [month, setMonth] = useState(today.getMonth())
  const [year, setYear] = useState(today.getFullYear())

  const [disabledDays, setDisabledDays] = useState<Date[]>([])
  const [selectedRange, setSelectedRange] = useState<{ from?: Date; to?: Date }>({})
  const [hoverDate, setHoverDate] = useState<Date | null>(null)

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // ✅ FIXED (no timezone bugs)
  const formatDate = (date: Date) => {
    const y = date.getFullYear()
    const m = String(date.getMonth() + 1).padStart(2, '0')
    const d = String(date.getDate()).padStart(2, '0')
    return `${y}-${m}-${d}`
  }

  const parseLocalDate = (dateStr: string) => {
    const [y, m, d] = dateStr.split('-').map(Number)
    return new Date(y, m - 1, d)
  }

  // =========================
  // FETCH DISABLED DAYS
  // =========================
  useEffect(() => {
    const member = findmemberdata(bookingdata.providerId)

    const fetchData = async () => {
      setLoading(true)
      setError(null)

      try {
        const res = await fetch('/api/publicCal')
        if (!res.ok) throw new Error(`API error: ${res.status}`)

        const data = await res.json()
        if (!data?.gethours) throw new Error('Invalid API response')

        const offDays: Date[] = []
        const daysInMonth = new Date(year, month + 1, 0).getDate()

        for (let day = 1; day <= daysInMonth; day++) {
          const date = new Date(year, month, day)
          date.setHours(0, 0, 0, 0)

          const match = data.gethours.find(
            (h: any) => h.dayOfWeek === date.getDay() && !h.isActive
          )

          if (match) offDays.push(date)
        }

        if (member) {
          const fullyBooked = member
            .filter((d: any) => d.times?.length > 0)
            .map((d: any) => parseLocalDate(d.date))

          setDisabledDays([...offDays, ...fullyBooked])
        } else {
          setDisabledDays(offDays)
        }

      } catch (err: any) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [month, year, bookingdata.serviceId])

  // =========================
  // HELPERS
  // =========================
  const isDisabled = (date: Date) => {
    const d = new Date(date)
    d.setHours(0, 0, 0, 0)

    return (
      disabledDays.some(d2 => d2.toDateString() === d.toDateString()) ||
      d < today
    )
  }

  // ✅ SKIPS disabled days instead of blocking
  const buildRange = (start: Date, end: Date) => {
    const range: BookedDay[] = []
    let current = new Date(start)

    while (current <= end) {
      if (!isDisabled(current)) {
        range.push({
          date: formatDate(current),
          times: [],
          dayOfWeek: current.getDay()
        })
      }
      current.setDate(current.getDate() + 1)
    }

    return range
  }

  // =========================
  // CLICK LOGIC (CLEAN UX)
  // =========================
  const handleDayClick = (day: number) => {
    const date = new Date(year, month, day)
    date.setHours(0, 0, 0, 0)

    if (isDisabled(date)) return

    // Start new selection
    if (!selectedRange.from || selectedRange.to) {
      setSelectedRange({ from: date, to: undefined })
    
      selectedDate(prev => ({
        ...prev,
        dates: [{
          date: formatDate(date),
          times: [],
          dayOfWeek: date.getDay()
        }]
      }))
    
      return
    }

    const start = selectedRange.from

    // Reset if clicked before start
    if (date < start) {
      setSelectedRange({ from: date, to: undefined })
      return
    }

    const range = buildRange(start, date)

    setSelectedRange({ from: start, to: date })

    selectedDate({
      ...bookingdata,
      dates: range
    })
  }

  // =========================
  // GRID SETUP
  // =========================
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const firstDayOfWeek = new Date(year, month, 1).getDay()

  const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1)
  const blanks = Array.from({ length: firstDayOfWeek })

  if (loading) return <Loading />
  if (error) return <div className="p-4 text-red-500">{error}</div>

  return (
    <div className="w-full p-4 border  shadow">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-4">
        <button onClick={() => setMonth(m => m - 1)}>Prev</button>

        <h3 className="font-semibold text-lg">
          {new Date(year, month).toLocaleString('default', {
            month: 'long',
            year: 'numeric'
          })}
        </h3>

        <button onClick={() => setMonth(m => m + 1)}>Next</button>
      </div>

      {/* DAYS HEADER */}
      <div className="grid grid-cols-7 text-center mb-2 text-gray-500 font-semibold">
        {['Sun','Mon','Tue','Wed','Thu','Fri','Sat'].map(d => (
          <div key={d}>{d}</div>
        ))}
      </div>

      {/* CALENDAR */}
      <div className="grid grid-cols-7 gap-1">
        {blanks.map((_, i) => <div key={i} />)}

        {daysArray.map(day => {
          const date = new Date(year, month, day)
          date.setHours(0, 0, 0, 0)

          const disabled = isDisabled(date)

          const isToday =
            date.toDateString() === today.toDateString()

          const isStart =
            selectedRange.from &&
            date.toDateString() === selectedRange.from.toDateString()

          const isEnd =
            selectedRange.to &&
            date.toDateString() === selectedRange.to.toDateString()

          const inRange =
            selectedRange.from &&
            selectedRange.to &&
            date >= selectedRange.from &&
            date <= selectedRange.to

          const inHoverRange =
            selectedRange.from &&
            !selectedRange.to &&
            hoverDate &&
            date >= selectedRange.from &&
            date <= hoverDate &&
            !isDisabled(date)

          return (
            <div
              key={day}
              onClick={() => handleDayClick(day)}
              onMouseEnter={() => setHoverDate(date)}
              onMouseLeave={() => setHoverDate(null)}
              className={`
                p-2 min-h-[80px]  text-center cursor-pointer
                transition-all duration-200

                ${disabled
                  ? 'bg-gray-200 text-gray-400 line-through cursor-not-allowed'
                  : 'hover:bg-blue-100 hover:scale-105'
                }

                ${inRange ? 'bg-blue-300 text-white' : ''}
                ${inHoverRange ? 'bg-blue-200' : ''}

                ${isStart || isEnd ? 'bg-blue-600 text-white font-bold scale-110' : ''}

                ${isToday ? 'border-2 border-red-500' : ''}
              `}
            >
              {day}
            </div>
          )
        })}
      </div>

      {/* NAV */}
      <div className="flex justify-center gap-6 mt-4">
        <button onClick={() => step(currentStep - 1)} className="px-6 py-2 bg-gray-300 hover:bg-gray-400 rounded-md transition">Prev</button>

        <button
          disabled={!bookingdata.dates.length}
          onClick={() => step(currentStep + 1)}
          className={`px-6 py-2 rounded-md transition 
                    bg-blue-600 hover:bg-blue-700 text-white`}
        >
          Next
        </button>
      </div>
    </div>
  )
}

export default CustomCalendar