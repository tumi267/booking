import Hero from "../../Hero/Hero"
import FeaturesSection from "../Featues/Features"
import HowItWorks from "../HowItWorks/HowItWorks"
import TeamAbout from "../TeamAbout/TeamAbout"

export type PageBuilderComponent = {
  type: string
  label: string
  description: string
}

export const PAGE_BUILDER_COMPONENTS: PageBuilderComponent[] = [
  {
    type: 'HERO',
    label: 'Hero',
    description: 'Main hero section for the page.',
  },
  {
    type: 'FEATURES',
    label: 'Features',
    description: 'Display a collection of features.',
  },
  {
    type: 'HOW_IT_WORKS',
    label: 'How It Works',
    description: 'Explain how the service works.',
  },
  {
    type: 'TEAM',
    label: 'Team',
    description: 'Display team members.',
  },
  {
    type: 'TESTIMONIALS',
    label: 'Testimonials',
    description: 'Display customer testimonials.',
  },
  {
    type: 'CTA',
    label: 'Call To Action',
    description: 'Encourage users to take an action.',
  },
  {
    type: 'FOOTER',
    label: 'Footer',
    description: 'Page footer section.',
  },
]

export const PAGE_COMPONENT_REGISTRY = {
  HERO: Hero,
  FEATURES: FeaturesSection,
  HOW_IT_WORKS: HowItWorks,
  TEAM: TeamAbout,
} as const