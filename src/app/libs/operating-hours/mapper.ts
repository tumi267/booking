import { weekdays } from "./weekdays"
export type DayKey = typeof weekdays[number]
export type WeekSchedule = Record<
  DayKey,
  {
    open: string
    close: string
    working: boolean
  }
>
export function mapOperatingHours(data: any[]): WeekSchedule {
  const map: any = {}
  data.forEach((d) => {
    const day = weekdays[d.dayOfWeek]
    map[day] = {
      open: d.startTime,
      close: d.endTime,
      working: d.isActive,
    }
  })
  return map
}