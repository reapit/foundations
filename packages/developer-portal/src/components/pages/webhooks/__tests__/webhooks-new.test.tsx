import React, { MouseEvent } from 'react'
import {
  CreateWebhookFormSchema,
  getStepContent,
  handleSubmitWebhook,
  handleSwitchStep,
  steps,
  WebhooksNew,
} from '../webhooks-new'
import { render } from '../../../../tests/react-testing'
import { UseFormGetValues } from 'react-hook-form'
import {
  createWebhook,
  CreateWebhookParams,
  updateWebhookCreateEditState,
} from '../../../../actions/webhooks-subscriptions'
import { WebhookCreateEditState } from '../../../../reducers/webhooks-subscriptions/webhook-edit-modal'

const webhookQueryParams = {
  applicationId: 'SOME_ID',
  to: 'TO',
  from: 'FROM',
}

describe('WebhooksNew', () => {
  it('should match a snapshot', () => {
    expect(
      render(<WebhooksNew webhookQueryParams={webhookQueryParams} selectAppIdHandler={jest.fn()} />),
    ).toMatchSnapshot()
  })
})

describe('handleSwitchStep', () => {
  steps.forEach((selectedStep) => {
    it(`should handle switching step for ${selectedStep}`, async () => {
      const event = {
        preventDefault: jest.fn(),
        stopPropagation: jest.fn(),
      } as unknown as MouseEvent<HTMLButtonElement>
      const trigger = jest.fn(() => new Promise<boolean>((resolve) => resolve(true)))
      const setSelectedStep = jest.fn()

      const curried = handleSwitchStep(selectedStep, selectedStep, trigger, setSelectedStep)

      await curried(event)

      expect(setSelectedStep).toHaveBeenCalledWith(selectedStep)
    })
  })
})

describe('getStepContent', () => {
  steps.forEach((selectedStep) => {
    it(`should match a snapshot for step content ${selectedStep}`, () => {
      const register = jest.fn()
      const getValues = jest.fn(() => ({
        topicIds: 'SOME_ID',
        url: 'https://example.com',
        customerIds: 'SOME_ID',
        ignoreEtagOnlyChanges: false,
        active: true,
      })) as unknown as UseFormGetValues<CreateWebhookFormSchema>
      const errors = {}
      const webhookQueryParams = {
        applicationId: 'SOME_ID',
        to: 'TO',
        from: 'FROM',
      }

      expect(render(getStepContent(selectedStep, register, getValues, errors, webhookQueryParams))).toMatchSnapshot()
    })
  })
})

describe('handleSubmitWebhook', () => {
  it('should handle the form submit', () => {
    const dispatch = jest.fn()
    const values = {
      applicationId: 'SOME_ID',
      topicIds: 'SOME_ID',
      url: 'https://example.com',
      customerIds: '',
      ignoreEtagOnlyChanges: false,
      active: true,
    }
    const createWebhookParams: CreateWebhookParams = {
      ...values,
      topicIds: values.topicIds.split(','),
      customerIds: values.customerIds.split(','),
    }
    const curried = handleSubmitWebhook(dispatch)
    curried(values)
    expect(dispatch).toHaveBeenCalledWith(updateWebhookCreateEditState(WebhookCreateEditState.LOADING))
    expect(dispatch).toHaveBeenLastCalledWith(createWebhook(createWebhookParams))
  })
})
