import prisma  from "../prisma"

export async function createBookingSettings(data: any) {
  return prisma.bookingSettings.create({
    data,
  })
}

export async function getBookingSettings() {
  return prisma.bookingSettings.findMany({
    include: {
      service: true,
      providers: true,
    },
  })
}

export async function updateBookingSettings(
  id: string,
  data: any
) {
  return prisma.bookingSettings.update({
    where: { id },
    data,
  })
}