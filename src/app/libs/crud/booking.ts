import prisma from "../prisma"

type FlatBooking = {
  serviceId: string
  providerId: string
  clientId: string
  date: Date
  time: string
  groupId: string
  sessionDuration: number
  price:number
  
}

//
// CREATE
//
export async function createBookings(flatBookings: FlatBooking[]) {
  return await prisma.booking.createMany({
    data: flatBookings,
    skipDuplicates: true
  })
}

//
// READ: all bookings (filtered optional)
//
export async function getBookings(providerId?: string) {
  return await prisma.booking.findMany({
    where: providerId ? { providerId } : undefined,
    orderBy: {
      date: "asc"
    }
  })
}
export async function getBookingsByDate(dateInput: Date | string) {
  const date = typeof dateInput === "string" ? new Date(dateInput) : dateInput;

  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, '0');
  const day = String(date.getUTCDate()).padStart(2, '0');
  const dateString = `${year}-${month}-${day}`;


  // console.log("Querying Range:", startOfDay.toISOString(), "to", endOfDay.toISOString());
  const bookings = await prisma.booking.findMany({
    where: {
      date: {
        gte: new Date(Date.UTC(year, date.getUTCMonth(), date.getUTCDate(), 0, 0, 0)),
        lte: new Date(Date.UTC(year, date.getUTCMonth(), date.getUTCDate(), 23, 59, 59)),
      }
    },
    include: {
      client: true,   // Include relations if needed for the UI
      services: true,
    },
    orderBy: {
      time: "asc"
    }
  });
// console.log(bookings)
  // 3. Group by groupId
  const grouped = new Map<string, typeof bookings>();

  bookings.forEach((b) => {
    if (!grouped.has(b.groupId)) {
      grouped.set(b.groupId, []);
    }
    grouped.get(b.groupId)!.push(b);
  });

  // 4. Map to the final format with correct pricing logic
  return Array.from(grouped.entries()).map(([groupId, items]) => {
    const totalOrderPrice = items[0]?.price || 0; 
    const sessionCount = items.length;
    const pricePerSession = totalOrderPrice / sessionCount; // If sessions are equal value
  
    return {
      groupId,
      items,
      totalOrderPrice, 
      todaySessions: items.length, // Sessions specific to this date
      time: items[0].time,
      status: items[0]?.status,
      clientName: items[0]?.client?.firstName || "Guest"
    };
  });
}
//
// READ: booking group (multi-slot booking)
//
export async function getBookingByGroup(groupId: string) {
  return await prisma.booking.findMany({
    where: {
      groupId
    },
    orderBy: {
      date: "asc"
    }
  })
}

//
// CHECK CONFLICTS
//
export async function checkConflicts(
  providerId: string,
  flatBookings: FlatBooking[]
) {
  return await prisma.booking.findMany({
    where: {
      providerId,
      status: {
        in: ["CONFIRMED"]
      },

      OR: flatBookings.map((b) => ({
        date: b.date,
        time: b.time
      }))
    }
  })
}

//
// DELETE SINGLE SLOT
//
export async function deleteBooking(bookingId: string) {
  return await prisma.booking.delete({
    where: {
      id: bookingId
    }
  })
}

//
// DELETE FULL GROUP (IMPORTANT FOR YOUR FLOW)
//
export async function deleteBookingGroup(groupId: string) {
  return await prisma.booking.deleteMany({
    where: {
      groupId
    }
  })
}
// get admin calendar data
export async function getCalendarBookings(month: number, year: number) {
  // Use UTC to match how we now store and query single dates
  const start = new Date(Date.UTC(year, month, 1, 0, 0, 0));
  const end = new Date(Date.UTC(year, month + 1, 1, 0, 0, 0));

  const bookings = await prisma.booking.findMany({
    where: {
      date: {
        gte: start,
        lt: end
      },

    },
    select: {
      date: true,
      groupId: true
    }
  });

  const grouped: Record<number, Set<string>> = {};

  bookings.forEach((b) => {
    // Use getUTCDate() to ensure the day aligns with our UTC storage
    const day = b.date.getUTCDate();

    if (!grouped[day]) {
      grouped[day] = new Set();
    }

    grouped[day].add(b.groupId);
  });

  return Object.entries(grouped).map(([day, groupSet]) => ({
    day: Number(day),
    month,
    count: groupSet.size
  }));
}

export async function getBookingByGroupIdAndDate(groupId: string, date: Date) {
  const start = new Date(date);
  start.setUTCHours(0, 0, 0, 0);

  const end = new Date(date);
  end.setUTCHours(23, 59, 59, 999);

  return await prisma.booking.findMany({
    where: {
      groupId,
      date: {
        gte: start,
        lte: end
      }
    },
    include: {
      client: true,   
      services: true,
      provider: true,
    },
    orderBy: {
      time: "asc"
    }
  });
}

export async function updatebookingbyday(
  groupId: string, 
  slots: any, // The new slots from formState
  date:Date,
  status: any, // Matches BookingStatus enum
  providerId: string,
) {

  
  const bookingtoupdate=await prisma.booking.findMany({
    where: {
      date: date,
      groupId:groupId
    }}
  )
  const {clientId,serviceId,price,sessionDuration}=bookingtoupdate[0]
  const newproviderId=slots.providerId
  const newstatus=slots.status
  const newdate=new Date(slots.date)
  
  const normaliseslots=slots.slots.map((e:any) => {
    return{clientId,serviceId,price,sessionDuration,providerId:newproviderId,status:newstatus,date:newdate,groupId,time:e.time}
  });
  // delete old booking
  await prisma.booking.deleteMany({
    where: {
      groupId,
      date:date,
    },
  })
  // create new booking
  return await prisma.booking.createMany({
    data: normaliseslots,
  })
  };
// 
// GET BOOKING BYT CLIENT ID
// 
export function getBookingByClientId(id:string){
  return prisma.booking.findMany({where:{
    client:{id:id}
  }
})
}