'use client'
import React, { CSSProperties, useEffect, useState } from 'react'
import { getFeat, updateFeat } from '../libs/Feat/Feat'
import { uploadToimage } from '../libs/uploadImage/uploadImage'

type Feature = {
  id: string
  title: string
  text: string
  image: string
  fontSize?: string
  fontColor?: string
  imageWidth?: string
  imageHeight?: string
  file?: File | null
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
    objectFit: 'fill',
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

  const selected = features?.find((f) => f.id === selectedId)

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
  const updateFeatureFile = (id: string, file: File) => {
    setData(prev => ({
      ...prev,
      features: prev.features.map(f =>
        f.id === id ? { ...f, file } : f
      )
    }))
  }
  const updateBreakpoint = (section: SectionKey, value: any) => {
    setData(prev => {
      const bp = prev.breakpoints[currentBreakpoint]
  
      return {
        ...prev,
        breakpoints: {
          ...prev.breakpoints,
          [currentBreakpoint]: {
            ...bp,
            [section]: {
              ...bp[section],
              ...value,
            },
          },
        },
      }
    })
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

      const featuredata = await res

      // later you'll map this into data
      setData(featuredata)

      setLoading(false)
    }

    getdata()
  }, [location, sectionNum])

  // -----------------------
  // SAVE
  // -----------------------
  function cleanFeaturesPayload(data: any) {
    return {
      breakpoints: data.breakpoints,
      features: data.features.map((f: Feature) => ({
        id: f.id,
        title: f.title,
        text: f.text,
        image: f.image,
        fontSize: f.fontSize ?? null,
        fontColor: f.fontColor ?? null,
        imageWidth: f.imageWidth ?? null,
        imageHeight: f.imageHeight ?? null,
      })),
    }
  }
  const handleSave = async () => {
    const updatedFeatures = await Promise.all(
      data.features.map(async (feature) => {
        if (feature.file) {
          const res = await uploadToimage(feature.file)
  
          return {
            ...feature,
            image: res.Key,
            file: null,
          }
        }
        return feature
      })
    )
  
    const payload = {
      ...data,
      features: updatedFeatures,
    }
  
    // ✅ CLEAN IT HERE
    const cleaned = cleanFeaturesPayload(payload)
  
    const newdata = await updateFeat(location, sectionNum, cleaned)
  
    if (newdata) {
      setData(newdata)
    }
  
    setShowEditor(false)
  }

  return {
    // DATA
    current,
    features,
    sectionStyle,
    updateFeatureFile,
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