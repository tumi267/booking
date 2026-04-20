'use client'

import { useEffect, useMemo, useState } from 'react'

import {
  createService as createServiceApi,
  deleteService as deleteServiceApi,
  getServices as getServicesApi,
  updateService as updateServiceApi,
} from '@/app/libs/service/logic'

import { loadProvidersAction } from '@/app/libs/team/action'

import type {
  Banner,
  Service,
  TeamMember,
} from '@/app/libs/service/types'

type UpdateKey = keyof Service

export function useAdminServices() {
  const [services, setServices] = useState<Service[]>([])
  const [team, setTeam] = useState<TeamMember[]>([])
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [showEditor, setShowEditor] = useState(false)
  const [loading, setLoading] = useState(false)
  const [banner, setBanner] = useState<Banner | null>(null)

  // ---------- SELECTED SERVICE ----------
  const selectedService = useMemo(() => {
    return (
      services.find(
        (s) => s.id === selectedId || s.tempId === selectedId
      ) || null
    )
  }, [services, selectedId])

  const getKey = (service: Service) => service.id || service.tempId

  // ---------- LOAD DATA ----------
  useEffect(() => {
    loadData()
  }, [])

  async function loadData(): Promise<void> {
    try {
      setLoading(true)

      const [serviceData, providerData] = await Promise.all([
        getServicesApi(),
        loadProvidersAction(),
      ])

      setServices(serviceData)
      setTeam(providerData)
    } catch (error) {
      console.error(error)
      setBanner({
        type: 'error',
        message: 'Failed to load services and providers.',
      })
    } finally {
      setLoading(false)
    }
  }

  // ---------- ADD SERVICE ----------
  function addService(): void {
    const newService: Service = {
      id: null,
      tempId: crypto.randomUUID(),
      name: 'New Service',
      price: 0,
      duration: 60,
      description: '',
      isActive: true,
      assignedTeam: [],
    }

    setServices((prev) => [...prev, newService])
    setSelectedId(newService.tempId)
    setShowEditor(true)
  }

  // ---------- LOCAL UPDATE ----------
  function updateService<K extends UpdateKey>(
    id: string,
    key: K,
    value: Service[K]
  ): void {
    setServices((prev) =>
      prev.map((service) =>
        getKey(service) === id
          ? { ...service, [key]: value }
          : service
      )
    )
  }

  // ---------- REMOVE SERVICE ----------
  async function removeService(id: string): Promise<void> {
    try {
      setLoading(true)

      const service = services.find((s) => getKey(s) === id)

      if (service?.id) {
        await deleteServiceApi(service.id)
      }

      setServices((prev) =>
        prev.filter((s) => getKey(s) !== id)
      )

      setSelectedId(null)
      setShowEditor(false)

      setBanner({
        type: 'success',
        message: 'Service removed successfully.',
      })
    } catch (error) {
      console.error(error)
      setBanner({
        type: 'error',
        message: 'Failed to remove service.',
      })
    } finally {
      setLoading(false)
    }
  }

  // ---------- SAVE SERVICE ----------
  async function saveService(): Promise<void> {
    if (!selectedService) return

    try {
      setLoading(true)

      const payload = {
        name: selectedService.name,
        description: selectedService.description,
        price: selectedService.price,
        duration: selectedService.duration,
        isActive: selectedService.isActive,
        assignedTeamIds: selectedService.assignedTeam.map(
          (m) => m.id
        ),
      }

      // CREATE
      if (!selectedService.id) {
        const created = await createServiceApi(payload)

        setServices((prev) =>
          prev.map((service) =>
            service.tempId === selectedService.tempId
              ? {
                  ...created,
                  tempId: '',
                }
              : service
          )
        )

        setSelectedId(created.id)

        setBanner({
          type: 'success',
          message: 'Service created successfully.',
        })
      }

      // UPDATE
      else {
        const updated = await updateServiceApi(
          selectedService.id,
          payload
        )

        setServices((prev) =>
          prev.map((service) =>
            service.id === selectedService.id
              ? {
                  ...service,
                  ...updated,
                }
              : service
          )
        )

        setBanner({
          type: 'success',
          message: 'Service updated successfully.',
        })
      }

      setShowEditor(false)
    } catch (error) {
      console.error(error)
      setBanner({
        type: 'error',
        message: 'Failed to save service.',
      })
    } finally {
      setLoading(false)
    }
  }

  // ---------- RETURN ----------
  return {
    services,
    team,
    selectedId,
    setSelectedId,
    selectedService,
    showEditor,
    setShowEditor,
    loading,
    banner,
    getKey,
    addService,
    updateService,
    removeService,
    saveService,
    reload: loadData,
  }
}