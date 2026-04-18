'use client'

import React from 'react'
import Link from 'next/link'
import Loading from '@/app/components/Loading/Loading'
import { useAdminCalendar } from '@/app/hooks/useAdminCalendar'
import styles from './Calendar.module.css'

function Calendar() {
  const {month,year,monthNames,firstDay,daysInMonth,loading,prevMonth,nextMonth,getBooking}=useAdminCalendar()
  const today = new Date()
  if (loading) return <Loading />
  return (
    <div className={styles.wrapper}>
      {/* HEADER */}
      <div className={styles.selector}>
        <button onClick={prevMonth}>Prev</button>
        <h3>
          {monthNames[month]} {year}
        </h3>
        <button onClick={nextMonth}>Next</button>
      </div>
      {/* LABELS */}
      <div className={styles.day_labels}>
        {['Sun','Mon','Tue','Wed','Thu','Fri','Sat'].map(d => (
          <div key={d} className={styles.label}>{d}</div>
        ))}
      </div>
      {/* GRID */}
      <div className={styles.day_grid}>
        {/* empty slots */}
        {Array.from({ length: firstDay }).map((_, i) => (
          <div key={i} className={styles.blank} />
        ))}
        {/* days */}
        {Array.from({ length: daysInMonth }).map((_, i) => {
          const day = i + 1
          const isToday =
            day === today.getDate() &&
            month === today.getMonth() &&
            year === today.getFullYear()
          const booking = getBooking(day)
          return (
            <Link
              key={day}
              href={`/admin/Booking/${day}-${month+1}-${year}`}
            >
              <div className={`${styles.day_cell} ${isToday ? styles.currentday : ''}`}>
                <span className={styles.day_num}>{day}</span>
                {booking && (
                  <div className={styles.booking_indicator}>
                    {booking.count} Bookings
                  </div>
                )}
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
export default Calendar