'use client'

import React, { useEffect, useState } from 'react'
import Loading from '@/app/components/Loading/Loading'
import { getImageUrl } from '@/app/utils/supabase/getImageUrl'

type Breakpoint = 'mobile' | 'tablet' | 'desktop'

function getBreakpoint(width: number): Breakpoint {
  if (width < 768) return 'mobile'
  if (width < 1024) return 'tablet'
  return 'desktop'
}

function FeaturesClient({ data }: any) {
  const [bp, setBp] = useState<Breakpoint>('desktop')

  useEffect(() => {
    const update = () => setBp(getBreakpoint(window.innerWidth))
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  if (!data) return <Loading />

  const current = data.breakpoints?.[bp]
  if (!current) return null

  const features = data.features

  const gridStyle = {
    display: 'flex',
    flexWrap: 'wrap',
    gap: current.grid.gap,
    justifyContent: current.grid.justifyContent,
    alignItems: current.grid.alignItems,
  } as React.CSSProperties
console.log(current)
  return (
    <div style={current.section}>
      <div style={gridStyle}>
        {features.map((f: any) => (
          <div
            key={f.id}
            style={{
            background:`${current.card.background}`,
            padding:`${current.card.padding}px`,
            borderRadius:`${current.card.radius}px`,
            width :`${current.card.width}px`,  
            }}
          >
            <img
              src={getImageUrl(f.image)}
              alt={f.title}
              style={{
                width: f.imageWidth || current.image.width,
                height: f.imageHeight || current.image.height,
                objectFit: 'fill',
              }}
            />

            <div
              style={{
                ...current.text,
                color: f.fontColor || current.text.color,
                fontSize: f.fontSize || current.text.fontSize,
              }}
            >
              <h3>{f.title}</h3>
              <p>{f.text}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default FeaturesClient