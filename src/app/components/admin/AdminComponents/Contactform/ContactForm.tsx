'use client'

import React, { CSSProperties } from 'react'
import Loading from '@/app/components/Loading/Loading'
import Drag from '@/app/hooks/drag'
import useAdminContact from '@/app/hooks/useAdminContactForm'

type Viewport =
  | 'desktop'
  | 'tablet'
  | 'mobile'

interface ContactFormProps {
  location: string
  sectionNum: string
  viewport: Viewport
}

function ContactForm({
  location,
  sectionNum,
  viewport,
}: ContactFormProps) {
  const {
    data,
    current,
    setShowEditor,
    showEditor,
    isLoading,
    saving,
    updateContactField,
    updateBreakpoint,
    handleSave,
  } = useAdminContact(
    location,
    sectionNum,
    viewport
  )

  const {
    dragPosition,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
  } = Drag()

  if (isLoading) {
    return <Loading />
  }

  /*
   * ==========================================
   * EDIT BUTTON
   * ==========================================
   */

  const editBtn: CSSProperties = {
    position: 'absolute',
    top: 10,
    right: 10,
    background: 'rgba(0,0,0,0.6)',
    color: '#fff',
    border: 'none',
    padding: '6px 10px',
    borderRadius: 4,
    cursor: 'pointer',
    zIndex: 5,
  }

  /*
   * ==========================================
   * EDITOR BOX
   * ==========================================
   */

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

    boxShadow:
      '0 6px 18px rgba(0,0,0,0.2)',

    fontFamily: 'sans-serif',
  }

  /*
   * ==========================================
   * CLOSE BUTTON
   * ==========================================
   */

  const editBtn2: CSSProperties = {
    position: 'absolute',

    top: 10,
    right: 10,

    background: 'rgba(0,0,0,0.6)',

    color: '#fff',

    border: 'none',

    padding: '6px 10px',

    borderRadius: 4,

    cursor: 'pointer',

    zIndex: 5,
  }

  /*
   * ==========================================
   * EDITOR SECTION HEADER
   * ==========================================
   */

  const sectionHeader: CSSProperties = {
    marginTop: 20,

    marginBottom: 10,

    padding: 8,

    background: '#eeeeee',

    borderRadius: 4,

    fontWeight: 600,
  }

  /*
   * ==========================================
   * LABEL
   * ==========================================
   */

  const labelStyle: CSSProperties = {
    display: 'block',

    marginTop: 10,

    marginBottom: 4,

    fontSize: 12,
  }

  /*
   * ==========================================
   * EDITOR INPUT
   * ==========================================
   */

  const editorInput: CSSProperties = {
    width: '100%',

    padding: 8,

    border: '1px solid #ccc',

    borderRadius: 4,
  }

  /*
   * ==========================================
   * FORM SUBMIT
   * ==========================================
   */

  const handleSubmit = (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault()
  }

  return (
    <section
      style={{
        ...current.mainContain,

        position: 'relative',
      }}
    >
      {/* ====================================== */}
      {/* CONTACT CONTENT */}
      {/* ====================================== */}

      <div
        style={current.containerStyle}
      >
        {/* ====================================== */}
        {/* TITLE */}
        {/* ====================================== */}

        <h2
          style={current.titleStyle}
        >
          {data.title}
        </h2>

        {/* ====================================== */}
        {/* CTA */}
        {/* ====================================== */}

        {data.ctaMessage && (
          <p
            style={current.ctaStyle}
          >
            {data.ctaMessage}
          </p>
        )}

        {/* ====================================== */}
        {/* ADDRESS */}
        {/* ====================================== */}

        {data.location && (
          <p
            style={current.addressStyle}
          >
            {data.location}
          </p>
        )}

        {/* ====================================== */}
        {/* CITY */}
        {/* ====================================== */}

        {data.city && (
          <p
            style={current.cityStyle}
          >
            {data.city}
          </p>
        )}

        {/* ====================================== */}
        {/* CONTACT NUMBER */}
        {/* ====================================== */}

        {data.contactNumber && (
          <p
            style={{
              ...current.cityStyle,
              marginBottom: 20,
            }}
          >
            {data.contactNumber}
          </p>
        )}

        {/* ====================================== */}
        {/* CONTACT FORM */}
        {/* ====================================== */}

        <form
          onSubmit={handleSubmit}
          style={{
            display: 'flex',

            flexDirection: 'column',

            gap: 16,
          }}
        >
          {/* NAME */}

          <input
            type="text"
            name="name"
            placeholder="Name"
            style={current.inputStyle}
            required
          />

          {/* EMAIL */}

          <input
            type="email"
            name="email"
            placeholder="Email"
            style={current.inputStyle}
            required
          />

          {/* MESSAGE */}

          <textarea
            name="message"
            placeholder="Message"
            style={current.textareaStyle}
            required
          />

          {/* BUTTON */}

          <button
            type="submit"
            style={current.buttonStyle}
          >
            Submit
          </button>
        </form>
      </div>

      {/* ====================================== */}
      {/* EDIT BUTTON */}
      {/* ====================================== */}

      <button
        type="button"
        style={editBtn}
        onClick={() =>
          setShowEditor(!showEditor)
        }
      >
        {showEditor
          ? 'Close'
          : 'Edit'}
      </button>

      {/* ====================================== */}
      {/* EDITOR */}
      {/* ====================================== */}

      {showEditor && (
        <div
          style={editorBox}
          onMouseDown={
            handleMouseDown
          }
          onMouseMove={
            handleMouseMove
          }
          onMouseUp={
            handleMouseUp
          }
        >
          <strong>
            Contact Editor
          </strong>

          {/* ================================= */}
          {/* CLOSE */}
          {/* ================================= */}

          <button
            type="button"
            style={editBtn2}
            onClick={() =>
              setShowEditor(false)
            }
          >
            Close
          </button>

          <div
            style={{
              marginTop: 35,
            }}
          >
            {/* ================================= */}
            {/* CONTACT DETAILS */}
            {/* ================================= */}

            <div
              style={sectionHeader}
            >
              Contact Details
            </div>

            {/* TITLE */}

            <label
              style={labelStyle}
            >
              Title
            </label>

            <input
              type="text"
              value={data.title}
              onChange={event =>
                updateContactField(
                  'title',
                  event.target.value
                )
              }
              style={editorInput}
            />

            {/* CTA MESSAGE */}

            <label
              style={labelStyle}
            >
              CTA Message
            </label>

            <textarea
              value={
                data.ctaMessage
              }
              placeholder="We would love to hear from you. Get in touch with us today."
              onChange={event =>
                updateContactField(
                  'ctaMessage',
                  event.target.value
                )
              }
              style={{
                ...editorInput,

                minHeight: 80,

                resize: 'vertical',
              }}
            />

            {/* ADDRESS */}

            <label
              style={labelStyle}
            >
              Address
            </label>

            <input
              type="text"
              placeholder="123 Main Street"
              value={
                data.location
              }
              onChange={event =>
                updateContactField(
                  'location',
                  event.target.value
                )
              }
              style={editorInput}
            />

            {/* CITY */}

            <label
              style={labelStyle}
            >
              City
            </label>

            <input
              type="text"
              placeholder="Johannesburg"
              value={data.city}
              onChange={event =>
                updateContactField(
                  'city',
                  event.target.value
                )
              }
              style={editorInput}
            />

            {/* CONTACT NUMBER */}

            <label
              style={labelStyle}
            >
              Contact Number
            </label>

            <input
              type="tel"
              placeholder="+27 12 345 6789"
              value={
                data.contactNumber
              }
              onChange={event =>
                updateContactField(
                  'contactNumber',
                  event.target.value
                )
              }
              style={editorInput}
            />

            {/* ================================= */}
            {/* SECTION */}
            {/* ================================= */}

            <div
              style={sectionHeader}
            >
              Section
            </div>

            {/* PADDING */}

            <label
              style={labelStyle}
            >
              Padding
            </label>

            <input
              type="number"
              value={
                Number(
                  current.mainContain
                    .padding
                ) || 0
              }
              onChange={event =>
                updateBreakpoint(
                  'mainContain',
                  {
                    padding:
                      Number(
                        event.target.value
                      ),
                  }
                )
              }
              style={editorInput}
            />

            {/* BACKGROUND */}

            <label
              style={labelStyle}
            >
              Background
            </label>

            <input
              type="color"
              value={
                String(
                  current.mainContain
                    .backgroundColor
                )
              }
              onChange={event =>
                updateBreakpoint(
                  'mainContain',
                  {
                    backgroundColor:
                      event.target.value,
                  }
                )
              }
              style={editorInput}
            />

            {/* ================================= */}
            {/* TITLE */}
            {/* ================================= */}

            <div
              style={sectionHeader}
            >
              Title
            </div>

            {/* FONT SIZE */}

            <label
              style={labelStyle}
            >
              Font Size
            </label>

            <input
              type="number"
              value={
                Number(
                  current.titleStyle
                    .fontSize
                ) || 32
              }
              onChange={event =>
                updateBreakpoint(
                  'titleStyle',
                  {
                    fontSize:
                      Number(
                        event.target.value
                      ),
                  }
                )
              }
              style={editorInput}
            />

            {/* FONT WEIGHT */}

            <label
              style={labelStyle}
            >
              Font Weight
            </label>

            <select
              value={String(
                current.titleStyle
                  .fontWeight ?? 600
              )}
              onChange={event =>
                updateBreakpoint(
                  'titleStyle',
                  {
                    fontWeight:
                      Number(
                        event.target.value
                      ),
                  }
                )
              }
              style={editorInput}
            >
              <option value="300">
                Light
              </option>

              <option value="400">
                Normal
              </option>

              <option value="500">
                Medium
              </option>

              <option value="600">
                Semi Bold
              </option>

              <option value="700">
                Bold
              </option>

              <option value="800">
                Extra Bold
              </option>
            </select>

            {/* COLOR */}

            <label
              style={labelStyle}
            >
              Color
            </label>

            <input
              type="color"
              value={
                String(
                  current.titleStyle
                    .color
                )
              }
              onChange={event =>
                updateBreakpoint(
                  'titleStyle',
                  {
                    color:
                      event.target.value,
                  }
                )
              }
              style={editorInput}
            />

            {/* ================================= */}
            {/* CTA */}
            {/* ================================= */}

            <div
              style={sectionHeader}
            >
              CTA Message
            </div>

            {/* FONT SIZE */}

            <label
              style={labelStyle}
            >
              Font Size
            </label>

            <input
              type="number"
              value={
                Number(
                  current.ctaStyle
                    .fontSize
                ) || 16
              }
              onChange={event =>
                updateBreakpoint(
                  'ctaStyle',
                  {
                    fontSize:
                      Number(
                        event.target.value
                      ),
                  }
                )
              }
              style={editorInput}
            />

            {/* FONT WEIGHT */}

            <label
              style={labelStyle}
            >
              Font Weight
            </label>

            <select
              value={String(
                current.ctaStyle
                  .fontWeight ?? 400
              )}
              onChange={event =>
                updateBreakpoint(
                  'ctaStyle',
                  {
                    fontWeight:
                      Number(
                        event.target.value
                      ),
                  }
                )
              }
              style={editorInput}
            >
              <option value="300">
                Light
              </option>

              <option value="400">
                Normal
              </option>

              <option value="500">
                Medium
              </option>

              <option value="600">
                Semi Bold
              </option>

              <option value="700">
                Bold
              </option>

              <option value="800">
                Extra Bold
              </option>
            </select>

            {/* COLOR */}

            <label
              style={labelStyle}
            >
              Color
            </label>

            <input
              type="color"
              value={
                String(
                  current.ctaStyle
                    .color
                )
              }
              onChange={event =>
                updateBreakpoint(
                  'ctaStyle',
                  {
                    color:
                      event.target.value,
                  }
                )
              }
              style={editorInput}
            />

            {/* ================================= */}
            {/* ADDRESS */}
            {/* ================================= */}

            <div
              style={sectionHeader}
            >
              Address
            </div>

            {/* FONT SIZE */}

            <label
              style={labelStyle}
            >
              Font Size
            </label>

            <input
              type="number"
              value={
                Number(
                  current.addressStyle
                    .fontSize
                ) || 16
              }
              onChange={event =>
                updateBreakpoint(
                  'addressStyle',
                  {
                    fontSize:
                      Number(
                        event.target.value
                      ),
                  }
                )
              }
              style={editorInput}
            />

            {/* FONT WEIGHT */}

            <label
              style={labelStyle}
            >
              Font Weight
            </label>

            <select
              value={String(
                current.addressStyle
                  .fontWeight ?? 400
              )}
              onChange={event =>
                updateBreakpoint(
                  'addressStyle',
                  {
                    fontWeight:
                      Number(
                        event.target.value
                      ),
                  }
                )
              }
              style={editorInput}
            >
              <option value="300">
                Light
              </option>

              <option value="400">
                Normal
              </option>

              <option value="500">
                Medium
              </option>

              <option value="600">
                Semi Bold
              </option>

              <option value="700">
                Bold
              </option>

              <option value="800">
                Extra Bold
              </option>
            </select>

            {/* COLOR */}

            <label
              style={labelStyle}
            >
              Color
            </label>

            <input
              type="color"
              value={
                String(
                  current.addressStyle
                    .color
                )
              }
              onChange={event =>
                updateBreakpoint(
                  'addressStyle',
                  {
                    color:
                      event.target.value,
                  }
                )
              }
              style={editorInput}
            />

            {/* ================================= */}
            {/* CITY */}
            {/* ================================= */}

            <div
              style={sectionHeader}
            >
              City
            </div>

            {/* FONT SIZE */}

            <label
              style={labelStyle}
            >
              Font Size
            </label>

            <input
              type="number"
              value={
                Number(
                  current.cityStyle
                    .fontSize
                ) || 16
              }
              onChange={event =>
                updateBreakpoint(
                  'cityStyle',
                  {
                    fontSize:
                      Number(
                        event.target.value
                      ),
                  }
                )
              }
              style={editorInput}
            />

            {/* FONT WEIGHT */}

            <label
              style={labelStyle}
            >
              Font Weight
            </label>

            <select
              value={String(
                current.cityStyle
                  .fontWeight ?? 400
              )}
              onChange={event =>
                updateBreakpoint(
                  'cityStyle',
                  {
                    fontWeight:
                      Number(
                        event.target.value
                      ),
                  }
                )
              }
              style={editorInput}
            >
              <option value="300">
                Light
              </option>

              <option value="400">
                Normal
              </option>

              <option value="500">
                Medium
              </option>

              <option value="600">
                Semi Bold
              </option>

              <option value="700">
                Bold
              </option>

              <option value="800">
                Extra Bold
              </option>
            </select>

            {/* COLOR */}

            <label
              style={labelStyle}
            >
              Color
            </label>

            <input
              type="color"
              value={
                String(
                  current.cityStyle
                    .color
                )
              }
              onChange={event =>
                updateBreakpoint(
                  'cityStyle',
                  {
                    color:
                      event.target.value,
                  }
                )
              }
              style={editorInput}
            />

            {/* ================================= */}
            {/* BUTTON */}
            {/* ================================= */}

            <div
              style={sectionHeader}
            >
              Button
            </div>

            {/* FONT SIZE */}

            <label
              style={labelStyle}
            >
              Font Size
            </label>

            <input
              type="number"
              value={
                Number(
                  current.buttonStyle
                    .fontSize
                ) || 16
              }
              onChange={event =>
                updateBreakpoint(
                  'buttonStyle',
                  {
                    fontSize:
                      Number(
                        event.target.value
                      ),
                  }
                )
              }
              style={editorInput}
            />

            {/* FONT WEIGHT */}

            <label
              style={labelStyle}
            >
              Font Weight
            </label>

            <select
              value={String(
                current.buttonStyle
                  .fontWeight ?? 600
              )}
              onChange={event =>
                updateBreakpoint(
                  'buttonStyle',
                  {
                    fontWeight:
                      Number(
                        event.target.value
                      ),
                  }
                )
              }
              style={editorInput}
            >
              <option value="300">
                Light
              </option>

              <option value="400">
                Normal
              </option>

              <option value="500">
                Medium
              </option>

              <option value="600">
                Semi Bold
              </option>

              <option value="700">
                Bold
              </option>

              <option value="800">
                Extra Bold
              </option>
            </select>

            {/* BACKGROUND */}

            <label
              style={labelStyle}
            >
              Background
            </label>

            <input
              type="color"
              value={
                String(
                  current.buttonStyle
                    .backgroundColor
                )
              }
              onChange={event =>
                updateBreakpoint(
                  'buttonStyle',
                  {
                    backgroundColor:
                      event.target.value,
                  }
                )
              }
              style={editorInput}
            />

            {/* TEXT COLOR */}

            <label
              style={labelStyle}
            >
              Text Color
            </label>

            <input
              type="color"
              value={
                String(
                  current.buttonStyle
                    .color
                )
              }
              onChange={event =>
                updateBreakpoint(
                  'buttonStyle',
                  {
                    color:
                      event.target.value,
                  }
                )
              }
              style={editorInput}
            />

            {/* BORDER RADIUS */}

            <label
              style={labelStyle}
            >
              Border Radius
            </label>

            <input
              type="number"
              value={
                Number(
                  current.buttonStyle
                    .borderRadius
                ) || 6
              }
              onChange={event =>
                updateBreakpoint(
                  'buttonStyle',
                  {
                    borderRadius:
                      Number(
                        event.target.value
                      ),
                  }
                )
              }
              style={editorInput}
            />

            {/* ================================= */}
            {/* SAVE */}
            {/* ================================= */}

            <button
              type="button"
              onClick={handleSave}
              disabled={saving}
              style={{
                marginTop: 20,

                width: '100%',

                padding: 10,

                background: '#000000',

                color: '#ffffff',

                border: 'none',

                borderRadius: 6,

                cursor: saving
                  ? 'not-allowed'
                  : 'pointer',

                opacity:
                  saving ? 0.6 : 1,
              }}
            >
              {saving
                ? 'Saving...'
                : 'Save'}
            </button>
          </div>
        </div>
      )}
    </section>
  )
}

export default ContactForm