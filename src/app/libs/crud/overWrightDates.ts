import prisma from '../prisma'

export async function createDayOverride(
  date: Date,
  isBlocked?: boolean
) {
  const override = await prisma.dayOverride.create({
    data: {
      date: date,
      isBlocked: isBlocked ?? true,
    },
  })

  return {
    id: override.id,
    date: override.date,
    isBlocked: override.isBlocked,
    createdAt: override.createdAt,
    updatedAt: override.updatedAt,
  }
}

export async function getDayOverride(id: string) {
  const override = await prisma.dayOverride.findUnique({
    where: { id },
  })

  if (!override) return null

  return {
    id: override.id,
    date: override.date,
    isBlocked: override.isBlocked,
    createdAt: override.createdAt,
    updatedAt: override.updatedAt,
  }
}
export async function getDayOverridesByMonthAndYear(
  month: number, // 1-12
  year: number
) {
  const startDate = new Date(year, month - 1, 1)
  const endDate = new Date(year, month, 1)

  const overrides = await prisma.dayOverride.findMany({
    where: {
      date: {
        gte: startDate,
        lt: endDate,
      },
    },
    orderBy: {
      date: "asc",
    },
  })

  return overrides.map((override) => ({
    id: override.id,
    date: override.date,
    isBlocked: override.isBlocked,
    createdAt: override.createdAt,
    updatedAt: override.updatedAt,
  }))
}
export async function getDayOverrideByDate(date: Date) {
  const override = await prisma.dayOverride.findUnique({
    where: { date },
  })

  if (!override) return null

  return {
    id: override.id,
    date: override.date,
    isBlocked: override.isBlocked,
    createdAt: override.createdAt,
    updatedAt: override.updatedAt,
  }
}

export async function getAllDayOverrides() {
  const overrides = await prisma.dayOverride.findMany({
    orderBy: {
      date: 'asc',
    },
  })

  return overrides.map((override) => ({
    id: override.id,
    date: override.date,
    isBlocked: override.isBlocked,
    createdAt: override.createdAt,
    updatedAt: override.updatedAt,
  }))
}

export async function updateDayOverride(
  id: string,
  data: {
    date?: Date
    isBlocked?: boolean
  }
) {
  const updated = await prisma.dayOverride.update({
    where: { id },
    data: {
      ...(data.date && { date: data.date }),
      ...(data.isBlocked !== undefined && {
        isBlocked: data.isBlocked,
      }),
    },
  })

  return {
    id: updated.id,
    date: updated.date,
    isBlocked: updated.isBlocked,
    createdAt: updated.createdAt,
    updatedAt: updated.updatedAt,
  }
}

export async function deleteDayOverride(id: string) {
  return prisma.dayOverride.delete({
    where: { id },
  })
}