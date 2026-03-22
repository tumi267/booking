import prisma  from "../prisma"
import { ProviderRole } from '@prisma/client'
export async function createProvider(data: {
  firstName: string
  lastName: string
  email?: string | null
  role?: ProviderRole
  isAvailable?: boolean
}) {
  const provider = await prisma.provider.create({
    data: {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email || null,
      role: data.role || 'TRAINER',
      isAvailable: data.isAvailable ?? true,
    },
  })

  return {
    id: provider.id,
    firstName: provider.firstName,
    lastName: provider.lastName,
    email: provider.email || '',
    role: provider.role,
    isAvailable: provider.isAvailable,
  }
}

export async function getProvider(id: string) {
  return prisma.provider.findUnique({
    where: { id },
    include: {
      bookings: true,
      bookingSettings: true,
      user: true,
    },
  })
}



//  GET ALL (normalized for frontend)
export async function getAllProviders() {
  const providers = await prisma.provider.findMany()

  return providers.map((p) => ({
    id: p.id,
    firstName: p.firstName,
    lastName: p.lastName,
    email: p.email || '',
    role: p.role,
    isAvailable: p.isAvailable,
  }))
}

export async function updateProvider(
  id: string,
  data: {
    firstName?: string
    lastName?: string
    email?: string
    role?: ProviderRole
    isAvailable?: boolean
  }
) {
  const updated = await prisma.provider.update({
    where: { id },
    data: {
      ...(data.firstName && { firstName: data.firstName }),
      ...(data.lastName && { lastName: data.lastName }),
      ...(data.email !== undefined && { email: data.email || null }),
      ...(data.role && { role: data.role }),
      ...(data.isAvailable !== undefined && { isAvailable: data.isAvailable }),
    },
  })

  return {
    id: updated.id,
    firstName: updated.firstName,
    lastName: updated.lastName,
    email: updated.email || '',
    role: updated.role,
    isAvailable: updated.isAvailable,
  }
}

export async function deleteProvider(id: string) {
  return prisma.provider.delete({
    where: { id },
  })
}