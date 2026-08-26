'use client'

import { getImageUrl } from '@/app/utils/supabase/getImageUrl'
import { useBreakpoint } from '@/app/hooks/useBreakpoint'
import Loading from '@/app/components/Loading/Loading'

interface HowItWorksProps {
  data: any
}

export default function HowItWorksClient({data,}: HowItWorksProps) {
  const breakpoint = useBreakpoint()

  if (!data) return <Loading />

  const current = data.breakpoints?.[breakpoint]

  if (!current) return null

  return (
    <div style={current.mainContain}>
      <div style={current.containerStyle}>
        <img
          src={getImageUrl(data.imageUrl)}
          alt="how-it-works"
          style={{
            width: '100%',
            height: current.imageHeight || '100%',
            objectFit: 'fill',
            borderRadius: current.containerStyle?.borderRadius,
          }}
        />

        <div style={{ width: current.textStyle?.width }}>
          <h1 style={current.textStyle}>
            {data.text}
          </h1>
        </div>
      </div>
    </div>
  )
}