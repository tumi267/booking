'use client'

import {useEffect,useState,} from 'react'
import { getkpi } from '../libs/kpi/kpi'

type Stat = {
    label: string
    value: string
}

export function useKpi() {
  const [stats, setStats] =useState<Stat[]>([])

  const [loading, setLoading] =useState(true)

  const [error, setError] =useState<string | null>(null)

  useEffect(() => {
    async function loadKpis() {
      try {
        setLoading(true)
        setError(null)
        const data = await getkpi()
        setStats(data)
      } catch (error) {
        console.error(
          'KPI error:',
          error
        )
        setError(
          'Failed to load dashboard statistics'
        )
      } finally {
        setLoading(false)
      }
    }
    loadKpis()
  }, [])

  return {stats,loading, error,}
}