import React from 'react'
import { render } from '../../../../tests/react-testing'
import { WebhooksManage } from '../webhooks-manage'

jest.mock('../state/use-webhooks-state')

describe('WebhooksManage', () => {
  it('should match a snapshot where there are subscriptions', () => {
    expect(render(<WebhooksManage />)).toMatchSnapshot()
  })
})
