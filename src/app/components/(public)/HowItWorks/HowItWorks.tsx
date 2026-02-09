import React from 'react'

type Image = {
    url: string
    alt:string
  }
  
interface Props {
    images: Image[]
    text:string
    
}
function HowItWorks({images,text}:Props) {
  return (
    <div>
        <h2>How It Works</h2>
        <div>
        <p>{text}</p>
        {images.map((e,i)=>{return <div key={i}>
          <img src={e.url} alt='working image'/>
        </div>})}
        </div>
    </div>
  )
}

export default HowItWorks