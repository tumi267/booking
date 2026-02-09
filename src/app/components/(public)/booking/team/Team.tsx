import React from 'react'
interface Props {
    currentStep: number
    step: (newStep: number) => void
  }
function Team({currentStep,step}:Props) {
  return (
    <div>Team
    <button onClick={() => step(currentStep + 1)}>Next</button>  
    
    </div>
  )
}

export default Team