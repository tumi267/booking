import ContactForm from '@/app/components/(public)/contact/contactForm/ContactForm'
import ContactInfo from '@/app/components/(public)/contact/contactInfo/ContactInfo'
import Map from '@/app/components/(public)/contact/map/Map'
import Socail from '@/app/components/(public)/contact/socail/Socail'
import React from 'react'

function Contact() {
    const socaillink=[{socaillink:'facebook.com'},{socaillink:'instagram.com'}]
    const contactInfo = {
        heading: 'Contact Information',
        addressLine1: '123 Studio Street',
        addressLine2: 'Creative District, CA 90210',
        phone: '+27 72 123 4567',
        hours: 'Mon–Fri, 9am–6pm',
        email: 'hello@studiocreative.com',
        note: 'We reply within 24 hours'
      }
  return (
    <div>
        <div>
        <ContactForm/>
        <Socail
        links={socaillink}/>
        </div>
        <div>
        <ContactInfo info={contactInfo} />
        <Map/>
        </div>
    </div>
  )
}

export default Contact