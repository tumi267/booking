import { upsertFeatures } from '@/app/libs/crud/sections/features'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const body = await req.json()
  const{location, sectionNum, data}=body

  const feature = await upsertFeatures(location, sectionNum, data)
  return NextResponse.json(feature)
}