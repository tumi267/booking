import prisma  from "../prisma"

export async function setOperatingHours(
  dayOfWeek: number,
  startTime: string,
  endTime: string
) {
  return prisma.operatingHours.upsert({
    where: { dayOfWeek },
    update: { startTime, endTime, isActive: true },
    create: { dayOfWeek, startTime, endTime },
  })
}

export async function getOperatingHours() {
  return prisma.operatingHours.findMany({
    orderBy: { dayOfWeek: "asc" },
  })
}

export async function toggleOperatingDay(
  dayOfWeek: number,
  isActive: boolean
) {
  return prisma.operatingHours.update({
    where: { dayOfWeek },
    data: { isActive },
  })
}