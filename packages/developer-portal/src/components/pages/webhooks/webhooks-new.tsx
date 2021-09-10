import React, { Dispatch, FC, SetStateAction, useEffect, useState } from 'react'
import { Button, Steps, ButtonGroup, ColSplit, Grid, elMlAuto, useSnack } from '@reapit/elements'
import { DeepMap, FieldError, useForm, UseFormRegister, UseFormTrigger } from 'react-hook-form'
import { WebhooksNewApp } from './webhooks-new-app'
import { WebhooksNewUrl } from './webhooks-new-url'
import { WebhooksNewTopics } from './webhooks-new-topics'
import { WebhooksNewCustomers } from './webhooks-new-customers'
import { WebhooksNewStatus } from './webhooks-new-status'
import { gridControlsMinHeight, StepContentContainer } from './__styles__'
import {
  createWebhook,
  CreateWebhookParams,
  updateWebhookCreateEditState,
} from '../../../actions/webhooks-subscriptions'
import { yupResolver } from '@hookform/resolvers/yup'
import { boolean, object, string } from 'yup'
import errorMessages from '../../../constants/error-messages'
import { httpsUrlRegex } from '@reapit/utils'
import { Dispatch as ReduxDispatch } from 'redux'
import { useDispatch, useSelector } from 'react-redux'
import { WebhookCreateEditState } from '../../../reducers/webhooks-subscriptions/webhook-edit-modal'
import { selectWebhookCreateEditState } from '../../../selector/webhooks-subscriptions'
import { History } from 'history'
import Routes from '../../../constants/routes'
import { useHistory } from 'react-router'
import { WebhookQueryParams } from './webhooks'

export interface WebhooksNewProps {
  webhookQueryParams: WebhookQueryParams
}

export interface CreateWebhookFormSchema {
  applicationId: string
  url: string
  topicIds: string
  customerIds: string
  ignoreEtagOnlyChanges: boolean
  active: boolean
}

const schema = object().shape<CreateWebhookFormSchema>({
  applicationId: string().trim().required(errorMessages.FIELD_REQUIRED),
  url: string().trim().required(errorMessages.FIELD_REQUIRED).matches(httpsUrlRegex, 'Should be a secure https url'),
  topicIds: string(),
  customerIds: string(),
  ignoreEtagOnlyChanges: boolean(),
  active: boolean(),
})

export const steps = ['1', '2', '3', '4', '5']

export const handleSwitchStep =
  (
    selectedStep: string,
    step: string,
    trigger: UseFormTrigger<CreateWebhookFormSchema>,
    setSelectedStep: Dispatch<SetStateAction<string>>,
  ) =>
  () => {
    const validateStep = async () => {
      let isValid = false

      switch (selectedStep) {
        case '1':
          isValid = await trigger('applicationId')
          break
        case '2':
          isValid = await trigger('url')
          break
        case '3':
          isValid = await trigger('topicIds')
          break
        case '4':
          isValid = await trigger('customerIds')
          break
        case '5':
        default:
          isValid = await trigger(['active', 'ignoreEtagOnlyChanges'])
          break
      }
      if (isValid) {
        setSelectedStep(step)
      }
    }
    validateStep()
  }

export const handleSubmitWebhook = (dispatch: ReduxDispatch) => (values: CreateWebhookFormSchema) => {
  const { applicationId, url, topicIds, customerIds, ignoreEtagOnlyChanges, active } = values
  const createWebhookParams: CreateWebhookParams = {
    applicationId,
    url,
    topicIds: topicIds.split(','),
    customerIds: customerIds.split(','),
    ignoreEtagOnlyChanges,
    active,
  }
  dispatch(updateWebhookCreateEditState(WebhookCreateEditState.LOADING))
  dispatch(createWebhook(createWebhookParams))
}

export const getStepContent = (
  step: string,
  register: UseFormRegister<CreateWebhookFormSchema>,
  errors: DeepMap<CreateWebhookFormSchema, FieldError>,
  webhookQueryParams: WebhookQueryParams,
) => {
  switch (step) {
    case '1':
      return <WebhooksNewApp register={register} errors={errors} webhookQueryParams={webhookQueryParams} />
    case '2':
      return <WebhooksNewUrl register={register} errors={errors} />
    case '3':
      return <WebhooksNewTopics register={register} />
    case '4':
      return <WebhooksNewCustomers register={register} />
    case '5':
      return <WebhooksNewStatus register={register} />
    default:
      return <WebhooksNewApp register={register} errors={errors} webhookQueryParams={webhookQueryParams} />
  }
}

export const handleWebhookCreation =
  (
    success: (text: string, timeout?: number | undefined) => void,
    error: (text: string, timeout?: number | undefined) => void,
    webhookCreateEditState: WebhookCreateEditState,
    applicationId: string,
    dispatch: ReduxDispatch,
    history: History,
  ) =>
  () => {
    if (webhookCreateEditState === WebhookCreateEditState.SUCCESS) {
      success('Webhook was successfully created')
      dispatch(updateWebhookCreateEditState(WebhookCreateEditState.INITIAL))
      history.push(`${Routes.WEBHOOKS_MANAGE}?applicationId=${applicationId}`)
    }

    if (webhookCreateEditState === WebhookCreateEditState.ERROR) {
      error('Webhook failed to correct, check the details supplied and try again')
      dispatch(updateWebhookCreateEditState(WebhookCreateEditState.INITIAL))
    }
  }

export const WebhooksNew: FC<WebhooksNewProps> = ({ webhookQueryParams }) => {
  const {
    register,
    getValues,
    handleSubmit,
    trigger,
    formState: { errors },
  } = useForm<CreateWebhookFormSchema>({
    resolver: yupResolver(schema),
  })
  const dispatch = useDispatch()
  const history = useHistory()
  const { success, error } = useSnack()
  const [selectedStep, setSelectedStep] = useState<string>('1')
  const webhookCreateEditState = useSelector(selectWebhookCreateEditState)
  const currentStepIndex = steps.indexOf(selectedStep)
  const nextStep = currentStepIndex < 4 ? String(currentStepIndex + 2) : null
  const prevStep = currentStepIndex > 0 ? String(currentStepIndex) : null
  const { applicationId } = getValues()

  useEffect(handleWebhookCreation(success, error, webhookCreateEditState, applicationId, dispatch, history), [
    webhookCreateEditState,
  ])

  return (
    <form onSubmit={handleSubmit(handleSubmitWebhook(dispatch))}>
      <StepContentContainer>{getStepContent(selectedStep, register, errors, webhookQueryParams)}</StepContentContainer>
      <Grid className={gridControlsMinHeight}>
        <ColSplit>
          <Steps steps={steps} selectedStep={selectedStep} onStepClick={setSelectedStep} />
        </ColSplit>
        <ColSplit>
          <ButtonGroup className={elMlAuto}>
            {prevStep && (
              <Button
                intent="secondary"
                size={2}
                onClick={handleSwitchStep(selectedStep, prevStep, trigger, setSelectedStep)}
                type="button"
              >
                Prev
              </Button>
            )}
            {nextStep ? (
              <Button
                intent="primary"
                size={2}
                chevronRight
                onClick={handleSwitchStep(selectedStep, nextStep, trigger, setSelectedStep)}
                type="button"
              >
                Next
              </Button>
            ) : (
              <Button
                intent="critical"
                size={2}
                chevronRight
                type="submit"
                disabled={webhookCreateEditState === WebhookCreateEditState.LOADING}
              >
                Create
              </Button>
            )}
          </ButtonGroup>
        </ColSplit>
      </Grid>
    </form>
  )
}
