import React, { Dispatch, FC, SetStateAction, useEffect, useState } from 'react'
import { Button, StepsVertical, ButtonGroup, elMt11, StepsVerticalStep, elMb11 } from '@reapit/elements'
import { DeepMap, FieldError, useForm, UseFormGetValues, UseFormRegister, UseFormTrigger } from 'react-hook-form'
import { WebhooksNewApp } from './webhooks-new-app'
import { WebhooksNewUrl } from './webhooks-new-url'
import { WebhooksNewTopics } from './webhooks-new-topics'
import { WebhooksNewCustomers } from './webhooks-new-customers'
import { WebhooksNewStatus } from './webhooks-new-status'
import { yupResolver } from '@hookform/resolvers/yup'
import { SchemaOf, boolean, object, string } from 'yup'
import errorMessages from '../../constants/error-messages'
import { httpsUrlRegex } from '@reapit/utils-common'
import Routes from '../../constants/routes'
import { NavigateFunction, useNavigate } from 'react-router'
import { createCta } from './__styles__'
import { cx } from '@linaria/core'
import { useWebhooksState } from './state/use-webhooks-state'
import { handleSelectFilters } from './webhooks-controls'
import { SendFunction, useReapitUpdate, UpdateActionNames, updateActions } from '@reapit/use-reapit-data'
import { CreateWebhookModel } from '../../types/webhooks'
import { reapitConnectBrowserSession } from '../../core/connect-session'

export interface CreateWebhookFormSchema {
  applicationId: string
  url: string
  topicIds: string
  customerIds: string
  ignoreEtagOnlyChanges?: boolean
  active?: boolean
}

const schema: SchemaOf<CreateWebhookFormSchema> = object().shape({
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
      let step: string | null

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
    validateStep().catch((error) => console.error(error))
  }

export const handleSubmitWebhook =
  (createWebhook: SendFunction<CreateWebhookModel, boolean>, isSending: boolean) =>
  (values: CreateWebhookFormSchema) => {
    if (isSending) {
      return
    }
    const { applicationId, url, topicIds, customerIds, ignoreEtagOnlyChanges, active } = values
    const splitCustomerIds = customerIds.split(',').filter(Boolean)
    const customers = customerIds.includes('ALL') ? [] : splitCustomerIds
    const topics = topicIds.split(',').filter(Boolean)

    const createWebhookParams: CreateWebhookModel = {
      applicationId,
      url,
      topicIds: topics,
      customerIds: customers,
      ignoreEtagOnlyChanges,
      active,
    }
    createWebhook(createWebhookParams)
  }

export const getStepContent = (
  register: UseFormRegister<CreateWebhookFormSchema>,
  getValues: UseFormGetValues<CreateWebhookFormSchema>,
  errors: DeepMap<Partial<CreateWebhookFormSchema>, FieldError>,
): StepsVerticalStep[] => {
  return [
    {
      item: '1',
      content: <WebhooksNewApp register={register} errors={errors} />,
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
  (applicationId: string, navigate: NavigateFunction, webhookCreated?: boolean) => () => {
    if (webhookCreated) {
      navigate(`${Routes.WEBHOOKS_MANAGE}?applicationId=${applicationId}`)
    }
  }

export const WebhooksNew: FC = () => {
  const { webhooksFilterState, setWebhooksFilterState } = useWebhooksState()
  const {
    register,
    getValues,
    handleSubmit,
    trigger,
    formState: { errors },
  } = useForm<CreateWebhookFormSchema>({
    resolver: yupResolver(schema),
    defaultValues: {
      applicationId: webhooksFilterState.applicationId,
    },
  })
  const navigate = useNavigate()
  const [selectedStep, setSelectedStep] = useState<string>('1')
  const steps = getStepContent(register, getValues, errors)
  const currentStep = steps.find((step) => step.item === selectedStep)
  const currentStepIndex = currentStep ? steps.indexOf(currentStep) : 0
  const nextStep = currentStepIndex < 4 ? String(currentStepIndex + 2) : null
  const formValues = getValues()
  const { applicationId } = formValues

  const [webhookCreating, , createWebhook, createWebhookSuccess] = useReapitUpdate<CreateWebhookModel, boolean>({
    reapitConnectBrowserSession,
    action: updateActions[UpdateActionNames.createWebhook],
    method: 'POST',
  })

  useEffect(handleWebhookCreation(applicationId, navigate, createWebhookSuccess), [createWebhookSuccess])

  useEffect(() => handleSelectFilters(setWebhooksFilterState, navigate)(undefined, applicationId), [applicationId])

  useEffect(() => {
    if (webhooksFilterState.applicationId) {
      handleSwitchStep(selectedStep, trigger, setSelectedStep)()
    }
  }, [])

  return (
    <form
      className={elMt11}
      onSubmit={handleSubmit(handleSubmitWebhook(createWebhook, webhookCreating || false))}
      onChange={handleSwitchStep(selectedStep, trigger, setSelectedStep)}
    >
      <StepsVertical steps={steps} selectedStep={selectedStep} onStepClick={setSelectedStep} />
      {!nextStep && (
        <ButtonGroup className={cx(elMb11, createCta)} alignment="left">
          <Button
            intent="critical"
            size={2}
            chevronRight
            type="submit"
            disabled={webhookCreating}
            loading={webhookCreating}
          >
            Create
          </Button>
        </ButtonGroup>
      )}
    </form>
  )
}

export default WebhooksNew
