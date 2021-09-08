import { fetcher } from '@reapit/elements-legacy'
import { WebhookLogsQuery } from '../../components/pages/webhooks/webhooks-logs'
import { mockWebhookLogs } from '../../sagas/__stubs__/webhooks'
import { fetchWebhookLogsApi } from '../webhooks'

jest.mock('@reapit/elements-legacy')
jest.mock('@reapit/utils')

const mockedFetch = fetcher as jest.Mock

describe('webhook services', () => {
  describe('fetchWebhookLogsApi', () => {
    const params: WebhookLogsQuery = { applicationId: 'SOME_ID', from: 'SOME_DATE_STRING', to: 'SOME_DATE_STRING' }

    it('should return a response from the  webhook logs service', async () => {
      mockedFetch.mockReturnValueOnce(mockWebhookLogs)
      expect(await fetchWebhookLogsApi(params)).toEqual(mockWebhookLogs)
    })
  })
})
