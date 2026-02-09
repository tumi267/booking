'use client'
import React, { useState } from 'react'
import Team from '../team/Team';
import Calendar from '../calendar/Calendar';
import Summery from '../summery/Summery';

function Bookingmain() {
    const [selected,setSelected]=useState(0)
    const teamMembers = [
        { id: '1', name: 'Alice', bookedDates: ['2026-02-12', '2026-02-14'] },
        { id: '2', name: 'Bob', bookedDates: ['2026-02-13'] },
        { id: '3', name: 'Charlie', bookedDates: [] }
      ]
    const panel=()=>{
    switch (selected) {
        case 1:
            return <Calendar
            step={setSelected}
            currentStep={selected}
            />
        case 0:
            return <Team
            step={setSelected}
            currentStep={selected}
            />
        case 2:
            return <Summery
            step={setSelected}
            currentStep={selected}
            />
        default:
            return <Team
            step={setSelected}
            currentStep={selected}
            />
    }
    }
  return (
    <div>
        {panel()}
    </div>
  )
}

export default Bookingmain