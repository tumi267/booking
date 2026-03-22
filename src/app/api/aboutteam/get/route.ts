import { getTeam } from '@/app/libs/crud/sections/teamAbout'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const body = await req.json()
  const{location, sectionNum}=body

  const hero = await getTeam(location, sectionNum)
  return NextResponse.json(hero)
}