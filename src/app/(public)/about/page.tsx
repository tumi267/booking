import { getHero } from '@/app/libs/crud/sections/hero'
import { getHowItWorks } from '@/app/libs/crud/sections/howItWorks'
import { getFeatures } from '@/app/libs/crud/sections/features'
import HeroClient from '@/app/components/(public)/Hero/HeroClient'
import HowItWorksClient from '@/app/components/(public)/HowItWorks/HowItWorksClient'
import FeaturesClient from '@/app/components/(public)/features/FeaturesClient'
import TeamClient from '@/app/components/(public)/about/team/TeamClient'
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

export const revalidate = 60
export default async function About() {
  const [hero, howItWorks, team, features] = await Promise.all([
    getHero('1', '0'),
    getHowItWorks('1', '0'),
    getTeam('1', '0'),
    getFeatures('1', '0'),
  ])

  return (
    <main>
      <h2>About</h2>

      {hero && <HeroClient hero={hero} />}

      {howItWorks && (
        <HowItWorksClient data={howItWorks} />
      )}

      {team && <TeamClient 
      intro={team.intro}
      members={team.members as TeamMember[]}
      breakpoints={team.breakpoints} />}

      {features && (
        <FeaturesClient data={features} />
      )}
    </main>
  )
}