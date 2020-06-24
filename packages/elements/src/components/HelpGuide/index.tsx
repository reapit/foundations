import React from 'react'
import { HelpGuideContextValues, HelpGuideContextProvider } from './context'
import { FlexContainerBasic } from '../Layout'
import { VerticalTimeline } from './vertical-timeline'
import { SubTitleH6, H3 } from '../Typography'
import { isMobile } from '../../utils/device-detection/device-detection'
import { HorizontalTimeline } from './horizontal-timeline'
import Fade, { FADE_TIMEOUT } from './fade'

export interface HelpGuideProps {
  children: React.ReactElement<HelpGuideStepProps> | React.ReactElement<HelpGuideStepProps>[]
  current?: number
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
  isFirst?: boolean
  isLast?: boolean
  currentStep?: number
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>
  setIsExit: React.Dispatch<React.SetStateAction<boolean>>
}

export const handleGoNext = ({ isLast, setCurrentStep, currentStep = 0, setIsExit }: NavigationProps) => () => {
  if (!isLast) {
    setIsExit(true)
    setTimeout(() => {
      setCurrentStep(currentStep + 1)
    }, 0.5 * FADE_TIMEOUT)
  }
}

export const handleGoPrev = ({ setCurrentStep, isFirst, currentStep = 0, setIsExit }: NavigationProps) => () => {
  if (!isFirst) {
    setIsExit(true)
    setTimeout(() => {
      setCurrentStep(currentStep - 1)
    }, 0.5 * FADE_TIMEOUT)
  }
}

export const handleGoTo = ({ setCurrentStep, setIsExit }: NavigationProps) => (stepIndex: number) => {
  setIsExit(true)
  setTimeout(() => {
    setCurrentStep(stepIndex)
  }, 0.5 * FADE_TIMEOUT)
}

export const renderTimeline = ({ total, currentStep, isMobileScreen, goTo }) => {
  if (isMobileScreen) {
    return <HorizontalTimeline total={total} currentIndex={currentStep} onSelect={goTo} />
  }
  return <VerticalTimeline total={total} currentIndex={currentStep} onSelect={goTo} />
}

export const HelpGuide = ({ children, current = 0, isLoading = false }: HelpGuideProps) => {
  const isMobileScreen = isMobile()
  const [currentStep, setCurrentStep] = React.useState<number>(current)
  const [isExit, setIsExit] = React.useState<boolean>(false)
  const total = (children as React.ReactNode[]).length
  const isFirst = currentStep === 0
  const isLast = currentStep === total - 1
  const goTo = handleGoTo({ setCurrentStep, setIsExit })

  const value: HelpGuideContextValues = {
    current: currentStep,
    goNext: handleGoNext({ currentStep, isLast, setCurrentStep, setIsExit }),
    goPrev: handleGoPrev({ currentStep, isFirst, setCurrentStep, setIsExit }),
    isFirst,
    isLast,
    isLoading,
  }

  React.useEffect(() => {
    if (isExit) {
      setTimeout(() => {
        setIsExit(false)
      }, 0.5 * FADE_TIMEOUT)
    }
  }, [isExit])

  return (
    <HelpGuideContextProvider value={value}>
      <FlexContainerBasic hasPadding flexColumn={isMobileScreen}>
        {renderTimeline({ total, currentStep, isMobileScreen, goTo })}
        <div className="helpguide">
          <div className="helpguide-wrapper">
            <div className="helpguide-steps">
              <Fade in={!isExit} timeout={300} unmountOnExit>
                <>{children[currentStep]}</>
              </Fade>
            </div>
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
      <div className="is-flex relative">
        <div className="helpguide-component">{Component ? <Component /> : render ? render : null}</div>
        {!isMobile() && graphic && (
          <div className="helpguide-wrapper-graphic">
            <div className="helpguide-graphic">{graphic}</div>
          </div>
        )}
      </div>
    </div>
  )
}

HelpGuide.Step = HelpGuideStep
