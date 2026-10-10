'use client'

import React from 'react'
import { useCreateBooking } from '@/app/hooks/useCreateBooking'

import CreateBookingHeader from './CreateBookingHeader'
import CreateBookingClient from './CreateBookingClient'
import CreateBookingMeta from './CreateBookingMeta'
import CreateBookingFooter from './CreateBookingFooter'

interface Props {
  onClose: () => void
}

function CreateBookingForm({ onClose }: Props) {
  const { formState, setFormState,handleSubmit,submitting,error,services} = useCreateBooking({ onSuccess: onClose })
  useCreateBooking({ onSuccess: onClose })
  console.log(services)
  return (
    <form
      className="space-y-6 p-6"
      onSubmit={handleSubmit}
    >
      <CreateBookingHeader onClose={onClose} />

      <CreateBookingClient
        formState={formState}
        setFormState={setFormState}
      />

      <CreateBookingMeta
        formState={formState}
        setFormState={setFormState}
        availableServices={services}
      />

      {error && (
        <p role="alert" className="text-sm text-red-600">
          {error}
        </p>
      )}

      <CreateBookingFooter
        submitting={submitting}
        onClose={onClose}
      />
    </form>
  )
}

export default CreateBookingForm
