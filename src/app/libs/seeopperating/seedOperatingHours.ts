export async function seedOperatingHours() {
    const defaults = [
      { dayOfWeek: 0, open: "08:00", close: "18:00", working: true },
      { dayOfWeek: 1, open: "08:00", close: "18:00", working: true },
      { dayOfWeek: 2, open: "08:00", close: "18:00", working: true },
      { dayOfWeek: 3, open: "08:00", close: "18:00", working: true },
      { dayOfWeek: 4, open: "08:00", close: "18:00", working: true },
      { dayOfWeek: 5, open: "08:00", close: "13:00", working: false },
      { dayOfWeek: 6, open: "08:00", close: "13:00", working: false },
    ]
    for (const d of defaults) {
      await fetch("/api/operating-hours", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          dayOfWeek: d.dayOfWeek,
          startTime: d.open,
          endTime: d.close,
        }),
      })
      await fetch("/api/operating-hours", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          dayOfWeek: d.dayOfWeek,
          isActive: d.working,
        }),
      })
    }
  }
  export function mapOperatingHours(data: any[], weekdays: readonly string[]) {
    const map: any = {}
  
    data.forEach((d) => {
      const day = weekdays[d.dayOfWeek]
  
      map[day] = {
        open: d.startTime,
        close: d.endTime,
        working: d.isActive,
      }
    })
  
    return map
  }