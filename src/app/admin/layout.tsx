import React from 'react'
import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import { getProviderByClerkId } from '../libs/crud/provider'

export default async function Layout({children,}: {children: React.ReactNode}) {
  const { userId } = auth()

  if (!userId) {
    redirect('/user')
  }

  const user = await getProviderByClerkId(userId)

  if (!user) {
    redirect('/user')
  }

  const allowedRoles = [
    'PROVIDER',
    'ADMIN',
    'SUPPORT',
    'MANAGER',
  ]

  if (!allowedRoles.includes(user.role)) {
    redirect('/user')
  }

  return <>{children}</>
}