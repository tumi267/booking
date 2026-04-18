import { fetchOperatingHours } from "./service"
import { seedOperatingHours } from "../seeopperating/seedOperatingHours"
import { mapOperatingHours } from "./mapper"

export async function loadOperatingHours() {
  const data = await fetchOperatingHours()

  if (!data.length) {
    await seedOperatingHours()
    const fresh = await fetchOperatingHours()
    return mapOperatingHours(fresh)
  }

  return mapOperatingHours(data)
}