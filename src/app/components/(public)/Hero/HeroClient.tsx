'use client'

import React, { useEffect, useState } from 'react'

type Breakpoint = 'mobile' | 'tablet' | 'desktop'

function getBreakpoint(width: number): Breakpoint {
  if (width < 768) return 'mobile'
  if (width < 1024) return 'tablet'
  return 'desktop'
}

export default function HeroClient({ hero }: any) {
  const [bp, setBp] = useState<Breakpoint>('desktop')

  useEffect(() => {
    const update = () => setBp(getBreakpoint(window.innerWidth))

    update()
    window.addEventListener('resize', update)

    return () => window.removeEventListener('resize', update)
  }, [])

  const data = hero.breakpoints?.[bp]

  if (!data) return null

  return (
    <div style={data.heroContainer}>
      <img
        src={hero.imageUrl ?? '/images/buddy-an-BVyzjR1AcOI-unsplash.jpg'}
        style={hero.heroImage }
        className="w-full h-full object-cover"
      />

      <div
        style={{
          position: 'absolute',
          top: `${data.textContain.top}%`,
          left: `${data.textContain.left}%`,
          transform: 'translate(-50%, -50%)',
          ...data.textStyle,
        }}
      >
        <h1>{hero.text}</h1>
      </div>
    </div>
  )
}