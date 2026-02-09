import React from 'react'

interface Props{
    description:string
    image:string
}
function History({description,image}:Props) {
  return (
    <div>
        History
        <img src={image} alt='history'/>
        <h2>{description}</h2>
    </div>
  )
}

export default History