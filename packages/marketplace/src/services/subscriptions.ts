import { URLS, initAuthorizedRequestHeaders } from '@/constants/api'
import { fetcher } from '@reapit/elements'
import { logger } from 'logger'

export type WebhookPingTestParams = {
  id: string
  topicId: string
}

export const webhookPingTestSubcription = async (params: WebhookPingTestParams) => {
  try {
    const { id, topicId } = params
    const headers = await initAuthorizedRequestHeaders()
    const response = await fetcher({
      url: `${URLS.webhook}/subscriptions/${id}/ping`,
      api: window.reapit.config.platformApiUrl,
      method: 'POST',
      headers: headers,
      body: { topicId },
    })
    return response
  } catch (error) {
    logger(error)
    throw new Error(error)
  }
}
