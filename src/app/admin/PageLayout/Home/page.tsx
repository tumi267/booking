'use client'
import Features from '@/app/components/admin/AdminComponents/Featues/Features'
import HowItWorks from '@/app/components/admin/AdminComponents/HowItWorks/HowItWorks'
import Hero from '@/app/components/admin/Hero/Hero'
import EditViewPort from '@/app/components/admin/editViewport/EditViewPort'
import React, { useState } from 'react'

function page() {
  const [viewport, setViewport] = useState<'desktop' | 'tablet' | 'mobile'>('desktop')
  const sizes = {
    desktop: '100%',
    tablet: '768px',
    mobile: '375px',
  }
  return (
    <div style={{
      width: sizes[viewport],
      margin:'0 auto',
      transition: 'width 0.3s ease',
    }}>
      <EditViewPort
      viewport={viewport}
      setViewport={setViewport}
      />
      <Hero
      location='0'
      sectionNum='0'
      viewport={viewport}
      />
      <HowItWorks
      location='0'
      sectionNum='0'
      viewport={viewport}
      />
      <Hero
      location='0'
      sectionNum='1'
      viewport={viewport}
      />
      <HowItWorks
      location='0'
      sectionNum='1'
      viewport={viewport}
      />
      <Hero
      location='0'
      sectionNum='2'
      viewport={viewport}
      />
      <Features
      location='0'
      sectionNum='0'
      />

    </div>
  )
}

export default page