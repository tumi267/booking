import React from 'react'
type Client={
    image: string
    text: string
}
interface Props{
  clients:Client[]
}
function SocialProof({clients}:Props) {
  return (
    <div>
        <h2>Trusted by our clients</h2>
        {clients.map((e,i)=>{return <div key={i}>{e.text}</div>})}
    </div>
  )
}

export default SocialProof