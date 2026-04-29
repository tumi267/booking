const updateFeat=async(location:string,sectionNum:string,data:any)=>{
    const res= await fetch('/api/features/upsert', {
        method: 'POST',
        body: JSON.stringify({location,sectionNum,data}),
      })
    const newdata=await res.json()
    return newdata
}
const getFeat=async(location:string,sectionNum:string)=>{
    const res= await fetch('/api/features/get', {
    method: 'POST',
    body: JSON.stringify({location,sectionNum}),
    })
    const featuredata=await res.json()
    return featuredata
}
export {updateFeat,getFeat}