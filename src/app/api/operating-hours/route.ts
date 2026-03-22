import {
    getOperatingHours,
    setOperatingHours,
    toggleOperatingDay,
  } from "@/app/libs/crud/operatingHours"
  
  import { NextRequest, NextResponse } from "next/server"
  
  
  // GET
  export async function GET() {
    const data = await getOperatingHours()
    return NextResponse.json(data)
  }
  
  
  // POST (set time)
  export async function POST(req: NextRequest) {
    const body = await req.json()
  
    const { dayOfWeek, startTime, endTime } = body
  
    const data = await setOperatingHours(
      dayOfWeek,
      startTime,
      endTime
    )
  
    return NextResponse.json(data)
  }
  
  
  // PATCH (toggle active)
  export async function PATCH(req: NextRequest) {
    const body = await req.json()
  
    const { dayOfWeek, isActive } = body
  
    const data = await toggleOperatingDay(
      dayOfWeek,
      isActive
    )
  
    return NextResponse.json(data)
  }