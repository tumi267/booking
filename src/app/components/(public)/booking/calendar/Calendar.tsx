'use client'

import Loading from '@/app/components/Loading/Loading'
import React, { useEffect, useState } from 'react'

import { findmemberdata } from '@/app/libs/db/team'

import type {
  BookedDay,
  BookingData,
} from '@/app/types/booking'

interface Props {
  currentStep: number
  step: (newStep: number) => void
  bookingdata: BookingData
  onSelectDates: (dates: BookedDay[]) => void
}

export default function Calendar({
  currentStep,
  step,
  bookingdata,
  onSelectDates,
}: Props) {
  const today = new Date()

  today.setHours(0, 0, 0, 0)

  const [month, setMonth] = useState(
    today.getMonth()
  )

  const [year, setYear] = useState(
    today.getFullYear()
  )

  const [disabledDays, setDisabledDays] =
    useState<Date[]>([])

  const [selectedRange, setSelectedRange] =
    useState<{
      from?: Date
      to?: Date
    }>({})

  const [hoverDate, setHoverDate] =
    useState<Date | null>(null)

  const [loading, setLoading] =
    useState(false)

  const [error, setError] =
    useState<string | null>(null)

  // --------------------------------
  // DATE HELPERS
  // --------------------------------

  const formatDate = (date: Date) => {
    const y = date.getFullYear()

    const m = String(
      date.getMonth() + 1
    ).padStart(2, '0')

    const d = String(
      date.getDate()
    ).padStart(2, '0')

    return `${y}-${m}-${d}`
  }

  const parseLocalDate = (
    dateString: string
  ) => {
    const [year, month, day] =
      dateString
        .split('-')
        .map(Number)

    return new Date(
      year,
      month - 1,
      day
    )
  }

  // --------------------------------
  // FETCH DISABLED DAYS
  // --------------------------------

  useEffect(() => {
    const member = findmemberdata(
      bookingdata.providerId
    )

    const fetchCalendarData = async () => {
      setLoading(true)
      setError(null)

      try {
        const response = await fetch(
          '/api/publicCal'
        )

        if (!response.ok) {
          throw new Error(
            `API error: ${response.status}`
          )
        }

        const data =
          await response.json()

        if (!data?.gethours) {
          throw new Error(
            'Invalid API response'
          )
        }

        const offDays: Date[] = []

        const daysInMonth =
          new Date(
            year,
            month + 1,
            0
          ).getDate()

        for (
          let day = 1;
          day <= daysInMonth;
          day++
        ) {
          const date = new Date(
            year,
            month,
            day
          )

          date.setHours(
            0,
            0,
            0,
            0
          )

          const isClosed =
            data.gethours.find(
              (hour: any) =>
                hour.dayOfWeek ===
                  date.getDay() &&
                !hour.isActive
            )

          if (isClosed) {
            offDays.push(date)
          }
        }

        if (member) {
          const fullyBooked =
            member
              .filter(
                (day: any) =>
                  day.times?.length > 0
              )
              .map((day: any) =>
                parseLocalDate(
                  day.date
                )
              )

          setDisabledDays([
            ...offDays,
            ...fullyBooked,
          ])
        } else {
          setDisabledDays(
            offDays
          )
        }
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : 'Failed to load calendar'
        )
      } finally {
        setLoading(false)
      }
    }

    fetchCalendarData()
  }, [
    month,
    year,
    bookingdata.serviceId,
    bookingdata.providerId,
  ])

  // --------------------------------
  // CHECK IF DATE IS DISABLED
  // --------------------------------

  const isDisabled = (
    date: Date
  ) => {
    const current = new Date(date)

    current.setHours(
      0,
      0,
      0,
      0
    )

    const disabled =
      disabledDays.some(
        disabledDate =>
          disabledDate.toDateString() ===
          current.toDateString()
      )

    return (
      disabled ||
      current < today
    )
  }

  // --------------------------------
  // BUILD DATE RANGE
  // --------------------------------

  const buildRange = (
    start: Date,
    end: Date
  ): BookedDay[] => {
    const range: BookedDay[] = []

    const current =
      new Date(start)

    while (current <= end) {
      if (!isDisabled(current)) {
        range.push({
          date: formatDate(
            current
          ),
          times: [],
          dayOfWeek:
            current.getDay(),
        })
      }

      current.setDate(
        current.getDate() + 1
      )
    }

    return range
  }

  // --------------------------------
  // HANDLE DATE CLICK
  // --------------------------------

  const handleDayClick = (
    day: number
  ) => {
    const date = new Date(
      year,
      month,
      day
    )

    date.setHours(
      0,
      0,
      0,
      0
    )

    if (isDisabled(date)) {
      return
    }

    // Start a new selection
    if (
      !selectedRange.from ||
      selectedRange.to
    ) {
      setSelectedRange({
        from: date,
        to: undefined,
      })

      onSelectDates([
        {
          date: formatDate(date),
          times: [],
          dayOfWeek:
            date.getDay(),
        },
      ])

      return
    }

    const start =
      selectedRange.from

    // Clicked before start date
    if (date < start) {
      setSelectedRange({
        from: date,
        to: undefined,
      })

      onSelectDates([
        {
          date: formatDate(date),
          times: [],
          dayOfWeek:
            date.getDay(),
        },
      ])

      return
    }

    const range =
      buildRange(
        start,
        date
      )

    setSelectedRange({
      from: start,
      to: date,
    })

    onSelectDates(range)
  }

  // --------------------------------
  // MONTH NAVIGATION
  // --------------------------------

  const handlePreviousMonth =
    () => {
      if (month === 0) {
        setMonth(11)
        setYear(
          currentYear =>
            currentYear - 1
        )
      } else {
        setMonth(
          currentMonth =>
            currentMonth - 1
        )
      }
    }

  const handleNextMonth =
    () => {
      if (month === 11) {
        setMonth(0)
        setYear(
          currentYear =>
            currentYear + 1
        )
      } else {
        setMonth(
          currentMonth =>
            currentMonth + 1
        )
      }
    }

  // --------------------------------
  // CALENDAR GRID
  // --------------------------------

  const daysInMonth =
    new Date(
      year,
      month + 1,
      0
    ).getDate()

  const firstDayOfWeek =
    new Date(
      year,
      month,
      1
    ).getDay()

  const daysArray =
    Array.from(
      {
        length:
          daysInMonth,
      },
      (_, index) =>
        index + 1
    )

  const blanks =
    Array.from({
      length:
        firstDayOfWeek,
    })

  // --------------------------------
  // LOADING / ERROR
  // --------------------------------

  if (loading) {
    return <Loading />
  }

  if (error) {
    return (
      <div className="p-4 text-red-500">
        {error}
      </div>
    )
  }

  // --------------------------------
  // UI
  // --------------------------------

  return (
    <div className="w-full p-4 border shadow">

      {/* MONTH HEADER */}

      <div className="flex justify-between items-center mb-4">

        <button
          type="button"
          onClick={
            handlePreviousMonth
          }
          className="px-3 py-2 rounded hover:bg-gray-100"
        >
          Prev
        </button>

        <h3 className="font-semibold text-lg">
          {new Date(
            year,
            month
          ).toLocaleString(
            'default',
            {
              month: 'long',
              year: 'numeric',
            }
          )}
        </h3>

        <button
          type="button"
          onClick={
            handleNextMonth
          }
          className="px-3 py-2 rounded hover:bg-gray-100"
        >
          Next
        </button>

      </div>

      {/* DAYS HEADER */}

      <div
        className="
          grid grid-cols-7
          text-center
          mb-2
          text-gray-500
          font-semibold
        "
      >
        {[
          'Sun',
          'Mon',
          'Tue',
          'Wed',
          'Thu',
          'Fri',
          'Sat',
        ].map(day => (
          <div key={day}>
            {day}
          </div>
        ))}
      </div>

      {/* CALENDAR */}

      <div
        className="
          grid
          grid-cols-7
          gap-1
        "
      >

        {blanks.map(
          (_, index) => (
            <div
              key={`blank-${index}`}
            />
          )
        )}

        {daysArray.map(day => {

          const date =
            new Date(
              year,
              month,
              day
            )

          date.setHours(
            0,
            0,
            0,
            0
          )

          const disabled =
            isDisabled(date)

          const isToday =
            date.toDateString() ===
            today.toDateString()

          const isStart =
            selectedRange.from &&
            date.toDateString() ===
              selectedRange.from.toDateString()

          const isEnd =
            selectedRange.to &&
            date.toDateString() ===
              selectedRange.to.toDateString()

          const inRange =
            selectedRange.from &&
            selectedRange.to &&
            date >=
              selectedRange.from &&
            date <=
              selectedRange.to

          const inHoverRange =
            selectedRange.from &&
            !selectedRange.to &&
            hoverDate &&
            date >=
              selectedRange.from &&
            date <= hoverDate &&
            !isDisabled(date)

          return (
            <div
              key={day}
              onClick={() =>
                handleDayClick(day)
              }
              onMouseEnter={() =>
                setHoverDate(date)
              }
              onMouseLeave={() =>
                setHoverDate(null)
              }
              className={`
                p-2
                min-h-[80px]
                text-center
                cursor-pointer
                transition-all
                duration-200

                ${
                  disabled
                    ? `
                      bg-gray-200
                      text-gray-400
                      line-through
                      cursor-not-allowed
                    `
                    : `
                      hover:bg-blue-100
                      hover:scale-105
                    `
                }

                ${
                  inRange
                    ? `
                      bg-blue-300
                      text-white
                    `
                    : ''
                }

                ${
                  inHoverRange
                    ? `
                      bg-blue-200
                    `
                    : ''
                }

                ${
                  isStart ||
                  isEnd
                    ? `
                      bg-blue-600
                      text-white
                      font-bold
                      scale-110
                    `
                    : ''
                }

                ${
                  isToday
                    ? `
                      border-2
                      border-red-500
                    `
                    : ''
                }
              `}
            >
              {day}
            </div>
          )
        })}

      </div>

      {/* NAVIGATION */}

      <div className="flex justify-center gap-6 mt-4">

        <button
          type="button"
          onClick={() =>
            step(
              currentStep - 1
            )
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
          type="button"
          disabled={
            !bookingdata.dates.length
          }
          onClick={() =>
            step(
              currentStep + 1
            )
          }
          className={`
            px-6 py-2
            rounded-md
            transition
            text-white

            ${
              bookingdata.dates.length
                ? `
                  bg-blue-600
                  hover:bg-blue-700
                `
                : `
                  bg-gray-400
                  cursor-not-allowed
                `
            }
          `}
        >
          Next
        </button>

      </div>

    </div>
  )
}