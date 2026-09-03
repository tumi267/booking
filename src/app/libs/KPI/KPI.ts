export async function getkpi(){
   const response= await fetch('/api/kpi',{cache: 'no-store',})
   if (!response.ok) {
    throw new Error(
      'Failed to load KPIs'
    )
  }

  return response.json()
}