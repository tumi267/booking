import { Service } from '@/app/libs/service/types'

type Props = {
  services: Service[]
  onEdit: (id: string) => void
  onRemove: (id: string) => void
}

export function ServiceGrid({ services, onEdit, onRemove }: Props) {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {services.map((service) => {
        const id = service.id || service.tempId

        return (
          <div
            key={id}
            className={`rounded-xl border p-4 ${
              service.isActive ? 'bg-white' : 'bg-gray-50 opacity-60'
            }`}
          >
            <div className="mb-3 flex items-start justify-between">
              <h3 className="text-lg font-bold">{service.name}</h3>

              <span
                className={`rounded-full px-2 py-1 text-xs font-bold ${
                  service.isActive
                    ? 'bg-green-100 text-green-700'
                    : 'bg-gray-200 text-gray-600'
                }`}
              >
                {service.isActive ? 'ACTIVE' : 'ARCHIVED'}
              </span>
            </div>

            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">Rate</span>
                <span className="font-semibold text-blue-600">
                  R{service.price}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-500">Duration</span>
                <span className="font-semibold">{service.duration} min</span>
              </div>

              <p className="text-gray-500">
                {service.description || 'No description'}
              </p>

              <div className="flex justify-between">
                <span className="text-gray-500">Assigned Team</span>
                <span className="font-semibold">
                  {service.assignedTeam.length
                    ? service.assignedTeam.map((t) => t.firstName).join(', ')
                    : 'None'}
                </span>
              </div>
            </div>

            <div className="mt-4 flex gap-2">
              <button
                onClick={() => onEdit(id)}
                className="flex-1 rounded border py-2 text-sm hover:bg-gray-50"
              >
                Edit
              </button>

              <button
                onClick={() => onRemove(id)}
                className="flex-1 rounded bg-red-600 py-2 text-sm text-white hover:bg-red-700"
              >
                Remove
              </button>
            </div>
          </div>
        )
      })}
    </div>
  )
}