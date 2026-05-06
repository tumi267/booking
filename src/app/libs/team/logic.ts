import { ProviderRole } from '@prisma/client'
import type { TeamMember } from './service'

export function createEmptyProvider(): TeamMember {
  return {
    id: null,
    tempId: crypto.randomUUID(),
    firstName: 'New',
    lastName: 'Member',
    email: '',
    role: ProviderRole.TRAINER,
    isAvailable: true,
    password:''
  }
}

export function findMember(
  team: TeamMember[],
  id: string | null
): TeamMember | undefined {
  return team.find(
    (member) => member.id === id || member.tempId === id
  )
}

export function updateMemberField<K extends keyof TeamMember>(
  team: TeamMember[],
  id: string,
  key: K,
  value: TeamMember[K]
): TeamMember[] {
  return team.map((member) =>
    member.id === id || member.tempId === id
      ? { ...member, [key]: value }
      : member
  )
}

export function replaceMember(
  team: TeamMember[],
  id: string,
  updated: TeamMember
): TeamMember[] {
  return team.map((member) =>
    member.id === id || member.tempId === id
      ? updated
      : member
  )
}

export function removeMemberFromList(
  team: TeamMember[],
  member: TeamMember
): TeamMember[] {
  return team.filter(
    (m) => m.id !== member.id && m.tempId !== member.tempId
  )
}