import React, { ReactElement } from 'react'
import {
  CreateWebhookFormSchema,
  getStepContent,
  handleSubmitWebhook,
  handleSwitchStep,
  WebhooksNew,
} from '../webhooks-new'
import { render } from '../../../tests/react-testing'
import { UseFormGetValues } from 'react-hook-form'
import { CreateWebhookModel } from '../../../types/webhooks'

jest.mock('../state/use-webhooks-state')

const steps = ['1', '2', '3', '4', '5']

describe('WebhooksNew', () => {
  it('should match a snapshot', () => {
    expect(render(<WebhooksNew />)).toMatchSnapshot()
  })
})

describe('handleSwitchStep', () => {
  const expectedResults = ['2', '3', '4', '5']
  steps.forEach((selectedStep, index) => {
    it(`should handle switching step for ${selectedStep}`, async () => {
      const trigger = jest.fn(() => new Promise<boolean>((resolve) => resolve(true)))
      const setSelectedStep = jest.fn()

      const curried = handleSwitchStep(selectedStep, trigger, setSelectedStep)

      curried()

      await new Promise<boolean>((resolve) => resolve(true))

      if (index < 4) {
        expect(setSelectedStep).toHaveBeenCalledWith(expectedResults[index])
      } else {
        expect(setSelectedStep).not.toHaveBeenCalled()
      }
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

      const steps = getStepContent(register, getValues, errors)
      steps.forEach(({ content }) => {
        expect(render(content as ReactElement)).toMatchSnapshot()
      })
    })
  })
})

describe('handleSubmitWebhook', () => {
  it('should handle the form submit', () => {
    const createWebhook = jest.fn()
    const values = {
      applicationId: 'SOME_ID',
      topicIds: 'SOME_ID',
      url: 'https://example.com',
      customerIds: '',
      ignoreEtagOnlyChanges: false,
      active: true,
    }
    const createWebhookModel: CreateWebhookModel = {
      ...values,
      topicIds: values.topicIds.split(',').filter(Boolean),
      customerIds: values.customerIds.split(',').filter(Boolean),
    }
    const curried = handleSubmitWebhook(createWebhook, false)
    curried(values)
    expect(createWebhook).toHaveBeenCalledWith(createWebhookModel)
  })
})
