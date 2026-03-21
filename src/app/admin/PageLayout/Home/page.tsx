
import Features from '@/app/components/admin/AdminComponents/Featues/Features'
import HowItWorks from '@/app/components/admin/AdminComponents/HowItWorks/HowItWorks'
import Hero from '@/app/components/admin/Hero/Hero'
import React from 'react'

function page() {
  return (
    <div>
      <Hero
      location='0'
      sectionNum='0'
      />
      <HowItWorks
      location='0'
      sectionNum='0'
      />
      <Hero
      location='0'
      sectionNum='1'
      />
      <HowItWorks
      location='0'
      sectionNum='1'
      />
      <Features
        location='0'
        sectionNum='0'
      />
      <Hero
      location='0'
      sectionNum='2'
      />
    </div>
  )
}

export default page