import prisma from "../prisma"

// CREATE
export async function createService(data: {
  name: string
  price: number
  isActive: boolean
  assignedTeamIds: string[]
  duration: number
  description: string
}) {
  const service = await prisma.service.create({
    data: {
      name: data.name,
      isActive: data.isActive,
      defaultPrice: data.price,
      defaultSessionDuration: data.duration,
      description: data.description,
      providers: {
        connect: data.assignedTeamIds.map((id) => ({ id })),
      },
    },
    include: { providers: true },
  })

  return {
    id: service.id,
    name: service.name,
    isActive: service.isActive,
    price: service.defaultPrice,
    duration: service.defaultSessionDuration,
    description: service.description,
    assignedTeam: service.providers,
  }
}

// GET ALL
export async function getAllServices() {
  const services = await prisma.service.findMany({
    include: { providers: true },
  })

  return services.map((s) => ({
    id: s.id,
    name: s.name,
    isActive: s.isActive,
    price: s.defaultPrice,
    duration: s.defaultSessionDuration,
    description: s.description,
    assignedTeam: s.providers,
  }))
}

// UPDATE
export async function updateService(
  id: string,
  data: {
    name: string
    price: number
    isActive: boolean
    assignedTeamIds: string[]
    duration: number
    description: string
  }
) {
  const updated = await prisma.service.update({
    where: { id },
    data: {
      name: data.name,
      isActive: data.isActive,
      defaultPrice: data.price,
      defaultSessionDuration: data.duration,
      description: data.description,
      providers: {
        set: data.assignedTeamIds.map((id) => ({ id })),
      },
    },
    include: { providers: true },
  })

  return {
    id: updated.id,
    name: updated.name,
    isActive: updated.isActive,
    price: updated.defaultPrice,
    duration: updated.defaultSessionDuration,
    description: updated.description,
    assignedTeam: updated.providers,
  }
}

// DELETE
export async function deleteService(id: string) {
  return prisma.service.delete({
    where: { id },
  })
}