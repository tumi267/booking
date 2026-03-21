import { getHero } from '@/app/libs/crud/sections/hero'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const body = await req.json()
  const{location, sectionNum}=body

  const hero = await getHero(location, sectionNum)
  return NextResponse.json(hero)
}