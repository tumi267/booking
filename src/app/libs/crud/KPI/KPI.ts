import prisma from "../../prisma"
// ==============================
// KPI STATS
// ==============================
// export const stats = [
//     { label: "Today's Bookings", value: '14' },
//     { label: 'Pending Confirmations', value: '3' },
//     { label: 'Active Providers', value: '8/10' },
//     { label: 'Daily Revenue', value: 'R9,450' },
//   ]

  export async function getAdminKpis() {
    // --------------------------------
    // TODAY
    // --------------------------------
  
    const now = new Date()
  
    const startOfToday = new Date(Date.UTC(now.getUTCFullYear(),now.getUTCMonth(),now.getUTCDate(),0,0,0))
  
    const startOfTomorrow = new Date(Date.UTC(now.getUTCFullYear(),now.getUTCMonth(),now.getUTCDate() + 1,0,0,0))
  
    // --------------------------------
    // KPI QUERIES
    // --------------------------------
  
    const [todaysBookings,pendingConfirmations,activeProviders,totalProviders,revenue,] = await Promise.all([
      // Today's bookings
      prisma.booking.count({
        where: {
          date: {
            gte: startOfToday,
            lt: startOfTomorrow,
          },
        },
      }),
  
      // Pending confirmations
      prisma.booking.count({
        where: {
          status: "PENDING",
        },
      }),
  
      // Active providers
      prisma.provider.count({
        where: {
          isAvailable: true,
        },
      }),
  
      // Total providers
      prisma.provider.count(),
  
      // Daily revenue
      prisma.booking.aggregate({
        _sum: {
          price: true,
        },
        where: {
          date: {
            gte: startOfToday,
            lt: startOfTomorrow,
          },
          status: {
            in: [
              "CONFIRMED",
              "IN_PROGRESS",
              "COMPLETED",
            ],
          },
        },
      }),
    ])
  
    // --------------------------------
    // FORMAT REVENUE
    // --------------------------------
  
    const dailyRevenue =revenue._sum.price ?? 0
  
    const formattedRevenue =`R${dailyRevenue.toLocaleString("en-ZA",
        {
          minimumFractionDigits: 0,
          maximumFractionDigits: 2,
        }
      )}`
  
    // --------------------------------
    // RETURN ADMIN KPI DATA
    // --------------------------------
  
    return [
      {
        label: "Today's Bookings",
        value: String(todaysBookings),
      },
      {
        label: "Pending Confirmations",
        value: String(
          pendingConfirmations
        ),
      },
      {
        label: "Active Providers",
        value: `${activeProviders}/${totalProviders}`,
      },
      {
        label: "Daily Revenue",
        value: formattedRevenue,
      },
    ]
  }