import React from 'react'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import appState from '../../../../reducers/__stubs__/app-state'
import { mount } from 'enzyme'
import { handleDownloadPayload, handleFilterChange, WebhooksLogsTable } from '../webhook-logs-table'
import { mockWebhookLogs, topics } from '../../../../sagas/__stubs__/webhooks'
import { fetchWebhookLogs } from '../../../../actions/webhook-logs/webhook-logs'
import FileSaver from 'file-saver'

describe('WebhooksLogsTable', () => {
  // let store
  // let spyDispatch
  // beforeEach(() => {
  //   /* mocking store */
  //   const mockStore = configureStore()
  //   store = mockStore(appState)
  //   spyDispatch = jest.spyOn(ReactRedux, 'useDispatch').mockImplementation(() => store.dispatch)
  // })

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
    const applicationOptions = [{ name: 'Some App Name', value: 'SOME_ID', label: 'Some label' }]

    expect(
      mount(
        <Provider store={store}>
          <WebhooksLogsTable applicationOptions={applicationOptions} />
        </Provider>,
      ),
    ).toMatchSnapshot()
  })

  it('should handle filter changes', () => {
    const mockDispatch = jest.fn()
    const curried = handleFilterChange(mockDispatch)
    const mockFormValues = {
      applicationId: 'SOME_ID',
      to: new Date('2021-04-01'),
      from: new Date('2021-03-01'),
    }
    const formatted = {
      applicationId: 'SOME_ID',
      to: '2021-04-01T00:00:00',
      from: '2021-03-01T00:00:00',
    }
    curried(mockFormValues)
    expect(mockDispatch).toHaveBeenCalledWith(fetchWebhookLogs(formatted))
  })

  it('should handle dowloading the payload', () => {
    const spySaveAsFunc = jest.spyOn(FileSaver, 'saveAs')
    const payload = JSON.stringify({ applicationId: 'SOME_ID' })
    const dataBlob = new Blob([payload], { type: 'application/json;charset=utf-8;' })
    const curried = handleDownloadPayload(payload)

    curried()

    expect(spySaveAsFunc).toHaveBeenCalledWith(dataBlob, 'webhook-logs-payload.json')
  })
})
