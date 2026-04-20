import React from 'react'

interface NavProps {
  selected: 'Bookings' | 'Team' | 'Services' | 'Customers' | 'Operations'|'pagelayout'
  setSelected: React.Dispatch<React.SetStateAction<'bookings' | 'team' | 'services' | 'customers' | 'operations' |'pagelayout'>>
}

function Nav({ selected, setSelected }: NavProps) {
  const links: NavProps['selected'][] = ['Bookings', 'Team', 'Services', 'Customers', 'Operations','pagelayout']

  return (
    <div>
      {links.map((link, i) => (
        <span
          key={i}
          onClick={() => setSelected(link)}
          style={{ marginRight: 12, cursor: 'pointer', fontWeight: selected === link ? 'bold' : 'normal' }}
        >
          {link}
        </span>
      ))}
    </div>
  )
}

export default Nav
