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
        <h2>Benifits</h2>
        <div>
        <p>{text}</p>
        {images.map((e,i)=>{return <div key={i}>
          <img src={e.url} alt='benifits text'/>
          </div>})}
        </div>
    </div>
  )
}

export default Benefits