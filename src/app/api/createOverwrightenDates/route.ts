import { toggleDayOverride } from '@/app/libs/crud/overWrightDates'

import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { date} = body
    const data=toggleDayOverride(date)
    const res=await data
    return NextResponse.json({ res }, { status: 201 })
  } catch (error) {
    console.error('Failed to create day override:', error)
    return NextResponse.json({ error:'Failed to create day override' }, { status: 500 })
  }
}