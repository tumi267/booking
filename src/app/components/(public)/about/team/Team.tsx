import React from 'react'
type teamMember={
    name:string
    title:string
    image:string
    bio:string
}
interface props{
    teamMember:teamMember[]
}
function Team({teamMember}:props) {
  return (
    <div>Team
        {teamMember.map((e,i)=>{return<div key={i}>{e.name}</div>})}
    </div>
  )
}

export default Team