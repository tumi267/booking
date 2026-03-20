'use client'
import React, { useState } from 'react'
import styles from './Calendar.module.css'
import Link from 'next/link'

function Calendar() {
    const today = new Date()
    const [month, setMonth] = useState(today.getMonth()) // 0-indexed: Jan=0, Mar=2, May=4
    const [year, setYear] = useState(today.getFullYear())

    // Helper: Get total days in current month and the starting weekday
    const daysInMonth = new Date(year, month + 1, 0).getDate()
    const firstDayOfMonth = new Date(year, month, 1).getDay()
    
    // Grid generation
    const blanks = Array.from({ length: firstDayOfMonth }, (_, i) => i)
    const days = Array.from({ length: daysInMonth }, (_, i) => i + 1)

    /**
     * UPDATED DUMMY DATA:
     * We add a 'month' property so bookings only show in specific months.
     * March is 2, April is 3, May is 4.
     */
    const mockBookings = [
        { day: 16, month: 2, count: 5, status: 'urgent' }, // March 16
        { day: 20, month: 2, count: 2, status: 'normal' }, // March 20
        { day: 5,  month: 3, count: 1, status: 'normal' }, // April 5
        // Note: No bookings for month 4 (May)
    ]

    const changeMonth = (offset: number) => {
        const newDate = new Date(year, month + offset, 1)
        setMonth(newDate.getMonth())
        setYear(newDate.getFullYear())
    }

    const months = [
        'January', 'February', 'March', 'April', 'May', 'June', 
        'July', 'August', 'September', 'October', 'November', 'December'
    ]

    return (
        <div className={styles.wrapper}>
            <div className={styles.selector}>
                <button onClick={() => changeMonth(-1)}>Prev</button>
                <h3>{months[month]} {year}</h3>
                <button onClick={() => changeMonth(1)}>Next</button>
            </div>

            <div className={styles.day_labels}>
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => (
                    <div key={d} className={styles.label}>{d}</div>
                ))}
            </div>

            <div className={styles.day_grid}>
                {/* Offset blanks to align the 1st with the correct weekday */}
                {blanks.map(b => <div key={`b-${b}`} className={styles.blank} />)}
                
                {days.map((day) => {
                    const isToday = 
                        day === today.getDate() && 
                        month === today.getMonth() && 
                        year === today.getFullYear()

                    /**
                     * CRITICAL FIX:
                     * We search for a booking that matches the DAY AND THE MONTH.
                     * This ensures May stays empty if no bookings are defined for month 4.
                     */
                    const hasBooking = mockBookings.find(b => b.day === day && b.month === month)

                    return (
                        <Link href={`/admin/Booking/${day}-${month}-${year}`}><div 
                            key={day} 
                            className={`${styles.day_cell} ${isToday ? styles.currentday : ''}`}
                        >
                            <span className={styles.day_num}>{day}</span>
                            
                            {/* Only renders if the find() returned an object for this month/day */}
                            {hasBooking && (
                                <div className={styles.booking_indicator}>
                                    {hasBooking.count} Bookings
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
