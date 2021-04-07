import * as React from 'react'
import { cx } from 'linaria'
import { elIsActive, elIsUsed } from '../../styles-v3/base/states'
import { ElSteps, ElStep } from './__styles__'

export interface ISteps extends React.HTMLAttributes<HTMLDivElement> {
  steps: string[]
  selectedStep?: string
  onStepClick?: (step: string) => void
  className?: string
}

export const Steps: React.FC<ISteps> = ({ steps = [], selectedStep, onStepClick, className = '', ...rest }) => {
  const selectedStepIndex = steps.findIndex((step) => step === selectedStep)

  return (
    <ElSteps className={className} {...rest}>
      {steps.map((step, index) => {
        const stepClassName = cx(index === selectedStepIndex && elIsActive, index < selectedStepIndex && elIsUsed)

        return (
          <ElStep key={step} onClick={() => onStepClick && onStepClick(step)} className={stepClassName}>
            {step}
          </ElStep>
        )
      })}
    </ElSteps>
  )
}
