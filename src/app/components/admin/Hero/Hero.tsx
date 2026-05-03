'use client'
import React, { CSSProperties, useState } from 'react'
import Loading from '../../Loading/Loading'
import { useHeroEditor } from '@/app/hooks/useHeroEditor'
import drag from '@/app/hooks/drag'

function Hero({ location, sectionNum ,viewport}: any) {
  const {url,setUrl,preview,setpreview,toggleSection,text,setText,openSections,current,update,showEditor,setShowEditor,isLoading,handleSave} = useHeroEditor(location, sectionNum,viewport)
  const{dragPosition,handleMouseDown,handleMouseMove,handleMouseUp}=drag()
  if (isLoading) return <Loading />

  const sectionHeaderStyle: CSSProperties = {
    fontWeight: 600,
    padding: '8px',
    background: '#f3f3f3',
    cursor: 'pointer',
    borderRadius: '6px',
    marginBottom: '6px',
  }

  const sectionContentStyle: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    marginBottom: '12px',
  }

  const editorStyle: CSSProperties = {
    position: 'fixed',
    top: dragPosition.y,
    left: dragPosition.x,
    background: 'white',
    padding: '15px',
    width: '360px',
    borderRadius: '10px',
    boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
    cursor: 'grab',
    zIndex: 1000,
    maxHeight: '80vh',
    overflowY: 'auto',
  }

  const heroImage: CSSProperties = {
    width: '100%',
    height: '100%',
    objectFit: 'fill',
  }

  const editButtonStyle: CSSProperties = {
    position: 'absolute',
    top: 10,
    right: 10,
    padding: '6px 10px',
    background: 'rgba(0,0,0,0.6)',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    zIndex:999
  }

  return (
    <div>
      {/* HERO */}
      <div style={{ ...current.heroContainer, position: 'relative' }}>
        <img src={preview} style={heroImage} />

        <button
          style={editButtonStyle}
          onClick={() => setShowEditor(!showEditor)}
        >
          {showEditor ? 'Close' : 'Edit'}
        </button>

        <div
          style={{
            position: 'absolute',
            top: `${current.textContain.top}%`,
            left: `${current.textContain.left}%`,
            transform: 'translate(-50%, -50%)',
            width: current.textStyle.width,
            textAlign: current.textStyle.textAlign as any,
          }}
        >
          <h1 style={current.textStyle}>{text}</h1>
        </div>
      </div>

      {/* EDITOR */}
      {showEditor && (
        <div
          style={editorStyle}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
        >
          <strong>Hero Editor</strong>

          <button
          style={editButtonStyle}
          onClick={() => setShowEditor(!showEditor)}
        >
          {showEditor ? 'Close' : 'Edit'}
        </button>

          {/* TEXT SECTION */}
          <div>
            <div
              style={sectionHeaderStyle}
              onClick={() => toggleSection('text')}
            >
              Text Settings {openSections.text ? '▼' : '►'}
            </div>

            {openSections.text && (
              <div style={sectionContentStyle}>
                <label>Text</label>
                <input
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  style={{ padding: 6, border: '1px solid #ccc' }}
                />

                <label>Font Size</label>
                <input
                  type="range"
                  min={10}
                  max={300}
                  value={parseInt(current.textStyle.fontSize as string) || 50}
                  onChange={(e) =>
                    update('textStyle', {
                      fontSize: `${e.target.value}px`,
                    })
                  }
                />

                <label>Line Height</label>
                <input
                  type="range"
                  min={0.5}
                  max={3}
                  step={0.1}
                  value={parseFloat(current.textStyle.lineHeight as string) || 1.2}
                  onChange={(e) =>
                    update('textStyle', {
                      lineHeight: e.target.value,
                    })
                  }
                />

                <label>Font Weight</label>
                <select
                  value={current.textStyle.fontWeight as string}
                  onChange={(e) =>
                    update('textStyle', {
                      fontWeight: e.target.value,
                    })
                  }
                >
                  {[100,200,300,400,500,600,700,800,900].map((w) => (
                    <option key={w} value={w}>{w}</option>
                  ))}
                </select>

                <label>Color</label>
                <input
                  type="color"
                  value={(current.textStyle.color as string) || '#000'}
                  onChange={(e) =>
                    update('textStyle', { color: e.target.value })
                  }
                />

                <label>Align</label>
                <select
                  value={(current.textStyle.textAlign as string) || 'center'}
                  onChange={(e) =>
                    update('textStyle', {
                      textAlign: e.target.value as CSSProperties['textAlign'],
                    })
                  }
                >
                  <option value="left">Left</option>
                  <option value="center">Center</option>
                  <option value="right">Right</option>
                </select>

                <label>Width %</label>
                <input
                  type="range"
                  min={20}
                  max={100}
                  value={parseInt(current.textStyle.width as string) || 100}
                  onChange={(e) =>
                    update('textStyle', {
                      width: `${e.target.value}%`,
                    })
                  }
                />
              </div>
            )}
          </div>

          {/* POSITION */}
          <div>
            <div
              style={sectionHeaderStyle}
              onClick={() => toggleSection('position')}
            >
              Position {openSections.position ? '▼' : '►'}
            </div>

            {openSections.position && (
              <div style={sectionContentStyle}>
                <label>Top</label>
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={current.textContain.top}
                  onChange={(e) =>
                    update('textContain', {
                      top: +e.target.value,
                    })
                  }
                />

                <label>Left</label>
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={current.textContain.left}
                  onChange={(e) =>
                    update('textContain', {
                      left: +e.target.value,
                    })
                  }
                />
              </div>
            )}
          </div>

          {/* CONTAINER */}
          <div>
            <div
              style={sectionHeaderStyle}
              onClick={() => toggleSection('container')}
            >
              Container {openSections.container ? '▼' : '►'}
            </div>

            {openSections.container && (
              <div style={sectionContentStyle}>
                <label>Width</label>
                <input
                  type="range"
                  min={50}
                  max={100}
                  value={parseInt(current.heroContainer.width as string) || 100}
                  onChange={(e) =>
                    update('heroContainer', {
                      width: `${e.target.value}%`,
                    })
                  }
                />

                <label>Max Width</label>
                <input
                  type="range"
                  min={50}
                  max={100}
                  value={parseInt(current.heroContainer.maxWidth as string) || 100}
                  onChange={(e) =>
                    update('heroContainer', {
                      maxWidth: `${e.target.value}%`,
                    })
                  }
                />

                <label>Height</label>
                <input
                  type="number"
                  value={parseInt(current.heroContainer.height as string) || 650}
                  onChange={(e) =>
                    update('heroContainer', {
                      height: `${e.target.value}px`,
                    })
                  }
                />

                <label>Border Radius</label>
                <input
                  type="number"
                  value={parseInt(current.heroContainer.borderRadius as string) || 0}
                  onChange={(e) =>
                    update('heroContainer', {
                      borderRadius: `${e.target.value}px`,
                    })
                  }
                />
              </div>
            )}
          </div>

          {/* IMAGE */}
          <div>
            <div
              style={sectionHeaderStyle}
              onClick={() => toggleSection('image')}
            >
              Image {openSections.image ? '▼' : '►'}
            </div>

            {openSections.image && (
              <div style={sectionContentStyle}>
                <input
                  type="file"
                  onChange={(e) => {
                    if (e.target.files?.[0]) {
                      setUrl(e.target.files?.[0])
                      setpreview(window.URL.createObjectURL(e.target.files?.[0]))
                    }
                  }}
                />
              </div>
            )}
          </div>

          <button
            onClick={handleSave}
            style={{
              width: '100%',
              padding: 10,
              marginTop: 10,
              background: '#000',
              color: '#fff',
            }}
          >
            Save
          </button>
        </div>
      )}
    </div>
  )
}

export default Hero