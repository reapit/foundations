import { fetcher, setQueryParams } from '@reapit/utils-common'
import {
  SubscriptionModel,
  SubscriptionModelPagedResult,
  CreateSubscriptionModel,
} from '@reapit/foundations-ts-definitions'
import { stringify } from 'query-string'
import { URLS } from './constants'
import { getPlatformHeaders, logger } from '@reapit/utils-react'
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
): Promise<SubscriptionModelPagedResult | void> => {
  try {
    const headers = await getPlatformHeaders(reapitConnectBrowserSession, 'latest')
    if (headers) {
      const response = await fetcher({
        url: `${URLS.developerSubscriptions}?${stringify(params)}`,
        api: window.reapit.config.platformApiUrl,
        method: 'GET',
        headers,
      })

      return response as SubscriptionModelPagedResult
    }
  } catch (error) {
    logger(error as Error)
    throw error
  }
}

export const createDeveloperSubscription = async (
  params: CreateSubscriptionModel,
): Promise<SubscriptionModel | void> => {
  try {
    const headers = await getPlatformHeaders(reapitConnectBrowserSession, 'latest')
    if (headers) {
      const response = await fetcher({
        url: `${URLS.developerSubscriptions}?${setQueryParams(params)}`,
        api: window.reapit.config.platformApiUrl,
        method: 'POST',
        body: params,
        headers,
      })

      return response
    }
  } catch (error) {
    logger(error as Error)
    throw error
  }
}

export const deleteSubscription = async (params: DeleteSubscriptionParams) => {
  const { id } = params
  try {
    const headers = await getPlatformHeaders(reapitConnectBrowserSession, 'latest')
    if (headers) {
      const response = await fetcher({
        url: `${URLS.developerSubscriptions}/${id}`,
        api: window.reapit.config.platformApiUrl,
        method: 'DELETE',
        headers,
      })

      return response
    }
  } catch (error) {
    logger(error as Error)
    throw error
  }
}
