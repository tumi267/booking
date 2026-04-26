'use client'
import Loading from '@/app/components/Loading/Loading'
import React, { CSSProperties, useEffect, useState } from 'react'

type Feature = {
  id: string
  title: string
  text: string
  image: string
  fontSize?: string
  fontColor?: string
  imageWidth?: string
  imageHeight?: string
}

function FeaturesSection({location,sectionNum,}:{location: string
  sectionNum: string}) {
  const [features, setFeatures] = useState<Feature[]>([])
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [showEditor, setShowEditor] = useState(false)
  const [isLoading,setLoading]=useState(true)
  // SECTION STYLE
  const [sectionStyle, setSectionStyle] = useState<CSSProperties>({
    position:'relative',
    marginTop: '40px',
    marginBottom: '40px',
  })

  // GRID
  const [columns, setColumns] = useState(4)
  const [gridStyle, setGridStyle] = useState<CSSProperties>({
    display: 'flex',
    flexWrap: 'wrap',
    gap: '20px',
    justifyContent: 'center',
    alignItems: 'stretch',
    maxWidth: '1200px',
    margin: '0 auto',
  })

  // CARD
  const [cardWidth, setCardWidth] = useState<number | null>(null)
  const [cardStyle, setCardStyle] = useState<CSSProperties>({
    background: '#ffffff',
    borderRadius: '8px',
    padding: '10px',
    textAlign: 'left',
  })

  // TEXT
  const [textStyle, setTextStyle] = useState<CSSProperties>({
    color: '#000',
    fontSize: '16px',
    textAlign: 'left',
  })

  // IMAGE
  const [imageStyle, setImageStyle] = useState<CSSProperties>({
    width: '100%',
    height: '160px',
    objectFit: 'fill',
  })

  // DRAG EDITOR
  const [dragPosition, setDragPosition] = useState({ x: 600, y: 50 })
  const [isDragging, setIsDragging] = useState(false)
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 })

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (
      (e.target as HTMLElement).tagName === 'INPUT' ||
      (e.target as HTMLElement).tagName === 'TEXTAREA' ||
      (e.target as HTMLElement).tagName === 'SELECT'
    )
      return
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

  // CRUD
  const addFeature = () => {
    const newFeature: Feature = {
      id: crypto.randomUUID(),
      title: 'title',
      text: 'text',
      image: '/next.svg',
      fontSize: '16px',
      fontColor: '#000000',
      imageWidth: '100%',
      imageHeight: '160px',
    }
    setFeatures((p) => [...p, newFeature])
  }
  const removeFeature = (id: string) => {
    setFeatures((p) => p.filter((f) => f.id !== id))
    setSelectedId(null)
  }
  const updateFeature = (id: string, key: keyof Feature, value: string) => {
    setFeatures((prev) =>
      prev.map((f) => (f.id === id ? { ...f, [key]: value } : f))
    )
  }
  const selected = features.find((f) => f.id === selectedId)

  // EDITOR STYLES
  const editorBox: CSSProperties = {
    position: 'fixed',
    top: dragPosition.y,
    left: dragPosition.x,
    width: 340,
    maxHeight: '80vh',
    overflowY: 'auto',
    background: '#ffffff',
    padding: 14,
    border: '1px solid #ccc',
  
    zIndex: 999,
    cursor: isDragging ? 'grabbing' : 'grab',
    boxShadow: '0 6px 18px rgba(0,0,0,0.2)',
    fontFamily: 'sans-serif',
  }
  const labelStyle: CSSProperties = { fontSize: 12, marginTop: 8, display: 'block' }
  const titleStyle: CSSProperties = { fontWeight: 600, marginTop: 12, marginBottom: 4 }
  const inputStyle: CSSProperties = { width: '100%', padding: '4px', marginBottom: '4px' }
  const editBtn2: CSSProperties = {    position: 'absolute',
    top: 10,
    right: 10,
    background: 'rgba(0,0,0,0.6)',
    color: '#fff',
    border: 'none',
    padding: '6px 10px',
    borderRadius: '4px',
    cursor: 'pointer',
    zIndex: 5,}
    const editBtn: CSSProperties = {
      position: 'absolute',
      top: 10,
      right: 10,
      background: 'rgba(0,0,0,0.6)',
      color: '#fff',
      border: 'none',
      padding: '6px 10px',
      borderRadius: '4px',
      cursor: 'pointer',
      zIndex: 5,
    }
  const computedCardWidth = cardWidth !== null ? cardWidth : 100 / columns
  useEffect(()=>{
    const getdata=async()=>{
      const res= await fetch('/api/features/get', {
        method: 'POST',
        body: JSON.stringify({location,sectionNum}),
      })
      const featuredata=await res.json()
      
      if (!featuredata) {
        setLoading(false)
        return
      }
      const {cardStyle,cardWidth,columns,features,gridStyle,imageStyle,sectionStyle,textStyle}=featuredata
      setCardStyle(cardStyle)
      setCardWidth(cardWidth)
      setColumns(columns)
      setFeatures(features)
      setGridStyle(gridStyle)
      setImageStyle(imageStyle)
      setSectionStyle(sectionStyle)
      setTextStyle(textStyle)
      setLoading(false)
    }
    getdata()
  },[])
  const handleSave = async() => {
    const data = {
      location,
      sectionNum,
  
      features,
  
      sectionStyle,
      gridStyle,
      columns,
  
      cardStyle,
      cardWidth,
  
      textStyle,
      imageStyle,
    }
  
    const res= await fetch('/api/features/upsert', {
      method: 'POST',
      body: JSON.stringify({location,sectionNum,data}),
    })
    const newdata=await res.json()
    console.log(newdata)
  
    //remove has bug
  
    setShowEditor(false)
  }
  if(isLoading)return <Loading/>
  return (
    <div style={sectionStyle}>
      <button style={editBtn} onClick={() => setShowEditor(!showEditor)}>
        {showEditor ? 'Close' : 'Edit'}
      </button>

      {/* GRID */}
      <div style={gridStyle}>
        {features.map((f) => (
          <div
            key={f.id}
            style={{
              ...cardStyle,
              width: computedCardWidth + '%',
              cursor: showEditor ? 'pointer' : 'default',
            }}
            onClick={() => showEditor && setSelectedId(f.id)}
          >
            <img
              src={f.image}
              style={{
                width: f.imageWidth || '100%',
                height: f.imageHeight || '160px',
                objectFit: 'fill',
              }}
            />
            <div
              style={{
                color: f.fontColor || textStyle.color,
                fontSize: f.fontSize || textStyle.fontSize,
                textAlign: textStyle.textAlign,
              }}
            >
              <h3>{f.title}</h3>
              <p>{f.text}</p>
            </div>
          </div>
        ))}
      </div>

      {/* EDITOR */}
      {showEditor && (
        <div
          style={editorBox}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
        >
          <strong>Feature Editor</strong>
          <button style={editBtn2} onClick={() => setShowEditor(!showEditor)}>
        {showEditor ? 'Close' : 'Edit'}
      </button>
      <div>
      <button onClick={addFeature}>Add Feature</button>
      </div>
          {/* SECTION */}
          <div style={titleStyle}>Section</div>
          <label style={labelStyle}>Margin Top</label>
          <input
            style={inputStyle}
            type="number"
            value={parseInt(sectionStyle.marginTop as string) || 40}
            onChange={(e) =>
              setSectionStyle({ ...sectionStyle, marginTop: e.target.value + 'px' })
            }
          />
          <label style={labelStyle}>Margin Bottom</label>
          <input
            style={inputStyle}
            type="number"
            value={parseInt(sectionStyle.marginBottom as string) || 40}
            onChange={(e) =>
              setSectionStyle({ ...sectionStyle, marginBottom: e.target.value + 'px' })
            }
          />

          {/* GRID */}
          <div style={titleStyle}>Grid</div>
          <label style={labelStyle}>Columns</label>
          <input
            style={inputStyle}
            type="number"
            min={1}
            max={6}
            value={columns}
            onChange={(e) => setColumns(parseInt(e.target.value))}
          />
          <label style={labelStyle}>Gap</label>
          <input
            style={inputStyle}
            type="number"
            value={parseInt(gridStyle.gap as string) || 20}
            onChange={(e) => setGridStyle({ ...gridStyle, gap: e.target.value + 'px' })}
          />
          <label style={labelStyle}>Justify</label>
          <select
            style={inputStyle}
            value={gridStyle.justifyContent as string}
            onChange={(e) =>
              setGridStyle({ ...gridStyle, justifyContent: e.target.value })
            }
          >
            <option value="flex-start">left</option>
            <option value="center">center</option>
            <option value="flex-end">right</option>
            <option value="space-between">space-between</option>
            <option value="space-around">space-around</option>
          </select>

          {/* CARD GLOBAL */}
          <div style={titleStyle}>Card (Global)</div>
          <label style={labelStyle}>Card size </label>
          <input
            style={inputStyle}
            type="number"
            min={10}
            max={100}
            value={cardWidth ?? ''}
            onChange={(e) => setCardWidth(e.target.value === '' ? null : parseInt(e.target.value))}
          />
          <label style={labelStyle}>Radius</label>
          <input
            style={inputStyle}
            type="number"
            value={parseInt(cardStyle.borderRadius as string) || 0}
            onChange={(e) =>
              setCardStyle({ ...cardStyle, borderRadius: e.target.value + 'px' })
            }
          />
          <label style={labelStyle}>Back Ground</label>
          <input
            style={inputStyle}
            type="color"
            value={cardStyle.background as string}
            onChange={(e) => setCardStyle({ ...cardStyle, background: e.target.value })}
          />

          {/* SELECTED CARD */}
          {selected && (
            <>
              <div style={titleStyle}>Edit Selected Card</div>
              <label style={labelStyle}>Title</label>
              <input
                style={inputStyle}
                type="text"
                value={selected.title}
                onChange={(e) => updateFeature(selected.id, 'title', e.target.value)}
              />
              <label style={labelStyle}>Text</label>
              <textarea
                style={{ ...inputStyle, height: '60px' }}
                value={selected.text}
                onChange={(e) => updateFeature(selected.id, 'text', e.target.value)}
              />

              {/* NEW FONT / IMAGE OPTIONS */}
              <label style={labelStyle}>Font Size (px)</label>
              <input
                style={inputStyle}
                type="number"
                value={parseInt(selected.fontSize || '16')}
                onChange={(e) => updateFeature(selected.id, 'fontSize', e.target.value + 'px')}
              />
              <label style={labelStyle}>Font Color</label>
              <input
                style={inputStyle}
                type="color"
                value={selected.fontColor || '#000000'}
                onChange={(e) => updateFeature(selected.id, 'fontColor', e.target.value)}
              />
              <label style={labelStyle}>Image Width (%)</label>
              <input
                style={inputStyle}
                type="number"
                value={parseInt(selected.imageWidth || '100')}
                onChange={(e) => updateFeature(selected.id, 'imageWidth', e.target.value + '%')}
              />
              <label style={labelStyle}>Image Height (px)</label>
              <input
                style={inputStyle}
                type="number"
                value={parseInt(selected.imageHeight || '160')}
                onChange={(e) => updateFeature(selected.id, 'imageHeight', e.target.value + 'px')}
              />

              <label style={labelStyle}>Image</label>
              <input
                style={inputStyle}
                type="file"
                onChange={(e) => {
                  if (e.target.files?.[0]) {
                    updateFeature(selected.id, 'image', URL.createObjectURL(e.target.files[0]))
                  }
                }}
              />
              <button style={{ marginTop: 6 }} onClick={() => removeFeature(selected.id)}>
                Remove Card
              </button>
            </>
          )}
          <button
            style={{
            marginTop: 10,
            padding: "8px",
            background: "black",
            color: "white",
            border: "none",
            cursor: "pointer",
          }}
          onClick={handleSave}
          >
          Save
          </button>
        </div>
      )}
    </div>
  )
}

export default FeaturesSection