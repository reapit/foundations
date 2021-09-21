import React from 'react'
import { mount } from 'enzyme'
import { WebhooksLogs } from '../webhooks-logs'
import { webhookDataStub } from '../../../../sagas/__stubs__/webhook-edit'
import { ReduxState } from '../../../../types/core'
import configureStore from 'redux-mock-store'
import appState from '../../../../reducers/__stubs__/app-state'
import { Provider } from 'react-redux'
import { mockWebhookLogs } from '../../../../sagas/__stubs__/webhooks'

const mockState = {
  ...appState,
  webhooksSubscriptions: {
    edit: webhookDataStub,
  },
} as ReduxState

describe('WebhooksLogs', () => {
  it('should match a snapshot where there are no logs', () => {
    const mockStore = configureStore()
    const store = mockStore(mockState)
    expect(
      mount(
        <Provider store={store}>
          <WebhooksLogs
            webhookQueryParams={{
              applicationId: 'SOME_ID',
              to: 'TO',
              from: 'FROM',
            }}
          />
        </Provider>,
      ),
    ).toMatchSnapshot()
  })

  it('should match a snapshot where there are logs', () => {
    const mockStore = configureStore()
    const store = mockStore({
      ...mockState,
      webhookLogs: {
        list: {
          logs: mockWebhookLogs,
        },
      },
    })
    expect(
      mount(
        <Provider store={store}>
          <WebhooksLogs
            webhookQueryParams={{
              applicationId: 'SOME_ID',
              to: 'TO',
              from: 'FROM',
            }}
          />
        </Provider>,
      ),
    ).toMatchSnapshot()
  })
})
