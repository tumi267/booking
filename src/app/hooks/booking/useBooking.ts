'use client'

import { useAuth } from '@clerk/nextjs'
import { useState } from 'react'

import type {BookedDay,BookingData,Service,TeamMember,} from '@/app/types/booking'

const initialBookingData: BookingData = {
  serviceId: '',
  providerId: '',
  team: '',
  dates: [],
}

export function useBooking() {
  const { userId } = useAuth()
  const [step, setStep] = useState(0)
  const [bookingData, setBookingData] =useState<BookingData>(initialBookingData)
  const [selectedService, setSelectedService] =useState<Service | null>(null)
  const [selectedDuration, setSelectedDuration] =useState(0)
  const [assignedTeam, setAssignedTeam] =useState<TeamMember[]>([])
  const [submitting, setSubmitting] =useState(false)

  // --------------------------------
  // NAVIGATION
  // --------------------------------

  const goToStep = (newStep: number) => {setStep(newStep)}

  const nextStep = () => {setStep((current) => current + 1)}

  const previousStep = () => {setStep((current) => current - 1)}

  // --------------------------------
  // SELECT SERVICE
  // --------------------------------

  const selectService = (service: Service) => {
    setSelectedService(service)
    setSelectedDuration(service.duration)
    setAssignedTeam(service.assignedTeam ?? [])
    setBookingData({
      serviceId: service.id,
      providerId: '',
      team: '',
      dates: [],
    })
  }

  // --------------------------------
  // SELECT TEAM MEMBER
  // --------------------------------

  const selectTeamMember = (member: TeamMember) => {
    setBookingData((current) => ({
      ...current,
      providerId: member.id,
      team: `${member.firstName} ${member.lastName}`,
    }))
  }

  // --------------------------------
  // SELECT DATES
  // --------------------------------

  const selectDates = (dates: BookedDay[]) => {
    setBookingData((current) => ({...current,dates,}))
  }

  // --------------------------------
  // CALCULATE TOTAL
  // --------------------------------

  const getTotal = () => {
    if (!selectedService) {
      return 0
    }

    return bookingData.dates.reduce(
      (total, day) =>
        total +
        day.times.length *
        selectedService.price,
      0
    )
  }

  // --------------------------------
  // VALIDATE BOOKING
  // --------------------------------

  const isBookingValid = () => {
    return (
      bookingData.dates.length > 0 &&bookingData.dates.every((day) => day.times.length > 0)
    )
  }

  // --------------------------------
  // CONFIRM BOOKING
  // --------------------------------

  const confirmBooking = async () => {
    if (!selectedService) {
      throw new Error('No service selected')
    }
    if (!isBookingValid()){throw new Error('Please select a time for every date')
    }
    if (!userId) {throw new Error('You must be logged in to book')
    }

    setSubmitting(true)

    try {
      const total = getTotal()
      const response = await fetch('/api/booking',{
          method: 'POST',
          headers: {
            'content-type': 'application/json',
          },
          body: JSON.stringify({
            bookingdata: {
              ...bookingData,
              total,
              clientId: userId,
              sessionDuration:selectedService.duration,
              servicename:selectedService.name,
            },
          }),
        }
      )
      const data = await response.json()
      if (!response.ok) {
        throw new Error(
          data.error ||
            'Booking submission failed'
        )
      }
      // console.log(data)
      payfast(data)

    } catch (error) {
      console.error('Booking submission failed:',error)
      throw error
    } finally {
      setSubmitting(false)
    }
  }
  // --------------------------------
  // UPDATE BOOKING
  // --------------------------------
  const updateBooking = async (data: any) => {
    setSubmitting(true)
  
    try {
      const response = await fetch('/api/paybooking', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          groupId: data.groupId,
        }),
      })
  
      const payfastData = await response.json()
  
      if (!response.ok) {
        throw new Error(
          payfastData.error || 'Unable to create payment'
        )
      }
  
      // Server has already calculated the amount
      // and created the PayFast payload.
      // console.log(payfastData)
      payfast(payfastData)
    } catch (error) {
      console.error(
        'Booking payment failed:',
        error
      )
  
      throw error
    } finally {
      setSubmitting(false)
    }
  }
  // --------------------------------
  // RETURN
  // --------------------------------

  return {
    // navigation
    step,goToStep,nextStep,previousStep,
    // booking state
    bookingData,selectedService,selectedDuration,assignedTeam,
    // submission
    submitting,
    // actions
    selectService,selectTeamMember,selectDates,
    // helpers
    getTotal,isBookingValid,
    // submit
    confirmBooking,updateBooking
  }
}

const payfast=(data:any)=>{
        // --------------------------------
      // PAYFAST
      // --------------------------------

      const form =document.createElement('form')
      form.method = 'POST'
      form.action ='https://sandbox.payfast.co.za/eng/process'
      const payfastData = {
        ...data,
      }
      Object.entries(payfastData).forEach(
        ([key, value]) => {
          if (value === undefined ||value === null ||value === '') {
            return
          }
          const input = document.createElement('input')
          input.type = 'hidden'
          input.name = key
          input.value = String(value)
          form.appendChild(input)
        }
      )
      document.body.appendChild(form)
      form.submit()
}