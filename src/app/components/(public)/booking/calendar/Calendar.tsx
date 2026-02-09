import React from 'react'

interface Props {
  currentStep: number
  step: (newStep: number) => void
}

function Calendar({ step, currentStep }: Props) {
  return (
    <div>
      Calendar
      <button onClick={() => step(currentStep + 1)}>Next</button>
      <button onClick={() => step(currentStep - 1)}>prev</button>
    </div>
  )
}

export default Calendar
