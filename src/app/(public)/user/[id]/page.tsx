import React from 'react'

async function Page({ params }: { params: Promise<{ id: string }> }) {
  
  const { id } = await params;

  // This fetch is cached by default in Next.js
  // const res = await fetch(`https://example.com{id}`);
  // const data = await res.json();

  return (
    <div>
      <h1>Data for ID: {id}</h1>
      {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
    </div>
  )
}

export default Page