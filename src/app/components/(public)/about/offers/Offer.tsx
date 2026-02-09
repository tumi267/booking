import React from 'react'

type service={
    name:string
    title:string
    image:string
    bio:string
}
interface props{
    service:service[]
}
function Offer({service}:props) {
  return (
    <div>Offer
        {service?.map((e,i)=>{return<div key={i}>{e.name}</div>})}
    </div>
  )
}

export default Offer