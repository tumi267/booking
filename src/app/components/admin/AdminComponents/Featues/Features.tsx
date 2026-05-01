'use client'
import Loading from '@/app/components/Loading/Loading'
import drag from '@/app/hooks/drag'
import useAdminFeat from '@/app/hooks/useAdminFeat'
import React, { CSSProperties } from 'react'

function FeaturesSection({
  location,
  sectionNum,
  viewport,
}: {
  location: string
  sectionNum: string
  viewport: 'desktop' | 'tablet' | 'mobile'
}) {
  const {
    features,
    current,
    setSelectedId,
    showEditor,
    setShowEditor,
    isLoading,
    addFeature,
    handleSave,
    selected,
    updateFeature,
    removeFeature,
    toggleSection,
    openSections,
    updateBreakpoint,
  } = useAdminFeat(location, sectionNum, viewport)

  const {
    dragPosition,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
  } = drag()

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
    boxShadow: '0 6px 18px rgba(0,0,0,0.2)',
    fontFamily: 'sans-serif',
  }

  const header: CSSProperties = {
    background: '#eee',
    padding: '6px',
    borderRadius: '4px',
    cursor: 'pointer',
    fontWeight: 600,
    marginTop: '8px',
  }

  const labelStyle: CSSProperties = {
    fontSize: 12,
    marginTop: 8,
    display: 'block',
  }

  const inputStyle: CSSProperties = {
    width: '100%',
    padding: '4px',
    marginBottom: '4px',
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

  if (isLoading) return <Loading />

  return (
    <div style={current.section}>
      <button style={editBtn} onClick={() => setShowEditor(!showEditor)}>
        {showEditor ? 'Close' : 'Edit'}
      </button>

      {/* GRID */}
      <div style={current.grid}>
        {features?.map((f) => (
          <div
            key={f.id}
            style={current.card}
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
            <div style={current.text}>
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
            Close
          </button>

          <div>
            <button onClick={addFeature}>Add Feature</button>
          </div>

          {/* SECTION */}
          <div style={header} onClick={() => toggleSection('section')}>
            Section {openSections.section ? '▼' : '►'}
          </div>

          {openSections.section && (
            <>
              <label style={labelStyle}>Margin Top</label>
              <input
                style={inputStyle}
                type="number"
                value={current.section.marginTop}
                onChange={(e) =>
                  updateBreakpoint('section', {
                    marginTop: Number(e.target.value),
                  })
                }
              />

              <label style={labelStyle}>Margin Bottom</label>
              <input
                style={inputStyle}
                type="number"
                value={current.section.marginBottom}
                onChange={(e) =>
                  updateBreakpoint('section', {
                    marginBottom: Number(e.target.value),
                  })
                }
              />
            </>
          )}

          {/* GRID */}
          <div style={header} onClick={() => toggleSection('grid')}>
            Grid {openSections.grid ? '▼' : '►'}
          </div>

          {openSections.grid && (
            <>
              <label style={labelStyle}>Columns</label>
              <input
                style={inputStyle}
                type="number"
                min={1}
                max={6}
                value={current.grid.columns}
                onChange={(e) =>
                  updateBreakpoint('grid', {
                    columns: Number(e.target.value),
                  })
                }
              />

              <label style={labelStyle}>Gap</label>
              <input
                style={inputStyle}
                type="number"
                value={current.grid.gap}
                onChange={(e) =>
                  updateBreakpoint('grid', {
                    gap: Number(e.target.value),
                  })
                }
              />

              <label style={labelStyle}>Justify</label>
              <select
                style={inputStyle}
                value={current.grid.justifyContent}
                onChange={(e) =>
                  updateBreakpoint('grid', {
                    justifyContent: e.target.value,
                  })
                }
              >
                <option value="flex-start">left</option>
                <option value="center">center</option>
                <option value="flex-end">right</option>
                <option value="space-between">space-between</option>
                <option value="space-around">space-around</option>
              </select>
            </>
          )}

          {/* CARD */}
          <div style={header} onClick={() => toggleSection('card')}>
            Card {openSections.card ? '▼' : '►'}
          </div>

          {openSections.card && (
            <>
              <label style={labelStyle}>Card size</label>
              <input
                style={inputStyle}
                type="number"
                value={current.card.width}
                onChange={(e) =>
                  updateBreakpoint('card', {
                    width: Number(e.target.value),
                  })
                }
              />

              <label style={labelStyle}>Radius</label>
              <input
                style={inputStyle}
                type="number"
                value={current.card.radius}
                onChange={(e) =>
                  updateBreakpoint('card', {
                    radius: Number(e.target.value),
                  })
                }
              />

              <label style={labelStyle}>Background</label>
              <input
                style={inputStyle}
                type="color"
                value={current.card.background}
                onChange={(e) =>
                  updateBreakpoint('card', {
                    background: e.target.value,
                  })
                }
              />
            </>
          )}

          {/* SELECTED */}
          {selected && (
            <>
              <div style={header} onClick={() => toggleSection('selected')}>
                Selected Card {openSections.selected ? '▼' : '►'}
              </div>

              {openSections.selected && (
                <>
                  <label style={labelStyle}>Title</label>
                  <input
                    style={inputStyle}
                    value={selected.title}
                    onChange={(e) =>
                      updateFeature(selected.id, 'title', e.target.value)
                    }
                  />

                  <label style={labelStyle}>Text</label>
                  <textarea
                    style={{ ...inputStyle, height: 60 }}
                    value={selected.text}
                    onChange={(e) =>
                      updateFeature(selected.id, 'text', e.target.value)
                    }
                  />

                  <button
                    style={{ marginTop: 6 }}
                    onClick={() => removeFeature(selected.id)}
                  >
                    Remove Card
                  </button>
                </>
              )}
            </>
          )}

          <button
            style={{
              marginTop: 10,
              padding: 8,
              background: 'black',
              color: 'white',
              border: 'none',
              cursor: 'pointer',
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