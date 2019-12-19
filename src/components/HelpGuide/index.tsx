import React, { useState, useEffect, useRef } from 'react'
import { HelpGuideContext, HelpGuideContextValues } from './context'
import { FlexContainerBasic } from '../Layout'
import { NumberedTimeline } from './NumberedTimeline'
import { SubTitleH6, H3 } from '../Typography'

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

export const HelpGuide = ({ children, current, isLoading = false }: HelpGuideProps) => {
  const currentStepRef = useRef<HTMLDivElement>(null)

  const steps = React.Children.toArray(children).map(({ props }) => ({ ...props }))

  const [internalCurrent, setInternalCurrent] = useState(current || steps[0].id || '')

  const total = steps.length
  const isFirst = steps[0].id === internalCurrent
  const isLast = steps[steps.length - 1].id === internalCurrent
  const currentIndex = steps.findIndex(({ id }) => id === internalCurrent)

  useEffect(() => {
    setTimeout(() => {
      if (currentStepRef.current) {
        currentStepRef.current.style.opacity = '1'
        currentStepRef.current.style.zIndex = '2'
        currentStepRef.current.style.transform = `translateY(0px)`
      }
    }, 300)
  }, [internalCurrent])

  const goNext = () => {
    if (!isLast) {
      if (currentStepRef.current) {
        currentStepRef.current.style.opacity = '0'
        currentStepRef.current.style.zIndex = '0'
        currentStepRef.current.style.transform = `translateY(-${currentStepRef.current.clientHeight}px)`
      }
      setInternalCurrent(steps[currentIndex + 1].id)
    }
  }

  const goPrev = () => {
    if (!isFirst) {
      if (currentStepRef.current) {
        currentStepRef.current.style.opacity = '0'
        currentStepRef.current.style.zIndex = '0'
        currentStepRef.current.style.transform = `translateY(${currentStepRef.current.clientHeight}px)`
      }
      setInternalCurrent(steps[currentIndex - 1].id)
    }
  }

  const value: HelpGuideContextValues = {
    current: internalCurrent,
    goNext,
    goPrev,
    currentIndex,
    steps,
    isFirst,
    isLast,
    isLoading
  }

  return (
    <HelpGuideContext.Provider value={value}>
      <FlexContainerBasic hasPadding>
        <NumberedTimeline total={total} currentIndex={currentIndex} />
        <FlexContainerBasic flexColumn className="justify-center relative">
          {React.Children.toArray(children).map((child, index) => (
            <div ref={currentIndex === index ? currentStepRef : null} className="helpguide-wrapper">
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
        <Component />
      </div>
      <div className="helpguide-wrapper-graphic">
        <div className="helpguide-graphic">{graphic}</div>
      </div>
    </FlexContainerBasic>
  )
}
