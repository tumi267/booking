export async function fetchOperatingHours() {
  const res = await fetch("/api/operating-hours")
  return res.json()
}

export async function saveOperatingHour(payload: any) {
  return fetch("/api/operating-hours", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  })
}

export async function updateOperatingHour(payload: any) {
  return fetch("/api/operating-hours", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  })
}

export async function updateOperatingActive(payload: any) {
    return fetch("/api/operating-hours", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
  }