import Hero from '../components/(public)/Hero/Hero'
import HowItWorks from '../components/(public)/HowItWorks/HowItWorks'
import SocialProof from '../components/(public)/SocialProof/SocialProof'
import Benefits from '../components/(public)/Benefits/Benefits'
import Features from '../components/(public)/features/Features'
import Loading from '../components/Loading/Loading'
import { Suspense } from 'react'

export default function Home() {


  return (
    <main >
      <div>
      
      <Suspense fallback={<Loading/>}>
      {/* @ts-expect-error Async Server Component */}
      <Hero
      location='0'
      sectionNum='0'
      />
      </Suspense>
      <Suspense fallback={<Loading/>}>
      {/* @ts-expect-error Async Server Component */}
      <HowItWorks
      location='0'
      sectionNum='0'
      />
      </Suspense>
      <Suspense fallback={<Loading/>}>
      {/* @ts-expect-error Async Server Component */}
      <Hero
      location='0'
      sectionNum='1'
      />
      </Suspense>
      <Suspense fallback={<Loading/>}>
      {/* @ts-expect-error Async Server Component */}
      <HowItWorks
      location='0'
      sectionNum='1'
      />
      </Suspense>
      <Suspense fallback={<Loading/>}>
      {/* @ts-expect-error Async Server Component */}
      <Hero
      location='0'
      sectionNum='3'
      />
      </Suspense>
      <Suspense fallback={<Loading/>}>
      {/* @ts-expect-error Async Server Component */}
      <Features
        location='0'
        sectionNum='0'
      />
      </Suspense>
      CTA
      {/* FAQs */}
      {/* Final CTA */}
      </div>
    </main>
  )
}
