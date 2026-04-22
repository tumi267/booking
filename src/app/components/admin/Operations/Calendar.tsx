'use client'
import React from 'react'
import { useOverRideCalendar} from '@/app/hooks/useAdminCanedarOverwright'
import Loading from '../../Loading/Loading'
function Calendar() {
  const {month,year,blockedDays,firstDay,daysInMonth,monthNames,toggleBlockedDay,prevMonth,nextMonth,loading}=useOverRideCalendar()
  console.log(loading)
  if(loading)return <Loading/>
  return (
    <div className="bg-white border rounded-xl p-4">
      {/* header */}
      <div className="flex justify-between mb-4">
        <button onClick={prevMonth}>◀</button>
        <div className="font-bold">
          {monthNames[month]} {year}
        </div>
        <button onClick={nextMonth}>▶</button>
      </div>
      {/* weekdays */}
      <div className="grid grid-cols-7 text-center text-xs mb-1">
        {['Sun','Mon','Tue','Wed','Thu','Fri','Sat'].map(d => (
          <div key={d}>{d}</div>
        ))}
      </div>
      {/* calendar */}
      <div className="grid grid-cols-7 gap-1 text-center text-sm">
        {/* empty slots */}
        {Array.from({ length: firstDay }).map((_, i) => (
          <div key={i}></div>
        ))}
        {/* days */}
        {Array.from({ length: daysInMonth }).map((_, i) => {
          const day = i + 1
          const dateString = `${year}-${
            (month + 1).toString().padStart(2,'0')
          }-${
            day.toString().padStart(2,'0')
          }`
          const blocked = blockedDays.includes(dateString)
          return (
            <div
              key={day}
              onClick={() => toggleBlockedDay(dateString)}
              className={`
                p-2 border rounded cursor-pointer
                ${blocked ? 'bg-red-500 text-white' : 'bg-gray-100'}
              `}
            >
              {day}
            </div>
          )
        })}
      </div>
    </div>
  )
}
export default Calendar