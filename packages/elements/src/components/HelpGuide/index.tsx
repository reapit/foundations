import React, { useState, useEffect, useRef } from 'react'
import { HelpGuideContextValues, HelpGuideContextProvider } from './context'
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
  component?: React.FC<any>
  render?: React.ReactNode
}

export interface NavigationProps {
  steps: HelpGuideStepProps[]
  currentIndex: number
  isFirst?: boolean
  isLast?: boolean
  setInternalCurrent: (stepId: string) => void
}

export const caculateStepChange = ({
  currentStepRef,
  wrapperStepRef,
  helpguideRef,
  isMobileScreen,
}: {
  currentStepRef: React.RefObject<HTMLElement>
  wrapperStepRef: React.RefObject<HTMLElement>
  helpguideRef: React.RefObject<HTMLElement>
  isMobileScreen: boolean
}) => () => {
  if (currentStepRef.current && wrapperStepRef.current && helpguideRef.current && isMobileScreen) {
    helpguideRef.current.style.height = '100%'
    wrapperStepRef.current.style.transform = `translate3d(-${currentStepRef.current.offsetLeft}px, 0, 0)`
  }

  if (currentStepRef.current && wrapperStepRef.current && helpguideRef.current && !isMobileScreen) {
    helpguideRef.current.style.height = `${currentStepRef.current.offsetHeight}px`
    wrapperStepRef.current.style.transform = `translate3d(0, -${currentStepRef.current.offsetTop}px, 0)`
  }
}

export const caculateWrapperWith = ({
  isMobileScreen,
  total,
  helpguideRef,
  wrapperStepRef,
}: {
  wrapperStepRef: React.RefObject<HTMLElement>
  helpguideRef: React.RefObject<HTMLElement>
  total: number
  isMobileScreen: boolean
}) => () => {
  if (helpguideRef.current && wrapperStepRef.current && isMobileScreen) {
    const wrapperWidth = helpguideRef.current.clientWidth * total
    wrapperStepRef.current.style.width = `${wrapperWidth}px`
  }
  if (helpguideRef.current && wrapperStepRef.current && !isMobileScreen) {
    wrapperStepRef.current.style.width = '100%'
  }
}

export const handleGoNext = ({ steps, currentIndex, isLast, setInternalCurrent }: NavigationProps) => () => {
  if (!isLast) {
    setInternalCurrent(steps[currentIndex + 1].id)
  }
}

export const handleGoPrev = ({ steps, currentIndex, isFirst, setInternalCurrent }: NavigationProps) => () => {
  if (!isFirst) {
    setInternalCurrent(steps[currentIndex - 1].id)
  }
}

export const handleGoTo = ({ steps, setInternalCurrent }: NavigationProps) => (stepIndex: number) => {
  setInternalCurrent(steps[stepIndex].id)
}

export const renderTimeline = ({ total, currentIndex, isMobileScreen, goTo }) => {
  if (isMobileScreen) {
    return <HorizontalTimeline total={total} currentIndex={currentIndex} onSelect={goTo} />
  }
  return <VerticalTimeline total={total} currentIndex={currentIndex} onSelect={goTo} />
}

export const HelpGuide = ({ children, current, isLoading = false }: HelpGuideProps) => {
  const currentStepRef = useRef<HTMLDivElement>(null)
  const wrapperStepRef = useRef<HTMLDivElement>(null)
  const helpguideRef = useRef<HTMLDivElement>(null)

  const isMobileScreen = isMobile()

  const steps = React.Children.toArray(children).map(({ props }: any) => ({ ...props }))

  const [internalCurrent, setInternalCurrent] = useState(current || steps[0].id || '')

  const total = steps.length
  const isFirst = steps[0].id === internalCurrent
  const isLast = steps[steps.length - 1].id === internalCurrent
  const currentIndex = steps.findIndex(({ id }) => id === internalCurrent)

  useEffect(caculateWrapperWith({ isMobileScreen, total, helpguideRef, wrapperStepRef }), [isMobileScreen])

  useEffect(caculateStepChange({ currentStepRef, wrapperStepRef, helpguideRef, isMobileScreen }), [
    internalCurrent,
    isMobileScreen,
  ])

  const goTo = handleGoTo({ steps, currentIndex, setInternalCurrent })

  const value: HelpGuideContextValues = {
    current: internalCurrent,
    goNext: handleGoNext({ steps, currentIndex, isLast, setInternalCurrent }),
    goPrev: handleGoPrev({ steps, currentIndex, isFirst, setInternalCurrent }),
    goTo,
    currentIndex,
    steps,
    isFirst,
    isLast,
    isLoading,
  }

  return (
    <HelpGuideContextProvider value={value}>
      <FlexContainerBasic hasPadding flexColumn={isMobileScreen}>
        {renderTimeline({ total, currentIndex, isMobileScreen, goTo })}
        <div ref={helpguideRef} className="helpguide">
          <div ref={wrapperStepRef} className="helpguide-wrapper">
            {React.Children.toArray(children).map((child, index) => (
              <div
                key={`helper-guide-child-${index}`}
                ref={currentIndex === index ? currentStepRef : null}
                className="helpguide-steps"
              >
                {child}
              </div>
            ))}
          </div>
        </div>
      </FlexContainerBasic>
    </HelpGuideContextProvider>
  )
}

function HelpGuideStep({ component: Component, render, heading, subHeading, graphic }: HelpGuideStepProps) {
  return (
    <div className="helpguide-content">
      <H3>{heading}</H3>
      <SubTitleH6>{subHeading}</SubTitleH6>
      <FlexContainerBasic className="relative">
        <div className="helpguide-component">{Component ? <Component /> : render ? render : null}</div>
        {!isMobile() && graphic && (
          <div className="helpguide-wrapper-graphic">
            <div className="helpguide-graphic">{graphic}</div>
          </div>
        )}
      </FlexContainerBasic>
    </div>
  )
}

HelpGuide.Step = HelpGuideStep
