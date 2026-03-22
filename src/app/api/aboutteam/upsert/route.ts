import { upsertTeam } from '@/app/libs/crud/sections/teamAbout'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const body = await req.json()
  const{location, sectionNum, data}=body

  const hero = await upsertTeam(location, sectionNum, data)
  return NextResponse.json(hero)
}