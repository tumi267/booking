'use client'

import Loading from '@/app/components/Loading/Loading'
import React, { useEffect, useState } from 'react'

type BookedDay = {
  date: string
  times: string[]
  dayOfWeek: number
}

type Hours = {
  dayOfWeek: number
  startTime: string
  endTime: string
}
type BookingData = {
  serviceId: string
  providerId: string
  team: string
  dates: BookedDay[]
}
interface Props {
  currentStep: number
  step: (newStep: number) => void
  selectedDate: React.Dispatch<React.SetStateAction<BookingData>>
  bookingdata: {
    serviceId: string; providerId: string;
    team: string
    dates: BookedDay[]
  }
  service: number
}

function Time({
  step,
  currentStep,
  selectedDate,
  bookingdata,
  service
}: Props) {
  const [times, setTimes] = useState<Hours[]>([])
  const [ALL_SLOTS, setHours] = useState<string[]>([])
  const [selecteddate, setSelectedDate] = useState(0)

  // ✅ better loading handling
  const [loading, setLoading] = useState(true)

  const { dates } = bookingdata
  const interval = service

  // =========================
  // FETCH ONCE ONLY
  // =========================
  useEffect(() => {
    let mounted = true

    const gettime = async () => {
      try {
        const res = await fetch('/api/operating-hours')
        if (!res.ok) throw new Error('Request failed')

        const data = await res.json()

        if (mounted) {
          setTimes(data) // ✅ store all
        }
      } catch (error) {
        console.log(error)
      } finally {
        if (mounted) setLoading(false)
      }
    }

    gettime()

    return () => {
      mounted = false
    }
  }, [])

  // =========================
  // GENERATE SLOTS ONLY WHEN NEEDED
  // =========================
  useEffect(() => {
    if (!times.length || !dates.length) return

    const selected = dates[selecteddate]
    if (!selected) return

    const match = times.find(
      t => t.dayOfWeek === selected.dayOfWeek
    )

    if (match) {
      createtimeslots(match.startTime, match.endTime)
    } else {
      setHours([])
    }
  }, [selecteddate, times, dates])

  // =========================
  // HELPERS
  // =========================
  const updateTimes = (newTimes: string[]) => {
    const newDates = dates.map((d, i) => {
      if (i !== selecteddate) return d

      return {
        ...d,
        times: newTimes
      }
    })

    selectedDate(prev => ({
      ...prev,
      dates: newDates
    }))
  }

  const handleTimeChange = (time: string) => {
    const currentTimes = dates[selecteddate]?.times || []

    // 1️⃣ start
    if (currentTimes.length === 0) {
      updateTimes([time])
      return
    }

    // 2️⃣ range
    if (currentTimes.length === 1) {
      const start = currentTimes[0]
      const end = time

      const startIndex = ALL_SLOTS.indexOf(start)
      const endIndex = ALL_SLOTS.indexOf(end)

      if (startIndex === -1 || endIndex === -1) return

      const [from, to] =
        startIndex < endIndex
          ? [startIndex, endIndex]
          : [endIndex, startIndex]

      const range = ALL_SLOTS.slice(from, to + 1)

      updateTimes(range)
      return
    }

    // 3️⃣ reset
    updateTimes([time])
  }

  const createtimeslots = (start: string, end: string) => {
    const slots: string[] = []

    const [startHour, startMin] = start.split(':').map(Number)
    const [endHour, endMin] = end.split(':').map(Number)

    const current = new Date()
    current.setHours(startHour, startMin, 0, 0)

    const endDate = new Date()
    endDate.setHours(endHour, endMin, 0, 0)

    while (current < endDate) { // ✅ fixed overflow
      const hours = String(current.getHours()).padStart(2, '0')
      const minutes = String(current.getMinutes()).padStart(2, '0')

      slots.push(`${hours}:${minutes}`)
      current.setMinutes(current.getMinutes() + interval)
    }

    setHours(slots)
  }

  const handleDateChange = (index: number) => {
    setSelectedDate(index)
  }

  // =========================
  // UI
  // =========================
if(loading) return <Loading/>
  return (
    <div className={`p-4 space-y-6 ${loading ? 'opacity-50 pointer-events-none' : ''}`}>

      {/* LOADING OVERLAY (no flicker) */}
      

      {/* DATE SELECT */}
      <div>
        <h2 className="text-lg font-semibold mb-2">Select Date</h2>

        <div className="flex gap-2 flex-wrap">
          {dates.map((d, i) => (
            <button
              key={i}
              onClick={() => handleDateChange(i)}
              className={`px-4 py-2 rounded-lg border transition
                ${
                  selecteddate === i
                    ? 'bg-black text-white'
                    : 'bg-white hover:bg-gray-100'
                }`}
            >
              {d.date}
            </button>
          ))}
        </div>
      </div>

      {/* TIME SLOTS */}
      <div>
        <h2 className="text-lg font-semibold mb-2">
          Select Time {dates[selecteddate]?.times.length === 1 && '(Select end time)'}
        </h2>

        <div className="grid grid-cols-3 gap-2">
          {ALL_SLOTS.map((slot, i) => {
            const isSelected =
              dates[selecteddate]?.times.includes(slot)

            return (
              <button
                key={i}
                onClick={() => handleTimeChange(slot)}
                className={`p-2 rounded-lg border transition
                  ${
                    isSelected
                      ? 'bg-blue-600 text-white'
                      : 'bg-white hover:bg-gray-100'
                  }`}
              >
                {slot}
              </button>
            )
          })}
        </div>
      </div>

      {/* ACTIONS */}
      <div className="flex justify-center gap-6 mt-4">
        <button
          onClick={() => step(currentStep - 1)}
          className="px-6 py-2 bg-gray-300 hover:bg-gray-400 rounded-md transition"
        >
          Prev
        </button>

        <button
          disabled={!dates[selecteddate]?.times.length}
          onClick={() => step(currentStep + 1)}
          className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition"
        >
          Next
        </button>
      </div>
    </div>
  )
}

export default Time
