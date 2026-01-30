import React from 'react'
interface props{
    url:string
    text:string
}
function Hero({url,text}:props) {
  return (
    <div>
    {url}
    {text}
    </div>
  )
}

export default Hero