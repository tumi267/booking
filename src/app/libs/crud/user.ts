import prisma  from "../prisma"

export async function createUser(data: {
  email: string
  firstName: string
  lastName: string
  clerkId?: string
  imageurl?: string
  phone?: string
}) {
  return prisma.user.create({ data })
}

export async function getUserById(id: string) {
  return prisma.user.findUnique({
    where: { id },
    include: { provider: true, bookings: true },
  })
}

export async function getUserByClerkId(clerkId: string) {
  return prisma.user.findUnique({
    where: { clerkId },
  })
}

export async function updateUser(id: string, data: any) {
  return prisma.user.update({
    where: { id },
    data,
  })
}

export async function deleteUser(id: string) {
  return prisma.user.delete({
    where: { id },
  })
}