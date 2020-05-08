import { URLS, initAuthorizedRequestHeaders } from '@/constants/api'
import { fetcher, setQueryParams } from '@reapit/elements'

export interface FetchWebhookTopicParams {
  applicationId: string
  sortBy?: string
  pageSize?: string
  pageNumber?: string
}

export const fetchWebhookTopic = async (params: FetchWebhookTopicParams) => {
  const headers = await initAuthorizedRequestHeaders()
  const response = await fetcher({
    url: `${URLS.webhookTopics}?${setQueryParams(params)}`,
    api: window.reapit.config.platformApiUrl,
    method: 'GET',
    headers: headers,
  })
  return response
}
