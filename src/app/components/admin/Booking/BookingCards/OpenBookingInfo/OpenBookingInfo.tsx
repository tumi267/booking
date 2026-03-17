'use client'
import Link from 'next/link'
import React from 'react'

interface prop{
    url:string
}
function OpenBookingInfo({url}:prop) {
  return (
    <Link href={url}>more info</Link>
  )
}

export default OpenBookingInfo