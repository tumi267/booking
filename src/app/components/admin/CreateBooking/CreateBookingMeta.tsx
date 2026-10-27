'use client'

import React from 'react'
import Timeslots from '../Booking/BookingForm/Timeslots'


interface BookingItem {
  id: string
  time: string
  date: Date | string
}

interface FormState {
  providerId: string
  serviceId: string
  date: string
  time: string
  slots: BookingItem[]
}

interface Props {
  formState: FormState
  setFormState: React.Dispatch<React.SetStateAction<any>>
  availableServices: any[]
}

function CreateBookingMeta({
  formState,
  setFormState,
  availableServices,
}: Props) {
  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    const { name, value } = e.target

    setFormState((prev: any) => ({
      ...prev,
      [name]: value,
      ...(name === 'serviceId' || name === 'providerId'
        ? { providerId: name === 'providerId' ? value : '', time: '', slots: [] }
        : name === 'date'
        ? { time: '', slots: [] }
        : {}),
    }))
  }

  const selectedService = availableServices.find(
    (service: any) => service.id === formState.serviceId
  )

  return (
    <section className="space-y-4">
      <h3 className="font-semibold">Appointment Details</h3>

      <select
        name="serviceId"
        value={formState.serviceId}
        onChange={handleChange}
        className="w-full rounded-lg border p-3"
        required
      >
        <option value="">Select service</option>

        {availableServices.map((service: any) => (
          <option key={service.id} value={service.id}>
            {service.name}
          </option>
        ))}
      </select>

      {selectedService && (
        <select
          name="providerId"
          value={formState.providerId}
          onChange={handleChange}
          className="w-full rounded-lg border p-3"
          required
        >
          <option value="">Select provider</option>

          {selectedService.assignedTeam?.map((provider: any) => (
            <option key={provider.id} value={provider.id}>
              {provider.firstName} {provider.lastName}
            </option>
          ))}
        </select>
      )}

      <input
        type="date"
        name="date"
        value={formState.date}
        onChange={handleChange}
        min={new Date().toISOString().split('T')[0]}
        className="w-full rounded-lg border p-3"
        required
      />

      {formState.providerId && formState.date && selectedService && (
        <div className="space-y-3">
          <h4 className="font-medium">Available Times</h4>

          <Timeslots
            slots={formState.slots}
            providerId={formState.providerId}
            serviceId={formState.serviceId}
            sessionDuration={selectedService.duration}
            date={formState.date}
            groupId=""
            onChange={(newSlots) => {
              setFormState((prev: any) => ({
                ...prev,
                slots: newSlots,
                time: newSlots[0]?.time ?? '',
              }))
            }}
          />
        </div>
      )}
    </section>
  )
}

export default CreateBookingMeta

