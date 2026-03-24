'use client'
import React, { useEffect, useState } from 'react'

type BookedDay = {
  date: string
  times: string[]
  dayOfWeek:number
}
type Hours = {
  dayOfWeek: number
  startTime: string
  endTime: string
  isActive: boolean
}
interface Props {
  currentStep: number
  step: (newStep: number) => void
  selectedDate: (value: {
    id: string
    team: string
    dates: BookedDay[]
  }) => void
  bookingdata: {
    id: string
    team: string
    dates: BookedDay[]
  }
}

function Time({ step, currentStep, selectedDate, bookingdata }: Props) {
  const [times,setTimes]=useState<any>([])
  const [ALL_SLOTS, setHours] = useState<string[]>([])
  const { dates } = bookingdata
  const intervile=30
  useEffect(()=>{
   const gettime=async ()=>{
    try {
      const res = await fetch('/api/publicCal')
      if (!res.ok) throw new Error('Request failed')
      const data = await res.json()
      if(!data)return
      const timeArr=data.gethours.map((e:any)=>{return {start:e.startTime,end:e.endTime,dayOfWeek:e.dayOfWeek}})
      setTimes(timeArr)
    } catch (error) {
      console.log(error)
    }
    }
    gettime()
  },[])
  const [selecteddate, setSelectedDate] = useState(0)

  const handleTimeChange = (time: string) => {
    const newDates = dates.map((d, i) => {
      if (i !== selecteddate) return d

      if (d.times.includes(time)) return d

      return {
        ...d,
        times: [...d.times, time]
      }
    })

    selectedDate({
      ...bookingdata,
      dates: newDates
    })
  }
  const createtimeslots=(start:string,end:string)=>{
    const slots: string[] = []

    const [startHour, startMin] = start.split(":").map(Number)
    const [endHour, endMin] = end.split(":").map(Number)
  
    let current = new Date()
    current.setHours(startHour, startMin, 0, 0)
  
    const endDate = new Date()
    endDate.setHours(endHour, endMin, 0, 0)
  
    while (current <= endDate) {
      const hours = String(current.getHours()).padStart(2, "0")
      const minutes = String(current.getMinutes()).padStart(2, "0")
  
      slots.push(`${hours}:${minutes}`)
  
      current.setMinutes(current.getMinutes() + intervile)
    }

    setHours(slots)
  }

  const handleDateChange=(e:any)=>{
    setSelectedDate(e)
    if (times.length==0)return
    times.forEach((el:any) => {
      if(el.dayOfWeek==dates[e].dayOfWeek){
        createtimeslots(el.start,el.end)
      }
    });
  }
  return (
    <div>
      Time

      {dates.map((d, i) => (
        <div key={i} onClick={() => handleDateChange(i)}>
          {d.date}
        </div>
      ))}

      {ALL_SLOTS.map((slot, i) => (
        <div key={i} onClick={() => handleTimeChange(slot)}>
          {slot}
        </div>
      ))}

      <button
        disabled={!dates[selecteddate]?.times.length}
        onClick={() => step(currentStep + 1)}
      >
        Next
      </button>

      <button onClick={() => step(currentStep - 1)}>
        Prev
      </button>
    </div>
  )
}

export default Time
