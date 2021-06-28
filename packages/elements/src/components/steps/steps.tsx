import React, { FC, HTMLAttributes } from 'react'
import { cx } from '@linaria/core'
import { elIsActive, elIsUsed } from '../../styles/states'
import { ElSteps, ElStep } from './__styles__'

export interface StepsProps extends HTMLAttributes<HTMLDivElement> {
  steps: string[]
  selectedStep?: string
  onStepClick?: (step: string) => void
  className?: string
}

export const Steps: FC<StepsProps> = ({ steps = [], selectedStep, onStepClick, className = '', ...rest }) => {
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
