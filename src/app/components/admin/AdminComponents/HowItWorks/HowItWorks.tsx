'use client'
import Loading from '@/app/components/Loading/Loading';
import React, { CSSProperties, useEffect, useState } from 'react'

type OpenKeys = 'text' | 'container' | 'maincontain'

function HowItWorks({ location, sectionNum }: { location: string; sectionNum: string }) {
  const [imageUrl, setUrl] = useState('/next.svg')
  const [text, setText] = useState('Lorem ipsum dolor sit amet consectetur adipisicing elit')
  const [imageHeight, setImageHeight] = useState('100%')
  const [textWidth, setTextWidth] = useState(100);
  const [containWidth,setContainWidth]=useState(100)
  const [containGap,setContainGap]=useState(30)
  const [isLoading,setLoading]=useState(true)
  const [textStyle, setTextStyle] = useState<CSSProperties>({
    fontSize: '18px',
    color: '#000',
    textAlign: 'left',
    width: `${textWidth}%`,
    lineHeight: '1.4',
  })

  const [containerStyle, setContainerStyle] = useState<CSSProperties>({
    width: '100%',
    maxWidth: '100%',
    margin: '0 auto',
    borderRadius: '0px',
    overflow: 'hidden',
    display: 'grid',
    padding:'0px',
    justifyContent:'center',
    gridTemplateColumns: '1fr 1fr',
    gap: `${containGap}px`,
    alignItems: 'center',
  })

  const imageStyle: CSSProperties = {
    width: '100%',
    height: imageHeight,
    objectFit: 'fill',
    borderRadius: containerStyle.borderRadius,
  }

  const [mainContain, setMainContain] = useState<CSSProperties>({
    marginLeft: 'auto',
    marginRight: 'auto',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '2em',
    marginBottom: '2em',
    width: `${containWidth}%`,
    height: '36vh',
    backgroundColor: 'white',
    position: 'relative',
  })

  const [showEditor, setShowEditor] = useState(false)
  const [dragPosition, setDragPosition] = useState({ x: 50, y: 50 })
  const [isDragging, setIsDragging] = useState(false)
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 })

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if ((e.target as HTMLElement).tagName === 'INPUT' || (e.target as HTMLElement).tagName === 'SELECT') return
    setIsDragging(true)
    setDragOffset({ x: e.clientX - dragPosition.x, y: e.clientY - dragPosition.y })
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging) return
    setDragPosition({ x: e.clientX - dragOffset.x, y: e.clientY - dragOffset.y })
  }

  const handleMouseUp = () => setIsDragging(false)

  const [open, setOpen] = useState({ text: true, container: true, maincontain: true })
  const toggle = (key: OpenKeys) => setOpen((p) => ({ ...p, [key]: !p[key] }))

  const editorStyle: CSSProperties = {
    position: 'fixed',
    top: dragPosition.y,
    left: dragPosition.x,
    width: '350px',
    maxHeight: '80vh',
    overflowY: 'auto',
    background: '#fff',
    border: '1px solid #ccc',
    borderRadius: '8px',
    padding: '12px',
    zIndex: 999,
    cursor: isDragging ? 'grabbing' : 'grab',
    boxShadow: '0 5px 15px rgba(0,0,0,0.2)',
  }

  const header: CSSProperties = {
    background: '#eee',
    padding: '6px',
    borderRadius: '4px',
    cursor: 'pointer',
    fontWeight: 600,
    marginTop: '8px',
  }

  const group: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    marginBottom: '10px',
  }

  const editBtn: CSSProperties = {
    position: 'absolute',
    top: 10,
    left: 10,
    background: 'rgba(0,0,0,0.6)',
    color: '#fff',
    border: 'none',
    padding: '6px 10px',
    borderRadius: '4px',
    cursor: 'pointer',
    zIndex: 5,
  }
  const editBtn2: CSSProperties = {
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
  const saveBtn: CSSProperties = {
    padding: '8px 12px',
    background: 'rgba(0,0,0,0.6)',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    marginTop: '10px',
  }
  useEffect(()=>{
    const getdata=async()=>{
      const res= await fetch('/api/howitworks/get', {
        method: 'POST',
        body: JSON.stringify({location,sectionNum}),
      })
      const howitworksdata=await res.json()
     
      if (!howitworksdata) {
        setLoading(false)
        return
      }
      const {mainContain,imageUrl,text,containerStyle,textStyle,imageHeight}=howitworksdata
      setMainContain(mainContain)
      setUrl(imageUrl)
      setText(text)
      setContainerStyle(containerStyle)
      setTextStyle(textStyle)
      setImageHeight(imageHeight)
      setLoading(false)
    }
    getdata()
  },[])

  const handleSave = async() => {
    const data= {
      text,
      textStyle,
      imageHeight,
      containerStyle,
      mainContain,
      imageUrl,
    }
    const res= await fetch('/api/howitworks/upsert', {
      method: 'POST',
      body: JSON.stringify({location,sectionNum,data}),
    })
    const newdata=await res.json()
    console.log(newdata)
    // call API/db to save here
    setShowEditor(false)
  }
  if(isLoading)return <Loading/>
  return (
    <div style={{ ...mainContain }}>
      <button style={editBtn} onClick={() => setShowEditor(!showEditor)}>
        {showEditor ? 'Close' : 'Edit'}
      </button>

      <div style={containerStyle}>
        <img src={imageUrl} alt="" style={imageStyle} />
        <p style={textStyle}>{text}</p>
      </div>

      {showEditor && (
        <div style={editorStyle} onMouseDown={handleMouseDown} onMouseMove={handleMouseMove} onMouseUp={handleMouseUp}>
          <strong>HowItWorks Editor</strong>
          <button style={editBtn2} onClick={() => setShowEditor(!showEditor)}>
          {showEditor ? 'Close' : 'Edit'}
          </button>
          {/* Text Section */}
          <div style={header} onClick={() => toggle('text')}>
            Text {open.text ? '▼' : '►'}
          </div>
          {open.text && (
            <div style={group}>
              <input value={text} onChange={(e) => setText(e.target.value)} />
              <label>Font size</label>
              <input
                type="range"
                min={12}
                max={40}
                value={parseInt(textStyle.fontSize as string) || 18}
                onChange={(e) => setTextStyle({ ...textStyle, fontSize: e.target.value + 'px' })}
              />
              <label>Line Height</label>
              <input
                type="range"
                min={1}
                max={10}
                step={0.1}
                value={parseFloat(textStyle.lineHeight as string) || 1.4}
                onChange={(e) => setTextStyle({ ...textStyle, lineHeight: e.target.value })}
              />
              <label>Color</label>
              <input
                type="color"
                value={textStyle.color as string}
                onChange={(e) => setTextStyle({ ...textStyle, color: e.target.value })}
              />
              <label>Align</label>
              <select
                value={textStyle.textAlign as string}
                onChange={(e) => setTextStyle({ ...textStyle, textAlign: e.target.value as any })}
              >
                <option value="left">left</option>
                <option value="center">center</option>
                <option value="right">right</option>
              </select>
              <label>Width</label>
              <input
                type="number"
                value={textWidth}
                onChange={(e) => {setTextWidth(parseInt(e.target.value))
                  setTextStyle({ ...textStyle, width: textWidth + '%' })}}
              />
            </div>
          )}

          {/* Image/Container Section */}
          <div style={header} onClick={() => toggle('container')}>
            Image {open.container ? '▼' : '►'}
          </div>
          {open.container && (
            <div style={group}>
              <label>Image Height vh</label>
              <input type="number" value={parseInt(imageHeight) || 100} onChange={(e) => setImageHeight(e.target.value + 'vh')} />
              <label>Width %</label>
              <input
                type="range"
                min={50}
                max={100}
                value={parseInt(containerStyle.width as string) || 100}
                onChange={(e) => setContainerStyle({ ...containerStyle, width: e.target.value + '%' })}
              />
              <label>Max width %</label>
              <input
                type="range"
                min={50}
                max={100}
                value={parseInt(containerStyle.maxWidth as string) || 100}
                onChange={(e) => setContainerStyle({ ...containerStyle, maxWidth: e.target.value + '%' })}
              />
              <label>Radius</label>
              <input
                type="number"
                value={parseInt(containerStyle.borderRadius as string) || 0}
                onChange={(e) => setContainerStyle({ ...containerStyle, borderRadius: e.target.value + 'px' })}
              />
              <label>Choose image</label>
              <input type="file" onChange={(e) => e.target.files?.[0] && setUrl(URL.createObjectURL(e.target.files[0]))} />
            </div>
          )}

          {/* Main Container Section */}
          <div style={header} onClick={() => toggle('maincontain')}>
            Container {open.maincontain ? '▼' : '►'}
          </div>
          {open.maincontain && (
            <div style={group}>
              <label>Height vh</label>
              <input
                type="number"
                value={parseInt(mainContain.height as string) || 36}
                onChange={(e) => setMainContain({ ...mainContain, height: e.target.value + 'vh' })}
              />
              <label>Margin Top</label>
              <input
                type="number"
                value={parseInt(mainContain.marginTop as string) || 2}
                onChange={(e) => setMainContain({ ...mainContain, marginTop: e.target.value + 'em' })}
              />
              <label>Margin Bottom</label>
              <input
                type="number"
                value={parseInt(mainContain.marginBottom as string) || 2}
                onChange={(e) => setMainContain({ ...mainContain, marginBottom: e.target.value + 'em' })}
              />
              <label>Padding</label>
              <input
                type="number"
                value={parseInt(mainContain.padding as string) || 2}
                onChange={(e) => setMainContain({ ...mainContain, padding: e.target.value + 'em' })}
              />
              <label>Background</label>
              <input
                type="color"
                value={mainContain.backgroundColor as string}
                onChange={(e) => setMainContain({ ...mainContain, backgroundColor: e.target.value })}
              />
              <label>Justify</label>
              <select
                value={containerStyle.justifyContent as string}
                onChange={(e) => setContainerStyle({ ...containerStyle, justifyContent: e.target.value })}
              >
                <option value="flex-start">start</option>
                <option value="center">center</option>
                <option value="flex-end">end</option>
                <option value="space-between">space-between</option>
                <option value="space-around">space-around</option>
              </select>
              <label>Align</label>
              <select
                value={mainContain.alignItems as string}
                onChange={(e) => setMainContain({ ...mainContain, alignItems: e.target.value })}
              >
                <option value="flex-start">start</option>
                <option value="center">center</option>
                <option value="flex-end">end</option>
                <option value="stretch">stretch</option>
              </select>
              <label>Width</label>
              <input
                type="number"
                value={containWidth}
                onChange={(e) => {setContainWidth(parseInt(e.target.value))
                  setMainContain({ ...mainContain, width: containWidth + '%' })}}
              />
              <label>Gap</label>
              <input
                type="number"
                value={containGap}
                onChange={(e) => { setContainGap(parseInt(e.target.value))
                  setContainerStyle({ ...containerStyle, gap: containGap  })}}
              />
            </div>
          )}

          <button style={saveBtn} onClick={handleSave}>
            Save
          </button>
        </div>
      )}
    </div>
  )
}

export default HowItWorks