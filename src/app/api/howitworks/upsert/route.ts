import { upsertHowItWorks } from '@/app/libs/crud/sections/howItWorks'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const body = await req.json()
  const{location, sectionNum, data}=body

  const HowItWorks = await upsertHowItWorks(location, sectionNum, data)
  return NextResponse.json(HowItWorks)
}