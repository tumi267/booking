import { NextResponse } from "next/server";
import crypto from "crypto";
import { createPayfastPayload } from "@/app/libs/payfast/createPayfastPayload";
import { createBookings, checkConflicts } from "@/app/libs/crud/booking";
import { getUserByClerkId } from "@/app/libs/crud/user";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const bookingdata = body.bookingdata;

    const groupId = crypto.randomUUID();

    const client = await getUserByClerkId(bookingdata.clientId);
    if (!client) throw new Error("User not found");

    const flatBookings = bookingdata.dates.flatMap((day: any) =>
    day.times.map((time: string) => {
    // FIX: Normalize date to UTC Midnight
    const dateObj = new Date(day.date);
    dateObj.setUTCHours(0, 0, 0, 0);

    return {
      serviceId: bookingdata.serviceId,
      providerId: bookingdata.providerId,
      clientId: client.id,
      date: dateObj, // Now securely UTC midnight
      time,
      groupId,
      price: bookingdata.total,
      sessionDuration: bookingdata.sessionDuration,
      status: "PENDING" as const
      };
      })
    );

    const conflicts = await checkConflicts(bookingdata.providerId, flatBookings);

    if (conflicts.length > 0) {
      return NextResponse.json(
        { error: "Some time slots are already booked" },
        { status: 409 }
      );
    }

    await createBookings(flatBookings);

    const payfast = createPayfastPayload({
      merchant_id: process.env.PAYFAST_MERCHANT_ID!,
      merchant_key: process.env.PAYFAST_MERCHANT_KEY!,
      return_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/cancel`,
      notify_url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/payfast-itn`,
      amount: bookingdata.total.toString(),
      item_name: bookingdata.servicename,
      custom_str1: groupId,
      passphrase: process.env.PAYFAST_PASSPHRASE!
    });

    return NextResponse.json(payfast);

  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}