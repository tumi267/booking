'use client'

import React from 'react'

import { useContactForm } from '@/app/hooks/useContactForm'

export default function ContactForm() {
  const {
    form,
    submitting,
    error,
    success,
    updateField,
    submit,
  } = useContactForm()

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault()

    await submit()
  }

  return (
    <section>
      <h2>Contact Us</h2>

      <form
        onSubmit={handleSubmit}
        className="space-y-4"
      >

        <input
          type="text"
          placeholder="Name"
          value={form.name}
          onChange={event =>
            updateField(
              'name',
              event.target.value
            )
          }
          required
        />

        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={event =>
            updateField(
              'email',
              event.target.value
            )
          }
          required
        />

        <textarea
          placeholder="Message"
          value={form.message}
          onChange={event =>
            updateField(
              'message',
              event.target.value
            )
          }
          required
          rows={5}
        />

        {error && (
          <p className="text-red-500">
            {error}
          </p>
        )}

        {success && (
          <p className="text-green-600">
            Your message has been sent.
          </p>
        )}

        <button
          type="submit"
          disabled={submitting}
          className="px-6 py-2 bg-black text-white rounded"
        >
          {submitting
            ? 'Sending...'
            : 'Submit'}
        </button>

      </form>
    </section>
  )
}