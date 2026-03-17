'use client'
import React from 'react'

interface PageCardProps {
  name: string
  lastUpdated: string
  isLive: boolean
  onEdit: (name: string) => void
}

function PageCard({ name, lastUpdated, isLive, onEdit }: PageCardProps) {
  return (
    <div className="group bg-white border border-gray-200 rounded-xl p-5 hover:border-blue-500 hover:shadow-md transition-all cursor-pointer" onClick={() => onEdit(name)}>
      <div className="flex justify-between items-start mb-4">
        <div className="p-3 bg-gray-50 rounded-lg group-hover:bg-blue-50 transition">
          {/* Simple Icon placeholder based on page name */}
          <span className="text-xl">
            {name === 'Home' ? '🏠' : name === 'booking' ? '📅' : name === 'contact' ? '📞' : '📖'}
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
    </div>
  )
}

function Pagelayout() {
  const pages = [
    { name: 'Home', updated: '2 hours ago', live: true },
    { name: 'about', updated: 'Yesterday', live: true },
    { name: 'booking', updated: '5 mins ago', live: true },
    { name: 'contact', updated: '3 days ago', live: false }
  ]

  const handleEdit = (pageName: string) => {
    console.log(`Opening Editor for: ${pageName}`)
    // This is where you'd navigate to your dynamic form
  }

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <header className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Website Content</h1>
        <p className="text-gray-500">Select a page to update your images and text.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {pages.map((page, i) => (
          <PageCard 
            key={i} 
            name={page.name} 
            lastUpdated={page.updated} 
            isLive={page.live}
            onEdit={handleEdit}
          />
        ))}
      </div>
    </div>
  )
}

export default Pagelayout
