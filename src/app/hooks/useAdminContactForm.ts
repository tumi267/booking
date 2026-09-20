'use client'

import { getContact, updateContact } from '@/app/libs/contact/Contact'
import {
  CSSProperties,
  useEffect,
  useState,
} from 'react'



type Breakpoint =
  | 'desktop'
  | 'tablet'
  | 'mobile'

export type ContactBreakpoint = {
  mainContain: CSSProperties
  containerStyle: CSSProperties

  titleStyle: CSSProperties
  ctaStyle: CSSProperties
  addressStyle: CSSProperties
  cityStyle: CSSProperties

  inputStyle: CSSProperties
  textareaStyle: CSSProperties
  buttonStyle: CSSProperties
}

export type ContactData = {
  title: string
  ctaMessage: string
  location: string
  city: string
  contactNumber: string

  breakpoints: Record<
    Breakpoint,
    ContactBreakpoint
  >
}

const defaultBreakpoint =
  (): ContactBreakpoint => ({
    mainContain: {
      width: '100%',
      padding: 40,
      marginTop: 40,
      marginBottom: 40,
      backgroundColor: '#ffffff',
    },

    containerStyle: {
      width: '100%',
      maxWidth: 700,
      margin: '0 auto',
      padding: 30,
      backgroundColor: '#ffffff',
      borderRadius: 8,
    },

    titleStyle: {
      fontSize: 32,
      fontWeight: 600,
      color: '#000000',
      marginBottom: 12,
    },

    ctaStyle: {
      fontSize: 16,
      fontWeight: 400,
      color: '#555555',
      marginBottom: 20,
    },

    addressStyle: {
      fontSize: 16,
      fontWeight: 400,
      color: '#000000',
      marginBottom: 8,
    },

    cityStyle: {
      fontSize: 16,
      fontWeight: 400,
      color: '#000000',
      marginBottom: 8,
    },

    inputStyle: {
      width: '100%',
      padding: '12px 14px',
      border: '1px solid #cccccc',
      borderRadius: 6,
      fontSize: 16,
      color: '#000000',
      backgroundColor: '#ffffff',
    },

    textareaStyle: {
      width: '100%',
      minHeight: 140,
      padding: '12px 14px',
      border: '1px solid #cccccc',
      borderRadius: 6,
      fontSize: 16,
      color: '#000000',
      backgroundColor: '#ffffff',
      resize: 'vertical',
    },

    buttonStyle: {
      padding: '12px 24px',
      backgroundColor: '#000000',
      color: '#ffffff',
      border: 'none',
      borderRadius: 6,
      cursor: 'pointer',
      fontSize: 16,
      fontWeight: 600,
    },
  })

function useAdminContact(
  location: string,
  sectionNum: string,
  viewport: Breakpoint
) {
  const [showEditor, setShowEditor] =
    useState(false)

  const [isLoading, setLoading] =
    useState(true)

  const [saving, setSaving] =
    useState(false)

  const [data, setData] =
    useState<ContactData>({
      title: 'Contact Us',

      ctaMessage:
        'We would love to hear from you. Get in touch with us today.',

      location: '',

      city: '',

      contactNumber: '',

      breakpoints: {
        desktop: defaultBreakpoint(),
        tablet: defaultBreakpoint(),
        mobile: defaultBreakpoint(),
      },
    })

  /*
   * ==========================================
   * CURRENT VIEWPORT
   * ==========================================
   */

  const current =
    data.breakpoints[viewport] ||
    data.breakpoints.desktop

  /*
   * ==========================================
   * LOAD CONTACT DATA
   * ==========================================
   *
   * Runs when the component/page changes.
   *
   * Example:
   *
   * contact / 1
   *
   * then:
   *
   * contact / 2
   *
   * will load the correct configuration.
   */

  useEffect(() => {
    let mounted = true

    const loadContact = async () => {
      try {
        setLoading(true)

        const contact =
          await getContact(
            location,
            sectionNum
          )

        /*
         * Only update state if this
         * component is still mounted.
         */
        if (!mounted) {
          return
        }

        if (contact) {
          setData(contact)
        }
      } catch (error) {
        console.error(
          'Failed to load contact:',
          error
        )
      } finally {
        if (mounted) {
          setLoading(false)
        }
      }
    }

    loadContact()

    return () => {
      mounted = false
    }
  }, [location, sectionNum])

  /*
   * ==========================================
   * UPDATE CONTACT CONTENT
   * ==========================================
   *
   * These values are not viewport specific.
   */

  const updateContactField = (
    field:
      | 'title'
      | 'ctaMessage'
      | 'location'
      | 'city'
      | 'contactNumber',

    value: string
  ) => {
    setData(prev => ({
      ...prev,

      [field]: value,
    }))
  }

  /*
   * ==========================================
   * UPDATE BREAKPOINT
   * ==========================================
   *
   * Only the selected viewport changes.
   *
   * Desktop
   * Tablet
   * Mobile
   */

  const updateBreakpoint = (
    section: keyof ContactBreakpoint,

    value: CSSProperties
  ) => {
    setData(prev => {
      const breakpoint =
        prev.breakpoints[viewport]

      return {
        ...prev,

        breakpoints: {
          ...prev.breakpoints,

          [viewport]: {
            ...breakpoint,

            [section]: {
              ...breakpoint[section],
              ...value,
            },
          },
        },
      }
    })
  }

  /*
   * ==========================================
   * SAVE
   * ==========================================
   */

  const handleSave = async () => {
    try {
      setSaving(true)

      const saved =
        await updateContact(
          location,
          sectionNum,
          data
        )

      if (saved) {
        setData(saved)
      }

      setShowEditor(false)
    } catch (error) {
      console.error(
        'Failed to save contact:',
        error
      )
    } finally {
      setSaving(false)
    }
  }

  return {
    data,

    setData,

    current,

    showEditor,

    setShowEditor,

    isLoading,

    setLoading,

    saving,

    updateContactField,

    updateBreakpoint,

    handleSave,
  }
}

export default useAdminContact