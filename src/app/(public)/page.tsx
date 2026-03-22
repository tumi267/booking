import Hero from '../components/(public)/Hero/Hero'
import HowItWorks from '../components/(public)/HowItWorks/HowItWorks'
import SocialProof from '../components/(public)/SocialProof/SocialProof'
import Benefits from '../components/(public)/Benefits/Benefits'
import Features from '../components/(public)/features/Features'

export default function Home() {

  const clients = [
    {
      image: '/images/IMG-20260119-WA0006.jpg',
      text: 'Booking my trainer takes less than a minute.'
    },
    {
      image: '/images/IMG-20260119-WA0006.jpg',
      text: 'Super smooth experience and great providers.'
    },
    {
      image: '/images/IMG-20260119-WA0006.jpg',
      text: 'I love how easy everything is.'
    }
  ]
  return (
    <main >
      <div>
      <Hero
      location='0'
      sectionNum='0'
      />
      {/* <SocialProof
      clients={clients}
      /> */}
      <HowItWorks
      location='0'
      sectionNum='0'
      />
      {/* <Benefits
      images={images}
      text='some text'
      /> */}
      <Hero
      location='0'
      sectionNum='1'
      />
      <HowItWorks
      location='0'
      sectionNum='1'
      />
      <Hero
      location='0'
      sectionNum='3'
      />
      <Features
        location='0'
        sectionNum='0'
      />
      CTA
      {/* FAQs */}
      {/* Final CTA */}
      </div>
    </main>
  )
}
