import React from 'react'
import { getTeam } from '@/app/libs/crud/sections/teamAbout'

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

interface Props {
  location: string
  sectionNum: string
}

export default async function TeamAbout({ location, sectionNum }: Props) {
  // fetch data from server
  const data = await getTeam(location, sectionNum)

  if (!data) return null

  const members: TeamMember[] = data.members.map((m: any) => ({
    id: m.id,
    name: m.name,
    role: m.role,
    image: m.image || '/next.svg',
    fontSize: m.fontSize ?? '16px',
    fontColor: m.fontColor ?? '#000',
    imageWidth: m.imageWidth ?? '100%',
    imageHeight: m.imageHeight ?? '160px',
    imageRadius: m.imageRadius ?? '0px',
  }))

  const gridStyle: React.CSSProperties = data.gridStyle || {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '20px',
    justifyContent: 'center',
    maxWidth: '1200px',
    margin: '0 auto',
  }

  const cardStyle: React.CSSProperties = data.cardStyle || {
    background: '#ffffff',
    borderRadius: '8px',
    padding: '10px',
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '300px',
    overflow: 'hidden',
  }

  const introStyle: React.CSSProperties = data.introStyle || {
    fontSize: '24px',
    color: '#000',
    textAlign: 'center',
    marginBottom: '20px',
  }

  return (
    <div>
      {data.intro && <h3 style={introStyle}>{data.intro}</h3>}

      <div style={gridStyle}>
        {members.map((m) => (
          <div
            key={m.id}
            style={{
              ...cardStyle,
            
            }}
          >
            <img
              src={m.image}
              style={{
                width: m.imageWidth,
                height: m.imageHeight,
                borderRadius: m.imageRadius,
                objectFit: 'fill',
              }}
            />
            <div
              style={{
                fontSize: m.fontSize,
                color: m.fontColor,
              }}
            >
              <h4>{m.name}</h4>
              <p>{m.role}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}