import { getFeatures } from '@/app/libs/crud/sections/features'
import React, { CSSProperties } from 'react'
import FeaturesClient from './FeaturesClient'

interface Props {
  location: string
  sectionNum: string
}

export default async function Features({ location, sectionNum }: Props) {
  const data = await getFeatures(location, sectionNum)
  if (!data) return null

  return (
   <FeaturesClient
   data={data}/>
  )
}