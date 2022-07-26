import { SubscriptionModelPagedResult, CreateSubscriptionModel } from '@reapit/foundations-ts-definitions'
import { fetcher, setQueryParams } from '@reapit/utils-common'
import { URLS } from './constants'
import { FetchListCommonParams } from './types'
import { getPlatformHeaders, logger } from '@reapit/utils-react'
import { reapitConnectBrowserSession } from '../core/connect-session'

export type FetchSubscriptionsListParams = FetchListCommonParams & {
  type?: string
  developerId?: string
  subscriptionType?: string
  applicationId?: string
  appName?: string
  developerName?: string
  status?: string
  userEmail?: string
}

export interface CancelSubscriptionParams {
  id: string
}

export const fetchSubscriptionListApi = async (
  params: FetchSubscriptionsListParams,
): Promise<SubscriptionModelPagedResult | void> => {
  try {
    const headers = await getPlatformHeaders(reapitConnectBrowserSession, 'latest')
    if (headers) {
      return fetcher({
        url: `${URLS.subscriptions}?${setQueryParams(params)}`,
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

export const cancelSubscriptionApi = async (params: CancelSubscriptionParams) => {
  try {
    const { id } = params
    const headers = await getPlatformHeaders(reapitConnectBrowserSession, 'latest')
    if (headers) {
      return fetcher({
        url: `${URLS.subscriptions}/${id}`,
        api: window.reapit.config.platformApiUrl,
        method: 'DELETE',
        headers,
      })
    }
  } catch (error) {
    logger(error as Error)
    throw error
  }
}

export const createSubscriptionApi = async (params: CreateSubscriptionModel) => {
  try {
    const headers = await getPlatformHeaders(reapitConnectBrowserSession, 'latest')
    if (headers) {
      return fetcher({
        url: `${URLS.subscriptions}`,
        api: window.reapit.config.platformApiUrl,
        method: 'POST',
        headers,
        body: params,
      })
    }
  } catch (error) {
    logger(error as Error)
    throw error
  }
}
