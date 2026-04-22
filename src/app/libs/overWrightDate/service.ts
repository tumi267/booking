export async function getOverRideDates(month:number,year:number){
    const res = await fetch("/api/getOverwrightenDates",{
        method:'POST',
        headers:{
            'content-type':'application/json'
        },
        body:JSON.stringify({month,year})
    })
    return res.json()
}
export async function toggleOverRide(date:Date) {
    const res = await fetch("/api/createOverwrightenDates",{
        method:'POST',
        headers:{
            'content-type':'application/json'
        },
        body:JSON.stringify({date})
    })
    return res.json()
}

