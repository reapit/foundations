import React, { FC, HTMLAttributes, ReactNode } from 'react'
import { cx } from '@linaria/core'
import { elIsActive, elIsUsed } from '../../styles/states'
import {
  ElSteps,
  ElStep,
  ElStepsVertical,
  ElStepVertical,
  ElStepVerticalItem,
  ElStepVerticalContent,
} from './__styles__'

export interface StepsProps extends HTMLAttributes<HTMLDivElement> {
  steps: string[]
  selectedStep?: string
  onStepClick?: (step: string) => void
  className?: string
}

export interface StepsVerticalStep {
  item: string
  content?: ReactNode
}

export interface StepsVerticalProps extends HTMLAttributes<HTMLDivElement> {
  steps: StepsVerticalStep[]
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
          <ElStep
            key={step}
            data-testid={`step-${index}`}
            onClick={() => onStepClick && onStepClick(step)}
            className={stepClassName}
          >
            {step}
          </ElStep>
        )
      })}
    </ElSteps>
  )
}

export const StepsVertical: FC<StepsVerticalProps> = ({
  steps = [],
  selectedStep,
  onStepClick,
  className = '',
  ...rest
}) => {
  const selectedStepIndex = steps.findIndex((step) => step.item === selectedStep)

  return (
    <ElStepsVertical className={className} {...rest}>
      {steps.map(({ item, content }, index) => {
        const stepClassName = cx(index === selectedStepIndex && elIsActive)

        if (index > selectedStepIndex) return null
        return (
          <ElStepVertical key={item}>
            <ElStepVerticalItem>
              <ElStep
                data-testid={`step-${index}`}
                onClick={() => onStepClick && onStepClick(item)}
                className={stepClassName}
              >
                {item}
              </ElStep>
            </ElStepVerticalItem>
            <ElStepVerticalContent>{content}</ElStepVerticalContent>
          </ElStepVertical>
        )
      })}
    </ElStepsVertical>
  )
}
