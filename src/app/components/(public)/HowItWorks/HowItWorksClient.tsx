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

export default function HowItWorksClient({ data }: any) {
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

  return (
    <div style={current.mainContain}>
      <div style={current.containerStyle}>
        <img
          src={getImageUrl(data.imageUrl) }
          alt="how-it-works"
          style={{
            width: '100%',
            height: current.imageHeight || '100%',
            objectFit: 'fill',
            borderRadius: current.containerStyle?.borderRadius,
          }}
        />

        <div style={{ width: current.textStyle?.width }}>
          <h1 style={current.textStyle}>{data.text}</h1>
        </div>
      </div>
    </div>
  )
}