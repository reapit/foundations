import React from 'react'
import { WebhooksManage } from '../webhooks-manage'
import { appState } from '../../../../reducers/__stubs__/app-state'
import { reduxTestState, render } from '../../../../tests/react-testing'

const webhookQueryParams = {
  applicationId: 'SOME_ID',
  to: 'TO',
  from: 'FROM',
}

describe('WebhooksManage', () => {
  it('should match a snapshot where there are subscriptions', () => {
    expect(render(<WebhooksManage webhookQueryParams={webhookQueryParams} />)).toMatchSnapshot()
  })

  it('should match a snapshot where there is no app id', () => {
    expect(
      render(<WebhooksManage webhookQueryParams={{ ...webhookQueryParams, applicationId: '' }} />),
    ).toMatchSnapshot()
  })

  it('should match a snapshot where there are no subscriptions', () => {
    reduxTestState.setState({
      webhooksSubscriptions: {
        ...appState.webhooksSubscriptions,
        list: {
          ...appState.webhooksSubscriptions.list,
          _embedded: [],
        },
      },
    })
    expect(render(<WebhooksManage webhookQueryParams={webhookQueryParams} />)).toMatchSnapshot()
    reduxTestState.resetState()
  })
})
