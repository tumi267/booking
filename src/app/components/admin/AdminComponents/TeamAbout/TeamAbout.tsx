'use client'
import React, { CSSProperties, useState } from 'react'

type TeamMember = {
  id: string
  name: string
  image: string
  role: string
  fontSize?: string
  fontColor?: string
  imageWidth?: string
  imageHeight?: string
  imageRadius?: string
}

function TeamAbout() {
  const [intro, setIntro] = useState<string>('Meet The Team')

  const [members, setMembers] = useState<TeamMember[]>([
    {
      id: crypto.randomUUID(),
      name: 'Name',
      role: 'Role',
      image: '/next.svg',
      fontSize: '16px',
      fontColor: '#000000',
      imageWidth: '100%',
      imageHeight: '160px',
      imageRadius: '0px',
    },
  ])

  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [showEditor, setShowEditor] = useState(false)

  const [columns, setColumns] = useState(4)

  const [gridStyle, setGridStyle] = useState<CSSProperties>({
    display: 'flex',
    flexWrap: 'wrap',
    gap: '20px',
    justifyContent: 'center',
    maxWidth: '1200px',
    margin: '0 auto',
  })

  const [cardStyle, setCardStyle] = useState<CSSProperties>({
    background: 'pink',
    borderRadius: '8px',
    padding: '10px',
    textAlign: 'center',
    display:'flex',
    flexDirection:'column',
    alignItems:'center',
    width:'850px',
    overflow:'hidden'
  })

  const [cardWidth, setCardWidth] = useState<number | null>(null)

  const [introStyle, setIntroStyle] = useState<CSSProperties>({
    fontSize: '24px',
    color: '#000',
    textAlign: 'center',
  })

  // DRAG

  const [dragPosition, setDragPosition] = useState({ x: 50, y: 50 })
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

  const addMember = () => {
    setMembers((p) => [
      ...p,
      {
        id: crypto.randomUUID(),
        name: 'Name',
        role: 'Role',
        image: '/next.svg',
        fontSize: '16px',
        fontColor: '#000',
        imageWidth: '100%',
        imageHeight: '160px',
        imageRadius: '0px',
      },
    ])
  }

  const removeMember = (id: string) => {
    setMembers((p) => p.filter((m) => m.id !== id))
    setSelectedId(null)
  }

  const updateMember = (
    id: string,
    key: keyof TeamMember,
    value: string
  ) => {
    setMembers((prev) =>
      prev.map((m) =>
        m.id === id ? { ...m, [key]: value } : m
      )
    )
  }

  const selected = members.find((m) => m.id === selectedId)

  const computedWidth =
    cardWidth !== null ? cardWidth : 100 / columns

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
    cursor: isDragging ? 'grabbing' : 'grab',
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

  return (
    <div>

      <button onClick={() => setShowEditor(!showEditor)}>
        {showEditor ? 'Close' : 'Edit'}
      </button>

      {showEditor && (
        <button onClick={addMember}>
          Add Member
        </button>
      )}

      <h3 style={introStyle}>{intro}</h3>

      {/* GRID */}

      <div style={gridStyle}>
        {members.map((m) => (
          <div
            key={m.id}
            style={{
              ...cardStyle,
             
              cursor: showEditor ? 'pointer' : 'default',
            }}
            onClick={() =>
              showEditor && setSelectedId(m.id)
            }
          >
            <img
              src={m.image}
              style={{
                width: m.imageWidth,
                height: m.imageHeight,
                borderRadius: m.imageRadius,
                objectFit: 'fill',
              }}
            />

            <div
              style={{
                fontSize: m.fontSize,
                color: m.fontColor,
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

          <label style={label}>Intro</label>

          <input
            style={input}
            value={intro}
            onChange={(e) =>
              setIntro(e.target.value)
            }
          />

          <label style={label}>Columns</label>

          <input
            style={input}
            type="number"
            value={columns}
            onChange={(e) =>
              setColumns(parseInt(e.target.value))
            }
          />

<label style={label}>Radius</label>
<input
  style={input}
  type="number"
  value={parseInt(cardStyle.borderRadius as string) || 0}
  onChange={(e) =>
    setCardStyle({
      ...cardStyle,
      borderRadius: e.target.value + 'px',
    })
  }
/>

<label style={label}>Padding</label>
<input
  style={input}
  type="number"
  value={parseInt(cardStyle.padding as string) || 0}
  onChange={(e) =>
    setCardStyle({
      ...cardStyle,
      padding: e.target.value + 'px',
    })
  }
/>

<label style={label}>Text align</label>
<select
  style={input}
  value={cardStyle.textAlign as string}
  onChange={(e) =>
    setCardStyle({
      ...cardStyle,
      textAlign: e.target.value as any,
    })
  }
>
  <option value="left">left</option>
  <option value="center">center</option>
  <option value="right">right</option>
</select>

<label style={label}>Flex direction</label>
<select
  style={input}
  value={cardStyle.flexDirection as string}
  onChange={(e) =>
    setCardStyle({
      ...cardStyle,
      display: 'flex',
      flexDirection: e.target.value,
    })
  }
>
  <option value="column">column</option>
  <option value="column-reverse">column-reverse</option>
  <option value="row">row</option>
  <option value="row-reverse">row-reverse</option>
</select>

<label style={label}>Align items</label>
<select
  style={input}
  value={cardStyle.alignItems as string}
  onChange={(e) =>
    setCardStyle({
      ...cardStyle,
      display: 'flex',
      alignItems: e.target.value,
    })
  }
>
  <option value="flex-start">start</option>
  <option value="center">center</option>
  <option value="flex-end">end</option>
  <option value="stretch">stretch</option>
</select>

<label style={label}>Card width px</label>
<input
  style={input}
  type="number"
  onChange={(e) =>
    setCardStyle({
      ...cardStyle,
      width: e.target.value + 'px',
    })
  }
/>

<label style={label}>Overflow</label>
<select
  style={input}
  value={cardStyle.overflow as string}
  onChange={(e) =>
    setCardStyle({
      ...cardStyle,
      overflow: e.target.value,
    })
  }
>
  <option value="hidden">hidden</option>
  <option value="visible">visible</option>
  <option value="scroll">scroll</option>
</select>
        <label style={label}>background colour</label>

        <input
        type='color'
        value={cardStyle.background}
        onChange={(e)=>{setCardStyle({...cardStyle,background:e.target.value})}}
        />
          {selected && (
            <>
              <hr />

              <label style={label}>Name</label>

              <input
                style={input}
                value={selected.name}
                onChange={(e) =>
                  updateMember(
                    selected.id,
                    'name',
                    e.target.value
                  )
                }
              />

              <label style={label}>Role</label>

              <input
                style={input}
                value={selected.role}
                onChange={(e) =>
                  updateMember(
                    selected.id,
                    'role',
                    e.target.value
                  )
                }
              />

              <label style={label}>Font size</label>

              <input
                style={input}
                type="number"
                onChange={(e) =>
                  updateMember(
                    selected.id,
                    'fontSize',
                    e.target.value + 'px'
                  )
                }
              />

              <label style={label}>Font color</label>

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

              <label style={label}>Image width</label>

              <input
                style={input}
                type="number"
                onChange={(e) =>
                  updateMember(
                    selected.id,
                    'imageWidth',
                    e.target.value + '%'
                  )
                }
              />

              <label style={label}>Image height</label>

              <input
                style={input}
                type="number"
                onChange={(e) =>
                  updateMember(
                    selected.id,
                    'imageHeight',
                    e.target.value + 'px'
                  )
                }
              />

              {/* ✅ NEW */}

              <label style={label}>Image radius</label>

              <input
                style={input}
                type="number"
                onChange={(e) =>
                  updateMember(
                    selected.id,
                    'imageRadius',
                    e.target.value + 'px'
                  )
                }
              />

<label style={label}>Image</label>

<input
  style={input}
  type="file"
  onChange={(e) =>
console.log('image logic')  }
/>

              <button
                onClick={() =>
                  removeMember(selected.id)
                }
              >
                Remove
              </button>
            </>
          )}
        </div>
      )}
    </div>
  )
}

export default TeamAbout