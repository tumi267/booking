'use client'
import React, { useEffect, useState } from 'react'
import Team from '../team/Team';
import Calendar from '../calendar/Calendar';
import Summery from '../summery/Summery';
import teamMembers from '@/app/libs/db/team'
import Time from '../Time/Time';
type BookedDay = { date: string; times: string[] }
function Bookingmain() {
    const [selected,setSelected]=useState(0)
    const [bookingdata,setbookingdata]=useState<{id: string;team: string;dates: BookedDay[];}>({id: '',team: '',dates: []})
    
    const panel=()=>{
    switch (selected) {
        case 1:
            return <Calendar
            step={setSelected}
            currentStep={selected}
            bookingdata={bookingdata}
            selectedDate={setbookingdata}
            />
        case 2:
            return <Time
            step={setSelected}
            currentStep={selected}
            bookingdata={bookingdata}
            selectedDate={setbookingdata}
            />
        case 0:
            return <Team
            step={setSelected}
            currentStep={selected}
            selectMember={setbookingdata}
            bookingdata={bookingdata}
            team={teamMembers}
            />
        case 3:
            return <Summery
            step={setSelected}
            currentStep={selected}
            bookingdata={bookingdata}
            />
        default:
            return <Team
            step={setSelected}
            currentStep={selected}
            selectMember={setbookingdata}
            bookingdata={bookingdata}
            team={teamMembers}
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