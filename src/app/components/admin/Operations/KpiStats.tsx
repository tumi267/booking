import React from 'react'

type Stat = {
  label: string
  value: string
}

interface Props {
  stats: Stat[]
}

export default function KpiStats({
  stats,
}: Props) {
    console.log(stats)
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="p-4 bg-white border rounded-xl shadow-sm"
        >
          <p className="text-sm text-gray-500">
            {stat.label}
          </p>

          <p className="text-2xl font-bold">
            {stat.value}
          </p>
        </div>
      ))}
    </div>
  )
}