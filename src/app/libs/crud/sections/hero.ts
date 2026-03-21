import prisma  from "../../prisma"

export async function upsertHero(
  location: string,
  sectionNum: string,
  data: any
) {
  return prisma.heroSection.upsert({
    where: {
      location_sectionNum: {
        location,
        sectionNum,
      },
    },
    update: data,
    create: {
      location,
      sectionNum,
      ...data,
    },
  })
}

export async function getHero(
  location: string,
  sectionNum: string
) {
  return prisma.heroSection.findUnique({
    where: {
      location_sectionNum: {
        location,
        sectionNum,
      },
    },
  })
}