import prisma from "../prisma"

export async function createBooking(data: any) {
  return prisma.booking.create({
    data,
  })
}

export async function getBookings() {
  return prisma.booking.findMany({
    include: {
      client: true,
      provider: true,
      services: true,
    },
  })
}

export async function updateBookingStatus(
  id: string,
  status: any
) {
  return prisma.booking.update({
    where: { id },
    data: { status },
  })
}

export async function deleteBooking(id: string) {
  return prisma.booking.delete({
    where: { id },
  })
}