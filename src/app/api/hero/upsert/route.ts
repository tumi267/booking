import { upsertHero } from '@/app/libs/crud/sections/hero'

import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const body = await req.json()
  const{location, sectionNum, data}=body

  const hero = await upsertHero(location, sectionNum, data)
  return NextResponse.json(hero)
}