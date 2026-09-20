'use client'

import React from 'react'

import { useBreakpoint } from '@/app/hooks/useBreakpoint'
import { useContactForm } from '@/app/hooks/useContactForm'

type ContactBreakpoint = {
  mainContain?: React.CSSProperties
  containerStyle?: React.CSSProperties
  titleStyle?: React.CSSProperties
  ctaStyle?: React.CSSProperties
  addressStyle?: React.CSSProperties
  cityStyle?: React.CSSProperties
  inputStyle?: React.CSSProperties
  textareaStyle?: React.CSSProperties
  buttonStyle?: React.CSSProperties
}

interface ContactFormClientProps {
  title: string
  ctaMessage: string
  location: string
  city: string
  contactNumber: string
  breakpoints: Record<string, ContactBreakpoint>
}

export default function ContactFormClient({
  title,
  ctaMessage,
  location,
  city,
  contactNumber,
  breakpoints,
}: ContactFormClientProps) {
  const breakpoint = useBreakpoint()

  const {
    form,
    submitting,
    error,
    success,
    updateField,
    submit,
  } = useContactForm()

  const current =
    breakpoints?.[breakpoint] ||
    breakpoints?.desktop

  if (!current) return null

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault()

    await submit()
  }

  return (
    <section
      style={{
        ...current.mainContain,
      }}
    >
      <div
        style={{
          ...current.containerStyle,
        }}
      >
        <h2
          style={{
            ...current.titleStyle,
          }}
        >
          {title}
        </h2>

        {ctaMessage && (
          <p
            style={{
              ...current.ctaStyle,
            }}
          >
            {ctaMessage}
          </p>
        )}

        {location && (
          <p
            style={{
              ...current.addressStyle,
            }}
          >
            {location}
          </p>
        )}

        {city && (
          <p
            style={{
              ...current.cityStyle,
            }}
          >
            {city}
          </p>
        )}

        {contactNumber && (
          <p
            style={{
              ...current.cityStyle,
              marginBottom: 20,
            }}
          >
            {contactNumber}
          </p>
        )}

        <form
          onSubmit={handleSubmit}
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 16,
          }}
        >
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={form.name}
            onChange={(event) =>
              updateField(
                'name',
                event.target.value
              )
            }
            style={{
              ...current.inputStyle,
            }}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={(event) =>
              updateField(
                'email',
                event.target.value
              )
            }
            style={{
              ...current.inputStyle,
            }}
            required
          />

          <textarea
            name="message"
            placeholder="Message"
            value={form.message}
            onChange={(event) =>
              updateField(
                'message',
                event.target.value
              )
            }
            style={{
              ...current.textareaStyle,
            }}
            required
            rows={5}
          />

          {error && (
            <p
              style={{
                color: '#dc2626',
              }}
            >
              {error}
            </p>
          )}

          {success && (
            <p
              style={{
                color: '#16a34a',
              }}
            >
              Your message has been sent.
            </p>
          )}

          <button
            type="submit"
            disabled={submitting}
            style={{
              ...current.buttonStyle,
              opacity: submitting ? 0.6 : 1,
              cursor: submitting
                ? 'not-allowed'
                : current.buttonStyle?.cursor ||
                  'pointer',
            }}
          >
            {submitting
              ? 'Sending...'
              : 'Submit'}
          </button>
        </form>
      </div>
    </section>
  )
}