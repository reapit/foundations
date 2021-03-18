import { SubscriptionModelPagedResult, CreateSubscriptionModel } from '@reapit/foundations-ts-definitions'
import { fetcher, setQueryParams } from '@reapit/elements'
import { URLS } from './constants'
import { FetchListCommonParams } from './types'
import { getPlatformHeaders, logger } from '@reapit/utils'
import { reapitConnectBrowserSession } from '../core/connect-session'

export type FetchSubscriptionsListParams = FetchListCommonParams & {
  type?: string
  developerId?: string
  subscriptionType?: string
  applicationId?: string
}

export interface CancelSubscriptionParams {
  id: string
}

export const fetchSubscriptionListApi = async (
  params: FetchSubscriptionsListParams,
): Promise<SubscriptionModelPagedResult> => {
  try {
    const response = await fetcher({
      url: `${URLS.subscriptions}?${setQueryParams(params)}`,
      api: window.reapit.config.platformApiUrl,
      method: 'GET',
      headers: await getPlatformHeaders(reapitConnectBrowserSession, 'latest'),
    })
    return response
  } catch (error) {
    logger(error)
    throw error
  }
}

export const cancelSubscriptionApi = async (params: CancelSubscriptionParams) => {
  try {
    const { id } = params
    const response = await fetcher({
      url: `${URLS.subscriptions}/${id}`,
      api: window.reapit.config.platformApiUrl,
      method: 'DELETE',
      headers: await getPlatformHeaders(reapitConnectBrowserSession, 'latest'),
    })
    return response
  } catch (error) {
    logger(error)
    throw error?.response
  }
}

export const createSubscriptionApi = async (params: CreateSubscriptionModel) => {
  try {
    const response = await fetcher({
      url: `${URLS.subscriptions}`,
      api: window.reapit.config.platformApiUrl,
      method: 'POST',
      headers: await getPlatformHeaders(reapitConnectBrowserSession, 'latest'),
      body: params,
    })
    return response
  } catch (error) {
    logger(error)
    throw error?.response
  }
}
