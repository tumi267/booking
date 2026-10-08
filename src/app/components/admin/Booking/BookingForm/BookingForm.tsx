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
  user: {
    id: string
    role: string
  }
}
function BookingForm(props: Props) {
  const {groupId,providerId,status,date,items,serviceId,sessionDuration,totalPrice,clientName,contact,availableProviders,user} = props
  const { formState, setFormState, handleSubmit, submitting } =useAdminBookingForm({groupId,providerId,status,date,items,})
console.log(formState)
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
      <BookingFooter totalPrice={totalPrice} submitting={submitting} user={user.role} />
    </form>
  )
}

export default BookingForm