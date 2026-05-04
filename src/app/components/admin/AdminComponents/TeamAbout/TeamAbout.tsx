'use client'

import Loading from '@/app/components/Loading/Loading'
import drag from '@/app/hooks/drag'
import useAdminTeam from '@/app/hooks/useAdminTeam'
import React, { CSSProperties } from 'react'
import { ProviderRole } from '@prisma/client'
function TeamAbout({
  location,
  sectionNum,
  viewport,
}: {
  location: string
  sectionNum: string
  viewport: 'desktop' | 'tablet' | 'mobile'
}) {
  // -------------------
  // DRAG
  // -------------------
  const {
    dragPosition,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
  } = drag()

  // -------------------
  // DATA LAYER (CLEAN)
  // -------------------
  const {
    current,
    members,
    intro,
    selected,
    selectedId,
    setSelectedId,
    showEditor,
    setShowEditor,
    setintro,
    isLoading,
    addMember,
    removeMember,
    updateMember,
    updateMemberFile,
    updateBreakpoint,
    handleSave,
  } = useAdminTeam(location, sectionNum, viewport)
  const roles=Object.values(ProviderRole)
  if (isLoading) return <Loading />

  // -------------------
  // DERIVED BREAKPOINT DATA
  // -------------------
  const gridStyle = current.grid
  const cardStyle = current.card
  const introStyle = current.text
  const imageStyle = current.image

  // -------------------
  // EDITOR UI STYLES
  // -------------------
  const editorBox: CSSProperties = {
    position: 'fixed',
    top: dragPosition.y,
    left: dragPosition.x,
    width: 340,
    maxHeight: '80vh',
    overflowY: 'auto',
    background: '#fff',
    padding: 12,
    border: '1px solid #ccc',
    borderRadius: 8,
    zIndex: 999,
  }

  const label: CSSProperties = {
    fontSize: 12,
    marginTop: 8,
    display: 'block',
  }

  const input: CSSProperties = {
    width: '100%',
    padding: 4,
    marginBottom: 4,
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
// console.log(current.intro.value)
  // -------------------
  // RENDER
  // -------------------
  return (
    <div>
      <button onClick={() => setShowEditor(!showEditor)}>
        {showEditor ? 'Close' : 'Edit'}
      </button>

      {/* INTRO */}
      <h3 style={introStyle}>{intro}</h3>

      {/* GRID */}
      <div style={{display:'grid',
      gap:`${gridStyle.gap}px`,
      gridTemplateColumns:`repeat(${gridStyle.columns}, 1fr)`,
      justifyContent:`${gridStyle.justifyContent}`}}>
        {members.map((m) => (
          <div
            key={m.id}
            style={{
             
              cursor: showEditor ? 'pointer' : 'default',
            }}
            onClick={() => showEditor && setSelectedId(m.id)}
          >
            <img
              src={
                m.file
                  ? URL.createObjectURL(m.file)
                  : m.image
              }
              style={{
                width: m.imageWidth || imageStyle.width,
                height: m.imageHeight || imageStyle.height,
                borderRadius: m.imageRadius,
                objectFit: 'fill',
              }}
            />

            <div
              style={{
                fontSize: m.fontSize,
                color: m.fontColor,
                textAlign: introStyle.textAlign,
              }}
            >
              <h4>{m.name}</h4>
              <p>{m.role}</p>
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
          <b>Team Editor</b>

          <button style={editBtn} onClick={() => setShowEditor(false)}>
            Close
          </button>

          <button onClick={addMember}>Add Member</button>

          {/* INTRO */}
          <label style={label}>Intro</label>
          <input
            style={input}
            value={intro}
            onChange={(e) =>
              setintro(e.target.value)
            }
          />

          {/* COLUMNS */}
          <label style={label}>Columns</label>
          <input
            style={input}
            type="number"
            value={current.grid.columns}
            onChange={(e) =>
              updateBreakpoint('grid', {
                columns: Number(e.target.value),
              })
            }
          />

          {/* CARD STYLE (clean grouped updates) */}
          <label style={label}>Card Radius</label>
          <input
            style={input}
            type="number"
            value={current.card.radius}
            onChange={(e) =>
              updateBreakpoint('card', {
                radius: Number(e.target.value),
              })
            }
          />

          <label style={label}>Padding</label>
          <input
            style={input}
            type="number"
            value={current.card.padding}
            onChange={(e) =>
              updateBreakpoint('card', {
                padding: Number(e.target.value),
              })
            }
          />

          <label style={label}>Background</label>
          <input
            type="color"
            value={current.card.background}
            onChange={(e) =>
              updateBreakpoint('card', {
                background: e.target.value,
              })
            }
          />

          {/* SELECTED MEMBER */}
          {selected && (
            <>
              <hr />

              <label style={label}>Name</label>
              <input
                style={input}
                value={selected.name}
                onChange={(e) =>
                  updateMember(selected.id, 'name', e.target.value)
                }
              />

              <label style={label}>Role</label>
              <select
              style={input}
              value={selected.role}
              onChange={(e) =>
              updateMember(selected.id, 'role', e.target.value)
              }
              >
              {roles.map((r) => (
              <option key={r} value={r}>
                {r}
            </option>
            ))}
            </select>

              <label style={label}>Font Size</label>
              <input
                style={input}
                type ='range' 
                onChange={(e) =>
                  updateMember(
                    selected.id,
                    'fontSize',
                    e.target.value + 'px'
                  )
                }
              />

              <label style={label}>Font Color</label>
              <input
                style={input}
                type="color"
                onChange={(e) =>
                  updateMember(
                    selected.id,
                    'fontColor',
                    e.target.value
                  )
                }
              />
              <label style={label}>image</label>
              <input
                type="file"
                onChange={(e) => {
                const file = e.target.files?.[0]
                if (!file) return
                updateMemberFile(selected.id, file)
                }}
                />

              <label style={label}>Remove</label>
              <button onClick={() => removeMember(selected.id)}>
                Delete Member
              </button>
            </>
          )}

          {/* SAVE */}
          <button
            style={{
              marginTop: 10,
              padding: 8,
              background: 'black',
              color: 'white',
              border: 'none',
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

export default TeamAbout