'use client'

import { useEffect, useState } from 'react'
import type { BookedDay } from '@/app/types/booking'
import type { OperatingHour } from '@/app/types/availability'

type UseBookingAvailabilityProps = {
  providerId?: string
  year: number
  month: number
}

type DayOverride = {
  id: string
  date: string
  isBlocked: boolean
  createdAt: string
  updatedAt: string
}

type AvailabilityResponse = {
  gethours?: OperatingHour[]
  member?: BookedDay[]
}

export function useBookingAvailability({
  providerId,
  year,
  month,
}: UseBookingAvailabilityProps) {
  const [operatingHours, setOperatingHours] =useState<OperatingHour[]>([])

  const [member, setMember] =useState<BookedDay[]>([])

  const [overrideDates, setOverrideDates] =useState<DayOverride[]>([])

  const [loading, setLoading] =useState(true)

  const [error, setError] =useState<string | null>(null)

  useEffect(() => {
    let cancelled = false

    async function loadAvailability() {
      setLoading(true)
      setError(null)

      try {
        const params = new URLSearchParams()

        if (providerId) {
          params.set('providerId', providerId)
        }

        params.set('year', String(year))
        params.set('month', String(month + 1))

        const [availabilityResponse, overrideResponse] =
          await Promise.all([
            fetch(`/api/publicCal?${params.toString()}`, {
              method: 'GET',
              cache: 'no-store',
            }),

            fetch('/api/getOverwrightenDates', {
              method: 'POST',
              headers: {
                'content-type': 'application/json',
              },
              body: JSON.stringify({
                month: month ,
                year,
              }),
            }),
          ])

        if (!availabilityResponse.ok) {
          throw new Error(
            `Availability API error: ${availabilityResponse.status}`
          )
        }

        if (!overrideResponse.ok) {
          throw new Error(
            `Override API error: ${overrideResponse.status}`
          )
        }

        const data = (await availabilityResponse.json()) as AvailabilityResponse

        const overrides = (await overrideResponse.json()) 

        if (cancelled) {
          return
        }

        setOperatingHours(
          Array.isArray(data.gethours)
            ? data.gethours
            : []
        )

        setMember(
          Array.isArray(data.member)
            ? data.member
            : []
        )

        setOverrideDates(
          Array.isArray(overrides?.res)
            ? overrides.res
            : []
        )
      } catch (error) {
        if (cancelled) {
          return
        }

        setError(
          error instanceof Error
            ? error.message
            : 'Failed to load booking availability'
        )
      } finally {
        if (!cancelled) {
          setLoading(false)
        }
      }
    }

    loadAvailability()

    return () => {
      cancelled = true
    }
  }, [providerId, year, month])

  return {
    operatingHours,
    member,
    overrideDates,
    loading,
    error,
  }
}