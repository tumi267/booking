'use client'

import { useEffect, useState } from 'react'
import { fetchServices } from '../libs/service/service'

export interface CreateBookingState {
  firstName: string
  lastName: string
  contactNumber: string
  email: string
  providerId: string
  serviceId: string
  date: string
  time: string
}

interface Props {
  onSuccess: () => void
}

const initialState: CreateBookingState = {
  firstName: '',
  lastName: '',
  contactNumber: '',
  email: '',
  providerId: '',
  serviceId: '',
  date: '',
  time: '',
}

export function useCreateBooking({ onSuccess }: Props) {
  const [formState, setFormState] =useState<CreateBookingState>(initialState)
  const [services,setServices]=useState([])
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  useEffect(()=>{
    const getservice=async()=>{
      const service=await fetchServices()
      setServices(service)
    }
    getservice()
  },[])
  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault()

    setSubmitting(true)
    setError(null)

    try {
      const response = await fetch('/api/admin/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formState),
      })

      const result = await response.json()

      if (!response.ok) {
        setError(result.error ?? 'Failed to create booking')
        return
      }

      setFormState(initialState)
      onSuccess()
    } catch (err) {
      console.error('Create booking error:', err)
      setError('Unable to create booking. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return {
    formState,
    setFormState,
    handleSubmit,
    submitting,
    error,
    services
  }
}
