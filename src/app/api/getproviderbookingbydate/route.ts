import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/libs/prisma";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = req.nextUrl;

    const providerId = searchParams.get("providerId");
    const dateStr = searchParams.get("date");

    if (!providerId || !dateStr) {
      return NextResponse.json(
        { error: "Missing providerId or date" },
        { status: 400 }
      );
    }

    const date = new Date(dateStr);

    if (Number.isNaN(date.getTime())) {
      return NextResponse.json(
        { error: "Invalid date" },
        { status: 400 }
      );
    }

    const start = new Date(date);
    start.setUTCHours(0, 0, 0, 0);

    const end = new Date(date);
    end.setUTCHours(23, 59, 59, 999);

    const busyBookings = await prisma.booking.findMany({
      where: {
        providerId,
        status: "CONFIRMED",
        date: {
          gte: start,
          lte: end,
        },
      },
      select: {
        date: true,
        time: true,
      },
      orderBy: {
        time: "asc",
      },
    });

    return NextResponse.json(busyBookings);
  } catch (error) {
    console.error("getproviderbooking error:", error);

    return NextResponse.json(
      { error: "Error" },
      { status: 500 }
    );
  }
}