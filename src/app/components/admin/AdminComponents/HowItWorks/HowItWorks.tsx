'use client'

import Loading from '@/app/components/Loading/Loading'
import drag from '@/app/hooks/drag'
import { useHowItWorksEditor } from '@/app/hooks/useHowItWorksEdtior'
import { CSSProperties } from 'react'

function HowItWorks({
  location,
  sectionNum,
  viewport,
}: {
  location: string
  sectionNum: string
  viewport: 'desktop' | 'tablet' | 'mobile'
}) {
  const {
    text,
    setText,
    imageUrl,
    setImageUrl,
    current,
    update,
    showEditor,
    setShowEditor,
    open,
    toggle,
    isLoading,
    handleSave,
  } = useHowItWorksEditor(location, sectionNum, viewport)

  const {
    dragPosition,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
  } = drag()

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
    boxShadow: '0 5px 15px rgba(0,0,0,0.2)',
    cursor: 'grab',
  }

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

  const saveBtn: CSSProperties = {
    padding: '8px 12px',
    background: '#000',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    marginTop: '10px',
  }

  if (isLoading) return <Loading />

  return (
    <div style={{ ...current.mainContain, position: 'relative'}}>
      {/* EDIT BUTTON */}
      <button style={editBtn} onClick={() => setShowEditor(!showEditor)}>
        {showEditor ? 'Close' : 'Edit'}
      </button>
      {/* PREVIEW */}
      <div style={current.containerStyle}>
        <img
          src={imageUrl}
          alt=""
          style={{
            width: '100%',
            height: current.imageHeight || '100%',
            objectFit: 'fill',
            borderRadius: current.containerStyle?.borderRadius,
          }}
        />
        <p style={current.textStyle}>{text}</p>
      </div>
      {/* EDITOR */}
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
              <label>Font Size</label>
              <input
                type="range"
                min={12}
                max={100}
                value={parseInt(current.textStyle.fontSize as string) || 18}
                onChange={(e) =>
                  update('textStyle', {
                    fontSize: e.target.value + 'px',
                  })
                }
              />
              <label>Line Height</label>
              <input
                type="range"
                min={1}
                max={3}
                step={0.1}
                value={
                  parseFloat(current.textStyle.lineHeight as string) || 1.4
                }
                onChange={(e) =>
                  update('textStyle', {
                    lineHeight: e.target.value,
                  })
                }
              />
              <label>Color</label>
              <input
                type="color"
                value={
                  (current.textStyle.color as string) || '#000000'
                }
                onChange={(e) =>
                  update('textStyle', {
                    color: e.target.value,
                  })
                }
              />
              <label>Align</label>
              <select
                value={
                  (current.textStyle.textAlign as string) || 'left'
                }
                onChange={(e) =>
                  update('textStyle', {
                    textAlign: e.target.value as any,
                  })
                }
              >
                <option value="left">left</option>
                <option value="center">center</option>
                <option value="right">right</option>
              </select>
              <label>Width %</label>
              <input
                type="range"
                min={20}
                max={100}
                value={
                  parseInt(current.textStyle.width as string) || 100
                }
                onChange={(e) =>
                  update('textStyle', {
                    width: e.target.value + '%',
                  })
                }
              />
            </div>
          )}
          {/* IMAGE  */}

<div style={header} onClick={() => toggle('container')}>
  Image {open.container ? '▼' : '►'}
</div>

{open.container && (
  <div style={group}>
    <label>Image Height (vh)</label>
    <input
      type="number"
      value={parseInt(current.imageHeight as string) || 100}
      onChange={(e) =>
        update('imageHeight', e.target.value + 'vh')
      }
    />

    <label>Width %</label>
    <input
      type="range"
      min={50}
      max={100}
      value={parseInt(current.containerStyle.width as string) || 100}
      onChange={(e) =>
        update('containerStyle', {
          width: e.target.value + '%',
        })
      }
    />

    <label>Max Width %</label>
    <input
      type="range"
      min={50}
      max={100}
      value={parseInt(current.containerStyle.maxWidth as string) || 100}
      onChange={(e) =>
        update('containerStyle', {
          maxWidth: e.target.value + '%',
        })
      }
    />

    <label>Border Radius</label>
    <input
      type="number"
      value={
        parseInt(current.containerStyle.borderRadius as string) || 0
      }
      onChange={(e) =>
        update('containerStyle', {
          borderRadius: e.target.value + 'px',
        })
      }
    />

    <label>Choose image</label>
    <input
      type="file"
      onChange={(e) =>
        e.target.files?.[0] &&
        setImageUrl(URL.createObjectURL(e.target.files[0]))
      }
    />
  </div>
)}
          {/* MAIN CONTAINER */}
          <div style={header} onClick={() => toggle('maincontain')}>
  Container {open.maincontain ? '▼' : '►'}
</div>

{open.maincontain && (
  <div style={group}>
    <label>Height (vh)</label>
    <input
      type="number"
      value={parseInt(current.mainContain.height as string) || 36}
      onChange={(e) =>
        update('mainContain', {
          height: e.target.value + 'vh',
        })
      }
    />

    <label>Margin Top</label>
    <input
      type="number"
      value={parseInt(current.mainContain.marginTop as string) || 2}
      onChange={(e) =>
        update('mainContain', {
          marginTop: e.target.value + 'em',
        })
      }
    />

    <label>Margin Bottom</label>
    <input
      type="number"
      value={parseInt(current.mainContain.marginBottom as string) || 2}
      onChange={(e) =>
        update('mainContain', {
          marginBottom: e.target.value + 'em',
        })
      }
    />

    <label>Padding</label>
    <input
      type="number"
      value={parseInt(current.mainContain.padding as string) || 2}
      onChange={(e) =>
        update('mainContain', {
          padding: e.target.value + 'em',
        })
      }
    />

    <label>Background</label>
    <input
      type="color"
      value={
        (current.mainContain.backgroundColor as string) || '#ffffff'
      }
      onChange={(e) =>
        update('mainContain', {
          backgroundColor: e.target.value,
        })
      }
    />

    <label>Align Items</label>
    <select
      value={(current.mainContain.alignItems as string) || 'center'}
      onChange={(e) =>
        update('mainContain', {
          alignItems: e.target.value,
        })
      }
    >
      <option value="flex-start">start</option>
      <option value="center">center</option>
      <option value="flex-end">end</option>
      <option value="stretch">stretch</option>
    </select>

    <label>Justify Content</label>
    <select
      value={(current.containerStyle.justifyContent as string) || 'center'}
      onChange={(e) =>
        update('containerStyle', {
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

    <label>Width %</label>
    <input
      type="range"
      min={50}
      max={100}
      value={parseInt(current.mainContain.width as string) || 100}
      onChange={(e) =>
        update('mainContain', {
          width: e.target.value + '%',
        })
      }
    />

    <label>Gap</label>
    <input
      type="number"
      value={parseInt(current.containerStyle.gap as string) || 30}
      onChange={(e) =>
        update('containerStyle', {
          gap: e.target.value + 'px',
        })
      }
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

