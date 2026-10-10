import React from 'react'

interface FormState {
  providerId: string
  serviceId: string
  date: string
  time: string
}

interface Props {
  formState: FormState
  setFormState: React.Dispatch<React.SetStateAction<any>>
  // availableProviders: {
  //   id: string
  //   firstName: string
  //   lastName: string
  // }[]
  availableServices: any
}

function CreateBookingMeta({formState, setFormState,availableServices,
}: Props) {
  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    const { name, value } = e.target

    setFormState((prev: any) => ({
      ...prev,
      [name]: value,
    }))
  }

  return (
    <section className="space-y-4">
      <h3 className="font-semibold">Appointment Details</h3>

      <div className="">
        <select
          name="serviceId"
          value={formState.serviceId}
          onChange={handleChange}
          className="w-full rounded-lg border p-3"
          required
        >
          <option value="">Select service</option>
          {availableServices.map((service:any) => (
            <option key={service.id} value={service.id}>
              {service.name}
            </option>
          ))}
        </select>

        <select
          name="providerId"
          value={formState.providerId}
          onChange={handleChange}
          className="w-full rounded-lg border p-3"
          required
        >
          {/* <option value="">Select provider</option>
          {availableProviders.map((provider) => (
            <option key={provider.id} value={provider.id}>
              {provider.firstName} {provider.lastName}
            </option>
          ))} */}
        </select>
        <input
          type="date"
          name="date"
          value={formState.date}
          onChange={handleChange}
          min={new Date().toISOString().split('T')[0]}
          className="w-full rounded-lg border p-3"
          required
        />

        {/* <input
          type="time"
          name="time"
          value={formState.time}
          onChange={handleChange}
          className="w-full rounded-lg border p-3"
          required
        /> */}
      </div>
    </section>
  )
}

export default CreateBookingMeta

