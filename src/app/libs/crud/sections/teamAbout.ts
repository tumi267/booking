import prisma from "../../prisma"

export async function upsertTeam(
  location: string,
  sectionNum: string,
  data: any
) {
  return prisma.teamAboutSection.upsert({
    where: {
      location_sectionNum: { location, sectionNum },
    },
    update: data,
    create: {
      location,
      sectionNum,
      ...data,
    },
  })
}

export async function getTeam(
  location: string,
  sectionNum: string
) {
  return prisma.teamAboutSection.findUnique({
    where: {
      location_sectionNum: { location, sectionNum },
    },
  })
}