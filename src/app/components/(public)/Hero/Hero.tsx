import { getHero } from '@/app/libs/crud/sections/hero'
import React, { CSSProperties, ReactElement } from 'react'

interface props {
  location: string
  sectionNum: string
}

async function Hero({ location, sectionNum }: props): Promise<ReactElement | null> {
  const hero = await getHero(location, sectionNum)

  if (!hero) return null

  const {
    text,
    textStyle,
    textContain,
    heroContainer,
    heroImage,
    imageUrl,
  } = hero

  const containerStyle: CSSProperties = {
    ...(heroContainer as CSSProperties),
  }

  const imageStyle: CSSProperties = {
    ...(heroImage as CSSProperties),
  }

  const textStyles: CSSProperties = {
    ...(textStyle as CSSProperties),
  }

  return (
    <div>
      <div style={containerStyle}>
        <img
          src={imageUrl ?? '/images/buddy-an-BVyzjR1AcOI-unsplash.jpg'}
          alt="hero"
          style={imageStyle}
        />

        <div
          style={{
            position: 'absolute',
            top: `${(textContain as any)?.top ?? 50}%`,
            left: `${(textContain as any)?.left ?? 50}%`,
            transform: 'translate(-50%, -50%)',
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

export default Hero