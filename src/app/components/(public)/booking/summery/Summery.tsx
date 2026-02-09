import React from 'react'

interface Props {
    currentStep: number
    step: (newStep: number) => void
  }
function Summery({ step, currentStep }: Props) {
  return (
    <div>Summery
        <button onClick={() => step(currentStep - 1)}>prev</button>
    </div>
  )
}

export default Summery