export function parseBookingDate(dateString: string) {
    const [day, month, year] = dateString.split("-")
    if (!day || !month || !year) {
      throw new Error("Invalid date format")
    }
    const formatted = `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`
    const date = new Date(formatted)
    return {
      date,
      iso: formatted,
    }
  }