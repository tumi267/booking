import Image from 'next/image'
import Hero from '../components/(public)/Hero/Hero'
import HowItWorks from '../components/(public)/HowItWorks/HowItWorks'
import SocialProof from '../components/(public)/SocialProof/SocialProof'
import Benefits from '../components/(public)/Benefits/Benefits'

export default function Home() {
  let images=[ {
    url: '/images/IMG-20260119-WA0006.jpg',
    alt: 'Choose a service'
  },
  {
    url: '/images/IMG-20260119-WA0006.jpg',
    alt: 'Pick a provider'
  },
  {
    url: '/images/IMG-20260119-WA0006.jpg',
    alt: 'Confirm your booking'
  }]
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
      url='/images/buddy-an-BVyzjR1AcOI-unsplash.jpg'
      text='some text'
      />
      <SocialProof
      clients={clients}
      />
      <HowItWorks
      images={images}
      text='some text'
      />
      <Benefits
      images={images}
      text='some text'
      />
      <Hero
      url='/images/buddy-an-BVyzjR1AcOI-unsplash.jpg'
      text='some text'
      />
      CTA
      {/* FAQs */}
      {/* Final CTA */}
      </div>
    </main>
  )
}
