import React from 'react'

type Image = {
    url: string
    alt:string
  }
  
interface Props {
    images: Image[]
    text:string
    
}
function Benefits({images,text}:Props) {
  return (
    <div>
        <h2>How It Works</h2>
        <div>
        <p>{text}</p>
        {images.map((e,i)=>{return <div key={i}>{e.url}</div>})}
        </div>
    </div>
  )
}

export default Benefits