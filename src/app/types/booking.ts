export type BookedDay = {
  date: string
  times: string[]
  dayOfWeek: number
}

export type TeamMember = {
  id: string
  firstName: string
  lastName: string
  role: string
  bio?: string | null
  imageurl?: string | null
  isAvailable: boolean
  bookedDates?: BookedDay[]
}

export type Service = {
  id: string
  name: string
  isActive: boolean
  price: number
  duration: number
  description?: string | null
  assignedTeam: TeamMember[]
}

export type BookingData = {
  serviceId: string
  providerId: string
  team: string
  dates: BookedDay[]
}