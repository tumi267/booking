
import { getHowItWorks } from '@/app/libs/crud/sections/howItWorks'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const body = await req.json()
  const{location, sectionNum}=body

  const HowItWorks = await getHowItWorks(location, sectionNum)
  return NextResponse.json(HowItWorks)
}