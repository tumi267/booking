// src/app/libs/providers/useProviders.ts

'use client'

import { useEffect, useState } from 'react'
import {
  fetchProviders,
  createProvider,
  updateProvider,
  deleteProvider,
  Provider,
} from './service'
import { ProviderRole } from '@prisma/client'

type Banner = {
  type: 'success' | 'error'
  message: string
}

export function useProviders() {
  const [team, setTeam] = useState<Provider[]>([])
  const [loading, setLoading] = useState(false)
  const [banner, setBanner] = useState<Banner | null>(null)

  // -----------------------
  // LOAD
  // -----------------------
  useEffect(() => {
    load()
  }, [])

  async function load() {
    try {
      setLoading(true)
      const data = await fetchProviders()
      setTeam(data)
    } catch {
      setBanner({ type: 'error', message: 'Failed to load team' })
    } finally {
      setLoading(false)
    }
  }

  // -----------------------
  // UPDATE LOCAL FIELD
  // -----------------------
  function updateLocal<T extends keyof Provider>(
    id: string,
    key: T,
    value: Provider[T]
  ) {
    setTeam(prev =>
      prev.map(m => (m.id === id ? { ...m, [key]: value } : m))
    )
  }

  // -----------------------
  // CREATE OR UPDATE
  // -----------------------
  async function save(member: Provider & { tempId?: string }) {
    try {
      setLoading(true)

      let result: Provider

      if (!member.id) {
        result = await createProvider({
          firstName: member.firstName,
          lastName: member.lastName,
          email: member.email,
          role: member.role,
          isAvailable: member.isAvailable,
        })
      } else {
        result = await updateProvider(member)
      }

      setTeam(prev =>
        prev.map(m =>
          m.id === member.id || m.id === member.tempId ? result : m
        )
      )

      setBanner({ type: 'success', message: 'Saved successfully' })
    } catch {
      setBanner({ type: 'error', message: 'Save failed' })
    } finally {
      setLoading(false)
    }
  }

  // -----------------------
  // DELETE
  // -----------------------
  async function remove(id: string) {
    try {
      setLoading(true)
      await deleteProvider(id)

      setTeam(prev => prev.filter(m => m.id !== id))
      setBanner({ type: 'success', message: 'Deleted successfully' })
    } catch {
      setBanner({ type: 'error', message: 'Delete failed' })
    } finally {
      setLoading(false)
    }
  }

  // -----------------------
  // ADD TEMP MEMBER
  // -----------------------
  function addTempMember() {
    const tempId = crypto.randomUUID()

    const newMember: Provider & { tempId: string } = {
      id: '',
      tempId,
      firstName: 'New',
      lastName: 'Member',
      email: '',
      role: ProviderRole.TRAINER,
      isAvailable: true,
    }

    setTeam(prev => [...prev, newMember])
    return newMember
  }

  return {
    team,
    loading,
    banner,
    load,
    updateLocal,
    save,
    remove,
    addTempMember,
  }
}