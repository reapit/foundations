import { fetchWebhookTopic } from '../topics'
import * as API from '@/constants/api'
import * as Element from '@reapit/elements'

describe('should fetchWebhookTopic run correctly', () => {
  it('initAuthorizedRequestHeaders should be called', async () => {
    const applicationId = 'applicationId'
    const url = `${API.URLS.webhookTopics}?${Element.setQueryParams({ applicationId })}`
    const method = 'GET'
    const api = window.reapit.config.platformApiUrl

    const fetcher = spyOn(Element, 'fetcher')
    const spyInitAuthorizedRequestHeaders = spyOn(API, 'initAuthorizedRequestHeaders').and.returnValue(
      Promise.resolve('headers'),
    )

    fetchWebhookTopic({ applicationId }).then(() => {
      expect(spyInitAuthorizedRequestHeaders).toBeCalled()
      expect(fetcher).toBeCalledWith({
        url,
        headers: 'headers',
        method,
        api,
      })
    })
  })
})
