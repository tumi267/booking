import { NextResponse } from 'next/server'

import { sendContactEmail } from '@/app/libs/nodemailer/sendEmail'

export async function POST(request: Request) {
  try {
    const body = await request.json()

    const {
      name,
      email,
      message,
    } = body

    if (!name || !email || !message) {
      return NextResponse.json(
        {
          error: 'Name, email and message are required',
        },
        {
          status: 400,
        }
      )
    }

    await sendContactEmail({
      name: name.trim(),
      email: email.trim(),
      message: message.trim(),
    })

    return NextResponse.json(
      {
        success: true,
        message: 'Message sent successfully',
      },
      {
        status: 200,
      }
    )
  } catch (error) {
    console.error(
      'CONTACT EMAIL ERROR:',
      error
    )

    return NextResponse.json(
      {
        error: 'Failed to send message',
      },
      {
        status: 500,
      }
    )
  }
}