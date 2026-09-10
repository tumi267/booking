import { Prisma } from "@prisma/client";
import prisma from "../../prisma";

type Booking = Prisma.BookingGetPayload<{
  include: {
    client: true;
    services: true;
    provider: true;
  };
}>;

export async function GetUserBooking(id: string) {
  const user = await prisma.user.findUnique({
    where: {
      clerkId: id,
    },
  });

  if (!user) {
    return [];
  }

  const bookings = await prisma.booking.findMany({
    where: {
      clientId: user.id,
    },
    include: {
      client: true,
      services: true,
      provider: true,
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

  const groups = new Map<
    string,
    {
      groupId: string;
      date: Date;
      items: Booking[];
      totalOrderPrice: number;
      todaySessions: number;
      time: string;
      status: string;
      clientName: string;
    }
  >();

  for (const booking of bookings) {
    const dateKey = booking.date.toISOString().split("T")[0];

    // IMPORTANT:
    // One group = one groupId on one date
    const key = `${booking.groupId}-${dateKey}`;

    let group = groups.get(key);

    if (!group) {
      group = {
        groupId: booking.groupId,
        date: booking.date,
        items: [],
        totalOrderPrice: 0,
        todaySessions: 0,
        time: booking.time,
        status: booking.status,
        clientName: booking.client
          ? `${booking.client.firstName} ${booking.client.lastName}`
          : "Unknown",
      };

      groups.set(key, group);
    }

    group.items.push(booking);
    group.todaySessions += 1;

    // Each DB row represents ONE session.
    group.totalOrderPrice += Number(booking.price);
  }

  return Array.from(groups.values());
}

//upcoming bookings

  type GroupedBooking = {
    groupId: string;
    date: Date;
    items: Booking[];
    totalOrderPrice: number;
    todaySessions: number;
    time: string;
    status: string;
    clientName: string;
  };

export async function GetUserUpcomingBooking(id: string) {
    const user = await prisma.user.findUnique({
      where: {
        clerkId: id,
      },
    });
  
    if (!user) {
      return [];
    }
  
    // Start of today.
    // We want today's bookings + future bookings.
    const today = new Date();
  
    today.setHours(0, 0, 0, 0);
  
    const bookings = await prisma.booking.findMany({
      where: {
        clientId: user.id,
  
        date: {
          gte: today,
        },
  
        // Don't show cancelled bookings on Upcoming.
        status: {
          not: "CANCELLED",
        },
      },
  
      include: {
        client: true,
        services: true,
        provider: true,
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
  
    const groups = new Map<string, GroupedBooking>();
  
    for (const booking of bookings) {
      // Used only to identify the calendar date.
      const dateKey = booking.date.toISOString().split("T")[0];
  
      // One card = one group on one date.
      const key = `${booking.groupId}-${dateKey}`;
  
      let group = groups.get(key);
  
      if (!group) {
        group = {
          groupId: booking.groupId,
          date: booking.date,
          items: [],
          totalOrderPrice: 0,
          todaySessions: 0,
          time: booking.time,
          status: booking.status,
          clientName: booking.client
            ? `${booking.client.firstName} ${booking.client.lastName}`
            : "Unknown",
        };
  
        groups.set(key, group);
      }
  
      group.items.push(booking);
  
      // Number of sessions in this booking group.
      group.todaySessions += 1;
  
      // IMPORTANT:
      // Use the price saved on the booking.
      // This preserves the price at the time of booking.
      group.totalOrderPrice += Number(booking.price);
    }
  
    return Array.from(groups.values());
  }