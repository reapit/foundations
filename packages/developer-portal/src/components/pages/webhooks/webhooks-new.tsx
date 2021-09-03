import React, { Dispatch, FC, SetStateAction, useState } from 'react'
import { Button, Steps, ButtonGroup, ColSplit, Grid, elMlAuto } from '@reapit/elements'
import { Control, useForm, UseFormRegister } from 'react-hook-form'
import { WebhooksNewApp } from './webhooks-new-app'
import { WebhooksNewUrl } from './webhooks-new-url'
import { WebhooksNewTopics } from './webhooks-new-topics'
import { WebhooksNewCustomers } from './webhooks-new-customers'
import { WebhooksNewStatus } from './webhooks-new-status'
import { gridControlsMinHeight, StepContentContainer } from './__styles__'
import { CreateWebhookParams } from '../../../actions/webhooks-subscriptions'

export const steps = ['1', '2', '3', '4', '5']

export const handleSwitchStep = (step: string, setSelectedStep: Dispatch<SetStateAction<string>>) => () => {
  setSelectedStep(step)
}

export const handleSubmitWebhook = () => (values: CreateWebhookParams) => {
  console.log('submitting', values)
}

export const getStepContent = (
  step: string,
  register: UseFormRegister<CreateWebhookParams>,
  control: Control<CreateWebhookParams, object>,
) => {
  switch (step) {
    case '1':
      return <WebhooksNewApp register={register} />
    case '2':
      return <WebhooksNewUrl register={register} />
    case '3':
      return <WebhooksNewTopics control={control} />
    case '4':
      return <WebhooksNewCustomers control={control} />
    case '5':
      return <WebhooksNewStatus register={register} />
    default:
      return <WebhooksNewApp register={register} />
  }
}

export const WebhooksNew: FC = () => {
  const { register, control, handleSubmit } = useForm<CreateWebhookParams>()
  const [selectedStep, setSelectedStep] = useState<string>('1')
  const currentStepIndex = steps.indexOf(selectedStep)
  const nextStep = currentStepIndex < 4 ? String(currentStepIndex + 2) : null
  const prevStep = currentStepIndex > 0 ? String(currentStepIndex) : null

  return (
    <form onSubmit={handleSubmit(handleSubmitWebhook())}>
      <StepContentContainer>{getStepContent(selectedStep, register, control)}</StepContentContainer>
      <Grid className={gridControlsMinHeight}>
        <ColSplit>
          <Steps steps={steps} selectedStep={selectedStep} onStepClick={setSelectedStep} />
        </ColSplit>
        <ColSplit>
          <ButtonGroup className={elMlAuto}>
            {prevStep && (
              <Button intent="secondary" size={2} onClick={handleSwitchStep(prevStep, setSelectedStep)} type="button">
                Prev
              </Button>
            )}
            {nextStep ? (
              <Button
                intent="primary"
                size={2}
                chevronRight
                onClick={handleSwitchStep(nextStep, setSelectedStep)}
                type="button"
              >
                Next
              </Button>
            ) : (
              <Button intent="critical" size={2} chevronRight type="submit">
                Create
              </Button>
            )}
          </ButtonGroup>
        </ColSplit>
      </Grid>
    </form>
  )
}
