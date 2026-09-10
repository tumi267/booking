import prisma from "../../prisma"

export async function getUserByID(id: string) {
    return await prisma.user.findUnique({
      where: {
        clerkId:id
      }
    })
  }