'use client'

import {
  useEffect,
  useState,
} from 'react'

import type {
  BookedDay,
} from '@/app/types/booking'

import type {
  OperatingHour,
} from '@/app/types/availability'

type UseBookingAvailabilityProps = {
  providerId?: string
  year: number
  month: number
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
  const [operatingHours, setOperatingHours] =
    useState<OperatingHour[]>([])

  const [member, setMember] =
    useState<BookedDay[]>([])

  const [loading, setLoading] =
    useState(true)

  const [error, setError] =
    useState<string | null>(null)

  useEffect(() => {
    let cancelled = false

    async function loadAvailability() {
      setLoading(true)
      setError(null)

      try {
        const params =
          new URLSearchParams()

        if (providerId) {
          params.set(
            'providerId',
            providerId
          )
        }

        params.set(
          'year',
          String(year)
        )

        params.set(
          'month',
          String(month + 1)
        )

        const response =
          await fetch(
            `/api/publicCal?${params.toString()}`,
            {
              method: 'GET',
              cache: 'no-store',
            }
          )

        if (!response.ok) {
          throw new Error(
            `API error: ${response.status}`
          )
        }

        const data =
          (await response.json()) as AvailabilityResponse

        if (!data) {
          throw new Error(
            'Invalid API response'
          )
        }

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
  }, [
    providerId,
    year,
    month,
  ])

  return {
    operatingHours,
    member,
    loading,
    error,
  }
}