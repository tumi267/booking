'use client'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useClerk } from '@clerk/nextjs'

export default function SignInHandler() {
  const { user } = useClerk()
  const router = useRouter()
  const [redirected, setRedirected] = useState(false)

  useEffect(() => {
    if (user && !redirected) {
      setRedirected(true)
      router.replace('/booking') // SPA redirect after sign-in
    }
  }, [user, redirected, router])

  return null
}