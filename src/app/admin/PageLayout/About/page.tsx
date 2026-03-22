import Features from '@/app/components/admin/AdminComponents/Featues/Features'
import HowItWorks from '@/app/components/admin/AdminComponents/HowItWorks/HowItWorks'
import TeamAbout from '@/app/components/admin/AdminComponents/TeamAbout/TeamAbout'
import Hero from '@/app/components/admin/Hero/Hero'
import React from 'react'

function page() {
  return (
    <div>
      <Hero
            location='1'
            sectionNum='0'
      />
      <HowItWorks
            location='1'
            sectionNum='0'
      />
      <TeamAbout
        location='1'
        sectionNum='0'
      />
      <Features
            location='1'
            sectionNum='0'
      />
    </div>
  )
}

export default page