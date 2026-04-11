import { getCalendarBookings } from "@/app/libs/crud/booking"
import { NextResponse } from "next/server"


type CalendarBooking = {
    day: number
    month: number
    count: number
  }
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)

  const month = Number(searchParams.get("month"))
  const year = Number(searchParams.get("year"))
  if (!month || !year) {
    return NextResponse.json({ error: "Missing params" }, { status: 400 })
  }
  const data = await getCalendarBookings(month, year)


  return NextResponse.json(data)
}