import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/libs/prisma"; // Use your prisma instance

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = req.nextUrl;
    const providerId = searchParams.get("id");
    const dateStr = searchParams.get("date"); // Add date to your fetch call
    const currentGroupId = searchParams.get("groupId");
    if (!providerId || !dateStr) {
        return NextResponse.json({ error: "Missing params" }, { status: 400 });
      }
      
      const date = new Date(dateStr);
      
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
            lte: end
          },
          NOT: currentGroupId ? { groupId: currentGroupId } : undefined,
        },
        select: {
          time: true
        }
      });

    return NextResponse.json(busyBookings);
  } catch (error) {
    return NextResponse.json({ error: "Error" }, { status: 500 });
  }
}