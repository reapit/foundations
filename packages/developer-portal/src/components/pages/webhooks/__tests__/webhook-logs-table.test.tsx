import React from 'react'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import appState from '../../../../reducers/__stubs__/app-state'
import { mount } from 'enzyme'
import { handleDownloadPayload, handleFilterChange, WebhooksLogs } from '../webhooks-logs'
import { mockWebhookLogs, topics } from '../../../../sagas/__stubs__/webhooks'
import { fetchWebhookLogs } from '../../../../actions/webhook-logs/webhook-logs'
import FileSaver from 'file-saver'
import { WebhookQueryParams } from '../webhooks'

describe('WebhooksLogsTable', () => {
  it('should match a snapshot where there are logs', () => {
    const mockStore = configureStore()
    const store = mockStore({
      ...appState,
      webhookLogs: {
        list: {
          ...appState.webhookLogs.list,
          logs: mockWebhookLogs,
          topics: topics._embedded,
        },
      },
    })

    expect(
      mount(
        <Provider store={store}>
          <WebhooksLogs webhookQueryParams={{} as WebhookQueryParams} />
        </Provider>,
      ),
    ).toMatchSnapshot()
  })

  it('should handle filter changes', () => {
    const mockDispatch = jest.fn()
    const curried = handleFilterChange(mockDispatch, {
      applicationId: 'SOME_ID',
      to: '2021-04-01',
      from: '2021-03-01',
    } as WebhookQueryParams)

    const formatted = {
      applicationId: 'SOME_ID',
      to: '2021-04-01T00:00:00',
      from: '2021-03-01T00:00:00',
    }
    curried()
    expect(mockDispatch).toHaveBeenCalledWith(fetchWebhookLogs(formatted))
  })

  it('should handle dowloading the payload', () => {
    const spySaveAsFunc = jest.spyOn(FileSaver, 'saveAs')
    const payload = JSON.stringify({ applicationId: 'SOME_ID' })
    const dataBlob = new Blob([payload], { type: 'application/json;charset=utf-8;' })
    const timestamp = 'some-date-time'
    const curried = handleDownloadPayload(payload, timestamp)

    curried()

    expect(spySaveAsFunc).toHaveBeenCalledWith(dataBlob, `webhook-logs-payload-${timestamp}.json`)
  })
})
