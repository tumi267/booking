'use client'
import React, { useState } from 'react'
import Nav from '../Nav/Nav'
import Customers from '../Customers/Customers'
import Operations from '../Operations/Operations'
import Services from '../Services/Services'
import Team from '../Team/Team'
import Booking from '../Booking/Booking'
import Pagelayout from '../Pagelayout/Pagelayout'
interface DashProps {
  user: {
    id: string
    role: string
  }
}
function Dash({user}:DashProps) {
  
    const [selected, setSelected] = useState<'Bookings' | 'Team' | 'Services' | 'Customers' | 'Operations' | 'pagelayout'>('Bookings')
  return (
    <div>
        <Nav selected={selected} setSelected={setSelected} role={user.role}/>
        <div>
        {selected === 'Bookings' && <Booking />}
        {selected === 'Team' && <Team user={user.role}/>}
        {selected === 'Services' && <Services />}
        {selected === 'Customers' && <Customers />}
        {selected === 'Operations' && <Operations user={user.role}/>}
        {(user.role === 'ADMIN' || user.role === 'MANAGER') && selected === 'pagelayout' && <Pagelayout />}
      </div>
    </div>
  )
}

export default Dash