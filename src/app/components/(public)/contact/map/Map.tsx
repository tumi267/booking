import React from 'react'

function Map() {
  return (
    <div>
      <iframe
        title="Johannesburg Map"
        width="40%"
        height="100%"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        style={{ border: 0 }}
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3584.913789609374!2d28.04003531502741!3d-26.20410298344454!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1e95136a6c6c6c6d%3A0x7a1c0d6e8e0e6b65!2sJohannesburg!5e0!3m2!1sen!2sza!4v1700000000000"
      />
    </div>
  )
}

export default Map
