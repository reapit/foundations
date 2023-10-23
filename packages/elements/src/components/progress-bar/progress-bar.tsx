import React, { Dispatch, FC, HTMLAttributes, SetStateAction, useEffect, useState } from 'react'
import {
  ElProgressBarContainer,
  ElProgressBarLabel,
  ElProgressBarInner,
  ElProgressBarItem,
  elProgressBarLabelRight,
} from './__styles__'

export interface ProgressBarPercentageProps extends HTMLAttributes<HTMLDivElement> {
  duration: number
  showLabel?: boolean
}

export interface ProgressBarStepProps extends HTMLAttributes<HTMLDivElement> {
  numberSteps: number
  currentStep: number
  showLabel?: boolean
}

export interface ProgressBarBaseProps extends HTMLAttributes<HTMLDivElement> {}

export const ProgressBarContainer: FC<ProgressBarBaseProps> = ({ children, ...rest }) => (
  <ElProgressBarContainer {...rest}>{children}</ElProgressBarContainer>
)

export const ProgressBarInner: FC<ProgressBarBaseProps> = ({ children, ...rest }) => (
  <ElProgressBarInner {...rest}>{children}</ElProgressBarInner>
)

export const ProgressBarItem: FC<ProgressBarBaseProps> = ({ children, ...rest }) => (
  <ElProgressBarItem {...rest}>{children}</ElProgressBarItem>
)

export const ProgressBarLabel: FC<ProgressBarBaseProps> = ({ children, ...rest }) => (
  <ElProgressBarLabel {...rest}>{children}</ElProgressBarLabel>
)

export const handleSetPercentageComplete = (
  setPercentageComplete: Dispatch<SetStateAction<number>>,
  intervalTime: number,
) => () => {
  const interval = window.setInterval(() => {
    setPercentageComplete((prev) => {
      if (prev < 100) {
        return ++prev
      }

      return prev
    })
  }, intervalTime)

  return () => window.clearInterval(interval)
}

export const ProgressBarPercentage: FC<ProgressBarPercentageProps> = ({ duration, showLabel = true, ...rest }) => {
  const [percentageComplete, setPercentageComplete] = useState<number>(0)
  const intervalTime = duration * 10
  const transitionDuration = duration / 60

  useEffect(handleSetPercentageComplete(setPercentageComplete, intervalTime), [percentageComplete])

  return (
    <ProgressBarContainer {...rest}>
      <ProgressBarInner style={{ width: `${percentageComplete}%`, transitionDuration: `${transitionDuration}s` }}>
        <ProgressBarItem />
      </ProgressBarInner>
      {showLabel && <ProgressBarLabel className={elProgressBarLabelRight}>{percentageComplete}%</ProgressBarLabel>}
    </ProgressBarContainer>
  )
}

export const handleSetPercentageCompleteSteps = (
  setPercentageComplete: Dispatch<SetStateAction<number>>,
  currentStep: number,
  numberSteps: number,
) => () => {
  setPercentageComplete((currentStep / numberSteps) * 100)
}

export const ProgressBarSteps: FC<ProgressBarStepProps> = ({ numberSteps, currentStep, showLabel = true, ...rest }) => {
  const [percentageComplete, setPercentageComplete] = useState<number>((currentStep / numberSteps) * 100)

  useEffect(handleSetPercentageCompleteSteps(setPercentageComplete, currentStep, numberSteps), [currentStep])

  return (
    <ProgressBarContainer {...rest}>
      <ProgressBarInner style={{ width: `${percentageComplete}%` }}>
        <ProgressBarItem />
      </ProgressBarInner>
      {showLabel && (
        <ProgressBarLabel className={elProgressBarLabelRight}>
          {currentStep}/{numberSteps} Completed
        </ProgressBarLabel>
      )}
    </ProgressBarContainer>
  )
}
