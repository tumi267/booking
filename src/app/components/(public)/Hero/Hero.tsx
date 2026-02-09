import React from 'react'
interface props{
    url:string
    text:string
}
function Hero({url,text}:props) {
  return (
    <div>
      <div>
      <img src={url} alt='hero image'/>
      </div>
      <h1>{text}</h1>
    </div>
  )
}

export default Hero