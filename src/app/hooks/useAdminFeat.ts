'use client'
import React, { CSSProperties, useEffect, useState } from 'react'
import { getFeat } from '../libs/Feat/Feat'

type Feature = {
  id: string
  title: string
  text: string
  image: string
  fontSize?: string
  fontColor?: string
  imageWidth?: string
  imageHeight?: string
}
type SectionKey = 'section' | 'grid' | 'card' | 'text' | 'image' | 'textContain'
type Breakpoint = 'desktop' | 'tablet' | 'mobile'

const defaultBp = (): {
    text: CSSProperties
    textContain: { top: number; left: number }
    section: CSSProperties
    grid: {
      columns: number
      gap: number
      justifyContent: CSSProperties['justifyContent']
      alignItems: CSSProperties['alignItems']
    }
    card: {
      width: number
      radius: number
      background: string
      padding: number
    }
    image: {
      width: string
      height: number
      objectFit: CSSProperties['objectFit']
    }
  } => ({
  text: {
    color: '#000000',
    fontSize: 16,
    fontWeight: 400,
    textAlign: 'center',
    lineHeight: 1.4,
    width: '100%',
  },

  textContain: {
    top: 50,
    left: 50,
  },

  section: {
    marginTop: 40,
    marginBottom: 40,
    height: 650,
    maxWidth: '100%',
    width: '100%',
    backgroundColor: '#ffffff',
    borderRadius: 0,
    overflow: 'hidden',
    position: 'relative',
  },

  grid: {
    columns: 4,
    gap: 20,
    justifyContent: 'center',
    alignItems: 'stretch',
  },

  card: {
    width: 100,
    radius: 8,
    background: '#ffffff',
    padding: 10,
  },

  image: {
    width: '100%',
    height: 160,
    objectFit: 'cover',
  },
})

function useAdminFeat(location: string, sectionNum: string, viewport: Breakpoint) {

  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [showEditor, setShowEditor] = useState(false)
  const [isLoading, setLoading] = useState(true)

  const [openSections, setOpenSections] = useState({
    section: false,
    grid: false,
    card: false,
    selected: false,
  })

  const [currentBreakpoint, setCurrentBreakpoint] =
    useState<Breakpoint>(viewport || 'desktop')

  const [data, setData] = useState<{
    features: Feature[]
    breakpoints: Record<Breakpoint, ReturnType<typeof defaultBp>>
  }>({
    features: [],
    breakpoints: {
      desktop: defaultBp(),
      tablet: defaultBp(),
      mobile: defaultBp(),
    },
  })

  // -----------------------
  // CURRENT DERIVED STATE
  // -----------------------
  const current = data.breakpoints[currentBreakpoint] || data.breakpoints.desktop

  const features = data.features

  const sectionStyle = current.section

  const selected = features.find((f) => f.id === selectedId)

  // -----------------------
  // BREAKPOINT SYNC
  // -----------------------
  useEffect(() => {
    setCurrentBreakpoint(viewport)
  }, [viewport])

  // -----------------------
  // TOGGLES
  // -----------------------
  const toggleSection = (key: keyof typeof openSections) => {
    setOpenSections((prev) => ({
      ...prev,
      [key]: !prev[key],
    }))
  }

  // -----------------------
  // FEATURE ACTIONS
  // -----------------------
  const addFeature = () => {
    const newFeature: Feature = {
      id: crypto.randomUUID(),
      title: 'title',
      text: 'text',
      image: '/next.svg',
      fontSize: '16px',
      fontColor: '#000000',
      imageWidth: '100%',
      imageHeight: '160px',
    }

    setData((prev) => ({
      ...prev,
      features: [...prev.features, newFeature],
    }))
  }

  const updateFeature = (id: string, key: keyof Feature, value: string) => {
    setData((prev) => ({
      ...prev,
      features: prev.features.map((f) =>
        f.id === id ? { ...f, [key]: value } : f
      ),
    }))
  }
  const updateBreakpoint = <
  K extends SectionKey
>(
  section: K,
  value: Partial<typeof data.breakpoints.desktop[K]>
) => {
  setData((prev) => ({
    ...prev,
    breakpoints: {
      ...prev.breakpoints,
      [currentBreakpoint]: {
        ...prev.breakpoints[currentBreakpoint],
        [section]: {
          ...(prev.breakpoints[currentBreakpoint][section] as object),
          ...value,
        },
      },
    },
  }))
}

  const removeFeature = (id: string) => {
    setData((prev) => ({
      ...prev,
      features: prev.features.filter((f) => f.id !== id),
    }))
    setSelectedId(null)
  }

  // -----------------------
  // LOAD
  // -----------------------
  useEffect(() => {
    const getdata = async () => {
      const res = await getFeat(location, sectionNum)

      if (!res) {
        setLoading(false)
        return
      }

      const featuredata = await res.json()

      // later you'll map this into data
      console.log(featuredata)

      setLoading(false)
    }

    getdata()
  }, [location, sectionNum])

  // -----------------------
  // SAVE
  // -----------------------
  const handleSave = async () => {
    const payload = {
      location,
      sectionNum,
      data,
    }

    console.log('SAVE:', payload)
    setShowEditor(false)
  }

  return {
    // DATA
    current,
    features,
    sectionStyle,

    // SETTERS (only what is needed externally)
    setData,
    setSelectedId,

    // FEATURE ACTIONS
    addFeature,
    updateFeature,
    removeFeature,
    selected,
    updateBreakpoint,
    // UI STATE
    selectedId,
    showEditor,
    setShowEditor,
    isLoading,

    // TOGGLES
    openSections,
    toggleSection,

    // SAVE
    handleSave,
  }
}

export default useAdminFeat