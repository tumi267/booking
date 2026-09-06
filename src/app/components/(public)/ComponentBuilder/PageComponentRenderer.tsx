import Hero from '../Hero/Hero'
import Features from '../features/Features'
import HowItWorks from '../HowItWorks/HowItWorks'
import TeamAbout from '../about/team/Team'

interface Props {
  component: string
  location: string
  sectionNum: number
}

export async function renderPageComponent({
  component,
  location,
  sectionNum,
}: Props) {
  switch (component) {
    case 'HERO':
      return await Hero({
        location,
        sectionNum: String(sectionNum),
      })

    case 'FEATURES':
      return await Features({
        location,
        sectionNum: String(sectionNum),
      })

    case 'HOW_IT_WORKS':
      return await HowItWorks({
        location,
        sectionNum: String(sectionNum),
      })

    case 'TEAM':
      return await TeamAbout({
        location,
        sectionNum: String(sectionNum),
      })

    default:
      console.warn(`Unknown page component: ${component}`)
      return null
  }
}