import Image from 'next/image'
import Hero from '../components/(public)/Hero/Hero'
import HowItWorks from '../components/(public)/HowItWorks/HowItWorks'
import SocialProof from '../components/(public)/SocialProof/SocialProof'
import Benefits from '../components/Benefits/Benefits'

export default function Home() {
  let images=[ {
    url: '/images/step-1.png',
    alt: 'Choose a service'
  },
  {
    url: '/images/step-2.png',
    alt: 'Pick a provider'
  },
  {
    url: '/images/step-3.png',
    alt: 'Confirm your booking'
  }]
  const clients = [
    {
      image: '/images/client-1.png',
      text: 'Booking my trainer takes less than a minute.'
    },
    {
      image: '/images/client-2.png',
      text: 'Super smooth experience and great providers.'
    },
    {
      image: '/images/client-3.png',
      text: 'I love how easy everything is.'
    }
  ]
  return (
    <main >
      <div>
      <Hero
      url='image url'
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
      url='image url'
      text='some text'
      />
      CTA
      {/* FAQs */}
      {/* Final CTA */}
      </div>
    </main>
  )
}
