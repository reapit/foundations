import {
  Button,
  ButtonGroup,
  ColResponsive,
  elMb12,
  elMb7,
  elMr5,
  FlexContainer,
  GridResponsive,
  Icon,
  SmallText,
  Subtitle,
  Title,
} from '@reapit/elements'
import React, { Dispatch, FC, SetStateAction } from 'react'
import { getAppWizardStep } from './config'
import { AppWizardState, useAppWizard } from './use-app-wizard'
import { StepContainer } from './__styles__'
import { StepOptionsContent } from './step-options-content'

export const handleSetSteps =
  (setAppWizardState: Dispatch<SetStateAction<AppWizardState>>, isForward: boolean) => () => {
    setAppWizardState(({ currentStep, nextStep, prevStep, stepHistory }) => {
      if (isForward) {
        return {
          nextStep: null,
          prevStep: currentStep,
          currentStep: nextStep,
          stepHistory: [...stepHistory, nextStep],
        }
      }

      stepHistory.pop()

      return {
        nextStep: null,
        prevStep: stepHistory[stepHistory.indexOf(prevStep) - 1] ?? null,
        currentStep: prevStep,
        stepHistory,
      }
    })
  }

export const AppsNew: FC = () => {
  const { appWizardState, setAppWizardState } = useAppWizard()
  const { currentStep, prevStep, nextStep } = appWizardState
  const { headingText, headerText, helperPageHeadingText, helperPage, iconName } = getAppWizardStep(currentStep)

  return (
    <GridResponsive>
      <ColResponsive
        spanMobile={4}
        spanTablet={4}
        spanDesktop={4}
        spanWideScreen={4}
        spanSuperWideScreen={5}
        span4KScreen={7}
      >
        <Title>Create App</Title>
        <StepContainer>
          <Subtitle hasBoldText>{headingText}</Subtitle>
          <FlexContainer className={elMb7}>
            <Icon className={elMr5} icon={iconName} iconSize="large" />
            <SmallText hasGreyText>{headerText}</SmallText>
          </FlexContainer>
          <FlexContainer className={elMb12}>
            <StepOptionsContent />
          </FlexContainer>
          <ButtonGroup alignment="center">
            <Button
              intent="secondary"
              size={2}
              disabled={!prevStep}
              onClick={handleSetSteps(setAppWizardState, false)}
              chevronLeft
            >
              Prev
            </Button>
            <Button
              intent="primary"
              size={2}
              disabled={!nextStep}
              onClick={handleSetSteps(setAppWizardState, true)}
              chevronRight
            >
              Next
            </Button>
          </ButtonGroup>
        </StepContainer>
      </ColResponsive>
      <ColResponsive
        spanMobile={4}
        spanTablet={4}
        spanDesktop={4}
        spanWideScreen={8}
        spanSuperWideScreen={11}
        span4KScreen={13}
      >
        <Title>{helperPageHeadingText}</Title>
        {helperPage}
      </ColResponsive>
    </GridResponsive>
  )
}
