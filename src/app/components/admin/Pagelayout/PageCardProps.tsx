'use client'
import Link from 'next/link'
import React from 'react'

interface PageCardProps {
  name: string
  lastUpdated: string
  isLive: boolean

}
export function PageCard({ name, lastUpdated, isLive, }: PageCardProps) {
  return (
    <Link href={`/admin/PageLayout/${name}`}><div className="group bg-white border border-gray-200 rounded-xl p-5 hover:border-blue-500 hover:shadow-md transition-all cursor-pointer" >
      <div className="flex justify-between items-start mb-4">
        <div className="p-3 bg-gray-50 rounded-lg group-hover:bg-blue-50 transition">
          {/* Simple Icon placeholder based on page name */}
          <span className="text-xl">
            {name === 'Home' ? '🏠' : name === 'contact' ? '📞' : '📖'}
          </span>
        </div>
        <span className={`text-[10px] font-bold px-2 py-1 rounded-full ${isLive ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
          {isLive ? 'LIVE ON SITE' : 'DRAFT'}
        </span>
      </div>

      <h3 className="text-lg font-bold capitalize text-gray-900">{name} Page</h3>
      <p className="text-xs text-gray-400 mt-1">Last edited: {lastUpdated}</p>
      
      <div className="mt-6 flex items-center text-sm font-semibold text-blue-600 group-hover:gap-2 transition-all">
        Edit Content <span>→</span>
      </div>
    </div></Link>
  )
}