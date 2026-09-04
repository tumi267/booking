import prisma from "../../prisma";

function getSearchDateRange(
  search: string
): { start: Date; end: Date } | null {
  const value = search.trim().toLowerCase();

  const now = new Date();

  // --------------------------------
  // TODAY
  // --------------------------------

  if (value === "today") {
    const start = new Date(now);

    start.setUTCHours(0, 0, 0, 0);

    const end = new Date(start);

    end.setUTCDate(
      end.getUTCDate() + 1
    );

    return {
      start,
      end,
    };
  }

  // --------------------------------
  // TOMORROW
  // --------------------------------

  if (value === "tomorrow") {
    const start = new Date(now);

    start.setUTCHours(0, 0, 0, 0);

    start.setUTCDate(
      start.getUTCDate() + 1
    );

    const end = new Date(start);

    end.setUTCDate(
      end.getUTCDate() + 1
    );

    return {
      start,
      end,
    };
  }

  // --------------------------------
  // YYYY-MM-DD
  // --------------------------------

  if (
    /^\d{4}-\d{2}-\d{2}$/.test(value)
  ) {
    const start = new Date(
      `${value}T00:00:00.000Z`
    );

    if (
      Number.isNaN(
        start.getTime()
      )
    ) {
      return null;
    }

    const end = new Date(start);

    end.setUTCDate(
      end.getUTCDate() + 1
    );

    return {
      start,
      end,
    };
  }

  // --------------------------------
  // DD/MM/YYYY
  // --------------------------------

  const slashMatch =
    /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/.exec(
      value
    );

  if (slashMatch) {
    const day = Number(
      slashMatch[1]
    );

    const month = Number(
      slashMatch[2]
    );

    const year = Number(
      slashMatch[3]
    );

    const start = new Date(
      Date.UTC(
        year,
        month - 1,
        day
      )
    );

    // Make sure JavaScript didn't
    // roll an invalid date over.
    if (
      start.getUTCFullYear() !== year ||
      start.getUTCMonth() !==
        month - 1 ||
      start.getUTCDate() !== day
    ) {
      return null;
    }

    const end = new Date(start);

    end.setUTCDate(
      end.getUTCDate() + 1
    );

    return {
      start,
      end,
    };
  }

  // --------------------------------
  // "7 SEPTEMBER"
  // "7 SEP"
  // --------------------------------

  const monthNames = [
    "january",
    "february",
    "march",
    "april",
    "may",
    "june",
    "july",
    "august",
    "september",
    "october",
    "november",
    "december",
  ];

  const monthMatch =
    /^(\d{1,2})\s+([a-z]+)$/.exec(
      value
    );

  if (monthMatch) {
    const day = Number(
      monthMatch[1]
    );

    const monthInput =
      monthMatch[2];

    const monthIndex =
      monthNames.findIndex(
        month =>
          month === monthInput ||
          month.startsWith(
            monthInput
          )
      );

    if (
      monthIndex === -1 ||
      day < 1 ||
      day > 31
    ) {
      return null;
    }

    const year =
      now.getUTCFullYear();

    const start = new Date(
      Date.UTC(
        year,
        monthIndex,
        day
      )
    );

    // Reject invalid dates such as
    // 31 February.
    if (
      start.getUTCFullYear() !==
        year ||
      start.getUTCMonth() !==
        monthIndex ||
      start.getUTCDate() !== day
    ) {
      return null;
    }

    const end = new Date(start);

    end.setUTCDate(
      end.getUTCDate() + 1
    );

    return {
      start,
      end,
    };
  }

  return null;
}

export async function searchBookings(
  query: string
) {
  const search = query.trim();

  if (!search) {
    return [];
  }

  // --------------------------------
  // DATE SEARCH
  // --------------------------------

  const dateRange =
    getSearchDateRange(search);

  // --------------------------------
  // TEXT SEARCH
  // --------------------------------

  const searchConditions: any[] = [
    {
      id: {
        contains: search,
        mode: "insensitive",
      },
    },

    {
      groupId: {
        contains: search,
        mode: "insensitive",
      },
    },

    {
      time: {
        contains: search,
        mode: "insensitive",
      },
    },

    {
      client: {
        is: {
          firstName: {
            contains: search,
            mode: "insensitive",
          },
        },
      },
    },

    {
      client: {
        is: {
          lastName: {
            contains: search,
            mode: "insensitive",
          },
        },
      },
    },

    {
      client: {
        is: {
          email: {
            contains: search,
            mode: "insensitive",
          },
        },
      },
    },

    {
      client: {
        is: {
          phone: {
            contains: search,
            mode: "insensitive",
          },
        },
      },
    },

    {
      provider: {
        is: {
          firstName: {
            contains: search,
            mode: "insensitive",
          },
        },
      },
    },

    {
      provider: {
        is: {
          lastName: {
            contains: search,
            mode: "insensitive",
          },
        },
      },
    },

    {
      services: {
        is: {
          name: {
            contains: search,
            mode: "insensitive",
          },
        },
      },
    },
  ];

  // --------------------------------
  // ADD DATE CONDITION
  // --------------------------------

  if (dateRange) {
    searchConditions.push({
      date: {
        gte: dateRange.start,
        lt: dateRange.end,
      },
    });
  }

  // --------------------------------
  // QUERY
  // --------------------------------

  const bookings =
    await prisma.booking.findMany({
      where: {
        OR: searchConditions,
      },

      include: {
        client: true,
        provider: true,
        services: true,
      },

      orderBy: [
        {
          date: "asc",
        },
        {
          time: "asc",
        },
      ],

      take: 50,
    });

  return bookings;
}