'use client'

import React, { useEffect, useState } from 'react'
import { generateTimeSlots } from '@/app/libs/Time/time'
import Loading from '@/app/components/Loading/Loading'

type Hours = {
  dayOfWeek: number
  startTime: string
  endTime: string
}

interface BookingItem {
  id: string
  time: string
  date: Date | string
}

interface TimeslotsProps {
  slots: BookingItem[]
  providerId: string
  serviceId: string
  sessionDuration: number
  date: Date | string
  groupId: string
  onChange: (newSlots: BookingItem[]) => void
}

function Timeslots({
  slots,
  providerId,
  serviceId,
  sessionDuration,
  date,
  groupId,
  onChange
}: TimeslotsProps) {

  const [allPossibleSlots, setAllPossibleSlots] = useState<string[]>([])
  const [times, setTimes] = useState<Hours[]>([])
  const [isSlotsLoading, setSlotsLoading] = useState(false)
  const [isHoursLoading, setHoursLoading] = useState(false)

  // 🔥 Fetch operating hours
  useEffect(() => {
    let mounted = true

    const gettime = async () => {
      setHoursLoading(true)
      try {
        const res = await fetch('/api/operating-hours')
        const data = await res.json()

        if (mounted) setTimes(data)
      } catch (error) {
        console.log(error)
      } finally {
        if (mounted) setHoursLoading(false)
      }
    }

    gettime()

    return () => {
      mounted = false
    }
  }, [])

  // 🔥 Generate slots based on date + hours
  useEffect(() => {
    const getdata = async () => {
      if (!times.length) return

      setSlotsLoading(true)

      const selectedDate = new Date(date)
      const jsDay = selectedDate.getUTCDay()
      const dayOfWeek = jsDay === 0 ? 6 : jsDay - 1
      const todaysHours = times.find(t => t.dayOfWeek === dayOfWeek)

      if (!todaysHours) {
        setAllPossibleSlots([])
        setSlotsLoading(false)
        return
      }

      const generated = await generateTimeSlots(
        todaysHours.startTime,
        todaysHours.endTime,
        sessionDuration,
        providerId,
        date,
        groupId
      )

      setAllPossibleSlots(generated)
      setSlotsLoading(false)
    }

    getdata()
  }, [times, sessionDuration, providerId, date, groupId])

  // 🔥 Handle selection
  const handleTimeClick = (clickedTime: string) => {
    const currentTimes = slots.map(s => s.time)

    // Start new selection
    if (currentTimes.length !== 1) {
      onChange([{ id: 'new-0', time: clickedTime, date }])
      return
    }

    const startIndex = allPossibleSlots.indexOf(currentTimes[0])
    const endIndex = allPossibleSlots.indexOf(clickedTime)

    const [from, to] =
      startIndex < endIndex
        ? [startIndex, endIndex]
        : [endIndex, startIndex]

    const range = allPossibleSlots.slice(from, to + 1)

    const updatedSlots = range.map((time, i) => {
      if (slots[i]) return { ...slots[i], time }
      return { id: `new-${i}`, time, date }
    })

    onChange(updatedSlots)
  }

  if (isSlotsLoading || isHoursLoading) return <Loading />

  if (!allPossibleSlots.length) {
    return <p className="text-sm text-gray-500">Closed</p>
  }

  return (
    <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
      {allPossibleSlots.map((time) => {
        const isSelected = slots.some(s => s.time === time)

        return (
          <button
            key={time}
            type="button"
            onClick={() => handleTimeClick(time)}
            className={`p-2 text-xs font-bold rounded-lg border transition-all
              ${isSelected
                ? 'bg-blue-600 text-white border-blue-600'
                : 'bg-white text-gray-700 hover:border-blue-300'
              }
            `}
          >
            {time}
          </button>
        )
      })}
    </div>
  )
}

export default Timeslots