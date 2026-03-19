'use client'
import React, { CSSProperties, useState } from 'react'
type OpenKeys = 'text' | 'container' | 'maincontain';
function HowItWorks() {

  const [url, setUrl] = useState('/next.svg')

  const [text, setText] = useState(
    'Lorem ipsum dolor sit amet consectetur adipisicing elit'
  )

  const [imageHeight, setImageHeight] = useState('100%')

  const [textStyle, setTextStyle] = useState<CSSProperties>({
    fontSize: '18px',
    color: '#000',
    textAlign: 'left',
    width: '100%',
    lineHeight: '1.4',
  })

  const [containerStyle, setContainerStyle] = useState<CSSProperties>({
    width: '100%',
    maxWidth: '100%',
    margin: '0 auto',
    borderRadius: '0px',
    overflow: 'hidden',
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '20px',
    alignItems: 'center',
    
  })

  const imageStyle: CSSProperties = {
    width: '100%',
    height: imageHeight,
    objectFit: 'cover',
    borderRadius: containerStyle.borderRadius,
  }

  const [showEditor, setShowEditor] = useState(false)

  // drag editor
  const [dragPosition, setDragPosition] = useState({ x: 50, y: 50 })
  const [isDragging, setIsDragging] = useState(false)
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 })

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (
      (e.target as HTMLElement).tagName === 'INPUT' ||
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

  const [open, setOpen] = useState({
    text: true,
    container: true,
    maincontain: true,
  })

  const toggle = (key: OpenKeys) =>
    setOpen((p) => ({ ...p, [key]: !p[key] }))

  const editorStyle: CSSProperties = {
    position: 'fixed',
    top: dragPosition.y,
    left: dragPosition.x,
    width: '340px',
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

  const [maincontain, setMainContain] = useState<CSSProperties>({
    marginLeft: 'auto',
    marginRight: 'auto',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '2em',
    marginBottom: '2em',
    width: '100%',
    height: '36vh',
    backgroundColor: 'white',
    position: 'relative',
  })

  return (
    <div style={{ ...maincontain }}>

      <button
        style={editBtn}
        onClick={() => setShowEditor(!showEditor)}
      >
        {showEditor ? 'Close' : 'Edit'}
      </button>

      <div>

        <div style={containerStyle}>

          <img
            src={url}
            alt=""
            style={imageStyle}
          />

          <p style={textStyle}>
            {text}
          </p>

        </div>
      </div>


      {showEditor && (
        <div
          style={editorStyle}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
        >

          <strong>HowItWorks Editor</strong>


          {/* TEXT */}

          <div style={header} onClick={() => toggle('text')}>
            Text {open.text ? '▼' : '►'}
          </div>

          {open.text && (
            <div style={group}>

              <input
                value={text}
                onChange={(e) => setText(e.target.value)}
              />

              <label>Font size</label>
              <input
                type="range"
                min={12}
                max={40}
                value={parseInt(textStyle.fontSize as string) || 18}
                onChange={(e) =>
                  setTextStyle({
                    ...textStyle,
                    fontSize: e.target.value + 'px',
                  })
                }
              />

              <label>Line Height</label>
              <input
                type="range"
                min={1}
                max={10}
                step={0.1}
                value={parseFloat(textStyle.lineHeight as string) || 1.4}
                onChange={(e) =>
                  setTextStyle({
                    ...textStyle,
                    lineHeight: e.target.value,
                  })
                }
              />

              <label>Color</label>
              <input
                type="color"
                value={textStyle.color as string}
                onChange={(e) =>
                  setTextStyle({
                    ...textStyle,
                    color: e.target.value,
                  })
                }
              />

              <label>Align</label>
              <select
                value={textStyle.textAlign as string}
                onChange={(e) =>
                  setTextStyle({
                    ...textStyle,
                    textAlign: e.target.value as any,
                  })
                }
              >
                <option value="left">left</option>
                <option value="center">center</option>
                <option value="right">right</option>
              </select>

            </div>
          )}


          {/* IMAGE / CONTAINER */}

          <div style={header} onClick={() => toggle('container')}>
            Image {open.container ? '▼' : '►'}
          </div>

          {open.container && (
            <div style={group}>

              <label>Image Height vh</label>
              <input
                type="number"
                value={parseInt(imageHeight) || 100}
                onChange={(e) =>
                  setImageHeight(e.target.value + 'vh')
                }
              />

              <label>Width %</label>
              <input
                type="range"
                min={50}
                max={100}
                value={parseInt(containerStyle.width as string) || 100}
                onChange={(e) =>
                  setContainerStyle({
                    ...containerStyle,
                    width: e.target.value + '%',
                  })
                }
              />

              <label>Max width %</label>
              <input
                type="range"
                min={50}
                max={100}
                value={parseInt(containerStyle.maxWidth as string) || 100}
                onChange={(e) =>
                  setContainerStyle({
                    ...containerStyle,
                    maxWidth: e.target.value + '%',
                  })
                }
              />

              <label>Radius</label>
              <input
                type="number"
                value={parseInt(containerStyle.borderRadius as string) || 0}
                onChange={(e) =>
                  setContainerStyle({
                    ...containerStyle,
                    borderRadius: e.target.value + 'px',
                  })
                }
              />

              <label>Choose image</label>
              <input
                type="file"
                onChange={(e) => {
                  if (e.target.files?.[0]) {
                    setUrl(
                      URL.createObjectURL(
                        e.target.files[0]
                      )
                    )
                  }
                }}
              />

            </div>
          )}


          {/* MAIN CONTAINER */}

          <div style={header} onClick={() => toggle('maincontain')}>
            container {open.maincontain ? '▼' : '►'}
          </div>

          {open.maincontain && (
            <div style={group}>

              <label>Height vh</label>
              <input
                type="number"
                value={parseInt(maincontain.height as string) || 36}
                onChange={(e) =>
                  setMainContain({
                    ...maincontain,
                    height: e.target.value + 'vh',
                  })
                }
              />

              <label>Margin Top</label>
              <input
                type="number"
                value={parseInt(maincontain.marginTop as string) || 2}
                onChange={(e) =>
                  setMainContain({
                    ...maincontain,
                    marginTop: e.target.value + 'em',
                  })
                }
              />

              <label>Margin Bottom</label>
              <input
                type="number"
                value={parseInt(maincontain.marginBottom as string) || 2}
                onChange={(e) =>
                  setMainContain({
                    ...maincontain,
                    marginBottom: e.target.value + 'em',
                  })
                }
              />

              <label>Background</label>
              <input
                type="color"
                value={maincontain.backgroundColor as string}
                onChange={(e) =>
                  setMainContain({
                    ...maincontain,
                    backgroundColor: e.target.value,
                  })
                }
              />

              <label>Justify</label>
              <select
                value={maincontain.justifyContent as string}
                onChange={(e) =>
                  setMainContain({
                    ...maincontain,
                    justifyContent: e.target.value,
                  })
                }
              >
                <option value="flex-start">start</option>
                <option value="center">center</option>
                <option value="flex-end">end</option>
                <option value="space-between">space-between</option>
                <option value="space-around">space-around</option>
              </select>

              <label>Align</label>
              <select
                value={maincontain.alignItems as string}
                onChange={(e) =>
                  setMainContain({
                    ...maincontain,
                    alignItems: e.target.value,
                  })
                }
              >
                <option value="flex-start">start</option>
                <option value="center">center</option>
                <option value="flex-end">end</option>
                <option value="stretch">stretch</option>
              </select>

            </div>
          )}

        </div>
      )}

    </div>
  )
}

export default HowItWorks