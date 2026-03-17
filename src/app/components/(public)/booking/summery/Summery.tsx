import React from 'react'
type BookedDay= {
  date: string;
  times: string[];
}
interface Props {
    currentStep: number
    step: (newStep: number) => void
    bookingdata:{ id: string; team: string; dates: BookedDay[] }
  }
function Summery({ step, currentStep,bookingdata }: Props) {
 
  return (
    <div>Summery
      {bookingdata.id}
      {bookingdata.team}
      {bookingdata.dates.map((e,i)=>{return <div key={i}>{e.date} {e.times.length==0?'no time set':e.times.map((y,j)=>{return<li key={j}>{y}</li>})}</div>})}
        <button onClick={() => step(currentStep - 1)}>prev</button>
    </div>
  )
}

export default Summery