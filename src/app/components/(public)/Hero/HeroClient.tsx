'use client'

import { getImageUrl } from '@/app/utils/supabase/getImageUrl'
import { useBreakpoint } from '@/app/hooks/useBreakpoint'

interface HeroProps {
  hero: any
}

export default function HeroClient({ hero }: HeroProps) {
  const breakpoint = useBreakpoint()

  const data = hero.breakpoints?.[breakpoint]

  if (!data) return null

  return (
    <div style={data.heroContainer}>
      <div style={data.heroContainer}>
        <img
          src={getImageUrl(hero.imageUrl)}
          style={hero.heroImage}
          className="w-full h-full object-fill"
        />
      </div>

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