import { NextResponse } from 'next/server'
import prisma from '@/app/libs/prisma'

export async function POST(request: Request) {
  try {
    const body = await request.json()

    const { location, sectionNum,} = body

    if (!location ||!sectionNum) {
      return NextResponse.json({ error:'Location and sectionNum are required',},{status: 400,})
    }

    const contact =await prisma.contact.findUnique({
        where: {
          location_sectionNum: {
            location,
            sectionNum,
          },
        },
      })

    /*
     * No Contact configuration exists yet.
     */
    if (!contact) {
      return NextResponse.json( null,{status: 200,})
    }

    return NextResponse.json(contact,{ status: 200,}
    )
  } catch (error) {
    console.error('CONTACT GET ERROR:',error)

    return NextResponse.json({error:'Failed to get contact',},{status: 500,}
    )
  }
}