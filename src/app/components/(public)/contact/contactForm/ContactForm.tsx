import React from 'react'
import ContactFormClient from './ContactFormClient'
import { getContactfont } from '@/app/libs/contact/Contact'

interface Props {
  location: string
  sectionNum: string
}

export default async function ContactForm({location,sectionNum,}: Props) {
  const data = await getContactfont(location, sectionNum)

  if (!data) return null

  return (
    <ContactFormClient
      title={data.title || 'Contact Us'}
      ctaMessage={data.ctaMessage || ''}
      location={data.location || ''}
      city={data.city || ''}
      contactNumber={data.contactNumber || ''}
      breakpoints={data.breakpoints}
    />
  )
}