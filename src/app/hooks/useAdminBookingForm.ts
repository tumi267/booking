'use client'
import { useState, FormEvent } from 'react'
import { updateBooking } from '../libs/booking/updatebooking'

interface BookingItem {
  id: string
  time: string
  date: Date | string
}

interface UseAdminBookingFormProps {
  groupId: string
  providerId: string
  status: string
  date: Date
  items: BookingItem[]
}

export function useAdminBookingForm({
  groupId,
  providerId,
  status,
  date,
  items,
}: UseAdminBookingFormProps) {
  const [formState, setFormState] = useState({
    providerId,
    status,
    date: new Date(date).toISOString().split('T')[0],
    slots: [...items].sort((a, b) => a.time.localeCompare(b.time)),
  })

  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      setSubmitting(true)

      await updateBooking({
        groupId,
        slots: formState.slots,
        date: new Date(formState.date),
        providerId: formState.providerId,
        status: formState.status,
      })

      console.log('Booking updated')
    } catch (err) {
      console.error('Update failed:', err)
    } finally {
      setSubmitting(false)
    }
  }

  return {
    formState,
    setFormState,
    handleSubmit,
    submitting,
  }
}