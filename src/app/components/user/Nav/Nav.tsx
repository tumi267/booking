'use client'

import Link from 'next/link'
import React from 'react'

function Nav() {
  const list = [
    {
      title: 'Profile',
      link: '/user',
    },
    {
      title: 'Upcoming',
      link: '/user//user/upcoming',
    },
    {
      title: 'History',
      link: '/user//user/history',
    },
  ]

  return (
    <nav className="flex justify-center gap-2 py-4">
      {list.map((item) => (
        <Link
          key={item.title}
          href={item.link}
          className="px-5 py-2 rounded-lg border border-gray-200 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-blue-600 transition"
        >
          {item.title}
        </Link>
      ))}
    </nav>
  )
}

export default Nav