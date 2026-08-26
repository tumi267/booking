import type { ContactInfo as ContactInfoType } from '@/app/types/contact'

interface Props {
  info: ContactInfoType
}

export default function ContactInfo({
  info,
}: Props) {
  return (
    <section>
      <h2>{info.heading}</h2>

      <div>
        <h3>Address</h3>
        <p>{info.addressLine1}</p>
        <p>{info.addressLine2}</p>
      </div>

      <div>
        <h3>Phone</h3>
        <p>{info.phone}</p>
      </div>

      <div>
        <h3>Hours</h3>
        <p>{info.hours}</p>
      </div>

      <div>
        <h3>Email</h3>
        <p>{info.email}</p>
      </div>

      <p>{info.note}</p>
    </section>
  )
}