import { ReduxState } from '../../../types/core'
import { selectWebhookLogs } from '../webhook-logs'
import { mockWebhookLogs, topics } from '../../../sagas/__stubs__/webhooks'
import appState from '../../../reducers/__stubs__/app-state'

const input = {
  ...appState,
  webhookLogs: {
    list: {
      topics: topics._embedded,
      logs: mockWebhookLogs,
      isLoading: false,
      errorMessage: '',
    },
  },
} as ReduxState

describe('webhook logs', () => {
  describe('selectWebhookLogs', () => {
    it('should correctly return the state', () => {
      const result = selectWebhookLogs(input)
      expect(result).toEqual(input.webhookLogs.list)
    })
  })
})
