export type TeamMember = {
    id: string
    firstName: string
    lastName: string
  }
  
  export type Service = {
    id: string | null
    tempId: string
    name: string
    price: number
    duration: number
    description: string
    isActive: boolean
    assignedTeam: TeamMember[]
  }
  
  export type Banner = {
    type: 'success' | 'error'
    message: string
  }