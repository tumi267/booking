import { ProviderRole } from '@prisma/client'

export type Banner = {
  type: 'success' | 'error'
  message: string
}

export type TeamMember = {
  id: string | null
  tempId: string
  firstName: string
  lastName: string
  email: string
  role: ProviderRole
  isAvailable: boolean
  password:string
}