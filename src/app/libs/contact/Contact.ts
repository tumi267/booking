const updateContact=async(location:string,sectionNum:string,data:any)=>{
    const res= await fetch('/api/contact/upsert', {
        method: 'POST',
        body: JSON.stringify({location,sectionNum,data}),
      })
    const newdata=await res.json()
    return newdata
}
const getContact=async(location:string,sectionNum:string)=>{
    const res= await fetch('/api/contact/get', {
    method: 'POST',
    body: JSON.stringify({location,sectionNum}),
    })
    const contactdata=await res.json()
    return contactdata
}
const getContactfont=async(location:string,sectionNum:string)=>{
    const res= await fetch(`${process.env.NEXT_PUBLIC_BASEURL}/api/contact/get`, {
    method: 'POST',
    body: JSON.stringify({location,sectionNum}),
    })
    const contactdata=await res.json()
    return contactdata
}
export {updateContact,getContact,getContactfont}