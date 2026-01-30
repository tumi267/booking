import React from 'react'

function Nav() {
    const links=[
    {tag:'About',href:'/'},
    {tag:'Booking',href:'/'},
    {tag:'Contact',href:'/'},
    ]
  return (
    <div>
        <span>logo</span>
        <div>
        {links.map((e,i)=>{return <span key={i}>{e.tag}</span>})}
        <span>singin/signup</span>
        </div>
    </div>
  )
}

export default Nav