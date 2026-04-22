'use client'
import { getOverRideAction } from "../libs/overWrightDate/action"
import { useCalendar } from "./useOperationCalendar"
import { useEffect, useState } from "react"

export function useOverRideCalendar() {
const {month,year,blockedDays,setBlockedDays,firstDay,daysInMonth,monthNames,toggleBlockedDay,prevMonth,nextMonth,} = useCalendar()
const [loading, setLoading] = useState(true)
// featch blocked dates
useEffect(() => {
    const load = async () => {
        try {
          setLoading(true)
          const data = await getOverRideAction(month, year)
          setBlockedDays(data.res)
        } catch (err) {
          console.error(err)
        } finally {
          setLoading(false)
        }
        }
    load()
}, [month, year])

return {
    month,
    year,
    monthNames,
    firstDay,
    daysInMonth,
    loading,
    prevMonth,
    nextMonth,
    blockedDays,
    toggleBlockedDay
  }
}

