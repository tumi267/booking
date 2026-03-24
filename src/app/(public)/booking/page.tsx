import Bookingmain from '@/app/components/(public)/booking/bookingmain/Bookingmain'
import { getAllServices } from '@/app/libs/crud/service'
import React, { Suspense } from 'react'

type TeamMember = {
  id: string
  firstName: string
  lastName: string
  imageurl?: string | null
  bio: string,
  rating: number,
  totalReviews: number,
  role: string,
  isAvailable: boolean,
}

type Service = {
  id: string
  name: string
  price: number
  isActive: boolean
  assignedTeam: TeamMember[]
}

async function fetchServices(): Promise<Service[]> {
  const services = await getAllServices()
  
  // map Prisma result to match your Service type
  return services.map((s: any) => ({
    id: s.id,
    name: s.name,
    price: s.price,
    isActive: s.isActive,
    assignedTeam: s.assignedTeam.map((t: any) => ({
      id: t.id,
      firstName: t.firstName,
      lastName: t.lastName,
      imageurl: t.imageurl ?? null,
      bio: t.bio,
      rating: t.rating,
      totalReviews: t.totalReviews,
      role: t.role,
      isAvailable: t.isAvailable,
    })),
  }))
}

// Next.js 13 server component
export default async function BookingPage() {
  const services = await fetchServices()

  return (
    <Suspense fallback={<div>Loading services...</div>}>
      <Bookingmain data={services} />
    </Suspense>
  )
}