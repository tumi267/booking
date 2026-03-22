import { getFeatures } from '@/app/libs/crud/sections/features'
import React, { CSSProperties } from 'react'

interface Props {
  location: string
  sectionNum: string
}

type Feature = {
  id: string
  title: string
  text: string
  image: string
  fontSize?: string
  fontColor?: string
  imageWidth?: string
  imageHeight?: string
}

export default async function Features({ location, sectionNum }: Props) {
  const data = await getFeatures(location, sectionNum)
  if (!data) return null

  const {
    features: rawFeatures,
    sectionStyle,
    gridStyle,
    cardStyle,
    cardWidth,
    textStyle,
    imageStyle,
  } = data

  // Normalize Prisma result to match Feature type
  const features: Feature[] = rawFeatures.map((f: any) => ({
    id: f.id,
    title: f.title,
    text: f.text,
    image: f.image || '/next.svg',
    fontSize: f.fontSize ?? undefined,
    fontColor: f.fontColor ?? undefined,
    imageWidth: f.imageWidth ?? undefined,
    imageHeight: f.imageHeight ?? undefined,
  }))

  const computedCardWidth = cardWidth ?? 100 / (data.columns || 4)

  return (
    <div style={{ ...(sectionStyle as CSSProperties) }}>
      <div style={{ ...(gridStyle as CSSProperties) }}>
        {features.map((f) => (
          <div
            key={f.id}
            style={{
              ...(cardStyle as CSSProperties),
              width: computedCardWidth + '%',
            }}
          >
            <img
              src={f.image}
              alt={f.title}
              style={{
                width: f.imageWidth || (imageStyle.width ?? '100%'),
                height: f.imageHeight || (imageStyle.height ?? '160px'),
                objectFit: imageStyle?.objectFit || 'fill',
              }}
            />
            <div
              style={{
                color: f.fontColor || textStyle.color || '#000',
                fontSize: f.fontSize || textStyle.fontSize || '16px',
                textAlign: textStyle?.textAlign as any || 'left',
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