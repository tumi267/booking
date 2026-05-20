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

type DbTeamMember = {
  id: string
  name: string
  role: string
  image: string | null
  fontSize?: string | null
  fontColor?: string | null
  imageWidth?: string | null
  imageHeight?: string | null
  imageRadius?: string | null
}

interface Props {
  location: string
  sectionNum: string
}


export default async function TeamAbout({ location, sectionNum }: Props) {
  const data = await getTeam(location, sectionNum)

  if (!data || !data.members) return null
  const membersData = data.members as DbTeamMember[]

  const members: TeamMember[] = membersData.map((m) => ({
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
      intro={data.intro||''}
      members={members}
      breakpoints={data.breakpoints}
    />
  )
}