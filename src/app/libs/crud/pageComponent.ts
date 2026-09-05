import prisma from "../prisma"

export async function getPageComponents(
  page: string
) {
  return prisma.pageComponent.findMany({
    where: { page },
    orderBy: {
      position: "asc",
    },
  })
}

export async function createPageComponent(
  page: string,
  component: string,
  position: number
) {
  return prisma.pageComponent.create({
    data: {
      page,
      component,
      position,
    },
  })
}

export async function updatePageComponent(
  id: string,
  position: number
) {
  return prisma.pageComponent.update({
    where: { id },
    data: {
      position,
    },
  })
}

export async function deletePageComponent(
  id: string
) {
  return prisma.pageComponent.delete({
    where: { id },
  })
}
export async function updatePageComponentPositions(
    page: string,
    components: {
      id: string
      position: number
    }[]
  ) {
    for (const component of components) {
      await prisma.pageComponent.update({
        where: {
          id: component.id,
        },
        data: {
          position: component.position,
        },
      })
    }
  
    return getPageComponents(page)
  }