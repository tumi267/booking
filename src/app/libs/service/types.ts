import { ProviderRole } from '@prisma/client'
export type TeamMember = {
  id: string |null
  tempId?: string
  firstName: string
  lastName: string
  email: string
  role: ProviderRole
  isAvailable: boolean
  password:string
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