import React from 'react'
import { auth } from '@clerk/nextjs/server'

import Dash from '../components/admin/Dash/Dash'
import { getUserByClerkId } from '@/app/libs/crud/user'

export default async function Admin() {
  const { userId } = auth()

  if (!userId) {
    return null
  }

  const user = await getUserByClerkId(userId)

  if (!user) {
    return null
  }

  return (
    <div>
      <Dash user={user} />
    </div>
  )
}