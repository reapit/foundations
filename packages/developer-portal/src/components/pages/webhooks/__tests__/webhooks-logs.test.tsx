import React from 'react'
import { WebhooksLogs } from '../webhooks-logs'
import { render } from '../../../../tests/react-testing'

jest.mock('../state/use-webhooks-state')

describe('WebhooksLogs', () => {
  it('should match a snapshot where there are logs', () => {
    expect(render(<WebhooksLogs />)).toMatchSnapshot()
  })
})
