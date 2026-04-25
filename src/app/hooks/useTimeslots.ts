'use client'

import { useEffect, useState } from 'react'
import { generateTimeSlots } from '@/app/libs/Time/time'

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

interface UseTimeslotsProps {
  slots: BookingItem[]
  providerId: string
  sessionDuration: number
  date: Date | string
  groupId: string
  onChange: (newSlots: BookingItem[]) => void
}

export function useTimeslots({
  slots,
  providerId,
  sessionDuration,
  date,
  groupId,
  onChange,
}: UseTimeslotsProps) {

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
        console.error(error)
      } finally {
        if (mounted) setHoursLoading(false)
      }
    }

    gettime()

    return () => {
      mounted = false
    }
  }, [])

  // 🔥 Generate slots
  useEffect(() => {
    const getdata = async () => {
      if (!times.length) return

      setSlotsLoading(true)

      try {
        const selectedDate = new Date(date)

        // ⚠️ keep your original logic (UTC)
        const jsDay = selectedDate.getUTCDay()
        const dayOfWeek = jsDay === 0 ? 6 : jsDay - 1

        const todaysHours = times.find(t => t.dayOfWeek === dayOfWeek)

        if (!todaysHours) {
          setAllPossibleSlots([])
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

      } catch (err) {
        console.error(err)
      } finally {
        setSlotsLoading(false)
      }
    }

    getdata()
  }, [times, sessionDuration, providerId, date, groupId])

  // 🔥 Selection logic
  const handleTimeClick = (clickedTime: string) => {
    const currentTimes = slots.map(s => s.time)

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

  return {
    allPossibleSlots,
    isLoading: isSlotsLoading || isHoursLoading,
    handleTimeClick,
  }
}