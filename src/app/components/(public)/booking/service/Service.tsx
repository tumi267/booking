'use client'
import React from 'react'

type BookedDay = { 
  date: string
  times: string[]
  dayOfWeek: number
}

type Team = { 
  ProviderId: string
  firstName: string
  lastName: string
  role: string
  bio?: string
  imageurl?: string
  isAvailable?: boolean
  bookedDates: BookedDay[]
}

type service = {
  serviceId: string
  name: string
  isActive: boolean
  price: number
  duration:number
  assignedTeam: Team[]
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
  selectService: React.Dispatch<React.SetStateAction<BookingData>>
  setAssignedTeam: React.Dispatch<React.SetStateAction<Team[]>>
  setduration:(value: number) => void
  setselectedService:(value:service) => void
  bookingdata: { serviceId: string
    providerId: string; team: string; dates: BookedDay[] }
  service: service[]
}

function Service({
  currentStep,
  step,
  selectService,
  setAssignedTeam,
  setduration,
  setselectedService,
  service,
  bookingdata
}: Props) {

  const activeService = service.filter(e => e.isActive)

  const handleSelect = (e: service) => {
    selectService(prev => ({
      ...prev,
      serviceId: e.serviceId,
      providerId: '',
      team: '',
      dates: []
    }))
    setduration(e.duration)
    setselectedService(e)
    setAssignedTeam(e.assignedTeam || [])
    step(currentStep + 1)
  }

  return (
    <div className="flex justify-center mt-6 mb-6">
      <div className="grid gap-6 justify-center 
                      grid-cols-[repeat(auto-fit,minmax(200px,1fr))] 
                      max-w-6xl w-full"
      >
        {activeService.map((e) => (
          <div
            key={e.serviceId}
            onClick={() => handleSelect(e)}
            className={`
              p-6 shadow-md cursor-pointer transition-all 
              hover:shadow-xl hover:scale-105
              ${bookingdata.serviceId  === e.serviceId ? 'border-2 border-black bg-gray-100' : 'border border-gray-300 bg-white'}
            `}
          >
            <h3 className="text-xl font-semibold mb-2">{e.name}</h3>
            <p className="text-gray-700 font-medium">R{e.price}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Service