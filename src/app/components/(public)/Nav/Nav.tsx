import Link from 'next/link'
import React from 'react'

function Nav() {
    const links=[
    {tag:'About',href:'/about'},
    {tag:'Booking',href:'/booking'},
    {tag:'Contact',href:'/contact'},
    ]
  return (
    <div>
        <span><Link href={'/'}>logo</Link></span>
        <div>
        {links.map((e,i)=>{return <span key={i}><Link href={e.href}>{e.tag}</Link></span>})}
        <span>singin/signup</span>
        </div>
    </div>
  )
}

export default Nav