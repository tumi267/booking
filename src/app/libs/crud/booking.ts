import prisma from "../prisma"

type FlatBooking = {
  serviceId: string
  providerId: string
  clientId: string
  date: Date
  time: string
  groupId: string
  sessionDuration: number
  price:number
}

//
// CREATE
//
export async function createBookings(flatBookings: FlatBooking[]) {
  return await prisma.booking.createMany({
    data: flatBookings,
    skipDuplicates: true
  })
}

//
// READ: all bookings (filtered optional)
//
export async function getBookings(providerId?: string) {
  return await prisma.booking.findMany({
    where: providerId ? { providerId } : undefined,
    orderBy: {
      date: "asc"
    }
  })
}

//
// READ: booking group (multi-slot booking)
//
export async function getBookingByGroup(groupId: string) {
  return await prisma.booking.findMany({
    where: {
      groupId
    },
    orderBy: {
      date: "asc"
    }
  })
}

//
// CHECK CONFLICTS
//
export async function checkConflicts(
  providerId: string,
  flatBookings: FlatBooking[]
) {
  return await prisma.booking.findMany({
    where: {
      providerId,
      status: {
        in: ["CONFIRMED"]
      },

      OR: flatBookings.map((b) => ({
        date: b.date,
        time: b.time
      }))
    }
  })
}

//
// DELETE SINGLE SLOT
//
export async function deleteBooking(bookingId: string) {
  return await prisma.booking.delete({
    where: {
      id: bookingId
    }
  })
}

//
// DELETE FULL GROUP (IMPORTANT FOR YOUR FLOW)
//
export async function deleteBookingGroup(groupId: string) {
  return await prisma.booking.deleteMany({
    where: {
      groupId
    }
  })
}
export async function confirmBookingGroup(groupId: string) {
  return await prisma.booking.updateMany({
    where: {
      groupId,
      status: "PENDING"
    },
    data: {
      status: "CONFIRMED"
    }
  })
}
