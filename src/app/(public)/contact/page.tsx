
import ContactForm from '@/app/components/(public)/contact/contactForm/ContactForm'
import ContactInfo from '@/app/components/(public)/contact/contactInfo/ContactInfo'
import Map from '@/app/components/(public)/contact/map/Map'
import Socail from '@/app/components/(public)/contact/socail/Socail'


import type {
  ContactInfo as ContactInfoType,
  SocialLink,
} from '@/app/types/contact'

const socialLinks: SocialLink[] = [
  {
    socialLink: 'facebook.com',
  },
  {
    socialLink: 'instagram.com',
  },
]

const contactInfo: ContactInfoType = {
  heading: 'Contact Information',
  addressLine1: '123 Studio Street',
  addressLine2: 'Creative District, CA 90210',
  phone: '+27 72 123 4567',
  hours: 'Mon–Fri, 9am–6pm',
  email: 'hello@studiocreative.com',
  note: 'We reply within 24 hours',
}

export default function Contact() {
  return (
    <main>
      <section>
        <ContactForm />

        <Socail
          links={socialLinks}
        />
      </section>

      <section>
        <ContactInfo
          info={contactInfo}
        />

        <Map />
      </section>
    </main>
  )
}