import type { BookedDay } from '@/app/types/booking'

export type OperatingHour = {
  dayOfWeek: number
  startTime: string
  endTime: string
  isActive?: boolean
}

export type CalendarAvailability = {
  operatingHours: OperatingHour[]
  member: BookedDay[]
}