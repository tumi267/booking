'use client'
import React, { useState } from 'react'
import Nav from '../Nav/Nav'
import Customers from '../Customers/Customers'
import Operations from '../Operations/Operations'
import Services from '../Services/Services'
import Team from '../Team/Team'
import Booking from '../Booking/Booking'
import Pagelayout from '../Pagelayout/Pagelayout'

function Dash() {
    const [selected, setSelected] = useState<'bookings' | 'team' | 'services' | 'customers' | 'operations' | 'pagelayout'>('bookings')
  return (
    <div>
        <Nav selected={selected} setSelected={setSelected} />
        <div>
        {selected === 'bookings' && <Booking />}
        {selected === 'team' && <Team />}
        {selected === 'services' && <Services />}
        {selected === 'customers' && <Customers />}
        {selected === 'operations' && <Operations />}
        {selected === 'pagelayout' && <Pagelayout />}
      </div>
    </div>
  )
}

export default Dash