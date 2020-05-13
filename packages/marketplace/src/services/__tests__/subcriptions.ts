import { webhookPingTestSubcription } from '../subscriptions'
import * as Element from '@reapit/elements'
import * as API from '@/constants/api'

describe('should fetchMonthlyBilling run correctly', () => {
  it('fetcher should be called', () => {
    const id = 'applicationId'
    const topicId = 'topicId'

    const url = `${API.URLS.webhook}/subscriptions/${id}/ping`
    const fetcher = spyOn(Element, 'fetcher')
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
