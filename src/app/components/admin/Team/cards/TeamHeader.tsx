type Props = {
    onAdd: () => void
    user:string
  }
  
  export function TeamHeader({ onAdd ,user}: Props) {
    return (
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold">Team Members</h2>
          <p className="text-sm text-gray-500">
            Manage your staff and provider availability.
          </p>
        </div>
  
        {(user==='ADMIN'||user==='MANAGER')&&<button
          onClick={onAdd}
          className="rounded-lg bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700"
        >
          + Add Staff
        </button>}
      </div>
    )
  }