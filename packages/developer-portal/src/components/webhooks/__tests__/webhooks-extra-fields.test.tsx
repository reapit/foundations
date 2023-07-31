import React from 'react'
import { render } from '../../../tests/react-testing'
import { WebhooksExtraFields } from '../webhooks-extra-fields'
import { UseFormGetValues } from 'react-hook-form'
import { CreateWebhookFormSchema } from '../webhooks-new'

describe('WebhooksExtraFields', () => {
  it('should match a snapshot', () => {
    const getValues = jest.fn(() => ({
      topicIds: 'SOME_ID',
      url: 'https://example.com',
      customerIds: 'SOME_ID',
      ignoreEtagOnlyChanges: false,
      active: true,
    })) as unknown as UseFormGetValues<CreateWebhookFormSchema>
    expect(render(<WebhooksExtraFields register={jest.fn()} errors={{}} getValues={getValues} />)).toMatchSnapshot()
  })
})
