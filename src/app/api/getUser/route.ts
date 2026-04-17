import { getAllUsers } from "@/app/libs/crud/user";
import { NextResponse } from "next/server";
export async function GET() {
    const data=await getAllUsers()
    const formattedUsers = data.map((user) => {
        const grouped = user.bookings.reduce((acc: any, booking: any) => {
          const gid = booking.groupId;
          if (!acc[gid]) acc[gid] = [];
          acc[gid].push(booking);
          return acc;
        }, {});
        return {
            ...user,
            groupedBookings: grouped,
            sessionCount: Object.keys(grouped).length, 
          };
    })
    return NextResponse.json({data:formattedUsers })
}