import Nav from '@/app/components/user/Nav/Nav';
import { getUserByID } from '@/app/libs/crud/user/getUserInfo';
import React from 'react'

async function Page({ params }: { params: Promise<{ id: string }> }) {
  
  const { id } = await params;
  const userdata=await getUserByID(id)
  console.log(userdata)
  return (
    <div>
      <Nav
      id={id}
      />
      <div>
        <span><p>first name: {userdata?.firstName}</p></span>
        <span><p>last name: {userdata?.lastName}</p></span>
      </div>
      <div>
        <p>phone: {userdata?.phone}</p>
      </div>
      <div>
        <p>email: {userdata?.email}</p>
      </div>
      <div><p>created at: {userdata?.createdAt.toDateString()}</p></div>
      {/* upcoming booking 
      user info
      history
      booking detail */}
    </div>
  )
}

export default Page