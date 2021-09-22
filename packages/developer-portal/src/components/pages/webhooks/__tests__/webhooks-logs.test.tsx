import React from 'react'
import { WebhooksLogs } from '../webhooks-logs'
import { appState } from '../../../../reducers/__stubs__/app-state'
import { reduxTestState, render } from '../../../../tests/react-testing'

const webhookQueryParams = {
  applicationId: 'SOME_ID',
  to: 'TO',
  from: 'FROM',
}

describe('WebhooksLogs', () => {
  it('should match a snapshot where there are logs', () => {
    expect(render(<WebhooksLogs webhookQueryParams={webhookQueryParams} />)).toMatchSnapshot()
  })

  it('should match a snapshot where there are no logs', () => {
    reduxTestState.setState({
      webhookLogs: {
        list: {
          ...appState.webhookLogs.list,
          logs: [],
        },
      },
    })
    expect(render(<WebhooksLogs webhookQueryParams={webhookQueryParams} />)).toMatchSnapshot()
    reduxTestState.resetState()
  })
})
