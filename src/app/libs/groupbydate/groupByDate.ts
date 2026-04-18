import { Prisma } from "@prisma/client";

type Booking = Prisma.BookingGetPayload<{
  include: {
    client: true;
    services: true;
    provider: true;
  };
}>;

type GroupedBooking = {
    groupId: string;
    items: Booking[];
    totalOrderPrice: number;
    todaySessions: number;
    time: string;
    status: string;
    clientName: string;
  };
  
  export function groupBookingsByDate(bookings: Booking[]) {
    const map = new Map<string, GroupedBooking>();
  
    bookings.forEach((booking) => {
      const dateKey = booking.date.toISOString().split('T')[0];
      const key = `${booking.groupId}_${dateKey}`;
  
      if (!map.has(key)) {
        map.set(key, {
          groupId: booking.groupId,
          items: [],
          totalOrderPrice: booking.price,
          todaySessions: 0,
          time: booking.time,
          status: booking.status,
          clientName: `${booking.client?.firstName} ${booking.client?.lastName}` ?? "Unknown",
        });
      }
  
      const group = map.get(key)!;
  
      group.items.push(booking);
      group.todaySessions += 1;
  
    ;
    });
  
    return Array.from(map.values());
  }