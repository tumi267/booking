'use client'

import { useBreakpoint } from '@/app/hooks/useBreakpoint'

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

interface TeamClientProps {
  intro: string |null
  members: TeamMember[]
  breakpoints: any
}

export default function TeamClient({intro,members,breakpoints,}: TeamClientProps) {
  const breakpoint = useBreakpoint()

  const current = breakpoints?.[breakpoint]

  const gridStyle = current?.grid || {
    gap: 20,
    columns: 1,
    justifyContent: 'center',
  }

  const cardStyle = current?.card || {
    background: '#fff',
    padding: 10,
    radius: 8,
    width: 100,
  }

  const introStyle = current?.intro || {
    fontSize: 24,
    textAlign: 'center',
    color: '#000',
  }

  const imageStyle = current?.image || {
    width: '100%',
    height: 160,
  }

  return (
    <div>
      {intro && (
        <h3 style={introStyle}>
          {intro}
        </h3>
      )}

      <div
        style={{
          display: 'grid',
          gap: `${gridStyle.gap}px`,
          gridTemplateColumns: `repeat(${gridStyle.columns}, 1fr)`,
          justifyContent: gridStyle.justifyContent,
        }}
      >
        {members.map((member) => (
          <div
            key={member.id}
            style={{
              width: `${cardStyle.width}%`,
              borderRadius: `${cardStyle.radius}px`,
              padding: `${cardStyle.padding}px`,
              background: cardStyle.background,
            }}
          >
            <img
              src={member.image}
              alt={member.name}
              style={{
                width:
                  member.imageWidth || imageStyle.width,
                height:
                  member.imageHeight || imageStyle.height,
                borderRadius: member.imageRadius,
                objectFit: 'fill',
              }}
            />

            <div
              style={{
                fontSize: member.fontSize,
                color: member.fontColor,
              }}
            >
              <h4>{member.name}</h4>
              <p>{member.role}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}