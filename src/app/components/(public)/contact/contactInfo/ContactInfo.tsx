import React from 'react'
type ContactInfoData = {
    heading: string
    addressLine1: string
    addressLine2: string
    phone: string
    hours: string
    email: string
    note: string
  }
  type ContactInfoProps = {
    info: ContactInfoData
  }
  
  function ContactInfo({ info }: ContactInfoProps) {
    return (
      <div>
        <h2>{info.heading}</h2>
  
        <h3>{info.addressLine1}</h3>
        <p>{info.addressLine2}</p>
  
        <h3>{info.phone}</h3>
        <h3>{info.hours}</h3>
  
        <h3>{info.email}</h3>
        <p>{info.note}</p>
      </div>
    )
  }
  
  export default ContactInfo