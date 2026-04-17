import { getBookingByClientId } from '@/app/libs/crud/booking'
import React from 'react'

// Define the shape of the URL parameters
interface PageProps {
  params: Promise<{ id: string }>; 
}

async function Page({ params }: PageProps) {
  // In Next.js 15+, params must be awaited
  const { id } = await params;
  
  // Fetch the data using your CRUD helper
  const data = await getBookingByClientId(id);
  
  // Log to your terminal (not browser) to verify the data
  console.log(data);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Client Bookings</h1>
      <pre className="bg-gray-100 p-4 rounded">
        {JSON.stringify(data, null, 2)}
      </pre>
    </div>
  )
}

export default Page