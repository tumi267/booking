import React from 'react'
import { getTeam } from '@/app/libs/crud/sections/teamAbout'
import TeamClient from './TeamClient'

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
  const data = await getTeam(location, sectionNum)

  if (!data) return null
console.log(data)
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

  return (
    <TeamClient
      intro={data.intro}
      members={members}
      breakpoints={data.breakpoints}
    />
  )
}