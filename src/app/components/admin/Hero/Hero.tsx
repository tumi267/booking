'use client'

import React, { CSSProperties, useEffect, useState } from 'react'
import Loading from '../../Loading/Loading'
interface props{
  location:string
  sectionNum:string
}
function Hero({location,sectionNum}:props) {


  const [url, setUrl] = useState('/images/buddy-an-BVyzjR1AcOI-unsplash.jpg')
  const [text, setText] = useState('')
  const [isLoading,setLoading]=useState(true)

  const [textStyle, setTextStyle] = useState<CSSProperties>({
    color: '',
    fontSize: '',
    fontWeight: '',
    textAlign: 'center',
    lineHeight: '',
    width: '',
  })

  const [textContain, setTextContain] = useState<CSSProperties>({
    position: 'absolute',
    top: 50,
    left: 50,
    transform: 'translate(-50%, -50%)',
  })

  const [heroContainer, setHeroContainer] = useState<CSSProperties>({
    width: '100%',
    maxWidth: '100%',
    height: '650px',
    margin: '0px auto',
    position: 'relative',
    borderRadius: '0px',
    overflow: 'hidden',
  })

  const heroImage: CSSProperties = {
    width: '100%',
    height: '100%',
    objectFit: 'fill',
    display: 'block',
    borderRadius: heroContainer.borderRadius,
  }

  const [showEditor, setShowEditor] = useState(false)

  // Draggable editor
  const [dragPosition, setDragPosition] = useState({ x: 50, y: 50 })
  const [isDragging, setIsDragging] = useState(false)
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 })

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    // Stop drag if clicking input/select
    if ((e.target as HTMLElement).tagName === 'INPUT' || (e.target as HTMLElement).tagName === 'SELECT') return
    setIsDragging(true)
    setDragOffset({ x: e.clientX - dragPosition.x, y: e.clientY - dragPosition.y })
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging) return
    setDragPosition({
      x: e.clientX - dragOffset.x,
      y: e.clientY - dragOffset.y,
    })
  }

  const handleMouseUp = () => setIsDragging(false)

  // Accordion state
  const [openSections, setOpenSections] = useState<{ [key: string]: boolean }>({
    text: true,
    position: true,
    container: true,
    image: true,
  })
  const toggleSection = (section: string) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }))
  }

  const editButtonStyle: CSSProperties = {
    position: 'absolute',
    top: '10px',
    right: '10px',
    padding: '8px 12px',
    background: 'rgba(0,0,0,0.6)',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    zIndex: 10,
  }

  const editorStyle: CSSProperties = {
    position: 'fixed',
    top: dragPosition.y,
    left: dragPosition.x,
    background: 'white',
    padding: '15px',
    border: '1px solid #ccc',
    borderRadius: '8px',
    cursor: isDragging ? 'grabbing' : 'grab',
    zIndex: 1000,
    width: '350px',
    maxHeight: '80vh',
    overflowY: 'auto',
    boxShadow: '0 5px 15px rgba(0,0,0,0.2)',
  }
  const saveButtonStyle: CSSProperties = {
    padding: '8px 12px',
    background: 'rgba(0,0,0,0.6)',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    zIndex: 10,
  }
  const sectionHeaderStyle: CSSProperties = {
    fontWeight: 600,
    marginBottom: '8px',
    cursor: 'pointer',
    background: '#f0f0f0',
    padding: '6px 8px',
    borderRadius: '4px',
  }

  const sectionContentStyle: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    marginBottom: '12px',
  }

  useEffect(()=>{
    const getdata=async()=>{
      const res= await fetch('/api/hero/get', {
        method: 'POST',
        body: JSON.stringify({location,sectionNum}),
      })
      const herodata=await res.json()
      if (!herodata) {
        setLoading(false)
        return
      }
      const {heroContainer,heroImage,text,textContain,textStyle}=herodata
      setHeroContainer(heroContainer)
      setText(text)
      setTextContain(textContain)
      setTextStyle(textStyle)
      setLoading(false)
    }
    getdata()
  },[])

  //save setting
  const handelSave=async()=>{
    const data = {
      text,
      textStyle,
      textContain,
      heroContainer,
      heroImage,
    }
  
   const res= await fetch('/api/hero/upsert', {
    method: 'POST',
    body: JSON.stringify({location,sectionNum,data}),
  })
  const newdata=await res.json()
  console.log(newdata)
  // loading state
    setShowEditor(!showEditor)
  }
  if(isLoading)return <Loading/>
  return (
    <div>
      {/* Hero */}
      <div style={heroContainer}>
        <img src={url} alt="hero" style={heroImage} />

        {/* Edit button top-left */}
        <button style={editButtonStyle} onClick={() => setShowEditor(!showEditor)}>
          {showEditor ? 'Close Editor' : 'Edit'}
        </button>

        <div
          style={{
            position: 'absolute',
            top: `${textContain.top}%`,
            left: `${textContain.left}%`,
            transform: 'translate(-50%, -50%)',
            width: textStyle.width,
            textAlign: textStyle.textAlign as any,
          }}
        >
          <h1 style={textStyle}>{text}</h1>
        </div>
      </div>

      {/* Draggable Editor */}
      {showEditor && (
        <div
          style={editorStyle}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
        >
          <strong>Hero Editor</strong>
          <hr style={{ margin: '8px 0' }} />
          <button style={editButtonStyle} onClick={() => setShowEditor(!showEditor)}>
          {showEditor ? 'Close Editor' : 'Edit'}
        </button>
          {/* Text Section */}
          <div>
            <div style={sectionHeaderStyle} onClick={() => toggleSection('text')}>
              Text Settings {openSections.text ? '▼' : '►'}
            </div>
            {openSections.text && (
              <div style={sectionContentStyle}>
                <label>Text:</label>
                <input
                  type="text"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  style={{ padding: '6px 8px', borderRadius: '6px', border: '1px solid #ccc' }}
                />

                <label>Font Size:</label>
                <input
                  type="range"
                  min={20}
                  max={320}
                  value={parseInt(textStyle.fontSize as string) || 50}
                  onChange={(e) => setTextStyle({ ...textStyle, fontSize: `${e.target.value}px` })}
                  style={{ width: '100%' }}
                />
                <label>Line Height:</label>
                <input
                  type="range"
                  min={0}
                  max={20}
                  step={0.1}
                  value={parseFloat(textStyle.lineHeight as string) || 1.2}
                  onChange={(e) => setTextStyle({ ...textStyle, lineHeight: e.target.value })}
                  style={{ width: '100%' }}
                />
                <label>Font Weight:</label>
                <select
                  value={textStyle.fontWeight as string}
                  onChange={(e) => setTextStyle({ ...textStyle, fontWeight: e.target.value })}
                  style={{ padding: '6px 8px', borderRadius: '6px', border: '1px solid #ccc' }}
                >
                  {Array.from({ length: 9 }, (_, i) => (i + 1) * 100).map((w) => (
                    <option key={w} value={w}>{w}</option>
                  ))}
                </select>

                <label>Text Color:</label>
                <input
                  type="color"
                  value={textStyle.color as string}
                  onChange={(e) => setTextStyle({ ...textStyle, color: e.target.value })}
                  style={{ width: '50px', height: '30px', border: 'none', padding: 0 }}
                />

                <label>Text Align:</label>
                <select value={textStyle.textAlign as string || 'center'}
                  onChange={(e) =>
                  setTextStyle({ ...textStyle, textAlign: e.target.value as CSSProperties['textAlign'] })
                  }
                style={{ padding: '6px 8px', borderRadius: '6px', border: '1px solid #ccc' }}>
                  <option value="left">Left</option>
                  <option value="center">Center</option>
                  <option value="right">Right</option>
                </select>
                <label>Text Width (%):</label>
                <input
                  type="range"
                  min={20}
                  max={100}
                  value={parseInt(textStyle.width as string) || 100}
                  onChange={(e) => setTextStyle({ ...textStyle, width: `${e.target.value}%` })}
                  style={{ width: '100%' }}
                />
              </div>
            )}
          </div>

          {/* Position Section */}
          <div>
            <div style={sectionHeaderStyle} onClick={() => toggleSection('position')}>
              Text Position {openSections.position ? '▼' : '►'}
            </div>
            {openSections.position && (
              <div style={sectionContentStyle}>
                <label>Top (%):</label>
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={textContain.top}
                  onChange={(e) => setTextContain({ ...textContain, top: parseInt(e.target.value) })}
                  style={{ width: '100%' }}
                />
                <label>Left (%):</label>
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={textContain.left}
                  onChange={(e) => setTextContain({ ...textContain, left: parseInt(e.target.value) })}
                  style={{ width: '100%' }}
                />
              </div>
            )}
          </div>

          {/* Container Section */}
          <div>
            <div style={sectionHeaderStyle} onClick={() => toggleSection('container')}>
              Container Settings {openSections.container ? '▼' : '►'}
            </div>
            {openSections.container && (
              <div style={sectionContentStyle}>
                <label>Width (%):</label>
                <input
                  type="range"
                  min={50}
                  max={100}
                  value={parseInt(heroContainer.width as string) || 100}
                  onChange={(e) => setHeroContainer({ ...heroContainer, width: `${e.target.value}%` })}
                  style={{ width: '100%' }}
                />
                <label>Max Width (%):</label>
                <input
                  type="range"
                  min={50}
                  max={100}
                  value={parseInt(heroContainer.maxWidth as string) || 100}
                  onChange={(e) => setHeroContainer({ ...heroContainer, maxWidth: `${e.target.value}%` })}
                  style={{ width: '100%' }}
                />
                <label>Height (px):</label>
                <input
                  type="number"
                  value={parseInt(heroContainer.height as string) || 650}
                  onChange={(e) => setHeroContainer({ ...heroContainer, height: `${e.target.value}px` })}
                  style={{ padding: '6px 8px', borderRadius: '6px', border: '1px solid #ccc' }}
                />
                <label>Border Radius (px):</label>
                <input
                  type="number"
                  value={parseInt(heroContainer.borderRadius as string) || 8}
                  onChange={(e) => setHeroContainer({ ...heroContainer, borderRadius: `${e.target.value}px` })}
                  style={{ padding: '6px 8px', borderRadius: '6px', border: '1px solid #ccc' }}
                />
              </div>
            )}
          </div>

          {/* Image Section */}
          <div>
            <div style={sectionHeaderStyle} onClick={() => toggleSection('image')}>
              Hero Image {openSections.image ? '▼' : '►'}
            </div>
            {openSections.image && (
              <div style={sectionContentStyle}>
                <input
                  type="file"
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      setUrl(URL.createObjectURL(e.target.files[0]))
                    }
                  }}
                  style={{ borderRadius: '6px', border: '1px solid #ccc', padding: '6px' }}
                />
              </div>
            )}
          </div>
          <button style={saveButtonStyle} onClick={() =>{ handelSave()}}>
          save
        </button>
        </div>
      )}
    </div>
  )
}

export default Hero