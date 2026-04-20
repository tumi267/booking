export function ServiceHeader({ onAdd }: { onAdd: () => void }) {
    return (
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold">Services & Pricing</h2>
          <p className="text-sm text-gray-500">
            Manage your offerings, pricing, duration, and assignments.
          </p>
        </div>
  
        <button
          onClick={onAdd}
          className="rounded-lg bg-green-600 px-4 py-2 text-white hover:bg-green-700"
        >
          + New Service
        </button>
      </div>
    )
  }