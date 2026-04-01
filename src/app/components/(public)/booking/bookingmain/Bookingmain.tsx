'use client'
import React, { useEffect, useState } from 'react'
import Team from '../team/Team';
import Calendar from '../calendar/Calendar';
import Summery from '../summery/Summery';
// import teamMembers from '@/app/libs/db/team'
import Time from '../Time/Time';
import Service from '../service/Service';
type BookedDay = { date: string; times: string[];dayOfWeek:number; }
type Team={ id: string
    firstName: string
    lastName: string
    role: string
    bio?: string
    imageurl?: string
    isAvailable?: boolean
    bookedDates: BookedDay[]}
function Bookingmain({data }:any) {
   
    const [selected,setSelected]=useState(0)
    const [bookingdata,setbookingdata]=useState<{id: string;team: string;dates: BookedDay[];}>({id: '',team: '',dates: []})
    const service=data
    const [assignedTeam,setAssignedTeam]=useState<Team[]>([])
    // const assignedTeam = data.map((e: any) => e.assignedTeam).flat();
  
    const panel=()=>{
    switch (selected) {
        case 0:
            return <Service
            step={setSelected}
            currentStep={selected}
            selectService={setbookingdata}
            bookingdata={bookingdata}
            service={service}
            setAssignedTeam={setAssignedTeam}
            />
        case 1:
            return <Team
            step={setSelected}
            currentStep={selected}
            selectMember={setbookingdata}
            bookingdata={bookingdata}
            team={assignedTeam}
            />        
        case 2:
            return <Calendar
            step={setSelected}
            currentStep={selected}
            bookingdata={bookingdata}
            selectedDate={setbookingdata}
            />
        case 3:
            return <Time
            step={setSelected}
            currentStep={selected}
            bookingdata={bookingdata}
            selectedDate={setbookingdata}
            />
        case 4:
            return <Summery
            step={setSelected}
            currentStep={selected}
            bookingdata={bookingdata}
            />

        default:
            return <Service
            step={setSelected}
            currentStep={selected}
            selectService={setbookingdata}
            bookingdata={bookingdata}
            service={service}
            setAssignedTeam={setAssignedTeam}
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