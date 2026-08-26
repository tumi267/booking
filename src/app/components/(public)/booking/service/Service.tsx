'use client'

import type {
  BookingData,
  Service as ServiceType,
} from '@/app/types/booking'

interface Props {
  currentStep: number
  step: (newStep: number) => void
  bookingdata: BookingData
  service: ServiceType[]
  onSelectService: (service: ServiceType) => void
}

export default function Service({
  currentStep,
  step,
  bookingdata,
  service,
  onSelectService,
}: Props) {
  const activeServices = service.filter(
    (item) => item.isActive
  )

  const handleSelect = (service: ServiceType) => {
    onSelectService(service)
    step(currentStep + 1)
  }

  return (
    <div className="flex justify-center mt-6 mb-6">
      <div
        className="
          grid gap-6 justify-center
          grid-cols-[repeat(auto-fit,minmax(200px,1fr))]
          max-w-6xl w-full
        "
      >
        {activeServices.map((service) => (
          <div
            key={service.id}
            onClick={() => handleSelect(service)}
            className={`
              p-6 shadow-md cursor-pointer transition-all
              hover:shadow-xl hover:scale-105
              ${
                bookingdata.serviceId === service.id
                  ? 'border-2 border-black bg-gray-100'
                  : 'border border-gray-300 bg-white'
              }
            `}
          >
            <h3 className="text-xl font-semibold mb-2">
              {service.name}
            </h3>

            <p className="text-gray-700 font-medium">
              R{service.price}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}