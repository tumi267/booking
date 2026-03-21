import { getFeatures } from '@/app/libs/crud/sections/features'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const body = await req.json()
  const{location, sectionNum}=body

  const hero = await getFeatures(location, sectionNum)
  return NextResponse.json(hero)
}