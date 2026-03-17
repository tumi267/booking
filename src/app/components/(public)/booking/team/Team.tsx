'use client'
import React from 'react'


type BookedDay= {
  date: string;
  times: string[];
}
type team={ id: string, name: string, bookedDates: BookedDay[]}
interface Props {
    currentStep: number
    step: (newStep: number) => void
    selectMember:(value: { id: string; team: string; dates: BookedDay[] }) => void
    bookingdata:{ id: string; team: string; dates: BookedDay[] }
    team:team[]
  }
function Team({currentStep,step,selectMember,team,bookingdata}:Props) {
  const handleMemberClick=(member:team)=>{
    selectMember({id:member.id, team: member.name, dates: [] })
  }
  return (
    <div>Team
      {team.map((e,i)=>{return<div key={e.id} onClick={()=>{handleMemberClick(e)}}>
        {e.name}
      </div>})}
    <button onClick={() => step(currentStep + 1)}>Next</button>  
    
    </div>
  )
}

export default Team