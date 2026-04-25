export async function updateBooking({groupId,slots,date,providerId,status,}: {
    groupId: string
    slots: any
    date: Date
    providerId: string
    status: string
  }) {
const res = await fetch('/api/updateBooking', {
      method: 'POST',
      headers: {'content-type': 'application/json'},
      body: JSON.stringify({groupId,slots,date,providerId,status,
      }),
    })
    if (!res.ok) {
      throw new Error('Failed to update booking')
    }
    return res.json()
  }
