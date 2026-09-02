import { NextResponse } from "next/server";
import crypto from "crypto";
import { auth } from "@clerk/nextjs/server";
import {createPayfastPayload,} from "@/app/libs/payfast/createPayfastPayload";
import {createBookings,checkConflicts,} from "@/app/libs/crud/booking";
import {getUserByClerkId,} from "@/app/libs/crud/user";
import {getProvider,} from "@/app/libs/crud/provider";
import {getServiceById,} from "@/app/libs/crud/service";

export async function POST(req: Request) {
  try {
    // --------------------------------
    // AUTHENTICATION
    // --------------------------------

    const { userId } = auth();

    if (!userId) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    // --------------------------------
    // REQUEST DATA
    // --------------------------------

    const body = await req.json();
    const bookingdata = body?.bookingdata;

    if (!bookingdata) {
      return NextResponse.json(
        { error: "Booking data is required" },
        { status: 400 }
      );
    }

    if (!bookingdata.providerId||!bookingdata.serviceId) {
      return NextResponse.json(
        {
          error:
            "Provider and service are required",
        },
        { status: 400 }
      );
    }

    if (!Array.isArray(bookingdata.dates)) {
      return NextResponse.json(
        {
          error:
            "Booking dates are required",
        },
        { status: 400 }
      );
    }

    // --------------------------------
    // CLIENT
    // --------------------------------

    const client =await getUserByClerkId(userId);
    if (!client) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    // --------------------------------
    // PROVIDER VALIDATION
    // --------------------------------

    const provider =await getProvider(bookingdata.providerId);

    if (!provider) {
      return NextResponse.json(
        { error: "Provider not found" },
        { status: 404 }
      );
    }

    if (!provider.isAvailable) {
      return NextResponse.json(
        {
          error:
            "Provider is not available",
        },
        { status: 400 }
      );
    }

    // --------------------------------
    // SERVICE VALIDATION
    // --------------------------------

    const service =await getServiceById(bookingdata.serviceId);

    if (!service) {
      return NextResponse.json(
        { error: "Service not found" },
        { status: 404 }
      );
    }

    if (!service.isActive) {
      return NextResponse.json(
        {
          error:
            "Service is not available",
        },
        { status: 400 }
      );
    }

    // --------------------------------
    // PROVIDER / SERVICE RELATIONSHIP
    // --------------------------------

    const providerAssigned =service.providers.some(assignedProvider =>assignedProvider.id ===bookingdata.providerId);

    if (!providerAssigned) {
      return NextResponse.json(
        {
          error:
            "Selected provider does not offer this service",
        },
        { status: 400 }
      );
    }

    // --------------------------------
    // COUNT SELECTED SLOTS
    // --------------------------------

    const slotCount =bookingdata.dates.reduce((total: number,day: any) => {
          if (!day ||!Array.isArray(day.times)) {
            return total;
          }
          return (total +day.times.length);
        },0
      );

    if (slotCount === 0) {
      return NextResponse.json(
        {
          error:
            "No booking times selected",
        },
        { status: 400 }
      );
    }

    // --------------------------------
    // SERVER-SIDE PRICE
    // --------------------------------

    const totalPrice =service.defaultPrice *slotCount;

    // --------------------------------
    // GROUP ID
    // --------------------------------

    const groupId =crypto.randomUUID();

    // --------------------------------
    // BUILD FLAT BOOKINGS
    // --------------------------------

    const flatBookings =bookingdata.dates.flatMap((day: any) => {
          if (!day ||!Array.isArray(day.times)
          ) {
            return [];
          }

          return day.times.map(
            (time: string) => {
              const dateObj =new Date(day.date);

              if (Number.isNaN(dateObj.getTime())) {
                throw new Error(
                  "Invalid booking date"
                );
              }

              // Store booking dates
              // at UTC midnight.
              dateObj.setUTCHours(0,0,0,0);

              return {serviceId:service.id,providerId:provider.id,clientId:client.id,date: dateObj,time,groupId,price:service.defaultPrice,sessionDuration:service.defaultSessionDuration,status:"PENDING" as const,};
            }
          );
        }
      );

    if (flatBookings.length === 0) {
      return NextResponse.json(
        {
          error:
            "No valid booking slots selected",
        },
        { status: 400 }
      );
    }

    // --------------------------------
    // CONFLICT DETECTION
    // --------------------------------

    const conflicts =await checkConflicts(provider.id,flatBookings);

    if (conflicts.length > 0) {
      return NextResponse.json(
        {
          error:"Some time slots are already booked",
        },
        { status: 409 }
      );
    }

    // --------------------------------
    // CREATE BOOKINGS
    // --------------------------------

    await createBookings(flatBookings);

    // --------------------------------
    // PAYFAST
    // --------------------------------

    const payfast =
      createPayfastPayload({
        merchant_id:
          process.env
            .PAYFAST_MERCHANT_ID!,

        merchant_key:
          process.env
            .PAYFAST_MERCHANT_KEY!,

        return_url:
          `${process.env.NEXT_PUBLIC_BASE_URL}/success`,

        cancel_url:
          `${process.env.NEXT_PUBLIC_BASE_URL}/cancel`,

        notify_url:
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/payfast-itn`,

        // Server-calculated amount.
        amount:
          totalPrice.toString(),

        // Server-trusted service name.
        item_name:
          service.name,

        custom_str1:
          groupId,

        passphrase:
          process.env
            .PAYFAST_PASSPHRASE!,
      });

    return NextResponse.json(
      payfast
    );
  } catch (error) {
    console.error(
      "Booking creation error:",
      error
    );

    return NextResponse.json(
      {
        error:
          "Failed to create booking",
      },
      { status: 500 }
    );
  }
}

