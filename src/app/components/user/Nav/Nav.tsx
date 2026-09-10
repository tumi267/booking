'use client'
import Link from 'next/link'
import React from 'react'
interface Prop{
id: String
}
function Nav({id}:Prop) {
    const list=[{title:'Up Coming',link:`/user/${id}/upcoming`},
    {title:'history',link:`/user/${id}/history`},
    {title:'profile',link:`/user/${id}`},
    ]
  return (
    <div className='flex justify space-even'>
        {list.map((e)=>{return <Link key={e.title} href={e.link} className='border'>{e.title}</Link>})}
    </div>
  )
}

export default Nav