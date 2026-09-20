import { NextResponse } from 'next/server'
import prisma from '@/app/libs/prisma'

export async function POST(
  request: Request
) {
  try {
    const body = await request.json()

    const {location, sectionNum, data,} = body

    if (!location ||!sectionNum ||!data) {
      return NextResponse.json( {error: 'Location, sectionNum and data are required',},{status: 400,})
    }

    const contact =await prisma.contact.upsert({
        where: {
          location_sectionNum: {
            location,
            sectionNum,
          },
        },
        update: {
          title: data.title,
          ctaMessage:data.ctaMessage,
          city: data.city,
          contactNumber:data.contactNumber,
          breakpoints:data.breakpoints,
        },
        create: {
          location,
          sectionNum,
          title:data.title ??'Contact Us',
          ctaMessage:data.ctaMessage ?? '',
          city:data.city ?? '',
          contactNumber:data.contactNumber ?? '',
          breakpoints:data.breakpoints ?? {},
        },
      })

    return NextResponse.json(contact,{status: 200,})
  } catch (error) {console.error('CONTACT UPSERT ERROR:',error)

    return NextResponse.json({error:'Failed to save contact', },{status: 500,})
  }
}

