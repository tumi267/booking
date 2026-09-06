'use client'

import React from 'react'

import {PAGE_COMPONENT_REGISTRY,} from './componentRegistry'

type PageComponentItem = {
  id: string
  page: string
  component: string
  position: number
}

interface Props {
  component: PageComponentItem
  page: string
}

export default function ComponentRenderer({component,page,}: Props) {
  const Component =PAGE_COMPONENT_REGISTRY[component.component as keyof typeof PAGE_COMPONENT_REGISTRY]

  if (!Component) {
    return (
      <div className="rounded-lg border border-dashed border-red-300 bg-red-50 p-4">
        <p className="text-sm font-medium text-red-600">
          Unknown component
        </p>

        <p className="mt-1 text-xs text-red-500">
          {component.component}
        </p>
      </div>
    )
  }

  return (
    <div className="relative">
      <Component
        location={page}
        sectionNum={String(component.position + 1)}
        viewport="desktop"
      />
    </div>
  )
}