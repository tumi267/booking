export async function updateBooking(groupId:string,times:any,date:Date,providerId:string,status:string){
    const res= fetch('/api/updateBooking',{
        method:'POST',
        headers:{
            'content-type':'application/json'
        },
        body:JSON.stringify({groupId,times,date,providerId,status})
    })
}
