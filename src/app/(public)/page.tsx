import Hero from '../components/(public)/Hero/Hero'
import HowItWorks from '../components/(public)/HowItWorks/HowItWorks'
import Features from '../components/(public)/features/Features'
import Loading from '../components/Loading/Loading'
import { Suspense } from 'react'

export default function Home() {
  return (
    <main >
      <div>
      <Suspense fallback={<Loading/>}>
      <Hero
      location='0'
      sectionNum='0'
      />
      </Suspense>
      <Suspense fallback={<Loading/>}>
     
      <HowItWorks
      location='0'
      sectionNum='0'
      />
      </Suspense>
      <Suspense fallback={<Loading/>}>
      <Hero
      location='0'
      sectionNum='1'
      />
      </Suspense>
      <Suspense fallback={<Loading/>}>
      <HowItWorks
      location='0'
      sectionNum='1'
      />
      </Suspense>
      <Suspense fallback={<Loading/>}>
      <Hero
      location='0'
      sectionNum='3'
      />
      </Suspense>
      <Suspense fallback={<Loading/>}>
      <Features
        location='0'
        sectionNum='0'
      />
      </Suspense>
      </div>
    </main>
  )
}
