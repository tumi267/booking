'use client'

import React, {useEffect,useMemo,useState,} from 'react'

import Loading from '@/app/components/Loading/Loading'

import type {BookedDay,BookingData,} from '@/app/types/booking'
import type {OperatingHour,} from '@/app/types/availability'
import { generateTimeSlots, selectTimeRange } from '@/app/utils/time'

interface Props {
  currentStep: number
  step: (newStep: number) => void
  bookingdata: BookingData
  service: number
  onSelectDates: (
    dates: BookedDay[]
  ) => void
}

export default function Time({step,currentStep,bookingdata,service,onSelectDates,}: Props) {
  const [times, setTimes] =useState<OperatingHour[]>([])

  const [loading, setLoading] = useState(true)

  const [selectedDate,setSelectedDate,] = useState(0)

  const { dates } = bookingdata

  const interval = service

  // --------------------------------
  // GET OPERATING HOURS
  // --------------------------------

  useEffect(() => {
    let cancelled = false
    async function getTimes() {
      setLoading(true)
      try {
        const response = await fetch('/api/operating-hours',
            {
              method: 'GET',
              cache: 'no-store',
            }
          )

        if (!response.ok) {
          throw new Error(
            'Failed to load operating hours'
          )
        }

        const data =(await response.json()) as OperatingHour[]

        if (!cancelled &&Array.isArray(data)) { setTimes(data)}
      } catch (error) {console.error('Failed to load operating hours:',error)
      } finally {
        if (!cancelled) {setLoading(false)
        }
      }
    }

    getTimes()

    return () => {
      cancelled = true
    }
  }, [])

  // --------------------------------
  // KEEP SELECTED DATE VALID
  // --------------------------------

  useEffect(() => {
    if (!dates.length) {
      setSelectedDate(0)
      return
    }

    if (selectedDate >=dates.length
    ) {
      setSelectedDate(dates.length - 1)
    }
  }, [dates,selectedDate,])

  // --------------------------------
  // GENERATE SLOTS
  // --------------------------------

  const allSlots =
    useMemo(() => {
      if (
        !times.length ||
        !dates.length
      ) {
        return []
      }

      const selected =
        dates[selectedDate]

      if (!selected) {
        return []
      }

      const match =
        times.find(
          time =>
            time.dayOfWeek ===
            selected.dayOfWeek &&
            time.isActive !== false
        )

      if (!match) {
        return []
      }

      return generateTimeSlots(
        match.startTime,
        match.endTime,
        interval
      )
    }, [
      times,
      dates,
      selectedDate,
      interval,
    ])

  // --------------------------------
  // UPDATE SELECTED DATE
  // --------------------------------

  const updateTimes = (
    newTimes: string[]
  ) => {
    const newDates =
      dates.map(
        (date, index) => {
          if (
            index !==
            selectedDate
          ) {
            return date
          }

          return {
            ...date,
            times: newTimes,
          }
        }
      )

    onSelectDates(
      newDates
    )
  }

  // --------------------------------
  // SELECT TIME
  // --------------------------------

  const handleTimeChange = (
    time: string
  ) => {
    const currentTimes =
      dates[
        selectedDate
      ]?.times ?? []

    const nextTimes =
      selectTimeRange(
        currentTimes,
        time,
        allSlots
      )

    updateTimes(
      nextTimes
    )
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
          {dates.map(
            (date, index) => (
              <button
                type="button"
                key={date.date}
                onClick={() =>
                  handleDateChange(
                    index
                  )
                }
                className={`
                  px-4 py-2
                  rounded-lg
                  border
                  transition

                  ${
                    selectedDate ===
                    index
                      ? 'bg-black text-white'
                      : 'bg-white hover:bg-gray-100'
                  }
                `}
              >
                {date.date}
              </button>
            )
          )}
        </div>
      </div>

      {/* TIME SLOTS */}

      <div>
        <h2 className="text-lg font-semibold mb-2">
          Select Time

          {dates[
            selectedDate
          ]?.times.length ===
            1 && (
            ' (Select end time)'
          )}
        </h2>

        {allSlots.length ===
        0 ? (
          <p className="text-gray-500">
            No times available for
            this date.
          </p>
        ) : (
          <div className="grid grid-cols-3 gap-2">
            {allSlots.map(
              slot => {
                const isSelected =
                  dates[
                    selectedDate
                  ]?.times.includes(
                    slot
                  )

                return (
                  <button
                    type="button"
                    key={slot}
                    onClick={() =>
                      handleTimeChange(
                        slot
                      )
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
              }
            )}
          </div>
        )}
      </div>

      {/* ACTIONS */}

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
            !dates[
              selectedDate
            ]?.times.length
          }
          onClick={() =>
            step(
              currentStep + 1
            )
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