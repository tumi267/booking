'use client'

import React, { CSSProperties, useEffect, useState } from 'react'
import { uploadToimage } from '../libs/uploadImage/uploadImage'

type Breakpoint = 'desktop' | 'tablet' | 'mobile'
type SectionKey = 'grid' | 'card' | 'text' | 'image' | 'intro'

type TeamMember = {
  id: string
  name: string
  image: string
  role: string
  fontSize?: string
  fontColor?: string
  imageWidth?: string
  imageHeight?: string
  imageRadius?: string
  file?: File | null
}

// ----------------------
// DEFAULT BREAKPOINT
// ----------------------
const defaultTeamBp = () => ({
  grid: {
    display: 'grid',
    flexWrap: 'wrap',
    gap: 20,
    justifyContent: 'center',
    alignItems: 'stretch',
    columns: 4,
  },

  card: {
    background: '#ffffff',
    padding: 10,
    radius: 8,
    width: 100,
    overflow: 'hidden',
    textAlign: 'center' as CSSProperties['textAlign'],
    flexDirection: 'column' as CSSProperties['flexDirection'],
  },

  text: {
    fontSize: 24,
    color: '#000',
    textAlign: 'center' as CSSProperties['textAlign'],
  },

  image: {
    width: '100%',
    height: 160,
    objectFit: 'fill' as CSSProperties['objectFit'],
  },

  intro: {
    textAlign: 'center' as CSSProperties['textAlign'],
    fontSize: 24,
    color: '#000',
  },
})

function useAdminTeam(
  location: string,
  sectionNum: string,
  viewport: Breakpoint
) {
  const [isLoading, setLoading] = useState(true)

  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [showEditor, setShowEditor] = useState(false)

  const [data, setData] = useState<{
    members: TeamMember[]
    intro: string
    breakpoints: Record<Breakpoint, ReturnType<typeof defaultTeamBp>>
  }>({
    members: [
      {
        id: crypto.randomUUID(),
        name: 'Name',
        role: 'Role',
        image: '/next.svg',
        fontSize: '16px',
        fontColor: '#000000',
        imageWidth: '100%',
        imageHeight: '160px',
        imageRadius: '0px',
      },
    ],
    intro: '',
    breakpoints: {
      desktop: defaultTeamBp(),
      tablet: defaultTeamBp(),
      mobile: defaultTeamBp(),
    },
  })
  const setintro=(el:string)=>{setData({...data,intro:el})}
  // ----------------------
  // CURRENT BREAKPOINT DATA
  // ----------------------
  const current = data.breakpoints[viewport]
  const members = data.members
  const intro = data.intro
  const selected = members.find((m) => m.id === selectedId)

  // ----------------------
  // BREAKPOINT UPDATE (CLEAN & SIMPLE)
  // ----------------------
  const updateBreakpoint = (section: SectionKey, value: any) => {
    setData((prev) => {
      const bp = prev.breakpoints[viewport]

      return {
        ...prev,
        breakpoints: {
          ...prev.breakpoints,
          [viewport]: {
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

  // ----------------------
  // MEMBER ACTIONS
  // ----------------------
  const addMember = () => {
    const newMember: TeamMember = {
      id: crypto.randomUUID(),
      name: 'Name',
      role: 'Role',
      image: '/next.svg',
      fontSize: '16px',
      fontColor: '#000',
      imageWidth: '100%',
      imageHeight: '160px',
      imageRadius: '0px',
    }

    setData((prev) => ({
      ...prev,
      members: [...prev.members, newMember],
    }))
  }

  const removeMember = (id: string) => {
    setData((prev) => ({
      ...prev,
      members: prev.members.filter((m) => m.id !== id),
    }))
    setSelectedId(null)
  }
  const updateMemberFile = (id: string, file: File) => {
    setData((prev) => ({
      ...prev,
      members: prev.members.map((m) =>
        m.id === id ? { ...m, file } : m
      ),
    }))
  }
  const updateMember = (
    id: string,
    key: keyof TeamMember,
    value: string
  ) => {
    setData((prev) => ({
      ...prev,
      members: prev.members.map((m) =>
        m.id === id ? { ...m, [key]: value } : m
      ),
    }))
  }

  // ----------------------
  // LOAD
  // ----------------------
  useEffect(() => {
    const getdata = async () => {
      const res = await fetch('/api/aboutteam/get', {
        method: 'POST',
        body: JSON.stringify({ location, sectionNum }),
      })

      const teamdata = await res.json()

      if (!teamdata) {
        setLoading(false)
        return
      }

      setData(teamdata)
      setLoading(false)
    }

    getdata()
  }, [location, sectionNum])

  // ----------------------
  // SAVE
  // ----------------------
  const handleSave = async () => {
    const updatedMembers = await Promise.all(
      data.members.map(async (member) => {
        if (member.file) {
          const res = await uploadToimage(member.file)
  
          return {
            ...member,
            image: res.Key,
            file: null,
          }
        }
  
        return member
      })
    )
  
    const payload = {
      ...data,
      members: updatedMembers,
    }
  
    const res = await fetch('/api/aboutteam/upsert', {
      method: 'POST',
      body: JSON.stringify({
        location,
        sectionNum,
        data: payload,
      }),
    })
  
    const newdata = await res.json()
    if (newdata) setData(newdata)
  
    setShowEditor(false)
  }

  return {
    current,
    members,
    intro,
    selected,
    updateMemberFile,
    selectedId,
    setSelectedId,
    showEditor,
    setShowEditor,
    isLoading,
    setintro,
    addMember,
    removeMember,
    updateMember,
    updateBreakpoint,
    handleSave,
  }
}

export default useAdminTeam