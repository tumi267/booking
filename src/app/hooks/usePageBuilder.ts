'use client'

import { useEffect, useState } from 'react'

export type PageComponentItem = {
  id: string
  page: string
  component: string
  position: number
}

export function usePageBuilder(page: string) {
  const [components, setComponents] = useState<PageComponentItem[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [adding, setAdding] = useState(false)
  const [removing, setRemoving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // --------------------------------
  // LOAD COMPONENTS
  // --------------------------------

  useEffect(() => {
    let cancelled = false

    async function loadComponents() {
      try {
        setLoading(true)
        setError(null)

        const response = await fetch(
          `/api/admin/page-components?page=${encodeURIComponent(page)}`,
          {
            method: 'GET',
            cache: 'no-store',
          }
        )

        if (!response.ok) {
          throw new Error('Failed to load page components')
        }

        const data = (await response.json()) as PageComponentItem[]

        if (!cancelled) {
          setComponents(data)
        }
      } catch (error) {
        if (cancelled) return

        console.error('Page builder load error:', error)
        setError('Failed to load page components')
      } finally {
        if (!cancelled) {
          setLoading(false)
        }
      }
    }

    loadComponents()

    return () => {
      cancelled = true
    }
  }, [page])

  // --------------------------------
  // ADD COMPONENT
  // --------------------------------

  const addComponent = async (component: string) => {
    try {
      setAdding(true)
      setError(null)

      const response = await fetch('/api/admin/page-components', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          page,
          component,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(
          data?.error || 'Failed to add component'
        )
      }

      setComponents(current => [...current, data])
    } catch (error) {
      console.error('Page builder add error:', error)

      if (error instanceof Error) {
        setError(error.message)
      } else {
        setError('Failed to add component')
      }
    } finally {
      setAdding(false)
    }
  }

  // --------------------------------
  // REMOVE COMPONENT
  // --------------------------------

  const removeComponent = async (id: string) => {
    try {
      setRemoving(true)
      setError(null)

      const response = await fetch(
        `/api/admin/page-components?id=${encodeURIComponent(id)}`,
        {
          method: 'DELETE',
        }
      )

      const data = await response.json()

      if (!response.ok) {
        throw new Error(
          data?.error || 'Failed to remove component'
        )
      }

      setComponents(current =>
        current
          .filter(component => component.id !== id)
          .map((component, index) => ({
            ...component,
            position: index,
          }))
      )
    } catch (error) {
      console.error('Page builder remove error:', error)

      if (error instanceof Error) {
        setError(error.message)
      } else {
        setError('Failed to remove component')
      }
    } finally {
      setRemoving(false)
    }
  }

  // --------------------------------
  // MOVE COMPONENT
  // --------------------------------

  const moveComponent = (
    fromIndex: number,
    toIndex: number
  ) => {
    setComponents(current => {
      const updated = [...current]

      const [moved] = updated.splice(fromIndex, 1)

      updated.splice(toIndex, 0, moved)

      return updated.map((component, index) => ({
        ...component,
        position: index,
      }))
    })
  }

  // --------------------------------
  // SAVE LAYOUT
  // --------------------------------

  const saveLayout = async () => {
    try {
      setSaving(true)
      setError(null)

      const response = await fetch(
        '/api/admin/page-components',
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            page,
            components: components.map(component => ({
              id: component.id,
              position: component.position,
            })),
          }),
        }
      )

      const data = await response.json()

      if (!response.ok) {
        throw new Error(
          data?.error || 'Failed to save page layout'
        )
      }

      setComponents(data)
    } catch (error) {
      console.error('Page builder save error:', error)

      if (error instanceof Error) {
        setError(error.message)
      } else {
        setError('Failed to save page layout')
      }
    } finally {
      setSaving(false)
    }
  }

  return {
    components,
    loading,
    saving,
    adding,
    removing,
    error,
    addComponent,
    removeComponent,
    moveComponent,
    saveLayout,
  }
}