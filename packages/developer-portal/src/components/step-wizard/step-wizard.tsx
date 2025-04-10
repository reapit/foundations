import React, { FC, PropsWithChildren, Children } from 'react'
import { stepWizardActive, StepWizardChild, StepWizardContainer } from './__styles__'
import { cx } from '@linaria/core'
import { elMb6, Steps } from '@reapit/elements'

export const StepWizard: FC<
  PropsWithChildren<{
    activeStep: number
    gotToStep: (step: number) => void
    stepsClickable?: boolean
  }>
> = ({ children, activeStep, gotToStep, stepsClickable = true }) => {
  return (
    <StepWizardContainer>
      <Steps
        className={cx(elMb6)}
        steps={[...Array(Children.count(children) || 0)].map((value, index) => (index + 1).toString())}
        selectedStep={(activeStep + 1).toString()}
        onStepClick={(step) => {
          stepsClickable && gotToStep(parseInt(step) - 1)
        }}
      />
      {Children.map(children, (child, index) => (
        <StepWizardChild key={`step-wizard-${index}`} className={cx(activeStep === index && stepWizardActive)}>
          {child}
        </StepWizardChild>
      ))}
    </StepWizardContainer>
  )
}
