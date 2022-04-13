import React from 'react'
import { render } from '../../../tests/react-testing'
import { WebhooksNewUrl } from '../webhooks-new-url'

describe('WebhooksNewUrl', () => {
  it('should match a snapshot', () => {
    expect(render(<WebhooksNewUrl register={jest.fn()} errors={{}} />)).toMatchSnapshot()
  })
})
