'use client'

import { useState } from 'react'

import { usePageBuilder } from '@/app/hooks/usePageBuilder'

import ComponentPicker from './ComponentPicker'

import {
  PAGE_BUILDER_COMPONENTS,
} from './componentRegistry'

type PageBuilderProps = {
  page: string
}

export default function PageBuilder({
  page,
}: PageBuilderProps) {
  const {
    components,
    loading,
    saving,
    adding,
    removing,
    error,
    addComponent,
    removeComponent,
    moveComponent,
    saveLayout,
  } = usePageBuilder(page)

  const [
    draggedIndex,
    setDraggedIndex,
  ] = useState<number | null>(null)

  const [
    dragOverIndex,
    setDragOverIndex,
  ] = useState<number | null>(null)

  // --------------------------------
  // HELPERS
  // --------------------------------

  const getComponentLabel = (
    type: string
  ) => {
    const component =
      PAGE_BUILDER_COMPONENTS.find(
        item => item.type === type
      )

    return component?.label ?? type
  }

  // --------------------------------
  // DRAG START
  // --------------------------------

  const handleDragStart = (
    index: number
  ) => {
    setDraggedIndex(index)
  }

  // --------------------------------
  // DRAG OVER
  // --------------------------------

  const handleDragOver = (
    event: React.DragEvent<HTMLDivElement>,
    index: number
  ) => {
    event.preventDefault()

    if (
      draggedIndex === null ||
      draggedIndex === index
    ) {
      return
    }

    setDragOverIndex(index)
  }

  // --------------------------------
  // DROP
  // --------------------------------

  const handleDrop = (
    event: React.DragEvent<HTMLDivElement>,
    index: number
  ) => {
    event.preventDefault()

    if (
      draggedIndex === null ||
      draggedIndex === index
    ) {
      setDraggedIndex(null)
      setDragOverIndex(null)
      return
    }

    moveComponent(
      draggedIndex,
      index
    )

    setDraggedIndex(null)
    setDragOverIndex(null)
  }

  // --------------------------------
  // DRAG END
  // --------------------------------

  const handleDragEnd = () => {
    setDraggedIndex(null)
    setDragOverIndex(null)
  }

  // --------------------------------
  // REMOVE
  // --------------------------------

  const handleRemove = async (
    id: string,
    component: string
  ) => {
    const label =
      getComponentLabel(component)

    const confirmed = window.confirm(
      `Remove ${label} from this page?`
    )

    if (!confirmed) {
      return
    }

    await removeComponent(id)
  }

  // --------------------------------
  // LOADING
  // --------------------------------

  if (loading) {
    return (
      <div className="rounded-lg border border-gray-200 bg-white p-6">
        <div className="flex items-center justify-center py-10">
          <p className="text-sm text-gray-500">
            Loading page builder...
          </p>
        </div>
      </div>
    )
  }

  // --------------------------------
  // RENDER
  // --------------------------------

  return (
    <div className="w-full">
      {/* -------------------------------- */}
      {/* HEADER */}
      {/* -------------------------------- */}

      <div className="mb-6 flex items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">
            Page Builder
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Build and arrange the sections on this page.
          </p>
        </div>

        <button
          type="button"
          onClick={saveLayout}
          disabled={
            saving ||
            components.length === 0
          }
          className="shrink-0 rounded-md bg-black px-5 py-2.5 text-sm font-medium text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {saving
            ? 'Saving...'
            : 'Save Changes'}
        </button>
      </div>

      {/* -------------------------------- */}
      {/* ERROR */}
      {/* -------------------------------- */}

      {error && (
        <div className="mb-5 rounded-md border border-red-200 bg-red-50 px-4 py-3">
          <p className="text-sm text-red-600">
            {error}
          </p>
        </div>
      )}

      {/* -------------------------------- */}
      {/* PAGE */}
      {/* -------------------------------- */}

      <div className="mb-6 rounded-lg border border-gray-200 bg-gray-50 px-5 py-4">
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500">
            Editing page
          </span>

          <span className="rounded bg-white px-2 py-1 text-sm font-semibold uppercase text-gray-900 shadow-sm">
            {page}
          </span>
        </div>
      </div>

      {/* -------------------------------- */}
      {/* BUILDER */}
      {/* -------------------------------- */}

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[280px_minmax(0,1fr)]">

        {/* -------------------------------- */}
        {/* COMPONENT PICKER */}
        {/* -------------------------------- */}

        <div className="lg:sticky lg:top-6 lg:self-start">
          <ComponentPicker
            onAdd={addComponent}
            adding={adding}
          />
        </div>

        {/* -------------------------------- */}
        {/* PAGE LAYOUT */}
        {/* -------------------------------- */}

        <div>
          <div className="mb-3 flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-gray-900">
                Page Layout
              </h3>

              <p className="mt-1 text-xs text-gray-500">
                Drag sections to change their order.
              </p>
            </div>

            <span className="text-xs text-gray-400">
              {components.length}{' '}
              {components.length === 1
                ? 'component'
                : 'components'}
            </span>
          </div>

          {/* -------------------------------- */}
          {/* EMPTY STATE */}
          {/* -------------------------------- */}

          {components.length === 0 ? (
            <div className="rounded-lg border border-dashed border-gray-300 bg-white px-6 py-16 text-center">
              <div className="mx-auto max-w-sm">
                <p className="font-medium text-gray-900">
                  No components yet
                </p>

                <p className="mt-2 text-sm text-gray-500">
                  Choose a component from the
                  panel on the left to start
                  building this page.
                </p>
              </div>
            </div>
          ) : (

            /* -------------------------------- */
            /* COMPONENT LIST */
            /* -------------------------------- */

            <div className="space-y-3">
              {components.map(
                (component, index) => {
                  const isDragging =
                    draggedIndex === index

                  const isDragOver =
                    dragOverIndex === index

                  return (
                    <div
                      key={component.id}
                      draggable
                      onDragStart={() =>
                        handleDragStart(index)
                      }
                      onDragOver={event =>
                        handleDragOver(
                          event,
                          index
                        )
                      }
                      onDrop={event =>
                        handleDrop(
                          event,
                          index
                        )
                      }
                      onDragEnd={
                        handleDragEnd
                      }
                      className={`rounded-lg border bg-white transition ${
                        isDragging
                          ? 'border-gray-400 opacity-50'
                          : 'border-gray-200'
                      } ${
                        isDragOver
                          ? 'border-blue-400 bg-blue-50'
                          : ''
                      }`}
                    >
                      <div className="flex items-center gap-4 px-4 py-4">

                        {/* DRAG HANDLE */}

                        <div
                          className="flex shrink-0 cursor-grab select-none items-center justify-center text-gray-400 active:cursor-grabbing"
                          title="Drag to reorder"
                        >
                          <span className="text-xl leading-none">
                            ⋮⋮
                          </span>
                        </div>

                        {/* POSITION */}

                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gray-100 text-sm font-semibold text-gray-600">
                          {index + 1}
                        </div>

                        {/* INFO */}

                        <div className="min-w-0 flex-1">
                          <p className="font-medium text-gray-900">
                            {getComponentLabel(
                              component.component
                            )}
                          </p>

                          <p className="mt-1 text-xs text-gray-400">
                            {component.component}
                          </p>
                        </div>

                        {/* DATABASE POSITION */}

                        <div className="hidden shrink-0 text-xs text-gray-400 sm:block">
                          Position{' '}
                          {component.position}
                        </div>

                        {/* REMOVE */}

                        <button
                          type="button"
                          onClick={() =>
                            handleRemove(
                              component.id,
                              component.component
                            )
                          }
                          disabled={removing}
                          className="shrink-0 rounded-md px-2.5 py-1.5 text-sm text-gray-400 transition hover:bg-red-50 hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-50"
                          title={`Remove ${getComponentLabel(
                            component.component
                          )}`}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  )
                }
              )}
            </div>
          )}

          {/* -------------------------------- */}
          {/* SAVE BAR */}
          {/* -------------------------------- */}

          {components.length > 0 && (
            <div className="mt-6 flex items-center justify-between rounded-lg border border-gray-200 bg-white px-4 py-3">
              <p className="text-sm text-gray-500">
                {components.length}{' '}
                {components.length === 1
                  ? 'section'
                  : 'sections'}{' '}
                on this page
              </p>

              <button
                type="button"
                onClick={saveLayout}
                disabled={saving}
                className="text-sm font-medium text-gray-700 transition hover:text-black disabled:cursor-not-allowed disabled:opacity-50"
              >
                {saving
                  ? 'Saving...'
                  : 'Save Layout'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}