import {
  createServiceRequest,
  deleteServiceRequest,
  fetchServices,
  type ServicePayload,
  updateServiceRequest,
} from './service'

export async function getServicesAction() {
  return fetchServices()
}

export async function createServiceAction(data: ServicePayload) {
  return createServiceRequest(data)
}

export async function updateServiceAction(
  id: string,
  data: ServicePayload
) {
  return updateServiceRequest(id, data)
}

export async function deleteServiceAction(id: string) {
  return deleteServiceRequest(id)
}