import { getHero } from '@/app/libs/crud/sections/hero'
import HeroClient from './HeroClient'

interface Props {
  location: string
  sectionNum: string
}

export default async function Hero({ location, sectionNum }: Props) {
  const hero = await getHero(location, sectionNum)

  if (!hero) return null

  return <HeroClient hero={hero} />
}