'use client'
import drag from '@/app/hooks/drag'
import React from 'react'
interface Props {
    viewport: 'desktop' | 'tablet' | 'mobile'
    setViewport: (v: 'desktop' | 'tablet' | 'mobile') => void
  }
function EditViewPort({viewport, setViewport}:Props) {
const{dragPosition,handleMouseDown,handleMouseMove,handleMouseUp}=drag()
  return (
    <div style={{
        transform: `translate(${dragPosition.x}px, ${dragPosition.y}px)`,
        cursor: 'grab',
      }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    className="fixed top-4 left-4 z-50 flex gap-2 bg-white p-2 shadow rounded h-[60px]">
    {['desktop', 'tablet', 'mobile'].map(v => (
          <button
            key={v}
            onClick={() => setViewport(v as any)}
            className={`px-3 py-1 rounded ${
              viewport === v ? 'bg-black text-white' : 'bg-gray-200'
            }`}
          >
            {v}
          </button>
        ))}
      </div>
  )
}

export default EditViewPort