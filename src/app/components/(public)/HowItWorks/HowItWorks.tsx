import { getHowItWorks } from '@/app/libs/crud/sections/howItWorks'
import HowItWorksClient from './HowItWorksClient'

interface Props {
  location: string
  sectionNum: string
}

export default async function HowItWorks({ location, sectionNum }: Props) {
  const data = await getHowItWorks(location, sectionNum)

  if (!data) return null

  return <HowItWorksClient data={data} />
}