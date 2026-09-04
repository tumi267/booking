'use client'

import {useEffect,useState,} from 'react'

export type BookingSearchResult = {
  id: string
  groupId: string
  date: string
  time: string
  status: string
  price: number
  sessionDuration: number

  client: {
    id: string
    firstName: string
    lastName: string
    email: string
    phone: string | null
  } | null

  provider: {
    id: string
    firstName: string
    lastName: string
  }

  services: {
    id: string
    name: string
  }
}

export function useBookingSearch(search: string) {
  const [results,setResults,] = useState<BookingSearchResult[]>([])

  const [loading,setLoading,] = useState(false)

  const [error,setError,] = useState<string | null>(null)

  useEffect(() => {
    const query =search.trim()

    if (!query) {
      setResults([])
      setLoading(false)
      setError(null)
      return
    }

    const controller =new AbortController()

    const timeout =setTimeout(
        async () => {
          try {
            setLoading(true)
            setError(null)

            const response =await fetch(`/api/adminsearch?q=${encodeURIComponent(query)}`,
                {
                  cache: "no-store",
                  signal:
                    controller.signal,
                }
              )

            if (!response.ok) {
              throw new Error(
                "Failed to search bookings"
              )
            }

            const data =await response.json()

            setResults(data)
          } catch (error) {
            if (
              error instanceof DOMException &&
              error.name ==="AbortError"
            ) {
              return
            }

            console.error("Booking search error:",error)

            setError("Failed to search bookings")
          } finally {
            if (!controller.signal.aborted) {
              setLoading(false)
            }
          }
        },
        400
      )

    return () => {
        clearTimeout(timeout)
        controller.abort()
    }
  }, [search])

  return {results,loading,error,}
}