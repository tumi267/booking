import prisma  from "../prisma"

export async function createService(data: {
  name: string
  description?: string
}) {
  return prisma.service.create({ data })
}

export async function getServices() {
  return prisma.service.findMany({
    where: { isActive: true },
  })
}

export async function updateService(id: string, data: any) {
  return prisma.service.update({
    where: { id },
    data,
  })
}

export async function deleteService(id: string) {
  return prisma.service.delete({
    where: { id },
  })
}