import React from 'react'
import { auth } from '@clerk/nextjs/server'

import Dash from '../components/admin/Dash/Dash'
import { getUserByClerkId } from '@/app/libs/crud/user'
import { getProviderByClerkId } from '../libs/crud/provider'

export default async function Admin() {
  const { userId } = auth()

  if (!userId) {
    return null
  }

  const user = await getProviderByClerkId(userId)

  if (!user) {
    return <div>No user found</div>
  }

  return (
    <div>
      <Dash user={user} />
    </div>
  )
}