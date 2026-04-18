'use client'

import { useEffect, useState } from "react"
import { loadOperatingHours } from "@/app/libs/operating-hours/logic"
import {
  toggleOperatingDay,
  updateOperatingTime
} from "@/app/libs/operating-hours/actions"

const weekdays = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'] as const

export type DayKey = typeof weekdays[number]

export type DaySchedule = {
  open: string
  close: string
  working: boolean
}

export type WeekSchedule = Record<DayKey, DaySchedule>

export function useOperatingHours() {
  // ======================
  // STATE
  // ======================
  const [schedule, setSchedule] = useState<WeekSchedule | null>(null)
  const [blockedDays, setBlockedDays] = useState<string[]>([])

  // ======================
  // LOAD DATA
  // ======================
  useEffect(() => {
    load()
  }, [])

  async function load() {
    const data = await loadOperatingHours()
    setSchedule(data)
  }

  // ======================
  // UPDATE TIME
  // ======================
  async function updateTime(
    day: DayKey,
    type: "open" | "close",
    value: string
  ) {
    setSchedule(prev => {
      if (!prev) return prev

      const updated = {
        ...prev[day],
        [type]: value,
      }

      updateOperatingTime(
        weekdays.indexOf(day),
        type,
        value,
        prev[day]
      )

      return {
        ...prev,
        [day]: updated,
      }
    })
  }

  // ======================
  // TOGGLE WORKING DAY
  // ======================
  async function toggleWorking(day: DayKey) {
    setSchedule(prev => {
      if (!prev) return prev

      const newValue = !prev[day].working

      toggleOperatingDay(
        weekdays.indexOf(day),
        prev[day].working
      )

      return {
        ...prev,
        [day]: {
          ...prev[day],
          working: newValue,
        },
      }
    })
  }

  // ======================
  // CALENDAR BLOCKING
  // ======================
  function toggleBlockedDay(date: string) {
    setBlockedDays(prev =>
      prev.includes(date)
        ? prev.filter(d => d !== date)
        : [...prev, date]
    )
  }

  // ======================
  // RETURN API
  // ======================
  return {
    schedule,
    blockedDays,
    updateTime,
    toggleWorking,
    toggleBlockedDay,
  }
}