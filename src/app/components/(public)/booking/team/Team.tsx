'use client'
import React, { SetStateAction } from 'react'

type BookedDay = {
  date: string
  times: string[]
  dayOfWeek: number
}

type TeamMember = {
  ProviderId: string 
  firstName: string
  lastName: string
  bio?: string
  imageurl?: string
  role: string
  isAvailable?: boolean
  bookedDates: BookedDay[]
}
type BookingData = {
  serviceId: string
  providerId: string
  team: string
  dates: BookedDay[]
}
interface Props {
  currentStep: number
  step: (newStep: number) => void
  selectMember: React.Dispatch<React.SetStateAction<BookingData>>
  bookingdata: {  serviceId: string
    providerId: string
    team: string; dates: BookedDay[] }
  team: TeamMember[]
}


function Team({ currentStep, step, selectMember, team, bookingdata }: Props) {

  // Filter only available members
  const availableTeam = team.filter(member => member.isAvailable)

  const handleMemberClick = (member: TeamMember) => {
 
    selectMember(prev => ({
      ...prev, 
      providerId: member.ProviderId,
      team: `${member.firstName} ${member.lastName}`
    }))
  }
  const getPlaceholderImage = (firstName: string, lastName: string) => 
  `https://ui-avatars.com/api/?name=${firstName}+${lastName}&background=cccccc&color=ffffff`
  return (
    <div className="flex flex-col items-center mt-6 mb-6">
      <h2 className="text-2xl font-semibold mb-6">Select a Team Member</h2>

      <div className="grid gap-6 justify-center 
                      grid-cols-[repeat(auto-fit,minmax(200px,1fr))] 
                      max-w-5xl w-full">
        {availableTeam.map((member) => {
          const isSelected = bookingdata.providerId === member.ProviderId
          return (
            <div
              key={member.ProviderId}
              onClick={() => handleMemberClick(member)}
              className={`
                p-4 cursor-pointer shadow-md rounded-xl text-center transition-all
                hover:shadow-xl hover:scale-105
                ${isSelected ? 'border-2 border-black bg-gray-100' : 'border border-gray-300 bg-white'}
              `}
            >
              <img
                src={member.imageurl || getPlaceholderImage(member.firstName, member.lastName)}
                alt={member.firstName}
                className="w-24 h-24 mx-auto rounded-full object-cover mb-3"
              />
              <div className="text-lg font-semibold">{member.firstName} {member.lastName}</div>
              {member.role && <p className="text-gray-600 text-sm mt-1">{member.role}</p>}
              {member.bio && <p className="text-gray-600 text-sm mt-1">{member.bio}</p>}
            </div>
          )
        })}
      </div>

      <div className="flex gap-4 mt-8">
        <button
          onClick={() => step(currentStep - 1)}
          className="px-6 py-2 bg-gray-300 hover:bg-gray-400 rounded-md transition"
        >
          Prev
        </button>
        <button
          onClick={() => step(currentStep + 1)}
          disabled={!bookingdata.team}
          className={`px-6 py-2 rounded-md transition 
                      ${bookingdata.team ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}
        >
          Next
        </button>
      </div>
    </div>
  )
}

export default Team