import { updateOperatingHour,updateOperatingActive } from "./service"
import { weekdays } from "./weekdays"

export async function updateOperatingTime(
  dayIndex: number,
  type: "open" | "close",
  value: string,
  current: { open: string; close: string }
) {
  const payload = {
    dayOfWeek: dayIndex,
    startTime: type === "open" ? value : current.open,
    endTime: type === "close" ? value : current.close,
  }
  await updateOperatingHour(payload)
}

export async function toggleOperatingDay(
  dayIndex: number,
  currentWorking: boolean
) {
  await updateOperatingActive ({
    dayOfWeek: dayIndex,
    isActive: !currentWorking,
  })
}
