import { fetcher, setQueryParams } from '@reapit/utils-common'
import { getPlatformHeaders, logger } from '@reapit/utils-react'
import { URLS } from './constants'
import { reapitConnectBrowserSession } from '../core/connect-session'

export interface WebhookModel {
  id?: string
  created?: string
  modified?: string
  applicationId?: string
  url?: string
  description?: string
  topicIds?: string[]
  customerIds?: string[]
  active?: boolean
}

export type PagingLinkModel = {
  href?: string
}

export interface PagedResultWebhookModel {
  _embedded?: WebhookModel[]
  pageNumber?: number
  pageSize?: number
  pageCount?: number
  totalCount?: number
  _links?: {
    [key: string]: PagingLinkModel
  }
}

export interface FetchWebhooksParms {
  pageNumber?: number
  pageSize?: number
  sortBy?: string
  applicationId?: string[]
  active?: boolean
}

export const fetchWebookSubscriptions = async (params: FetchWebhooksParms): Promise<PagedResultWebhookModel | void> => {
  try {
    const headers = await getPlatformHeaders(reapitConnectBrowserSession, 'latest')
    if (headers) {
      return fetcher({
        url: `${URLS.webhookSubscriptions}?${setQueryParams(params)}`,
        api: window.reapit.config.platformApiUrl,
        method: 'GET',
        headers,
      })
    }
  } catch (error) {
    logger(error as Error)
    throw error
  }
}
