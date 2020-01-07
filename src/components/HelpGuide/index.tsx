import React, { useState, useEffect, useRef } from 'react'
import { HelpGuideContext, HelpGuideContextValues } from './context'
import { FlexContainerBasic } from '../Layout'
import { VerticalTimeline } from './vertical-timeline'
import { SubTitleH6, H3 } from '../Typography'
import { isMobile } from '../../utils/device-detection/device-detection'
import { HorizontalTimeline } from './horizontal-timeline'

export interface HelpGuideProps {
  children: React.ReactElement<HelpGuideStepProps> | React.ReactElement<HelpGuideStepProps>[]
  current?: string
  isLoading?: boolean
}

export interface HelpGuideStepProps {
  id: string
  heading?: React.ReactNode
  subHeading?: React.ReactNode
  graphic?: React.ReactNode
  component: React.FC<any>
}

export interface NavigationProps {
  steps: HelpGuideStepProps[]
  currentIndex: number
  isFirst?: boolean
  isLast?: boolean
  setInternalCurrent: (stepId: string) => void
  currentStepRef: React.RefObject<HTMLElement>
  isMobileScreen: boolean
}

export const caculateCurrentStepRef = ({ currentStepRef }: { currentStepRef: React.RefObject<HTMLElement> }) => () => {
  setTimeout(() => {
    if (currentStepRef.current) {
      currentStepRef.current.style.opacity = '1'
      currentStepRef.current.style.zIndex = '2'
      currentStepRef.current.style.transform = `translate(0px, 0px)`
    }
  }, 300)
}

export const handleGoNext = ({
  steps,
  currentIndex,
  isLast,
  setInternalCurrent,
  currentStepRef,
  isMobileScreen
}: NavigationProps) => () => {
  if (!isLast && currentStepRef.current) {
    currentStepRef.current.style.opacity = '0'
    currentStepRef.current.style.zIndex = '0'
    currentStepRef.current.style.transform = isMobileScreen
      ? `translateX(-${currentStepRef.current.clientWidth}px)`
      : `translateY(-${currentStepRef.current.clientHeight}px)`
    setInternalCurrent(steps[currentIndex + 1].id)
  }
}

export const handleGoPrev = ({
  steps,
  currentIndex,
  isFirst,
  setInternalCurrent,
  currentStepRef,
  isMobileScreen
}: NavigationProps) => () => {
  if (!isFirst && currentStepRef.current) {
    currentStepRef.current.style.opacity = '0'
    currentStepRef.current.style.zIndex = '0'
    currentStepRef.current.style.transform = isMobileScreen
      ? `translateX(${currentStepRef.current.clientWidth}px)`
      : `translateY(${currentStepRef.current.clientHeight}px)`
    setInternalCurrent(steps[currentIndex - 1].id)
  }
}

export const renderTimeline = (total: number, currentIndex: number, isMobileScreen: boolean) => {
  if (isMobileScreen) {
    return <HorizontalTimeline total={total} currentIndex={currentIndex} />
  }
  return <VerticalTimeline total={total} currentIndex={currentIndex} />
}

export const HelpGuide = ({ children, current, isLoading = false }: HelpGuideProps) => {
  const currentStepRef = useRef<HTMLDivElement>(null)
  const isMobileScreen = isMobile()

  const steps = React.Children.toArray(children).map(({ props }) => ({ ...props }))

  const [internalCurrent, setInternalCurrent] = useState(current || steps[0].id || '')

  const total = steps.length
  const isFirst = steps[0].id === internalCurrent
  const isLast = steps[steps.length - 1].id === internalCurrent
  const currentIndex = steps.findIndex(({ id }) => id === internalCurrent)

  useEffect(caculateCurrentStepRef({ currentStepRef }), [internalCurrent])

  const value: HelpGuideContextValues = {
    current: internalCurrent,
    goNext: handleGoNext({ steps, currentIndex, isLast, setInternalCurrent, currentStepRef, isMobileScreen }),
    goPrev: handleGoPrev({ steps, currentIndex, isFirst, setInternalCurrent, currentStepRef, isMobileScreen }),
    currentIndex,
    steps,
    isFirst,
    isLast,
    isLoading
  }

  return (
    <HelpGuideContext.Provider value={value}>
      <FlexContainerBasic hasPadding flexColumn={isMobileScreen}>
        {renderTimeline(total, currentIndex, isMobileScreen)}
        <FlexContainerBasic flexColumn className="justify-center relative">
          {React.Children.toArray(children).map((child, index) => (
            <div
              key={`helper-guide-child-${index}`}
              ref={currentIndex === index ? currentStepRef : null}
              className="helpguide-wrapper"
            >
              {child}
            </div>
          ))}
        </FlexContainerBasic>
      </FlexContainerBasic>
    </HelpGuideContext.Provider>
  )
}

HelpGuide.Step = function({ component: Component, heading, subHeading, graphic }: HelpGuideStepProps) {
  return (
    <FlexContainerBasic className="items-center justify-between">
      <div className="helpguide-content">
        <H3>{heading}</H3>
        <SubTitleH6>{subHeading}</SubTitleH6>
        <div className="flex">
          <Component />
        </div>
      </div>
      {!isMobile() && graphic && (
        <div className="helpguide-wrapper-graphic">
          <div className="helpguide-graphic">{graphic}</div>
        </div>
      )}
    </FlexContainerBasic>
  )
}
