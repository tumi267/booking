import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import prisma from '@/app/libs/prisma'
import { createPayfastPayload } from '@/app/libs/payfast/createPayfastPayload'
import { getUserByClerkId } from '@/app/libs/crud/user'

export async function POST(request: NextRequest) {
  try {
    // ----------------------------------------
    // 1. Get authenticated Clerk user
    // ----------------------------------------

    const { userId } = auth()

    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // ----------------------------------------
    // 2. Get database user
    // ----------------------------------------

    const user = await getUserByClerkId(userId)

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    // ----------------------------------------
    // 3. Get booking group ID
    // ----------------------------------------

    const body = await request.json()

    const { groupId } = body

    if (!groupId || typeof groupId !== 'string') {
      return NextResponse.json(
        { error: 'Booking group ID is required' },
        { status: 400 }
      )
    }

    // ----------------------------------------
    // 4. Find user's pending bookings
    // ----------------------------------------

    const bookings = await prisma.booking.findMany({
      where: {
        groupId,
        clientId: user.id,
        status: 'PENDING',
      },
      include: {
        services: true,
      },
      orderBy: [
        {
          date: 'asc',
        },
        {
          time: 'asc',
        },
      ],
    })

    if (bookings.length === 0) {
      return NextResponse.json(
        {
          error:
            'No pending bookings found for this booking group',
        },
        { status: 404 }
      )
    }

    // ----------------------------------------
    // 5. Get service
    // ----------------------------------------

    const service = bookings[0].services

    if (!service) {
      return NextResponse.json(
        { error: 'Booking service not found' },
        { status: 404 }
      )
    }

    // ----------------------------------------
    // 6. Calculate total from saved booking
    //    prices
    // ----------------------------------------

    const totalPrice = bookings.reduce(
      (total, booking) =>
        total + Number(booking.price),
      0
    )

    if (totalPrice <= 0) {
      return NextResponse.json(
        { error: 'Invalid booking amount' },
        { status: 400 }
      )
    }

    // ----------------------------------------
    // 7. Create PayFast payload
    // ----------------------------------------

    const payfast = createPayfastPayload({
     merchant_id:process.env.PAYFAST_MERCHANT_ID!,

     merchant_key:process.env .PAYFAST_MERCHANT_KEY!,

     return_url:`${process.env.NEXT_PUBLIC_BASE_URL}/success`,

     cancel_url:`${process.env.NEXT_PUBLIC_BASE_URL}/cancel`,

     notify_url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/payfast-itn`,

      // Server calculated amount
      amount: totalPrice.toString(),

      // Server trusted service name
      item_name:service.name,

      // Used by PayFast ITN to identify
      // this booking group
      custom_str1:groupId,

      passphrase:process.env.PAYFAST_PASSPHRASE!,
    })

    // ----------------------------------------
    // 8. Return PayFast payload
    // ----------------------------------------

    return NextResponse.json(payfast)
  } catch (error) {
    console.error(
      'Booking payment error:',
      error
    )

    return NextResponse.json(
      {
        error:
          'Unable to create booking payment',
      },
      { status: 500 }
    )
  }
}