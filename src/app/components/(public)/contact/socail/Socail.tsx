import React from 'react'
type link={
    socaillink:string
}
interface props{
    links:link[]
}
function Socail({links}:props) {
  return (
    <div>
        <h3>Follow Us</h3>
        {links.map((e,i)=>{return<div key={i}>{e.socaillink}</div>})}

    </div>
  )
}

export default Socail