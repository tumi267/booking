import Nav from '@/app/components/user/Nav/Nav'
import { getUserByClerkId } from '@/app/libs/crud/user'
import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import React from 'react'

async function Page() {
  const { userId } = auth()

  if (!userId) {
    redirect('/user')
  }

  const userdata = await getUserByClerkId(userId)

  if (!userdata) {
    redirect('/user')
  }

  const initials = `${userdata.firstName?.charAt(0) || ''}${userdata.lastName?.charAt(0) || ''}`

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex justify-center">
      <Nav />
      </div>
      <main className="max-w-3xl mx-auto px-4 py-10">

        {/* Profile Header */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 mb-6">
          <div className="flex items-center gap-5">

            {/* Avatar */}
            <div className="h-20 w-20 rounded-full bg-blue-600 flex items-center justify-center text-white text-2xl font-bold shadow-sm">
              {initials.toUpperCase()}
            </div>

            <div>
              <p className="text-sm text-gray-500 mb-1">
                My Account
              </p>

              <h1 className="text-2xl font-bold text-gray-900">
                {userdata.firstName} {userdata.lastName}
              </h1>

              <p className="text-sm text-gray-500 mt-1">
                {userdata.email}
              </p>
            </div>

          </div>
        </div>

        {/* Personal Information */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm">

          <div className="px-6 py-5 border-b border-gray-100">
            <h2 className="text-lg font-semibold text-gray-900">
              Personal Information
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              Your account details
            </p>
          </div>

          <div className="divide-y divide-gray-100">

            {/* First Name */}
            <div className="px-6 py-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <div>
                <p className="text-sm font-medium text-gray-500">
                  First Name
                </p>
              </div>

              <p className="text-sm font-semibold text-gray-900">
                {userdata.firstName || 'Not provided'}
              </p>
            </div>

            {/* Last Name */}
            <div className="px-6 py-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <div>
                <p className="text-sm font-medium text-gray-500">
                  Last Name
                </p>
              </div>

              <p className="text-sm font-semibold text-gray-900">
                {userdata.lastName || 'Not provided'}
              </p>
            </div>

            {/* Phone */}
            <div className="px-6 py-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <div>
                <p className="text-sm font-medium text-gray-500">
                  Phone
                </p>
              </div>

              <p className="text-sm font-semibold text-gray-900">
                {userdata.phone || 'Not provided'}
              </p>
            </div>

            {/* Email */}
            <div className="px-6 py-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <div>
                <p className="text-sm font-medium text-gray-500">
                  Email
                </p>
              </div>

              <p className="text-sm font-semibold text-gray-900 break-all sm:text-right">
                {userdata.email}
              </p>
            </div>

            {/* Member Since */}
            <div className="px-6 py-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <div>
                <p className="text-sm font-medium text-gray-500">
                  Member Since
                </p>
              </div>

              <p className="text-sm font-semibold text-gray-900">
                {userdata.createdAt.toDateString()}
              </p>
            </div>

          </div>
        </div>

      </main>
    </div>
  )
}
export default Page


