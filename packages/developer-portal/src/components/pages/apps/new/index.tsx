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
import React, { Dispatch, FC, SetStateAction, MouseEvent, useEffect } from 'react'
import { AppAuthFlow, AppNewStepId, getAppWizardStep } from './config'
import { AppWizardState, useAppState } from '../state/use-app-state'
import { StepContainer } from './__styles__'
import { StepOptionsContent } from './step-options-content'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm, UseFormTrigger } from 'react-hook-form'
import { object, SchemaOf, string, TestFunction } from 'yup'
import { isValidUrlWithCustomScheme, UpdateActionNames, updateActions } from '@reapit/utils-common'
import errorMessages from '../../../../constants/error-messages'
import { AnyObject } from 'yup/lib/types'
import { AppDetailModel, CreateAppModel } from '@reapit/foundations-ts-definitions'
import generate from 'project-name-generator'
import { ReapitConnectSession, useReapitConnect } from '@reapit/connect-session'
import dashify from 'dashify'
import { reapitConnectBrowserSession } from '../../../../core/connect-session'
import { useReapitUpdate, SendFunction, UpdateReturnTypeEnum } from '@reapit/utils-react'
import Routes from '../../../../constants/routes'
import { History } from 'history'
import { useHistory } from 'react-router-dom'
import { HelperContent } from './helper-content'

export interface CreateAppFormSchema {
  redirectUris?: string
  signoutUris?: string
  scopes?: string
}

const authCodeSchema: SchemaOf<CreateAppFormSchema> = object().shape({
  redirectUris: string()
    .trim()
    .required(errorMessages.FIELD_REQUIRED)
    .test({
      test: isValidUrlWithCustomScheme as TestFunction<string | undefined, AnyObject>,
      message: 'Should be a secure https url or http if localhost',
    }),
  signoutUris: string()
    .trim()
    .required(errorMessages.FIELD_REQUIRED)
    .test({
      test: isValidUrlWithCustomScheme as TestFunction<string | undefined, AnyObject>,
      message: 'Should be a secure https url or http if localhost',
    }),
  scopes: string().trim(),
})

const clientCredsSchema: SchemaOf<CreateAppFormSchema> = object().shape({
  scopes: string().trim(),
  redirectUris: string().optional(),
  signoutUris: string().optional(),
})

export const stepIsValid = async (
  authFlow: AppAuthFlow,
  stepHistory: (AppNewStepId | null)[],
  trigger: UseFormTrigger<CreateAppFormSchema>,
) => {
  if (authFlow === 'authorisationCode' && stepHistory.length === 3) {
    const validRedirectUris = await trigger('redirectUris')
    const validSignoutUris = await trigger('signoutUris')

    return validRedirectUris && validSignoutUris
  }

  return true
}

export const handleSetSteps =
  (
    setAppWizardState: Dispatch<SetStateAction<AppWizardState>>,
    isForward: boolean,
    authFlow: AppAuthFlow,
    stepHistory: (AppNewStepId | null)[],
    trigger: UseFormTrigger<CreateAppFormSchema>,
  ) =>
  (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    const handleStep = async () => {
      const isValidStep = isForward ? await stepIsValid(authFlow, stepHistory, trigger) : true

      if (isValidStep) {
        setAppWizardState(({ currentStep, nextStep, prevStep, stepHistory, ...rest }) => {
          if (isForward) {
            return {
              ...rest,
              nextStep: null,
              prevStep: currentStep,
              currentStep: nextStep,
              stepHistory: [...stepHistory, nextStep],
            }
          }

          stepHistory.pop()

          return {
            ...rest,
            nextStep: null,
            prevStep: stepHistory[stepHistory.indexOf(prevStep) - 1] ?? null,
            currentStep: prevStep,
            stepHistory,
            lastStep: false,
          }
        })
      }
    }
    handleStep()
  }

export const handleSubmitApp =
  (
    authFlow: AppAuthFlow,
    connectSession: ReapitConnectSession | null,
    createApp: SendFunction<CreateAppModel, AppDetailModel | null | boolean>,
  ) =>
  ({ redirectUris, signoutUris, scopes }: CreateAppFormSchema) => {
    const splitRedirectUris = redirectUris?.split(',').filter(Boolean)
    const splitSignoutUris = signoutUris?.split(',').filter(Boolean)
    const splitScopes = scopes?.split(',').filter(Boolean)
    const developerId = connectSession?.loginIdentity?.developerId ?? ''
    const name = `${dashify(connectSession?.loginIdentity?.orgName ?? 'unknown')}-${generate().dashed}`

    if (!developerId) return

    const baseCreateAppModel: CreateAppModel = {
      authFlow,
      name,
      scopes: splitScopes,
      developerId,
      isDirectApi: true,
    }

    const extraFields =
      authFlow === 'clientCredentials' ? {} : { redirectUris: splitRedirectUris, signoutUris: splitSignoutUris }

    const createAppModel: CreateAppModel = {
      ...baseCreateAppModel,
      ...extraFields,
    }

    return createApp(createAppModel)
  }

export const handleNavigateOnSuccess = (app: AppDetailModel | undefined, history: History) => () => {
  if (app) {
    history.push(`${Routes.APPS}/${app.id}`)
  }
}

export const AppsNewPage: FC = () => {
  const { appWizardState, setAppWizardState } = useAppState()
  const history = useHistory()
  const { currentStep, prevStep, nextStep, stepHistory, authFlow, lastStep } = appWizardState
  const {
    register,
    getValues,
    handleSubmit,
    trigger,
    formState: { errors },
  } = useForm<CreateAppFormSchema>({
    resolver: yupResolver(authFlow === 'authorisationCode' ? authCodeSchema : clientCredsSchema),
  })
  const { connectSession } = useReapitConnect(reapitConnectBrowserSession)
  const [appCreating, app, createApp] = useReapitUpdate<CreateAppModel, AppDetailModel>({
    reapitConnectBrowserSession,
    action: updateActions(window.reapit.config.appEnv)[UpdateActionNames.createApp],
    method: 'POST',
    returnType: UpdateReturnTypeEnum.LOCATION,
  })

  useEffect(handleNavigateOnSuccess(app, history), [app])

  const { headingText, headerText, iconName } = getAppWizardStep(currentStep)

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
          <form onSubmit={handleSubmit(handleSubmitApp(authFlow, connectSession, createApp))}>
            <FlexContainer className={elMb7}>
              <Icon className={elMr5} icon={iconName} iconSize="large" />
              <SmallText hasGreyText>{headerText}</SmallText>
            </FlexContainer>
            <FlexContainer className={elMb12}>
              <StepOptionsContent register={register} errors={errors} getValues={getValues} />
            </FlexContainer>
            <ButtonGroup alignment="center">
              <Button
                intent="secondary"
                size={2}
                disabled={!prevStep || appCreating}
                onClick={handleSetSteps(setAppWizardState, false, authFlow, stepHistory, trigger)}
                chevronLeft
              >
                Prev
              </Button>
              {!lastStep ? (
                <Button
                  intent="primary"
                  size={2}
                  disabled={!nextStep || appCreating}
                  onClick={handleSetSteps(setAppWizardState, true, authFlow, stepHistory, trigger)}
                  chevronRight
                >
                  Next
                </Button>
              ) : (
                <Button
                  intent="critical"
                  type="submit"
                  size={2}
                  chevronRight
                  disabled={appCreating}
                  loading={appCreating}
                >
                  Create App
                </Button>
              )}
            </ButtonGroup>
          </form>
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
        <HelperContent />
      </ColResponsive>
    </GridResponsive>
  )
}

export default AppsNewPage
