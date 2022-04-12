import React from 'react'
import { WebhooksNewApp } from '../webhooks-new-app'
import { render } from '../../../../tests/react-testing'

jest.mock('../state/use-webhooks-state')

describe('WebhooksNewApp', () => {
  it('should match a snapshot where there are apps', () => {
    expect(render(<WebhooksNewApp register={jest.fn()} errors={{}} />)).toMatchSnapshot()
  })
})
