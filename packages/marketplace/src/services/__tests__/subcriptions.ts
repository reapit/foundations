import { webhookPingTestSubcription } from '../subscriptions'
import * as API from '@/constants/api'
import { fetcher } from '@reapit/elements'

jest.mock('@reapit/elements')

describe('should fetchMonthlyBilling run correctly', () => {
  it('fetcher should be called', () => {
    const id = 'applicationId'
    const topicId = 'topicId'

    const url = `${API.URLS.webhook}/subscriptions/${id}/ping`
    const spyInitAuthorizedRequestHeaders = spyOn(API, 'initAuthorizedRequestHeaders').and.returnValue(
      Promise.resolve('headers'),
    )
    webhookPingTestSubcription({ topicId, id }).then(() => {
      expect(spyInitAuthorizedRequestHeaders).toBeCalled()
      expect(fetcher).toBeCalledWith({
        headers: 'headers',
        url,
        api: window.reapit.config.platformApiUrl,
        method: 'POST',
        body: { topicId },
      })
    })
  })
})
