import { fetchWebhookTopic } from '../topics'
import { initAuthorizedRequestHeaders } from '@/constants/api'
import { fetcher } from '@reapit/elements'

describe('should fetchWebhookTopic run correctly', () => {
  it('initAuthorizedRequestHeaders should be called', () => {
    const applicationId = 'applicationId'
    fetchWebhookTopic({ applicationId })
      .then(() => {
        expect(initAuthorizedRequestHeaders).toBeCalled()
      })
      .then(() => {
        expect(fetcher).toBeCalledWith()
      })
  })
})
