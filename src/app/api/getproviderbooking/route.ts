import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/libs/prisma";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = req.nextUrl;

    const providerId = searchParams.get("providerId");
    const year = searchParams.get("year");
    const month = searchParams.get("month");

    if (!providerId || !year || !month) {
      return NextResponse.json(
        { error: "Missing providerId, year or month" },
        { status: 400 }
      );
    }

    const numericYear = Number(year);
    const numericMonth = Number(month);

    if (
      Number.isNaN(numericYear) ||
      Number.isNaN(numericMonth)
    ) {
      return NextResponse.json(
        { error: "Invalid year or month" },
        { status: 400 }
      );
    }

    const start = new Date(
      Date.UTC(numericYear, numericMonth - 1, 1)
    );

    const end = new Date(
      Date.UTC(numericYear, numericMonth, 1)
    );

    const busyBookings = await prisma.booking.findMany({
      where: {
        providerId,
        status: "CONFIRMED",
        date: {
          gte: start,
          lt: end,
        },
      },
      select: {
        date: true,
        time: true,
      },
      orderBy: [
        {
          date: "asc",
        },
        {
          time: "asc",
        },
      ],
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