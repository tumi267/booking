import prisma  from "../../prisma"

export async function upsertHowItWorks(
  location: string,
  sectionNum: string,
  data: any
) {
  return prisma.howItWorksSection.upsert({
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

export async function getHowItWorks(
    location: string,
    sectionNum: string
  ) {
    return prisma.howItWorksSection.findUnique({
      where: {
        location_sectionNum: {
          location,
          sectionNum,
        },
      },
    })
  }