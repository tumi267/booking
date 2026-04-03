'use client'

import Link from 'next/link'
import React from 'react'
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
  useAuth
} from '@clerk/nextjs'


function Nav() {
  const links = [
    { tag: 'About', href: '/about' },
    { tag: 'Booking', href: '/booking' },
    { tag: 'Contact', href: '/contact' },
  ]
  const { userId } = useAuth();
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

        {/* Logged OUT */}
        <SignedOut>
          <SignInButton mode="modal" fallbackRedirectUrl="/booking">
            <button>Sign In / Sign Up</button>
          </SignInButton>


        </SignedOut>
        <Link href={`/user/${userId}`}>profile</Link>
        {/* Logged IN */}
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </div>
  )
}

export default Nav