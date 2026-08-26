'use client'

import React from 'react'

import Service from '../service/Service'
import Team from '../team/Team'
import Calendar from '../calendar/Calendar'
import Time from '../Time/Time'
import Summary from '../summery/Summery'

import type { Service as ServiceType } from '@/app/types/booking'
import { useBooking } from '@/app/hooks/booking/useBooking'

interface Props {
  data: ServiceType[]
}

export default function Bookingmain({
  data,
}: Props) {
  const booking = useBooking()

  // --------------------------------
  // CURRENT PANEL
  // --------------------------------

  const renderPanel = () => {
    switch (booking.step) {

      // ==============================
      // SERVICE
      // ==============================

      case 0:
        return (
          <Service
            currentStep={booking.step}
            step={booking.goToStep}
            service={data}
            bookingdata={
              booking.bookingData
            }
            onSelectService={
              booking.selectService
            }
          />
        )

      // ==============================
      // TEAM
      // ==============================

      case 1:
        return (
          <Team
            currentStep={booking.step}
            step={booking.goToStep}
            bookingdata={
              booking.bookingData
            }
            team={
              booking.assignedTeam
            }
            onSelectMember={
              booking.selectTeamMember
            }
          />
        )

      // ==============================
      // CALENDAR
      // ==============================

      case 2:
        return (
            <Calendar
            currentStep={booking.step}
            step={booking.goToStep}
            bookingdata={booking.bookingData}
            onSelectDates={booking.selectDates}
          />
        )

      // ==============================
      // TIME
      // ==============================

      case 3:
        return (
          <Time
            currentStep={booking.step}
            step={booking.goToStep}
            bookingdata={
              booking.bookingData
            }
            service={
              booking.selectedDuration
            }
            onSelectDates={
              booking.selectDates
            }
          />
        )

      // ==============================
      // SUMMARY
      // ==============================

      case 4:

        if (
          !booking.selectedService
        ) {
          return null
        }

        return (
          <Summary
            currentStep={booking.step}
            step={booking.goToStep}
            bookingdata={
              booking.bookingData
            }
            selectedservice={
              booking.selectedService
            }
            onConfirm={
              booking.confirmBooking
            }
            submitting={
              booking.submitting
            }
          />
        )

      // ==============================
      // FALLBACK
      // ==============================

      default:
        return (
          <Service
            currentStep={booking.step}
            step={booking.goToStep}
            service={data}
            bookingdata={
              booking.bookingData
            }
            onSelectService={
              booking.selectService
            }
          />
        )
    }
  }

  return (
    <div className="w-full">
      {renderPanel()}
    </div>
  )
}