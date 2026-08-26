import { getHero } from '@/app/libs/crud/sections/hero'
import { getHowItWorks } from '@/app/libs/crud/sections/howItWorks'
import { getFeatures } from '@/app/libs/crud/sections/features'
import HeroClient from '../components/(public)/Hero/HeroClient'
import HowItWorksClient from '../components/(public)/HowItWorks/HowItWorksClient'
import FeaturesClient from '../components/(public)/features/FeaturesClient'
export const revalidate = 60

export default async function Home() {
  const [hero0,howItWorks0,hero1,howItWorks1,hero3,features0,
  ] = await Promise.all([
    getHero('0', '0'),
    getHowItWorks('0', '0'),
    getHero('0', '1'),
    getHowItWorks('0', '1'),
    getHero('0', '3'),
    getFeatures('0', '0'),
  ])

  return (
    <main>
      {hero0 && <HeroClient hero={hero0} />}
      {howItWorks0 && (
        <HowItWorksClient data={howItWorks0} />
      )}
      {hero1 && <HeroClient hero={hero1} />}
      {howItWorks1 && (
        <HowItWorksClient data={howItWorks1} />
      )}
      {hero3 && <HeroClient hero={hero3} />}
      {features0 && (
        <FeaturesClient data={features0} />
      )}
    </main>
  )
}