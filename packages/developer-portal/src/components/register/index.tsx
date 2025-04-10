import React, { FC, useState, useEffect, MouseEvent, Dispatch, SetStateAction } from 'react'
import dayjs from 'dayjs'
import {
  PersistentNotification,
  Subtitle,
  BodyText,
  Button,
  FlexContainer,
  ButtonGroup,
  elMb12,
  useSnack,
  Icon,
  elMb7,
} from '@reapit/elements'
import { Marketplace } from '@reapit/foundations-ts-definitions'
import TermsAndConditionsModal from './terms-and-conditions-modal'
import Routes from '../../constants/routes'
import { RegisterContainer, RegisterContentWrapper } from './__styles__'
import { reapitConnectBrowserSession } from '../../core/connect-session'
import { createDeveloperService } from '../../services/developer'
import { StepWizard, useStepWizardContext } from '../step-wizard'
import { FirstStepForm, ForthStepForm, SecondStepForm, ThirdStepForm } from './form'

export type DeveloperState = 'LOADING' | 'SUCCESS' | 'ERROR' | 'INITIAL'

export const onSubmit =
  (
    values: Marketplace.CreateDeveloperModel,
    setDeveloperState: Dispatch<SetStateAction<{ state: DeveloperState; message?: string }>>,
    error: (message: string, timeout: number) => void,
    stepContext: { goToStep: (step: number) => false | void },
  ) =>
  async () => {
    setDeveloperState({ state: 'LOADING' })
    const response = await createDeveloperService({
      ...values,
      agreedTerms: dayjs().format('YYYY-MM-DDTHH:mm:ssZ'),
    })
    if (typeof response === 'string') {
      let message: string = ''
      error(response, 5000)
      if (response.includes('email')) {
        stepContext.goToStep(0)
        message = 'Email address already in use'
      } else if (response.includes('company')) {
        stepContext.goToStep(1)
        message = 'Company name already in use'
      }
      setDeveloperState({ state: 'ERROR', message })
    } else {
      setDeveloperState({ state: 'SUCCESS' })
    }
  }

export const onDeclineTermsAndConditions = (setTermsAndConditionsModalVisible: (isVisible: boolean) => void) => () => {
  setTermsAndConditionsModalVisible(false)
}

export const onLoginButtonClick = () => (event: MouseEvent) => {
  event.preventDefault()
  reapitConnectBrowserSession.connectLoginRedirect(`${window.location.origin}${Routes.APPS}`)
}

export const formSubmit = (setAgreeModalVisable: (val: boolean) => void) => () => {
  setAgreeModalVisable(true)
}

export const Register: FC = () => {
  const [agreeModalVisable, setAgreeModalVisable] = useState<boolean>(false)
  const [developerState, setDeveloperState] = useState<{ state: DeveloperState; message?: string }>({
    state: 'INITIAL',
  })
  const { error } = useSnack()
  const [formSubmittedData, setFormSubmittedData] = useState<any>()

  const stepContext = useStepWizardContext()

  useEffect(() => {
    if (developerState.state === 'SUCCESS' || developerState.state === 'ERROR') {
      setAgreeModalVisable(false)
    }
  }, [developerState])

  return (
    <RegisterContainer>
      <RegisterContentWrapper>
        <Icon className={elMb7} height="40px" width="200px" icon="reapitLogo" />
        <FlexContainer isFlexColumn>
          <Subtitle hasNoMargin hasCenteredText>
            Register
          </Subtitle>
          <BodyText hasCenteredText>for Reapit Foundations DeveloperPortal</BodyText>
        </FlexContainer>
        {developerState.state === 'SUCCESS' ? (
          <>
            <PersistentNotification className={elMb12} intent="success" isExpanded isFullWidth isInline>
              Successfully registered, if you already have a Reapit Connect account, please now login. If you do not,
              please check your email to confirm your account.
            </PersistentNotification>
            <ButtonGroup alignment="center" className={elMb12}>
              <Button onClick={onLoginButtonClick()} intent="primary">
                Login With Reapit
              </Button>
            </ButtonGroup>
          </>
        ) : (
          <>
            <div style={{ width: '100%' }}>
              <StepWizard stepsClickable={false} activeStep={stepContext.currentStep} gotToStep={stepContext.goToStep}>
                <FirstStepForm
                  nextStep={stepContext.nextStep}
                  setFormSubmittedData={(values) =>
                    setFormSubmittedData({
                      ...formSubmittedData,
                      ...values,
                    })
                  }
                  errors={
                    developerState.message?.includes('Email')
                      ? {
                          email: { message: developerState.message, type: '' },
                        }
                      : undefined
                  }
                />
                <SecondStepForm
                  previousStep={stepContext.previousStep}
                  nextStep={stepContext.nextStep}
                  setFormSubmittedData={(values) =>
                    setFormSubmittedData({
                      ...formSubmittedData,
                      ...values,
                    })
                  }
                  errors={
                    developerState.message?.includes('Company')
                      ? {
                          companyName: { message: developerState.message, type: '' },
                        }
                      : undefined
                  }
                />
                <ThirdStepForm
                  previousStep={stepContext.previousStep}
                  nextStep={stepContext.nextStep}
                  setFormSubmittedData={(values) =>
                    setFormSubmittedData({
                      ...formSubmittedData,
                      ...values,
                    })
                  }
                />
                <ForthStepForm
                  previousStep={stepContext.previousStep}
                  nextStep={stepContext.nextStep}
                  setFormSubmittedData={(values) =>
                    setFormSubmittedData({
                      ...formSubmittedData,
                      ...values,
                    })
                  }
                  submitForm={() => {
                    setAgreeModalVisable(true)
                  }}
                />
              </StepWizard>
            </div>
            <TermsAndConditionsModal
              visible={agreeModalVisable}
              onAccept={onSubmit(formSubmittedData, setDeveloperState, error, stepContext)}
              onDecline={onDeclineTermsAndConditions(setAgreeModalVisable)}
              isSubmitting={developerState.state === 'LOADING'}
            />
          </>
        )}
      </RegisterContentWrapper>
    </RegisterContainer>
  )
}

export default Register
