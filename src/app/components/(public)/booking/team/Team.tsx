'use client'
import React from 'react'


type BookedDay= {
  date: string;
  times: string[];
  dayOfWeek:number;
}
type team={ id: string, firstName: string, bookedDates: BookedDay[]}
interface Props {
    currentStep: number
    step: (newStep: number) => void
    selectMember:(value: { id: string; team: string; dates: BookedDay[] }) => void
    bookingdata:{ id: string; team: string; dates: BookedDay[] }
    team:team[]
  }
function Team({currentStep,step,selectMember,team,bookingdata}:Props) {
  const handleMemberClick=(member:team)=>{
    selectMember({id:member.id, team: member.firstName, dates: [] })
  }
  return (
    <div>Team
      {team.map((e,i)=>{return<div key={e.id} onClick={()=>{handleMemberClick(e)}}>
        {e.firstName}
      </div>})}
    <button onClick={() => step(currentStep + 1)}>Next</button>  
    
    </div>
  )
}

export default Team