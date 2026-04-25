export async function getHero(location: string, sectionNum: string) {
    const res = await fetch('/api/hero/get', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({ location, sectionNum }),
    })
  
    if (!res.ok) {
      throw new Error('Failed to fetch hero')
    }
  
    return res.json()
  }
  
  export async function upsertHero(
    location: string,
    sectionNum: string,
    data: any
  ) {
    const res = await fetch('/api/hero/upsert', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({ location, sectionNum, data }),
    })
  
    if (!res.ok) {
      throw new Error('Failed to save hero')
    }
  
    return res.json()
  }