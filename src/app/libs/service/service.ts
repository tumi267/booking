export type ServicePayload = {
  name: string
  description: string
  price: number
  duration: number
  isActive: boolean
  assignedTeamIds: string[]
}

export async function fetchServices() {
  const response = await fetch('/api/service')

  if (!response.ok) {
    throw new Error('Failed to fetch services')
  }

  return response.json()
}

export async function createServiceRequest(data: ServicePayload) {
  const response = await fetch('/api/service', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    throw new Error('Failed to create service')
  }

  return response.json()
}

export async function updateServiceRequest(
  id: string,
  data: ServicePayload
) {
  const response = await fetch('/api/service', {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      id,
      ...data,
    }),
  })

  if (!response.ok) {
    throw new Error('Failed to update service')
  }

  return response.json()
}

export async function deleteServiceRequest(id: string) {
  const response = await fetch('/api/service', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ id }),
  })

  if (!response.ok) {
    throw new Error('Failed to delete service')
  }

  return response.json()
}

