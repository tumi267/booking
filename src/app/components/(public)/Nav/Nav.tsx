'use client'

import Link from 'next/link'
import React from 'react'
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton
} from '@clerk/nextjs'
import SignInHandler from '../../SignInHandler/SignInHandler'

function Nav() {
  const links = [
    { tag: 'About', href: '/about' },
    { tag: 'Booking', href: '/booking' },
    { tag: 'Contact', href: '/contact' },
  ]

  return (
    <div className="flex justify-between items-center p-4">
      
      {/* Logo */}
      <span>
        <Link href="/">logo</Link>
      </span>

      {/* Links + Auth */}
      <div className="flex gap-4 items-center">
        {links.map((e, i) => (
          <span key={i}>
            <Link href={e.href}>{e.tag}</Link>
          </span>
        ))}

        {/* 🔐 Logged OUT */}
        <SignedOut>
        <SignInButton mode="modal">
          <button>Sign In / Sign Up</button>
        </SignInButton>
        <SignInHandler/>
        </SignedOut>
        {/* 🔓 Logged IN */}
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </div>
  )
}

export default Nav