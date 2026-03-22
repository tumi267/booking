import prisma  from "../prisma"

export async function createService(data: {
  name: string
  price: number
  isActive: boolean
  assignedTeamIds: string[]
}) {
  const service = await prisma.service.create({
    data: {
      name: data.name,
      isActive: data.isActive,

      bookingSettings: {
        create: {
          defaultPrice: data.price,

          providers: {
            connect: data.assignedTeamIds.map((id) => ({ id })),
          },
        },
      },
    },
    include: {
      bookingSettings: {
        include: {
          providers: true,
        },
      },
    },
  })

  // 🔁 Transform response
  return {
    id: service.id,
    name: service.name,
    isActive: service.isActive,
    price: service.bookingSettings[0]?.defaultPrice || 0,
    assignedTeam: service.bookingSettings[0]?.providers || [],
  }
}

// ✅ GET ALL (WITH RELATIONS)
export async function getAllServices() {
  const services = await prisma.service.findMany({
    include: {
      bookingSettings: {
        include: {
          providers: true,
        },
      },
    },
  })

  // 🔁 Transform for frontend
  return services.map((s) => ({
    id: s.id,
    name: s.name,
    isActive: s.isActive,
    price: s.bookingSettings[0]?.defaultPrice || 0,
    assignedTeam: s.bookingSettings[0]?.providers || [],
  }))
}

export async function updateService(
  id: string,
  data: {
    name: string
    price: number
    isActive: boolean
    assignedTeamIds: string[]
  }
) {
  // 1️⃣ Update basic service
  await prisma.service.update({
    where: { id },
    data: {
      name: data.name,
      isActive: data.isActive,
    },
  })

  // 2️⃣ Get bookingSettings ID
  const settings = await prisma.bookingSettings.findFirst({
    where: { serviceId: id },
  })

  if (!settings) throw new Error("BookingSettings not found")

  // 3️⃣ Update bookingSettings
  const updated = await prisma.bookingSettings.update({
    where: { id: settings.id },
    data: {
      defaultPrice: data.price,

      providers: {
        set: data.assignedTeamIds.map((id) => ({ id })),
      },
    },
    include: {
      providers: true,
    },
  })

  return {
    id,
    name: data.name,
    isActive: data.isActive,
    price: updated.defaultPrice,
    assignedTeam: updated.providers,
  }
}

export async function deleteService(id: string) {
  // delete settings first (avoid relation issues)
  await prisma.bookingSettings.deleteMany({
    where: { serviceId: id },
  })

  return prisma.service.delete({
    where: { id },
  })
}