'use client'

import { useEffect, useState, CSSProperties } from 'react'

type Breakpoint = 'desktop' | 'tablet' | 'mobile'

type Section =
  | 'textStyle'
  | 'containerStyle'
  | 'mainContain'
  | 'imageHeight'

type BreakpointData = {
  textStyle: CSSProperties
  containerStyle: CSSProperties
  mainContain: CSSProperties
  imageHeight: string
}

type HowData = {
  text: string
  imageUrl?: string
  breakpoints: Record<Breakpoint, BreakpointData>
}

const defaultBp = (): BreakpointData => ({
  textStyle: {
    fontSize: '18px',
    color: '#000',
    textAlign: 'left',
    width: '100%',
    lineHeight: '1.4',
  },
  containerStyle: {
    width: '100%',
    maxWidth: '100%',
    margin: '0 auto',
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '30px',
    alignItems: 'center',
  },
  mainContain: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '2em',
    marginBottom: '2em',
    width: '100%',
    height: '36vh',
    backgroundColor: 'white',
  },
  imageHeight: '100%',
})

export function useHowItWorksEditor(
  location: string,
  sectionNum: string,
  viewport: Breakpoint
) {
  const [text, setText] = useState('')
  const [imageUrl, setImageUrl] = useState('/next.svg')
  const [isLoading, setLoading] = useState(true)
  const [showEditor, setShowEditor] = useState(false)

  const [open, setOpen] = useState({
    text: true,
    container: true,
    maincontain: true,
  })

  const [currentBreakpoint, setCurrentBreakpoint] =
    useState<Breakpoint>(viewport || 'desktop')

  const [data, setData] = useState<HowData>({
    text: '',
    imageUrl: '',
    breakpoints: {
      desktop: defaultBp(),
      tablet: defaultBp(),
      mobile: defaultBp(),
    },
  })

  const toggle = (key: keyof typeof open) => {
    setOpen((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  // FETCH
  useEffect(() => {
    const load = async () => {
      const res = await fetch('/api/howitworks/get', {
        method: 'POST',
        body: JSON.stringify({ location, sectionNum }),
      })

      const result = await res.json()

      if (result) {
        setData(result)
        setText(result.text ?? '')
        setImageUrl(result.imageUrl ?? '/next.svg')
      }

      setLoading(false)
    }

    load()
  }, [location, sectionNum])

  // sync viewport
  useEffect(() => {
    setCurrentBreakpoint(viewport)
  }, [viewport])

  const current =
    data.breakpoints[currentBreakpoint] || data.breakpoints.desktop

  // SAFE UPDATE
  const update = (section: Section, value: any) => {
    setData((prev) => ({
      ...prev,
      breakpoints: {
        ...prev.breakpoints,
        [currentBreakpoint]: {
          ...prev.breakpoints[currentBreakpoint],
          [section]:
            typeof prev.breakpoints[currentBreakpoint][section] === 'object'
              ? {
                  ...(prev.breakpoints[currentBreakpoint][section] as any),
                  ...value,
                }
              : value,
        },
      },
    }))
  }

  const handleSave = async () => {
    await fetch('/api/howitworks/upsert', {
      method: 'POST',
      body: JSON.stringify({
        location,
        sectionNum,
        data: {
          ...data,
          text,
          imageUrl,
        },
      }),
    })

    setShowEditor(false)
  }

  return {
    text,
    setText,
    imageUrl,
    setImageUrl,
    current,
    update,
    showEditor,
    setShowEditor,
    open,
    toggle,
    isLoading,
    handleSave,
  }
}