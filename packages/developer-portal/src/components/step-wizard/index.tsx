import React, { FC, useState, PropsWithChildren } from 'react'
import { stepWizardActive, StepWizardChild, StepWizardContainer } from './__styles__'
import { cx } from '@linaria/core'
import { elMb6, Steps } from '@reapit/elements'

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

export const StepWizard: FC<
  PropsWithChildren<{ activeStep: number; gotToStep: (step: number) => void; stepsClickable?: boolean }>
> = ({ children, activeStep, gotToStep, stepsClickable = true }) => {
  return (
    <>
      <StepWizardContainer>
        <Steps
          className={cx(elMb6)}
          steps={[
            ...Array(children?.length || 0)
              .keys()
              .map((value) => (value + 1).toString()),
          ]}
          selectedStep={(activeStep + 1).toString()}
          onStepClick={(step) => {
            stepsClickable && gotToStep(parseInt(step) - 1)
          }}
        />
        {children?.map((child, index) => (
          <StepWizardChild key={index} className={cx(activeStep === index && stepWizardActive)}>
            {child}
          </StepWizardChild>
        ))}
      </StepWizardContainer>
    </>
  )
}
