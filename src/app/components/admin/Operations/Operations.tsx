'use client'
import React, { useState } from 'react'
import { stats } from '@/app/libs/KPI/KPI'
import OperatingHours from './OperatingHours'
import Calendar from './Calendar'
export default function OperationsDashboard() {
  return (
    <div className="space-y-6 p-6">
      {/* KPI */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <div key={i} className="p-4 bg-white border rounded-xl shadow-sm">
            <p className="text-sm text-gray-500">
              {stat.label}
            </p>
            <p className="text-2xl font-bold">
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* ---------- OPERATING HOURS ---------- */}
        <OperatingHours/>
        {/* ---------- CALENDAR ---------- */}
        <Calendar/>
      </div>
    </div>
  )
}