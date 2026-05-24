import Hero from '@/app/components/(public)/Hero/Hero'
import HowItWorks from '@/app/components/(public)/HowItWorks/HowItWorks'
import Team from '@/app/components/(public)/about/team/Team'
import Features from '@/app/components/(public)/features/Features'
import Loading from '@/app/components/Loading/Loading'
import React, { Suspense } from 'react'

function About() {

  return (
    <div>
        <h2>About</h2>
        <Suspense fallback={<Loading/>}>
      
        <Hero
        location='1'
        sectionNum='0'
        />
        </Suspense>
      <Suspense fallback={<Loading/>}>
      
        <HowItWorks
        location='1'
        sectionNum='0'
        />
      </Suspense>
      <Suspense fallback={<Loading/>}>
      
        <Team
        location='1'
        sectionNum='0'
        />
      </Suspense>
      <Suspense fallback={<Loading/>}>
      
        <Features
        location='1'
        sectionNum='0'
        />
      </Suspense>
    </div>
  )
}

export default About