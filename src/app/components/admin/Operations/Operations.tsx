'use client'

import React, { useEffect, useState } from 'react'
import Loading from '../../Loading/Loading'


// ==============================
// KPI STATS
// ==============================

const stats = [
  { label: "Today's Bookings", value: '14' },
  { label: 'Pending Confirmations', value: '3' },
  { label: 'Active Providers', value: '8/10' },
  { label: 'Daily Revenue', value: 'R9,450' },
]



// ==============================
// WEEK TYPES
// ==============================

const weekdays = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'] as const

type DayKey = typeof weekdays[number]

type DaySchedule = {
  open: string
  close: string
  working: boolean
}

type WeekSchedule = Record<DayKey, DaySchedule>



export default function OperationsDashboard() {


  // ==============================
  // STATE
  // ==============================

  const [schedule, setSchedule] =
    useState<WeekSchedule | null>(null)

  const today = new Date()

  const [month, setMonth] =
    useState(today.getMonth())

  const [year, setYear] =
    useState(today.getFullYear())

  const [blockedDays, setBlockedDays] =
    useState<string[]>([])



  // ==============================
  // LOAD OPERATING HOURS
  // ==============================

  useEffect(() => {
    loadHours()
  }, [])


  async function loadHours(): Promise<void> {

    const res =
      await fetch("/api/operating-hours")

    const data = await res.json()


    // ---------- seed defaults ----------

    if (!data.length) {

      const defaults = [
        { dayOfWeek: 0, open: "08:00", close: "18:00", working: true },
        { dayOfWeek: 1, open: "08:00", close: "18:00", working: true },
        { dayOfWeek: 2, open: "08:00", close: "18:00", working: true },
        { dayOfWeek: 3, open: "08:00", close: "18:00", working: true },
        { dayOfWeek: 4, open: "08:00", close: "18:00", working: true },
        { dayOfWeek: 5, open: "08:00", close: "13:00", working: false },
        { dayOfWeek: 6, open: "08:00", close: "13:00", working: false },
      ]

      for (const d of defaults) {

        await fetch("/api/operating-hours", {
          method: "POST",
          body: JSON.stringify({
            dayOfWeek: d.dayOfWeek,
            startTime: d.open,
            endTime: d.close,
          }),
        })

        await fetch("/api/operating-hours", {
          method: "PATCH",
          body: JSON.stringify({
            dayOfWeek: d.dayOfWeek,
            isActive: d.working,
          }),
        })

      }

      return loadHours()
    }


    // ---------- map DB to state ----------

    const map: any = {}

    data.forEach((d: any) => {

      const day = weekdays[d.dayOfWeek]

      map[day] = {
        open: d.startTime,
        close: d.endTime,
        working: d.isActive,
      }

    })

    setSchedule(map)
  }



  // ==============================
  // SAVE HOURS
  // ==============================

  const updateTime = async (
    day: DayKey,
    type: "open" | "close",
    value: string
  ) => {

    setSchedule(prev => {

      if (!prev) return prev

      const newDay = {
        ...prev[day],
        [type]: value,
      }

      saveDay(day, newDay)

      return {
        ...prev,
        [day]: newDay,
      }
    })
  }


  async function saveDay(
    day: DayKey,
    d: DaySchedule
  ) {

    const dayIndex =
      weekdays.indexOf(day)

    await fetch("/api/operating-hours", {
      method: "POST",
      body: JSON.stringify({
        dayOfWeek: dayIndex,
        startTime: d.open,
        endTime: d.close,
      }),
    })
  }



  // ==============================
  // TOGGLE WORKING DAY
  // ==============================

  const toggleWorking = async (
    day: DayKey
  ) => {

    setSchedule(prev => {

      if (!prev) return prev

      const newWorking =
        !prev[day].working

      saveToggle(day, newWorking)

      return {
        ...prev,
        [day]: {
          ...prev[day],
          working: newWorking,
        }
      }
    })
  }


  async function saveToggle(
    day: DayKey,
    working: boolean
  ) {

    const dayIndex =
      weekdays.indexOf(day)

    await fetch("/api/operating-hours", {
      method: "PATCH",
      body: JSON.stringify({
        dayOfWeek: dayIndex,
        isActive: working,
      }),
    })
  }



  // ==============================
  // CALENDAR LOGIC
  // ==============================

  // ==============================
  // toggle logic for db and none operating days 
  // ==============================
  const toggleBlockedDay = (
    date: string
  ) => {

    setBlockedDays(prev =>
      prev.includes(date)
        ? prev.filter(d => d !== date)
        : [...prev, date]
    )
  }

  // ==========================
  // get first day and last day
  // ==========================
  const firstDay =
    new Date(year, month, 1).getDay()

  const daysInMonth =
    new Date(year, month + 1, 0).getDate()

  // =========================
  // set days of month and set month
  // =========================
  const prevMonth = () => {

    if (month === 0) {
      setMonth(11)
      setYear(year - 1)
    } else {
      setMonth(month - 1)
    }
  }


  const nextMonth = () => {

    if (month === 11) {
      setMonth(0)
      setYear(year + 1)
    } else {
      setMonth(month + 1)
    }
  }


  const monthNames = [
    'January','February','March','April','May','June',
    'July','August','September','October','November','December'
  ]



  // ==============================
  // LOADING GUARD
  // ==============================

  if (!schedule) {
    return <Loading/>
  }

  // ==============================
  // UI
  // ==============================

  return (

    <div className="space-y-6 p-6">
      {/* KPI */}

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <div key={i} className="p-4 bg-white border rounded-xl shadow-sm">
            <p className="text-sm text-gray-500">
              {stat.label}
            </p>
            <p className="text-2xl font-bold">
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* ---------- OPERATING HOURS ---------- */}

        <div className="bg-white border rounded-xl p-4">

          <h3 className="font-bold mb-4">
            Operating Hours
          </h3>

          {weekdays.map(day => {
            const d = schedule[day]
            return (
              <div
                key={day}
                className="flex gap-2 mb-2 items-center"
              >
                <div className="w-12">
                  {day}
                </div>

                {/* toggle */}

                <input
                  type="checkbox"
                  checked={d.working}
                  onChange={() => toggleWorking(day)}
                />

                {/* open */}

                <input
                  type="time"
                  disabled={!d.working}
                  value={d.open}
                  onChange={(e) =>
                    updateTime(
                      day,
                      'open',
                      e.target.value
                    )
                  }
                  className="border px-2 py-1 rounded"
                />

                <span>-</span>

                {/* close */}

                <input
                  type="time"
                  disabled={!d.working}
                  value={d.close}
                  onChange={(e) =>
                    updateTime(
                      day,
                      'close',
                      e.target.value
                    )
                  }
                  className="border px-2 py-1 rounded"
                />
                {!d.working && (
                  <span className="text-xs text-red-500">
                    Closed
                  </span>
                )}
              </div>
            )
          })}
        </div>



        {/* ---------- CALENDAR ---------- */}

        <div className="bg-white border rounded-xl p-4">

          {/* header */}

          <div className="flex justify-between mb-4">
            <button onClick={prevMonth}>
              ◀
            </button>
            <div className="font-bold">
              {monthNames[month]} {year}
            </div>
            <button onClick={nextMonth}>
              ▶
            </button>
          </div>

          {/* weekdays */}
          <div className="grid grid-cols-7 text-center text-xs mb-1">
            {['Sun','Mon','Tue','Wed','Thu','Fri','Sat'].map(d => (
              <div key={d}>
                {d}
              </div>
            ))}
          </div>
          {/* calendar */}

          <div className="grid grid-cols-7 gap-1 text-center text-sm">

            {/* empty */}
            {Array.from({ length: firstDay }).map((_, i) => (
              <div key={i}></div>
            ))}

            {/* days */}

            {Array.from({
              length: daysInMonth
            }).map((_, i) => {
              const day = i + 1
              const dateString =
                `${year}-${
                  (month + 1)
                  .toString()
                  .padStart(2,'0')
                }-${
                  day
                  .toString()
                  .padStart(2,'0')
                }`
              const blocked =
                blockedDays.includes(
                  dateString
                )
              return (
                <div
                  key={day}
                  onClick={() =>
                    toggleBlockedDay(
                      dateString
                    )
                  }
                  className={`
                    p-2
                    border
                    rounded
                    cursor-pointer
                    ${
                      blocked
                        ? 'bg-red-500 text-white'
                        : 'bg-gray-100'
                    }
                  `}
                >
                  {day}
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}