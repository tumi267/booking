import { searchBookings } from "@/app/libs/crud/searchBookings/adminSearch"
import { NextResponse } from "next/server"

export async function GET(
  req: Request
) {
  try {
    const { searchParams } =new URL(req.url)

    const query =searchParams.get("q")?.trim() || ""

    if (!query) {
      return NextResponse.json([])
    }

    const bookings =await searchBookings(query)

    return NextResponse.json(bookings)
  } catch (error) {
    console.error(
      "Booking search error:",
      error
    )

    return NextResponse.json(
      {
        error:
          "Failed to search bookings",
      },
      { status: 500 }
    )
  }
}