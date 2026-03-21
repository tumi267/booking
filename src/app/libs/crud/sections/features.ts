import prisma  from "../../prisma"

export async function getFeatures(location: string, sectionNum: string) {
  return prisma.featuresSection.findUnique({
    where: {
      location_sectionNum: { location, sectionNum },
    },
    include: {
      features: true,
    },
  })
}

export async function upsertFeatures(
  location: string,
  sectionNum: string,
  data: any
) {
  const { features, ...rest } = data; // separate relational field

  return prisma.featuresSection.upsert({
    where: {
      location_sectionNum: { location, sectionNum },
    },
    update: {
      ...rest,
      features: {
        upsert: features?.map((f: any) => ({
          where: { id: f.id },
          update: f,
          create: f,
        })) ?? [],
      },
    },
    create: {
      location,
      sectionNum,
      ...rest,
      features: {
        create: features ?? [],
      },
    },
  });
}