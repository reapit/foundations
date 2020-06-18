import { fetcher } from '@reapit/elements'
import { URLS } from './constants'
import { generateHeader } from './utils'
import { logger } from '@reapit/utils'
import { FetchListCommonParams } from './types'
import { stringify } from 'query-string'
export type FetchSubscriptionsListParams = FetchListCommonParams & {
  developerId: string
  subscriptionType?: 'applicationListing' | 'developerRegistration' | 'developerEdition'
}

export type SubscriptionModel = {
  id: string
  created: string
  cancelled: string
  renews: string
  developerId: string
  applicationId: string
  user: string
  type: string
  summary: string
  cost: number
  frequency: string
  links?: any
}

export type SubscriptionsListResult = {
  data: SubscriptionModel[]
  pageNumber: number
  pageSize: number
  pageCount: number
  totalCount: number
}

export type CreateSubscriptionParams = {
  developerId: string
  applicationId: string
  user: string
  type: 'applicationListing' | 'developerRegistration' | 'developerEdition'
}

export type DeleteSubscriptionParams = {
  id: string
}

export const fetchSubscriptionsList = async (
  params: FetchSubscriptionsListParams,
): Promise<SubscriptionsListResult> => {
  try {
    const response = await fetcher({
      url: `${URLS.subscriptions}?${stringify(params)}`,
      api: window.reapit.config.marketplaceApiUrl,
      method: 'GET',
      headers: generateHeader(window.reapit.config.marketplaceApiKey),
    })
    return response as SubscriptionsListResult
  } catch (error) {
    logger(error)
    throw error
  }
}

export const createSubscription = async (params: CreateSubscriptionParams) => {
  try {
    const response = await fetcher({
      url: URLS.subscriptions,
      api: window.reapit.config.marketplaceApiUrl,
      method: 'POST',
      headers: generateHeader(window.reapit.config.marketplaceApiKey),
      body: params,
    })
    return response
  } catch (error) {
    logger(error)
    throw error
  }
}

export const deleteSubscription = async (params: DeleteSubscriptionParams) => {
  const { id } = params
  try {
    const response = await fetcher({
      url: `${URLS.subscriptions}/${id}`,
      api: window.reapit.config.marketplaceApiUrl,
      method: 'DELETE',
      headers: generateHeader(window.reapit.config.marketplaceApiKey),
    })
    return response
  } catch (error) {
    logger(error)
    throw error
  }
}
