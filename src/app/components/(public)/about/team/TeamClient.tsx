'use client'

import React, { useEffect, useState } from 'react'

type Breakpoint = 'mobile' | 'tablet' | 'desktop'

type TeamMember = {
  id: string
  name: string
  role: string
  image: string
  fontSize?: string
  fontColor?: string
  imageWidth?: string
  imageHeight?: string
  imageRadius?: string
}

type Props = {
  intro: string
  members: TeamMember[]
  breakpoints: any
}

// ----------------------
// BREAKPOINT DETECTOR
// ----------------------
function getBreakpoint(width: number): Breakpoint {
  if (width < 768) return 'mobile'
  if (width < 1024) return 'tablet'
  return 'desktop'
}

export default function TeamClient({
  intro,
  members,
  breakpoints,
}: Props) {
  const [bp, setBp] = useState<Breakpoint>('desktop')

  // ----------------------
  // WATCH SCREEN SIZE
  // ----------------------
  useEffect(() => {
    const handleResize = () => {
      setBp(getBreakpoint(window.innerWidth))
    }

    handleResize()
    window.addEventListener('resize', handleResize)

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // ----------------------
  // CURRENT STYLES
  // ----------------------
  const current = breakpoints?.[bp]

  const gridStyle = current?.grid || {
    display: 'flex',
    flexWrap: 'wrap',
    gap: 20,
    justifyContent: 'center',
  }

  const cardStyle = current?.card || {
    background: '#fff',
    padding: 10,
    borderRadius: 8,
    textAlign: 'center',
  }

  const introStyle = current?.intro || {
    fontSize: 24,
    textAlign: 'center',
    color: '#000',
  }

  const imageStyle = current?.image || {
    width: '100%',
    height: 160,
    objectFit: 'cover',
  }

  // ----------------------
  // RENDER
  // ----------------------
  return (
    <div>
      {intro && <h3 style={introStyle}>{intro}</h3>}

      <div style={{display:'grid',
      gap:`${gridStyle.gap}px`,
      gridTemplateColumns:`repeat(${gridStyle.columns}, 1fr)`,
      justifyContent:`${gridStyle.justifyContent}`}}>
        {members.map((m) => (
          <div key={m.id} style={{
            width:`${cardStyle.width}%`,
            borderRadius:`${cardStyle.radius}px`,
            padding:`${cardStyle.padding}px`,
            background:`${cardStyle.background}`
            }}>
            <img
              src={m.image}
              style={{
                width: m.imageWidth || imageStyle.width,
                height: m.imageHeight || imageStyle.height,
                borderRadius: m.imageRadius,
                objectFit: 'fill',
              }}
            />

            <div
              style={{
                fontSize: m.fontSize,
                color: m.fontColor,
              }}
            >
              <h4>{m.name}</h4>
              <p>{m.role}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}