import { TeamMember } from '@/app/libs/team/types'

type Props = {
  team: TeamMember[]
  onEdit: (id: string) => void
  onRemove: (id: string) => void
}

export function TeamTable({ team, onEdit, onRemove }: Props) {
  return (
    <div className="overflow-hidden rounded-xl border">
      <table className="w-full border-collapse text-left">
        <thead className="bg-gray-50 text-sm text-gray-500">
          <tr>
            <th className="px-4 py-3 font-medium">Name</th>
            <th className="px-4 py-3 font-medium">Role</th>
            <th className="px-4 py-3 font-medium">Status</th>
            <th className="px-4 py-3 text-right font-medium">Actions</th>
          </tr>
        </thead>

        <tbody className="divide-y">
          {team.map((member) => {
            const id = member.id || member.tempId

            return (
              <tr key={id} className="hover:bg-gray-50">
                <td className="px-4 py-4">
                  <div className="font-semibold">
                    {member.firstName} {member.lastName}
                  </div>
                  <div className="text-xs text-gray-400">{member.email}</div>
                </td>

                <td className="px-4 py-4">
                  <span className="rounded bg-gray-100 px-2 py-1 text-sm capitalize">
                    {member.role.toLowerCase().replaceAll('_', ' ')}
                  </span>
                </td>

                <td className="px-4 py-4 text-sm">
                  <span
                    className={`mr-2 inline-block h-2 w-2 rounded-full ${
                      member.isAvailable ? 'bg-green-500' : 'bg-red-500'
                    }`}
                  />
                  {member.isAvailable ? 'Active' : 'On Leave'}
                </td>

                <td className="px-4 py-4 text-right">
                  <div className="space-x-3">
                    <button
                      onClick={() => onEdit(id)}
                      className="text-sm font-medium text-blue-600 hover:underline"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => onRemove(id)}
                      className="text-sm font-medium text-red-600 hover:underline"
                    >
                      Remove
                    </button>
                  </div>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
