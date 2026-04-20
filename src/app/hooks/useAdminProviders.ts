'use client'

import { useEffect, useMemo, useState } from 'react'
import {
  Banner,
  TeamMember,
} from '@/app/libs/team/service'
import {
  createEmptyProvider,
  findMember,
  removeMemberFromList,
  replaceMember,
  updateMemberField,
} from '@/app/libs/team/logic'
import {
  deleteProviderAction,
  loadProvidersAction,
  saveProviderAction,
} from '@/app/libs/team/action'

export function useAdminProviders() {
  const [team, setTeam] = useState<TeamMember[]>([])
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [showEditor, setShowEditor] = useState(false)
  const [loading, setLoading] = useState(false)
  const [banner, setBanner] = useState<Banner | null>(null)

  useEffect(() => {
    loadProviders()
  }, [])

  const selectedMember = useMemo(
    () => findMember(team, selectedId),
    [team, selectedId]
  )

  async function loadProviders() {
    try {
      setLoading(true)
      const data = await loadProvidersAction()
      setTeam(data)
    } catch {
      setBanner({
        type: 'error',
        message: 'Failed to load team members.',
      })
    } finally {
      setLoading(false)
    }
  }

  function addMember() {
    const member = createEmptyProvider()

    setTeam((prev) => [...prev, member])
    setSelectedId(member.tempId)
    setShowEditor(true)
  }

  function updateMember<K extends keyof TeamMember>(
    id: string,
    key: K,
    value: TeamMember[K]
  ) {
    setTeam((prev) =>
      updateMemberField(prev, id, key, value)
    )
  }

  async function saveMember(id: string) {
    const member = findMember(team, id)

    if (!member) return

    try {
      setLoading(true)

      const saved = await saveProviderAction(member)

      setTeam((prev) =>
        replaceMember(prev, id, saved)
      )

      setSelectedId(null)
      setShowEditor(false)

      setBanner({
        type: 'success',
        message: 'Member saved successfully.',
      })
    } catch {
      setBanner({
        type: 'error',
        message: 'Failed to save member.',
      })
    } finally {
      setLoading(false)
    }
  }

  async function removeMember(id: string) {
    const member = findMember(team, id)

    if (!member) return

    try {
      setLoading(true)

      await deleteProviderAction(member)

      setTeam((prev) =>
        removeMemberFromList(prev, member)
      )

      setSelectedId(null)
      setShowEditor(false)

      setBanner({
        type: 'success',
        message: 'Member removed successfully.',
      })
    } catch {
      setBanner({
        type: 'error',
        message: 'Failed to remove member.',
      })
    } finally {
      setLoading(false)
    }
  }

  return {
    team,
    selectedId,
    setSelectedId,
    selectedMember,
    showEditor,
    setShowEditor,
    loading,
    banner,
    addMember,
    updateMember,
    saveMember,
    removeMember,
  }
}