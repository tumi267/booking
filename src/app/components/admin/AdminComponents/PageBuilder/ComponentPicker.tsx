'use client'

import {
  PAGE_BUILDER_COMPONENTS,
} from './componentRegistry'

type ComponentPickerProps = {
  onAdd: (component: string) => void
  adding: boolean
}

export default function ComponentPicker({
  onAdd,
  adding,
}: ComponentPickerProps) {
  return (
    <div className="rounded-lg border border-gray-200 bg-white">
      <div className="border-b border-gray-200 px-5 py-4">
        <h3 className="font-semibold text-gray-900">
          Components
        </h3>

        <p className="mt-1 text-xs text-gray-500">
          Add components to this page.
        </p>
      </div>

      <div className="space-y-2 p-3">
        {PAGE_BUILDER_COMPONENTS.map(component => (
          <button
            key={component.type}
            type="button"
            disabled={adding}
            onClick={() =>
              onAdd(component.type)
            }
            className="w-full rounded-md border border-gray-200 bg-white px-4 py-3 text-left transition hover:border-gray-400 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <div className="flex items-center justify-between gap-3">
              <div className="min-w-0">
                <p className="text-sm font-medium text-gray-900">
                  {component.label}
                </p>

                <p className="mt-1 text-xs text-gray-500">
                  {component.description}
                </p>
              </div>

              <span className="shrink-0 text-lg text-gray-400">
                +
              </span>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}