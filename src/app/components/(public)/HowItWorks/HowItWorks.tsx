import { getHowItWorks } from '@/app/libs/crud/sections/howItWorks'
import React, { CSSProperties } from 'react'

interface Props {
  location: string
  sectionNum: string
}

export default async function HowItWorks({ location, sectionNum }: Props) {
  const data = await getHowItWorks(location, sectionNum)

  if (!data) return null

  const {
    text,
    textStyle,
    imageUrl,
    imageHeight,
    containerStyle,
    mainContain,
    // textContain,
  } = data

  const containerStyles: CSSProperties = { ...(containerStyle as CSSProperties) }
  const mainContainStyles: CSSProperties = { ...(mainContain as CSSProperties) }
  const textStyles: CSSProperties = { ...(textStyle as CSSProperties) }

  return (
    <div style={mainContainStyles}>
      <div style={containerStyles}>
        <img
          src={imageUrl ?? '/next.svg'}
          alt="hero"
          style={{ width: '100%', height: imageHeight||'100%', objectFit: 'fill', borderRadius: containerStyles.borderRadius }}
        />
        <div
          style={{
            width: textStyles.width,
            textAlign: textStyles.textAlign as any,
          }}
        >
          <h1 style={textStyles}>{text}</h1>
        </div>
      </div>
    </div>
  )
}