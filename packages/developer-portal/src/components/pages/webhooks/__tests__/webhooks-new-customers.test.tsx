import React from 'react'
import { WebhooksNewCustomers } from '../webhooks-new-customers'
import { render } from '../../../../tests/react-testing'
import { CreateWebhookFormSchema } from '../webhooks-new'
import { UseFormGetValues } from 'react-hook-form'

jest.mock('../state/use-webhooks-state')

describe('WebhooksNewCustomers', () => {
  const getValues = jest.fn(() => ({
    topicIds: 'SOME_ID',
    url: 'https://example.com',
    customerIds: 'SOME_ID',
    ignoreEtagOnlyChanges: false,
    active: true,
  })) as unknown as UseFormGetValues<CreateWebhookFormSchema>

  it('should match a snapshot where there are customers', () => {
    expect(render(<WebhooksNewCustomers register={jest.fn()} getValues={getValues} errors={{}} />)).toMatchSnapshot()
  })
})
