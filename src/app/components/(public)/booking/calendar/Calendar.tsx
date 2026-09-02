'use client'

import React, {useMemo,useState,} from 'react'
import Loading from '@/app/components/Loading/Loading'
import type {BookedDay,BookingData,} from '@/app/types/booking'
import { useBookingAvailability } from '@/app/hooks/useBookingAvailability'
import { buildDateRange, formatLocalDate, getDaysInMonth, isSameLocalDay, parseLocalDate, startOfLocalDay } from '@/app/utils/date'

interface Props {
  currentStep: number
  step: (newStep: number) => void
  bookingdata: BookingData
  onSelectDates: (
    dates: BookedDay[]
  ) => void
}

export default function Calendar({currentStep,step,bookingdata,onSelectDates,}: Props) {
  const today =useMemo(() =>startOfLocalDay(new Date()),[])
  const [month,setMonth,] = useState(today.getMonth())
  const [year,setYear,] = useState(today.getFullYear())
  const [selectedRange,setSelectedRange,] = useState<{
    from?: Date
    to?: Date
  }>({})
  const [hoverDate,setHoverDate,] = useState<Date | null>(null)
  const {operatingHours,member,loading,error,} =useBookingAvailability({providerId:bookingdata.providerId,year,month,})

  // --------------------------------
  // DISABLED DAYS
  // --------------------------------

  const disabledDays =useMemo(() => {const result: Date[] = []
  const daysInMonth =getDaysInMonth(year,month)
      for (let day = 1;day <= daysInMonth;day++) {
  const date =startOfLocalDay(new Date(year,month,day))
  const hour = operatingHours.find(item =>item.dayOfWeek ===date.getDay() &&item.isActive === false)
        if (hour) {result.push(date)}
      }
  const fullyBooked =member.filter(day =>day.times &&day.times.length > 0).map(day => parseLocalDate(day.date))
      return [...result,...fullyBooked,]
    },[operatingHours,member,year,month,])

  // --------------------------------
  // DATE DISABLED
  // --------------------------------

  const isDisabled = (date: Date) => {
  const current = startOfLocalDay(date)
  const disabled =disabledDays.some(disabledDate =>isSameLocalDay(disabledDate,current))

  return (disabled ||current < today)
  }

  // --------------------------------
  // RANGE SELECTION
  // --------------------------------

  const handleDayClick = (day: number) => {
  const date =startOfLocalDay(new Date(year,month,day))
    if (isDisabled(date)) {
      return
    }

    // Start a new selection
    if (!selectedRange.from ||selectedRange.to
    ) {
      setSelectedRange({from: date,to: undefined,})
      onSelectDates([
        {
          date:formatLocalDate(date),
          times: [],
          dayOfWeek:date.getDay(),
        },
      ])
      return
    }

    const start = selectedRange.from

    // Click before start
    if (date < start) {setSelectedRange({from: date,to: undefined,})
      onSelectDates([
        {
          date:formatLocalDate(date),
          times: [],
          dayOfWeek:
          date.getDay(),
        },
      ])

      return
    }
    const range =buildDateRange(start,date,isDisabled)
    setSelectedRange({from: start,to: date,})
    onSelectDates(range)
  }

  // --------------------------------
  // MONTH NAVIGATION
  // --------------------------------

  const handlePreviousMonth =
    () => {
      if (month === 0) {
        setMonth(11)
        setYear(currentYear =>currentYear - 1
        )
        return
      }

      setMonth(currentMonth =>currentMonth - 1
      )
    }

  const handleNextMonth =
    () => {
      if (month === 11) {
        setMonth(0)
        setYear(currentYear =>currentYear + 1
        )
        return
      }
      setMonth(currentMonth =>currentMonth + 1)
    }

  // --------------------------------
  // CALENDAR GRID
  // --------------------------------
  const daysInMonth =getDaysInMonth(year,month)
  const firstDayOfWeek =new Date(year,month,1).getDay()
  const daysArray =Array.from(
      {
        length:daysInMonth,
      },
      (_, index) =>index + 1
    )

  const blanks =Array.from({length:firstDayOfWeek,
    })

  // --------------------------------
  // LOADING / ERROR
  // --------------------------------
  if (loading) {
    return <Loading />
  }
  if (error) {
    return (
      <div className="p-4 text-red-500">{error}</div>
    )
  }

  // --------------------------------
  // UI
  // --------------------------------

  return (
    <div className="w-full p-4 border shadow">
      {/* MONTH HEADER */}

      <div className="flex justify-between items-center mb-4">
        <button type="button" onClick={handlePreviousMonth} className="px-3 py-2 rounded hover:bg-gray-100">Prev</button>

        <h3 className="font-semibold text-lg">{new Date(year,month).toLocaleString('default',{month: 'long',year: 'numeric',})}</h3>

        <button type="button" onClick={handleNextMonth} className="px-3 py-2 rounded hover:bg-gray-100">Next</button>

      </div>

      {/* DAYS HEADER */}

      <div className="grid grid-cols-7 text-center mb-2 text-gray-500 font-semibold">
        {['Sun','Mon','Tue','Wed','Thu','Fri','Sat',].map(day => (
          <div key={day}>
            {day}
          </div>
        ))}
      </div>

      {/* CALENDAR */}

      <div className="grid grid-cols-7 gap-1">
        {blanks.map((_, index) => (<div key={`blank-${index}`}/>))}
        {daysArray.map(day => {
          const date =startOfLocalDay(new Date(year,month,day))
          const disabled =isDisabled(date)
          const isToday =isSameLocalDay(date,today)
          const isStart =selectedRange.from &&isSameLocalDay(date,selectedRange.from)
          const isEnd =selectedRange.to &&isSameLocalDay(date,selectedRange.to)
          const inRange = selectedRange.from &&selectedRange.to &&date >= selectedRange.from &&date <= selectedRange.to
          const inHoverRange = selectedRange.from && !selectedRange.to && hoverDate && date >=selectedRange.from && date <= hoverDate &&!isDisabled(date)

          return (
            <div  key={day} onClick={() => handleDayClick(day)} onMouseEnter={() =>setHoverDate(date)} onMouseLeave={() => setHoverDate(null)}
              className={`p-2 min-h-[80px] text-center cursor-pointer transition-all duration-200
                ${disabled? `bg-gray-200 text-gray-400 line-through cursor-not-allowed` : `hover:bg-blue-100 hover:scale-105`}
                ${inRange? `bg-blue-300 text-white`: ''}
                ${inHoverRange? `bg-blue-200`: ''}
                ${isStart ||isEnd? `bg-blue-600 text-white font-bold scale-110 `: ''}
                ${isToday ? `border-2 border-red-500` : ''}`}
            >
              {day}
            </div>
          )
        })}

      </div>

      {/* NAVIGATION */}

      <div className="flex justify-center gap-6 mt-4">

        <button type="button" onClick={() =>step(currentStep - 1)}
          className="px-6 py-2 bg-gray-300 hover:bg-gray-400 rounded-md transition ">
          Prev
        </button>

        <button type="button" disabled={!bookingdata.dates.length}
          onClick={() =>step(currentStep + 1)}
          className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition disabled:bg-gray-400 disabled:cursor-not-allowed">
          Next
        </button>
      </div>
    </div>
  )
}