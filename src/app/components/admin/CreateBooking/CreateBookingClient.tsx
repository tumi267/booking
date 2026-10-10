import React from 'react'

interface FormState {
  firstName: string
  lastName: string
  contactNumber: string
  email: string
}

interface Props {
  formState: FormState
  setFormState: React.Dispatch<React.SetStateAction<any>>
}

function CreateBookingClient({ formState, setFormState }: Props) {
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target

    setFormState((prev: any) => ({
      ...prev,
      [name]: value,
    }))
  }

  return (
    <section className="space-y-4">
      <h3 className="font-semibold">Client Details</h3>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <input
          name="firstName"
          placeholder="First name"
          value={formState.firstName}
          onChange={handleChange}
          className="w-full rounded-lg border p-3"
          required
        />

        <input
          name="lastName"
          placeholder="Last name"
          value={formState.lastName}
          onChange={handleChange}
          className="w-full rounded-lg border p-3"
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email address"
          value={formState.email}
          onChange={handleChange}
          className="w-full rounded-lg border p-3"
          required
        />

        <input
          type="tel"
          name="contactNumber"
          placeholder="Contact number"
          value={formState.contactNumber}
          onChange={handleChange}
          className="w-full rounded-lg border p-3"
          required
        />
      </div>
    </section>
  )
}

export default CreateBookingClient

