import { SubscriptionModelPagedResult } from '@reapit/foundations-ts-definitions'
import { fetcher, setQueryParams } from '@reapit/elements'
import { URLS } from './constants'
import { FetchListCommonParams } from './types'
import { generateHeaders } from './utils'
import { logger } from '@reapit/utils'

export type FetchSubscriptionsListParams = FetchListCommonParams & {
  type: string
  developerId: string
}

export interface CancelSubscriptionParams {
  id: string
}

export const fetchSubscriptionsList = async (
  params: FetchSubscriptionsListParams,
): Promise<SubscriptionModelPagedResult> => {
  try {
    const response = await fetcher({
      url: `${URLS.subscriptions}?${setQueryParams(params)}`,
      api: window.reapit.config.platformApiUrl,
      method: 'GET',
      headers: await generateHeaders(),
    })
    return response
  } catch (error) {
    logger(error)
    throw error
  }
}

export const cancelSubscription = async (params: CancelSubscriptionParams) => {
  try {
    const { id } = params
    const response = await fetcher({
      url: `${URLS.subscriptions}/${id}`,
      api: window.reapit.config.platformApiUrl,
      method: 'DELETE',
      headers: await generateHeaders(),
    })
    return response
  } catch (error) {
    logger(error)
    throw error?.response
  }
}
