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

export const fetchSubscriptionsList = async (
  params: FetchSubscriptionsListParams,
): Promise<SubscriptionModelPagedResult> => {
  try {
    const response = await fetcher({
      url: `${URLS.subscriptions}/?${setQueryParams(params)}`,
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
