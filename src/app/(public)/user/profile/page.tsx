import Nav from '@/app/components/user/Nav/Nav'
import { getUserByClerkId } from '@/app/libs/crud/user'
import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import React from 'react'

async function Page() {
  const { userId } =await auth()

  if (!userId) {
    redirect('/user')
  }

  // const userdata = await getUserByClerkId(userId)

  // if (!userdata) {
  //   redirect('/user')
  // }

  // const initials = `${userdata.firstName?.charAt(0) || ''}${userdata.lastName?.charAt(0) || ''}`

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex justify-center">
      <Nav />
      </div>
      <h1>User Profile Route Works</h1>
      <p>Clerk ID: {userId}</p>
    </div>
  )
}
export default Page


