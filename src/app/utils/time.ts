/**
 * Generates booking slots between two times.
 *
 * Example:
 *
 * 09:00 → 12:00
 * interval = 60
 *
 * [
 *   "09:00",
 *   "10:00",
 *   "11:00"
 * ]
 */
export function generateTimeSlots(
    startTime: string,
    endTime: string,
    intervalMinutes: number
  ): string[] {
    if (intervalMinutes <= 0) {
      return []
    }
  
    const [
      startHour,
      startMinute,
    ] = startTime
      .split(':')
      .map(Number)
  
    const [
      endHour,
      endMinute,
    ] = endTime
      .split(':')
      .map(Number)
  
    if (
      Number.isNaN(startHour) ||
      Number.isNaN(startMinute) ||
      Number.isNaN(endHour) ||
      Number.isNaN(endMinute)
    ) {
      return []
    }
  
    const current = new Date()
  
    current.setHours(
      startHour,
      startMinute,
      0,
      0
    )
  
    const end = new Date()
  
    end.setHours(
      endHour,
      endMinute,
      0,
      0
    )
  
    const slots: string[] = []
  
    while (current < end) {
      const hours = String(
        current.getHours()
      ).padStart(2, '0')
  
      const minutes = String(
        current.getMinutes()
      ).padStart(2, '0')
  
      slots.push(
        `${hours}:${minutes}`
      )
  
      current.setMinutes(
        current.getMinutes() +
          intervalMinutes
      )
    }
  
    return slots
  }
  
  /**
   * Builds a time range from a clicked slot.
   *
   * First click:
   *   [] + 10:00 → [10:00]
   *
   * Second click:
   *   [10:00] + 12:00
   *   → [10:00, 11:00, 12:00]
   *
   * Third click:
   *   starts a new selection
   */
  export function selectTimeRange(
    currentTimes: string[],
    clickedTime: string,
    allSlots: string[]
  ): string[] {
    // First selection
    if (currentTimes.length === 0) {
      return [clickedTime]
    }
  
    // Second selection
    if (currentTimes.length === 1) {
      const start =
        currentTimes[0]
  
      const startIndex =
        allSlots.indexOf(start)
  
      const endIndex =
        allSlots.indexOf(clickedTime)
  
      if (
        startIndex === -1 ||
        endIndex === -1
      ) {
        return currentTimes
      }
  
      const [
        from,
        to,
      ] =
        startIndex < endIndex
          ? [
              startIndex,
              endIndex,
            ]
          : [
              endIndex,
              startIndex,
            ]
  
      return allSlots.slice(
        from,
        to + 1
      )
    }
  
    // Existing range → start again
    return [clickedTime]
  }