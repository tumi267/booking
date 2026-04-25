'use client'
import React from 'react'
import { useAdminBookingForm } from '@/app/hooks/useAdminBookingForm'
import BookingHeader from './BookingHeader'
import BookingMeta from './BookingMeta'
import BookingSlots from './BookingSlots'
import BookingFooter from './BookingFooter'
interface BookingItem {
  id: string
  time: string
  date: Date | string
}
interface Props {
  groupId: string
  clientName: string
  contact: string
  providerId: string
  serviceId: string
  sessionDuration: number
  status: string
  date: Date
  totalPrice: number
  items: BookingItem[]
  availableProviders: { id: string; firstName: string; lastName: string }[]
}
function BookingForm(props: Props) {
  const {groupId,providerId,status,date,items,serviceId,sessionDuration,totalPrice,clientName,contact,availableProviders,} = props
  const { formState, setFormState, handleSubmit, submitting } =useAdminBookingForm({groupId,providerId,status,date,items,})
 
  return (
    <form
      className="space-y-6 p-6 border rounded-xl bg-white shadow-sm"
      onSubmit={handleSubmit}
    >
      <BookingHeader clientName={clientName} contact={contact} />
      <BookingMeta
        formState={formState}
        setFormState={setFormState}
        availableProviders={availableProviders}
      />
      <BookingSlots
        formState={formState}
        setFormState={setFormState}
        serviceId={serviceId}
        sessionDuration={sessionDuration}
        groupId={groupId}
      />
      <BookingFooter totalPrice={totalPrice} submitting={submitting} />
    </form>
  )
}

export default BookingForm