import { fetcher, setQueryParams } from '@reapit/elements'
import { LinkModel } from '@reapit/foundations-ts-definitions'
import { stringify } from 'query-string'
import { URLS } from './constants'
import { generateHeader } from './utils'
import { logger } from '@reapit/utils'
import { FetchListCommonParams } from './types'

export type SubscriptionModel = {
  id?: string
  created?: string
  cancelled?: string
  renews?: string
  developerId?: string
  applicationId?: string
  user?: string
  type?: string
  summary?: string
  cost?: number
  frequency?: number
  readonly links?: LinkModel[]
}

export type PagedResultSubscriptionModel_ = {
  data: SubscriptionModel[]
  pageNumber?: number
  pageSize?: number
  pageCount?: number
  totalCount?: number
}

export type CreateSubscriptionModel = {
  developerId?: string
  applicationId?: string
  user?: string
  type?: 'applicationListing' | 'developerRegistration' | 'developerEdition'
}

export type FetchSubscriptionsListParams = FetchListCommonParams & {
  developerId: string
  subscriptionType?: 'applicationListing' | 'developerRegistration' | 'developerEdition'
}

export type DeleteSubscriptionParams = {
  id: string
}

export const fetchSubscriptionsList = async (
  params: FetchSubscriptionsListParams,
): Promise<PagedResultSubscriptionModel_> => {
  try {
    const response = await fetcher({
      url: `${URLS.subscriptions}?${stringify(params)}`,
      api: window.reapit.config.marketplaceApiUrl,
      method: 'GET',
      headers: generateHeader(window.reapit.config.marketplaceApiKey),
    })
    return response as PagedResultSubscriptionModel_
  } catch (error) {
    logger(error)
    throw error
  }
}

export const createDeveloperSubscription = async (params: CreateSubscriptionModel): Promise<SubscriptionModel> => {
  try {
    const response = await fetcher({
      url: `${URLS.developerSubscriptions}?${setQueryParams(params)}`,
      api: window.reapit.config.marketplaceApiUrl,
      method: 'POST',
      body: params,
      headers: generateHeader(window.reapit.config.marketplaceApiKey),
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
