import React, { Dispatch, FC, SetStateAction, useEffect, useState } from 'react'
import { Button, StepsVertical, ButtonGroup, useSnack, elMt11, StepsVerticalStep, elMb11 } from '@reapit/elements'
import { DeepMap, FieldError, useForm, UseFormGetValues, UseFormRegister, UseFormTrigger } from 'react-hook-form'
import { WebhooksNewApp } from './webhooks-new-app'
import { WebhooksNewUrl } from './webhooks-new-url'
import { WebhooksNewTopics } from './webhooks-new-topics'
import { WebhooksNewCustomers } from './webhooks-new-customers'
import { WebhooksNewStatus } from './webhooks-new-status'
import {
  createWebhook,
  CreateWebhookParams,
  updateWebhookCreateEditState,
} from '../../../actions/webhooks-subscriptions'
import { yupResolver } from '@hookform/resolvers/yup'
import Yup, { boolean, object, string } from 'yup'
import errorMessages from '../../../constants/error-messages'
import { httpsUrlRegex } from '@reapit/utils-common'
import { Dispatch as ReduxDispatch } from 'redux'
import { useDispatch, useSelector } from 'react-redux'
import { WebhookCreateEditState } from '../../../reducers/webhooks-subscriptions/webhook-edit-modal'
import { selectWebhookCreateEditState } from '../../../selector/webhooks-subscriptions'
import { History } from 'history'
import Routes from '../../../constants/routes'
import { useHistory } from 'react-router'
import { SelectAppIdEventHandler, WebhookQueryParams } from './webhooks'

export interface WebhooksNewProps {
  webhookQueryParams: WebhookQueryParams
  selectAppIdHandler: SelectAppIdEventHandler
}

export interface CreateWebhookFormSchema {
  applicationId: string
  url: string
  topicIds: string
  customerIds: string
  ignoreEtagOnlyChanges?: boolean
  active?: boolean
}

const schema: Yup.SchemaOf<CreateWebhookFormSchema> = object().shape({
  applicationId: string().trim().required(errorMessages.FIELD_REQUIRED),
  url: string().trim().required(errorMessages.FIELD_REQUIRED).matches(httpsUrlRegex, 'Should be a secure https url'),
  topicIds: string().trim().required('At least one topic is required'),
  customerIds: string().trim().required('At least one customer or "All customers" should be selected'),
  ignoreEtagOnlyChanges: boolean(),
  active: boolean(),
})

export const handleSwitchStep =
  (
    selectedStep: string,
    trigger: UseFormTrigger<CreateWebhookFormSchema>,
    setSelectedStep: Dispatch<SetStateAction<string>>,
  ) =>
  () => {
    const validateStep = async () => {
      let isValid = false
      let step: string | null = '1'

      switch (selectedStep) {
        case '1':
          isValid = await trigger('applicationId')
          step = '2'
          break
        case '2':
          isValid = await trigger('url')
          step = '3'
          break
        case '3':
          isValid = await trigger('topicIds')
          step = '4'
          break
        case '4':
          isValid = await trigger('customerIds')
          step = '5'
          break
        case '5':
        default:
          isValid = await trigger(['active', 'ignoreEtagOnlyChanges'])
          step = null
          break
      }
      if (isValid && step) {
        setSelectedStep(step)
      }
    }
    validateStep()
  }

export const handleSubmitWebhook = (dispatch: ReduxDispatch) => (values: CreateWebhookFormSchema) => {
  const { applicationId, url, topicIds, customerIds, ignoreEtagOnlyChanges, active } = values
  const splitCustomerIds = customerIds.split(',').filter(Boolean)
  const customers = customerIds.includes('ALL') ? [] : splitCustomerIds
  const topics = topicIds.split(',').filter(Boolean)

  const createWebhookParams: CreateWebhookParams = {
    applicationId,
    url,
    topicIds: topics,
    customerIds: customers,
    ignoreEtagOnlyChanges,
    active,
  }
  dispatch(updateWebhookCreateEditState(WebhookCreateEditState.LOADING))
  dispatch(createWebhook(createWebhookParams))
}

export const getStepContent = (
  register: UseFormRegister<CreateWebhookFormSchema>,
  getValues: UseFormGetValues<CreateWebhookFormSchema>,
  errors: DeepMap<Partial<CreateWebhookFormSchema>, FieldError>,
  webhookQueryParams: WebhookQueryParams,
): StepsVerticalStep[] => {
  return [
    {
      item: '1',
      content: <WebhooksNewApp register={register} errors={errors} webhookQueryParams={webhookQueryParams} />,
    },
    {
      item: '2',
      content: <WebhooksNewUrl register={register} errors={errors} />,
    },
    {
      item: '3',
      content: <WebhooksNewTopics register={register} errors={errors} getValues={getValues} />,
    },
    {
      item: '4',
      content: <WebhooksNewCustomers register={register} errors={errors} getValues={getValues} />,
    },
    {
      item: '5',
      content: <WebhooksNewStatus register={register} />,
    },
  ]
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

export const WebhooksNew: FC<WebhooksNewProps> = ({ webhookQueryParams, selectAppIdHandler }) => {
  const {
    register,
    getValues,
    handleSubmit,
    trigger,
    formState: { errors },
  } = useForm<CreateWebhookFormSchema>({
    resolver: yupResolver(schema),
    defaultValues: {
      applicationId: webhookQueryParams.applicationId,
    },
  })
  const dispatch = useDispatch()
  const history = useHistory()
  const { success, error } = useSnack()
  const [selectedStep, setSelectedStep] = useState<string>('1')
  const webhookCreateEditState = useSelector(selectWebhookCreateEditState)
  const steps = getStepContent(register, getValues, errors, webhookQueryParams)
  const currentStep = steps.find((step) => step.item === selectedStep)
  const currentStepIndex = currentStep ? steps.indexOf(currentStep) : 0
  const nextStep = currentStepIndex < 4 ? String(currentStepIndex + 2) : null
  const formValues = getValues()
  const { applicationId } = formValues

  useEffect(handleWebhookCreation(success, error, webhookCreateEditState, applicationId, dispatch, history), [
    webhookCreateEditState,
  ])

  useEffect(() => selectAppIdHandler(undefined, applicationId), [applicationId])

  useEffect(() => {
    if (webhookQueryParams.applicationId) {
      handleSwitchStep(selectedStep, trigger, setSelectedStep)()
    }
  }, [])

  return (
    <form
      className={elMt11}
      onSubmit={handleSubmit(handleSubmitWebhook(dispatch))}
      onChange={handleSwitchStep(selectedStep, trigger, setSelectedStep)}
    >
      <StepsVertical steps={steps} selectedStep={selectedStep} onStepClick={setSelectedStep} />
      {!nextStep && (
        <ButtonGroup className={elMb11} alignment="right">
          <Button
            intent="critical"
            size={2}
            chevronRight
            type="submit"
            disabled={webhookCreateEditState === WebhookCreateEditState.LOADING}
          >
            Create
          </Button>
        </ButtonGroup>
      )}
    </form>
  )
}
