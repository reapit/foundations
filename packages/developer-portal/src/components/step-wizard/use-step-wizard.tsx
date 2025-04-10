import React, { useState } from 'react'

export const useStepWizardContext = () => {
  const [currentStep, setCurrentStep] = useState<number>(0)

  const nextStep = () => setCurrentStep(currentStep + 1)
  const previousStep = () => setCurrentStep(currentStep - 1)

  const goToStep = (step: number) => step >= 0 && setCurrentStep(step)

  return {
    currentStep,
    nextStep,
    previousStep,
    goToStep,
  }
}
