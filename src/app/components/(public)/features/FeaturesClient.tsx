'use client'

import React from 'react'
import Loading from '@/app/components/Loading/Loading'
import { getImageUrl } from '@/app/utils/supabase/getImageUrl'
import { useBreakpoint } from '@/app/hooks/useBreakpoint'

interface FeaturesProps {
  data: any
}

export default function FeaturesClient({
  data,
}: FeaturesProps) {
  const breakpoint = useBreakpoint()

  if (!data) return <Loading />

  const current = data.breakpoints?.[breakpoint]

  if (!current) return null

  const gridStyle: React.CSSProperties = {
    display: 'grid',

    gridTemplateColumns: `repeat(
      ${current.grid.columns},
      minmax(0, 1fr)
    )`,

    gap: current.grid.gap,

    justifyContent: current.grid.justifyContent,

    alignItems: current.grid.alignItems,
  }

  return (
    <section className='flex justify-center'
      style={{
        ...current.section,
      }}
    >
      <div  style={gridStyle}>
        {data.features?.map((feature: any) => (
          <div
            key={feature.id}
            style={{
              width:
                current.card.width === 100
                  ? '100%'
                  : `${current.card.width}px`,

              background:
                current.card.background,

              padding:
                current.card.padding,

              borderRadius:
                current.card.radius,
            }}
          >
            <img
              src={getImageUrl(feature.image)}
              alt={feature.title}
              style={{
                width:
                  feature.imageWidth ||
                  current.image.width,

                height:
                  feature.imageHeight ||
                  current.image.height,

                objectFit:
                  current.image.objectFit,
              }}
            />

            <div
              style={{
                ...current.text,

                color:
                  feature.fontColor ||
                  current.text.color,

                fontSize:
                  feature.fontSize ||
                  current.text.fontSize,
              }}
            >
              <h3>{feature.title}</h3>

              <p>{feature.text}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}