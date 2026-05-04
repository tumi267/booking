'use client'

import { useEffect, useState, CSSProperties } from 'react'
import { getHero } from '../libs/hero/service'
import { uploadToimage } from '../libs/uploadImage/uploadImage'
import { getImageUrl } from '../utils/supabase/getImageUrl'

type Breakpoint = 'desktop' | 'tablet' | 'mobile'
type Section = 'textStyle' | 'textContain' | 'heroContainer'

type BreakpointData = {
  textStyle: CSSProperties
  textContain: { top: number; left: number }
  heroContainer: CSSProperties
}

type HeroData = {
  text: string
  imageUrl?: string
  breakpoints: Record<Breakpoint, BreakpointData>
}

const defaultBp = (): BreakpointData => ({
  textStyle: {
    color: '',
    fontSize: '',
    fontWeight: '',
    textAlign: 'center',
    lineHeight: '',
    width: '',
  },
  textContain: { top: 50, left: 50 },
  heroContainer: {
    width: '100%',
    maxWidth: '100%',
    height: '650px',
    margin: '0px auto',
    position: 'relative',
    borderRadius: '0px',
    overflow: 'hidden',
  },
})

export function useHeroEditor(
  location: string,
  sectionNum: string,
  viewport: Breakpoint
) {
  // ---------------- UI ----------------
  const [url, setUrl] = useState(null)
  const [preview,setpreview]=useState<string|null>(null)
  const [text, setText] = useState('')
  const [showEditor, setShowEditor] = useState(false)
  const [isLoading, setLoading] = useState(true)

  const [openSections, setOpenSections] = useState({
    text: true,
    position: false,
    container: false,
    image: false,
  })

  const [currentBreakpoint, setCurrentBreakpoint] =useState<Breakpoint>(viewport || 'desktop')

  // ---------------- DATA ----------------
  const [data, setData] = useState<HeroData>({
    text: '',
    imageUrl: '',
    breakpoints: {
      desktop: defaultBp(),
      tablet: defaultBp(),
      mobile: defaultBp(),
    },
  })

  const toggleSection = (key: keyof typeof openSections) => {
    setOpenSections((prev) => ({
      ...prev,
      [key]: !prev[key],
    }))
  }

  // ---------------- FETCH ----------------
  useEffect(() => {
    const load = async () => {
      const hero = await getHero(location, sectionNum)

      if (hero) {
        setData(hero)
        setText(hero.text ?? '')
        setpreview(hero.imageUrl  ? getImageUrl(hero.imageUrl) : null)
      }

      setLoading(false)
    }

    load()
  }, [location, sectionNum])

  useEffect(() => {setCurrentBreakpoint(viewport)}, [viewport])
  // ---------------- SAFE CURRENT ----------------
  const current =data.breakpoints[currentBreakpoint] || data.breakpoints.desktop

  // ---------------- SAFE UPDATE ----------------

  const update = (
    section: Section,
    value: Partial<BreakpointData[Section]>
  ) => {
    setData((prev) => ({
      ...prev,
      breakpoints: {
        ...prev.breakpoints,
        [currentBreakpoint]: {
          ...prev.breakpoints[currentBreakpoint],
          [section]: {
            ...(prev.breakpoints[currentBreakpoint][section] as any),
            ...value,
          },
        },
      },
    }))
  }

  // ---------------- SAVE ----------------
  const handleSave = async () => {
    let uploadedUrl = data.imageUrl
    if (url!==null) {
    const res = await uploadToimage(url)
    uploadedUrl = res.Key
    }
    await fetch('/api/hero/upsert', {
      method: 'POST',
      body: JSON.stringify({
        location,
        sectionNum,
        data: {
          ...data,
          text,
          imageUrl: uploadedUrl
        },
      }),
    })
    console.log(uploadedUrl)
    setShowEditor(false)
  }


  return {
    preview,
    setpreview,
    url,
    setUrl,
    text,
    setText,
    showEditor,
    setShowEditor,
    openSections,
    toggleSection,
    currentBreakpoint,
    setCurrentBreakpoint,
    current,
    data,
    update,
    isLoading,
    handleSave,
  }
}