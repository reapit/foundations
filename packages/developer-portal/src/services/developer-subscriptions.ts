import { fetcher, setQueryParams } from '@reapit/elements'
import {
  SubscriptionModel,
  SubscriptionModelPagedResult,
  CreateSubscriptionModel,
} from '@reapit/foundations-ts-definitions'
import { stringify } from 'query-string'
import { URLS } from './constants'
import { getPlatformHeaders, logger } from '@reapit/utils'
import { FetchListCommonParams } from './types'
import { reapitConnectBrowserSession } from '../core/connect-session'

export type FetchSubscriptionsListParams = FetchListCommonParams & {
  developerId: string
  subscriptionType?: 'applicationListing' | 'developerRegistration' | 'developerEdition'
}

export type DeleteSubscriptionParams = {
  id: string
}

export const fetchSubscriptionsList = async (
  params: FetchSubscriptionsListParams,
): Promise<SubscriptionModelPagedResult> => {
  try {
    const response = await fetcher({
      url: `${URLS.developerSubscriptions}?${stringify(params)}`,
      api: window.reapit.config.platformApiUrl,
      method: 'GET',
      headers: await getPlatformHeaders(reapitConnectBrowserSession, 'latest'),
    })
    return response as SubscriptionModelPagedResult
  } catch (error) {
    logger(error)
    throw error
  }
}

export const createDeveloperSubscription = async (params: CreateSubscriptionModel): Promise<SubscriptionModel> => {
  try {
    const response = await fetcher({
      url: `${URLS.developerSubscriptions}?${setQueryParams(params)}`,
      api: window.reapit.config.platformApiUrl,
      method: 'POST',
      body: params,
      headers: await getPlatformHeaders(reapitConnectBrowserSession, 'latest'),
    })
    return response
  } catch (error) {
    logger(error)
    throw new Error(error)
  }
}

export const deleteSubscription = async (params: DeleteSubscriptionParams) => {
  const { id } = params
  try {
    const response = await fetcher({
      url: `${URLS.developerSubscriptions}/${id}`,
      api: window.reapit.config.platformApiUrl,
      method: 'DELETE',
      headers: await getPlatformHeaders(reapitConnectBrowserSession, 'latest'),
    })
    return response
  } catch (error) {
    logger(error)
    throw error
  }
}
