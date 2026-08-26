'use client'

import { useState } from 'react'

import type {
  ContactFormData,
} from '@/app/types/contact'

const initialForm: ContactFormData = {
  name: '',
  email: '',
  message: '',
}

export function useContactForm() {
  const [form, setForm] =
    useState<ContactFormData>(
      initialForm
    )

  const [submitting, setSubmitting] =
    useState(false)

  const [error, setError] =
    useState<string | null>(null)

  const [success, setSuccess] =
    useState(false)

  const updateField = (
    field: keyof ContactFormData,
    value: string
  ) => {
    setForm(prev => ({
      ...prev,
      [field]: value,
    }))
  }

  const submit = async () => {
    setSubmitting(true)
    setError(null)
    setSuccess(false)

    try {
      const response = await fetch(
        '/api/contact',
        {
          method: 'POST',
          headers: {
            'Content-Type':
              'application/json',
          },
          body: JSON.stringify(form),
        }
      )

      const data =
        await response.json()

      if (!response.ok) {
        throw new Error(
          data.error ||
          'Failed to send message'
        )
      }

      setForm(initialForm)
      setSuccess(true)
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : 'Something went wrong'
      )
    } finally {
      setSubmitting(false)
    }
  }

  return {
    form,
    submitting,
    error,
    success,
    updateField,
    submit,
  }
}