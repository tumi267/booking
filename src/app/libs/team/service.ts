import { ProviderRole } from '@prisma/client'

export type TeamMember = {
  id: string | null
  tempId: string
  firstName: string
  lastName: string
  email: string
  role: ProviderRole
  isAvailable: boolean
}

export type Banner = {
  type: 'success' | 'error'
  message: string
}

export async function fetchProviders(): Promise<TeamMember[]> {
  const res = await fetch('/api/providers')

  if (!res.ok) {
    throw new Error('Failed to fetch providers')
  }

  return res.json()
}

export async function createProvider(member: TeamMember): Promise<TeamMember> {
  const res = await fetch('/api/providers', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      firstName: member.firstName,
      lastName: member.lastName,
      email: member.email || null,
      role: member.role,
      isAvailable: member.isAvailable,
    }),
  })

  if (!res.ok) {
    throw new Error('Failed to create provider')
  }

  return res.json()
}

export async function updateProvider(member: TeamMember): Promise<TeamMember> {
  const res = await fetch('/api/providers', {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      id: member.id,
      firstName: member.firstName,
      lastName: member.lastName,
      email: member.email || null,
      role: member.role,
      isAvailable: member.isAvailable,
    }),
  })

  if (!res.ok) {
    throw new Error('Failed to update provider')
  }

  return res.json()
}

export async function deleteProvider(id: string): Promise<void> {
  const res = await fetch(`/api/providers/${id}`, {
    method: 'DELETE',
  })

  if (!res.ok) {
    throw new Error('Failed to delete provider')
  }
}