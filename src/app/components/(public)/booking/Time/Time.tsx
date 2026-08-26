'use client'

import Loading from '@/app/components/Loading/Loading'
import React, { useEffect, useState } from 'react'

import type {
  BookedDay,
  BookingData,
} from '@/app/types/booking'

type Hours = {
  dayOfWeek: number
  startTime: string
  endTime: string
}

interface Props {
  currentStep: number
  step: (newStep: number) => void
  bookingdata: BookingData
  service: number
  onSelectDates: (dates: BookedDay[]) => void
}

export default function Time({
  step,
  currentStep,
  bookingdata,
  service,
  onSelectDates,
}: Props) {
  const [times, setTimes] = useState<Hours[]>([])
  const [allSlots, setAllSlots] = useState<string[]>([])
  const [selectedDate, setSelectedDate] = useState(0)
  const [loading, setLoading] = useState(true)

  const { dates } = bookingdata
  const interval = service

  // --------------------------------
  // GET OPERATING HOURS
  // --------------------------------

  useEffect(() => {
    let mounted = true

    const getTimes = async () => {
      try {
        const response = await fetch(
          '/api/operating-hours'
        )

        if (!response.ok) {
          throw new Error('Failed to load operating hours')
        }

        const data = await response.json()

        if (mounted) {
          setTimes(data)
        }
      } catch (error) {
        console.error(error)
      } finally {
        if (mounted) {
          setLoading(false)
        }
      }
    }

    getTimes()

    return () => {
      mounted = false
    }
  }, [])

  // --------------------------------
  // GENERATE TIME SLOTS
  // --------------------------------

  useEffect(() => {
    if (!times.length || !dates.length) {
      setAllSlots([])
      return
    }

    const selected = dates[selectedDate]

    if (!selected) {
      setAllSlots([])
      return
    }

    const match = times.find(
      (time) =>
        time.dayOfWeek === selected.dayOfWeek
    )

    if (!match) {
      setAllSlots([])
      return
    }

    createTimeSlots(
      match.startTime,
      match.endTime
    )
  }, [selectedDate, times, dates, interval])

  // --------------------------------
  // CREATE TIME SLOTS
  // --------------------------------

  const createTimeSlots = (
    start: string,
    end: string
  ) => {
    const slots: string[] = []

    const [
      startHour,
      startMinute,
    ] = start.split(':').map(Number)

    const [
      endHour,
      endMinute,
    ] = end.split(':').map(Number)

    const current = new Date()

    current.setHours(
      startHour,
      startMinute,
      0,
      0
    )

    const endDate = new Date()

    endDate.setHours(
      endHour,
      endMinute,
      0,
      0
    )

    while (current < endDate) {
      const hours = String(
        current.getHours()
      ).padStart(2, '0')

      const minutes = String(
        current.getMinutes()
      ).padStart(2, '0')

      slots.push(`${hours}:${minutes}`)

      current.setMinutes(
        current.getMinutes() + interval
      )
    }

    setAllSlots(slots)
  }

  // --------------------------------
  // UPDATE SELECTED DATE TIMES
  // --------------------------------

  const updateTimes = (
    newTimes: string[]
  ) => {
    const newDates = dates.map(
      (date, index) => {
        if (index !== selectedDate) {
          return date
        }

        return {
          ...date,
          times: newTimes,
        }
      }
    )

    onSelectDates(newDates)
  }

  // --------------------------------
  // SELECT TIME
  // --------------------------------

  const handleTimeChange = (
    time: string
  ) => {
    const currentTimes =
      dates[selectedDate]?.times || []

    // First click = start time
    if (currentTimes.length === 0) {
      updateTimes([time])
      return
    }

    // Second click = end time
    if (currentTimes.length === 1) {
      const start = currentTimes[0]
      const end = time

      const startIndex =
        allSlots.indexOf(start)

      const endIndex =
        allSlots.indexOf(end)

      if (
        startIndex === -1 ||
        endIndex === -1
      ) {
        return
      }

      const [from, to] =
        startIndex < endIndex
          ? [startIndex, endIndex]
          : [endIndex, startIndex]

      const range = allSlots.slice(
        from,
        to + 1
      )

      updateTimes(range)

      return
    }

    // Third click = start a new selection
    updateTimes([time])
  }

  // --------------------------------
  // CHANGE DATE
  // --------------------------------

  const handleDateChange = (
    index: number
  ) => {
    setSelectedDate(index)
  }

  // --------------------------------
  // LOADING
  // --------------------------------

  if (loading) {
    return <Loading />
  }

  // --------------------------------
  // UI
  // --------------------------------

  return (
    <div className="p-4 space-y-6">

      {/* DATE SELECT */}

      <div>
        <h2 className="text-lg font-semibold mb-2">
          Select Date
        </h2>

        <div className="flex gap-2 flex-wrap">
          {dates.map((date, index) => (
            <button
              key={index}
              onClick={() =>
                handleDateChange(index)
              }
              className={`
                px-4 py-2
                rounded-lg
                border
                transition

                ${
                  selectedDate === index
                    ? 'bg-black text-white'
                    : 'bg-white hover:bg-gray-100'
                }
              `}
            >
              {date.date}
            </button>
          ))}
        </div>
      </div>

      {/* TIME SLOTS */}

      <div>
        <h2 className="text-lg font-semibold mb-2">
          Select Time

          {dates[selectedDate]?.times.length ===
            1 && (
            ' (Select end time)'
          )}
        </h2>

        <div className="grid grid-cols-3 gap-2">
          {allSlots.map((slot) => {
            const isSelected =
              dates[selectedDate]?.times.includes(
                slot
              )

            return (
              <button
                key={slot}
                onClick={() =>
                  handleTimeChange(slot)
                }
                className={`
                  p-2
                  rounded-lg
                  border
                  transition

                  ${
                    isSelected
                      ? 'bg-blue-600 text-white'
                      : 'bg-white hover:bg-gray-100'
                  }
                `}
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
          onClick={() =>
            step(currentStep - 1)
          }
          className="
            px-6 py-2
            bg-gray-300
            hover:bg-gray-400
            rounded-md
            transition
          "
        >
          Prev
        </button>

        <button
          disabled={
            !dates[selectedDate]?.times.length
          }
          onClick={() =>
            step(currentStep + 1)
          }
          className="
            px-6 py-2
            bg-blue-600
            hover:bg-blue-700
            text-white
            rounded-md
            transition
            disabled:opacity-50
            disabled:cursor-not-allowed
          "
        >
          Next
        </button>

      </div>

    </div>
  )
}