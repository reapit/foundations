import React from 'react'
import { render } from '../../../tests/react-testing'
import { WebhooksNewStatus } from '../webhooks-new-status'

describe('WebhooksNewStatus', () => {
  it('should match a snapshot', () => {
    expect(render(<WebhooksNewStatus register={jest.fn()} />)).toMatchSnapshot()
  })
})
