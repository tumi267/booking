import prisma  from "../prisma"

export async function createProvider(data: any) {
  return prisma.provider.create({
    data,
  })
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

export async function getAllProviders() {
  return prisma.provider.findMany()
}

export async function updateProvider(id: string, data: any) {
  return prisma.provider.update({
    where: { id },
    data,
  })
}

export async function deleteProvider(id: string) {
  return prisma.provider.delete({
    where: { id },
  })
}