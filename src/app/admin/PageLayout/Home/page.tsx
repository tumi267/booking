
import Features from '@/app/components/admin/AdminComponents/Featues/Features'
import HowItWorks from '@/app/components/admin/AdminComponents/HowItWorks/HowItWorks'
import Hero from '@/app/components/admin/Hero/Hero'
import React from 'react'

function page() {
  return (
    <div>
      <Hero/>
      <HowItWorks/>
      <Hero/>
      <HowItWorks/>
      <Features/>
      <Hero/>
    </div>
  )
}

export default page