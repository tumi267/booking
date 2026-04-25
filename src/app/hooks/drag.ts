  'use client'
  import React, { useState } from 'react'
  function drag() {
      // ---------------- DRAG ----------------
    const [dragPosition, setDragPosition] = useState({ x: 50, y: 50 })
    const [isDragging, setIsDragging] = useState(false)
    const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 })

    const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if ((e.target as HTMLElement).tagName === 'INPUT') return

    setIsDragging(true)
    setDragOffset({
      x: e.clientX - dragPosition.x,
      y: e.clientY - dragPosition.y,
    })
    }

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging) return

    setDragPosition({
      x: e.clientX - dragOffset.x,
      y: e.clientY - dragOffset.y,
    })
  }

  const handleMouseUp = () => setIsDragging(false)
    return {
        handleMouseMove,
        handleMouseUp,
        handleMouseDown,
        dragPosition,
        setDragPosition,
        isDragging, 
        setIsDragging,
        dragOffset,
        setDragOffset
    }
  }
  
  export default drag
  
