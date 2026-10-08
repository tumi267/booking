
import { SignOutButton, SignedOut } from '@clerk/nextjs'
import React from 'react'

interface NavProps {
  selected:
    | 'Bookings'
    | 'Team'
    | 'Services'
    | 'Customers'
    | 'Operations'
    | 'pagelayout'

  setSelected: React.Dispatch<
    React.SetStateAction<
      | 'Bookings'
      | 'Team'
      | 'Services'
      | 'Customers'
      | 'Operations'
      | 'pagelayout'
    >
  >

  role: string
}

function Nav({ selected, setSelected, role }: NavProps) {
  const links: NavProps['selected'][] = ['Bookings','Team','Customers','Operations',]

  if (role === 'ADMIN' || role === 'MANAGER') {
    links.push('Services')
    links.push('pagelayout')
  }

  return (
    <div>
      {links.map((link) => (
        <span
          key={link}
          onClick={() => setSelected(link)}
          style={{
            marginRight: 12,
            cursor: 'pointer',
            fontWeight: selected === link ? 'bold' : 'normal',
          }}
        >
          {link}
        </span>
      ))}
        <SignOutButton>
        <button>Sign Out</button>
      </SignOutButton>
    </div>
  )
}

export default Nav


