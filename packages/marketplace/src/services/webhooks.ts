import { fetcher, setQueryParams } from '@reapit/elements'
import { URLS } from './constants'
import { initAuthorizedRequestHeaders } from './utils'
import { logger } from 'logger'
import { FetchListCommonParams, FetchByIdCommonParams } from './types'

// Manual defined Model

export interface PagedResultWebhookModel_ {
  _embedded?: WebhookModel[]
  pageNumber?: number
  pageSize?: number
  pageCount?: number
  totalCount?: number
  _links?: { [key: string]: PagingLinkModel }
}

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

export interface PagingLinkModel {
  href?: string
}

export interface CreateWebhookModel {
  applicationId?: string
  url?: string
  description?: string
  topicIds?: string[]
  customerIds?: string[]
  active?: boolean
}

export interface UpdateWebhookModel {
  url?: string
  description?: string
  topicIds?: string[]
  customerIds?: string[]
  active?: boolean
}

export interface PingEndpointModel {
  topicId?: string
}

export interface PagedResultTopicModel_ {
  _embedded?: TopicModel[]
  pageNumber?: number
  pageSize?: number
  pageCount?: number
  totalCount?: number
  _links?: { [key: string]: PagingLinkModel }
}

export interface TopicModel {
  id?: string
  created?: string
  modified?: string
  name?: string
  description?: string
  url?: string
  active?: boolean
  associatedScope?: string
  example?: string
}

export interface CreateTopicModel {
  id?: string
  name?: string
  description?: string
  url?: string
  associatedScope?: string
  example?: string
}
export interface UpdateTopicModel {
  name?: string
  description?: string
  url?: string
  example?: string
}

// end manual defined Model

// Subscriptions
export interface FetchWebhooksSubscriptionsListParams extends FetchListCommonParams {
  sortBy?: string
  applicationId?: string[]
  active?: boolean
}

export type CreateWebhooksSubscriptionParams = CreateWebhookModel

export type FetchWebhooksSubscriptionByIdParams = FetchByIdCommonParams

export type UpdateWebhooksSubscriptionByIdParams = FetchByIdCommonParams & UpdateWebhookModel

export type DeleteWebhooksSubscriptionByIdParams = FetchByIdCommonParams

export type PingWebhooksByIdParams = FetchByIdCommonParams & PingEndpointModel

// Topics

export interface FetchWebhooksTopicsListParams extends FetchListCommonParams {
  sortBy?: string
  applicationId?: string
}

export type CreateWebhooksTopicParams = CreateTopicModel

export type FetchWebhooksTopicByIdParams = FetchByIdCommonParams

export type UpdateWebhooksTopicByIdParams = FetchByIdCommonParams & UpdateTopicModel

// Subscription
export const fetchWebhooksSubscriptionsList = async (
  params: FetchWebhooksSubscriptionsListParams,
): Promise<PagedResultWebhookModel_> => {
  try {
    const headers = await initAuthorizedRequestHeaders()
    const response = await fetcher({
      url: `${URLS.webhookSubscriptions}?${setQueryParams(params)}`,
      api: window.reapit.config.marketplaceApiUrl,
      method: 'GET',
      headers,
    })
    return response
  } catch (error) {
    logger(error)
    throw new Error(error)
  }
}

export const createWebhooksSubscription = async (params: CreateWebhooksSubscriptionParams) => {
  try {
    const headers = await initAuthorizedRequestHeaders()
    const response = await fetcher({
      url: `${URLS.webhookSubscriptions}`,
      api: window.reapit.config.marketplaceApiUrl,
      method: 'POST',
      body: params,
      headers,
    })
    return response
  } catch (error) {
    logger(error)
    throw new Error(error)
  }
}

export const fetchWebhooksSubscriptionById = async (
  params: FetchWebhooksSubscriptionByIdParams,
): Promise<WebhookModel> => {
  try {
    const headers = await initAuthorizedRequestHeaders()
    const { id } = params
    const response = await fetcher({
      url: `${URLS.webhookSubscriptions}/${id}`,
      api: window.reapit.config.marketplaceApiUrl,
      method: 'GET',
      headers,
    })
    return response
  } catch (error) {
    logger(error)
    throw new Error(error)
  }
}

export const updateWebhooksSubscriptionById = async (params: UpdateWebhooksSubscriptionByIdParams) => {
  try {
    const headers = await initAuthorizedRequestHeaders()
    const { id, ...rest } = params
    const response = await fetcher({
      url: `${URLS.webhookSubscriptions}/${id}`,
      api: window.reapit.config.marketplaceApiUrl,
      method: 'PUT',
      body: rest,
      headers,
    })
    return response
  } catch (error) {
    logger(error)
    throw new Error(error)
  }
}

export const deleteWebhooksSubscriptionById = async (params: DeleteWebhooksSubscriptionByIdParams) => {
  try {
    const headers = await initAuthorizedRequestHeaders()
    const { id } = params
    const response = await fetcher({
      url: `${URLS.webhookSubscriptions}/${id}`,
      api: window.reapit.config.marketplaceApiUrl,
      method: 'DELETE',
      headers,
    })
    return response
  } catch (error) {
    logger(error)
    throw new Error(error)
  }
}

export const pingWebhooksById = async (params: PingWebhooksByIdParams) => {
  try {
    const headers = await initAuthorizedRequestHeaders()
    const { id, ...rest } = params
    const response = await fetcher({
      url: `${URLS.webhookSubscriptions}/${id}/ping`,
      api: window.reapit.config.marketplaceApiUrl,
      method: 'POST',
      body: rest,
      headers,
    })
    return response
  } catch (error) {
    logger(error)
    throw new Error(error)
  }
}

// Topic
export const fetchWebhooksTopicsList = async (
  params: FetchWebhooksTopicsListParams,
): Promise<PagedResultTopicModel_> => {
  try {
    const headers = await initAuthorizedRequestHeaders()
    const response = await fetcher({
      url: `${URLS.webhooksTopics}?${setQueryParams(params)}`,
      api: window.reapit.config.marketplaceApiUrl,
      method: 'GET',
      headers,
    })
    return response
  } catch (error) {
    logger(error)
    throw new Error(error)
  }
}

export const createWebhooksTopic = async (params: CreateWebhooksTopicParams) => {
  try {
    const headers = await initAuthorizedRequestHeaders()
    const response = await fetcher({
      url: `${URLS.webhooksTopics}?${setQueryParams(params)}`,
      api: window.reapit.config.marketplaceApiUrl,
      method: 'POST',
      body: params,
      headers,
    })
    return response
  } catch (error) {
    logger(error)
    throw new Error(error)
  }
}

export const fetchWebhooksTopicById = async (params: FetchWebhooksTopicByIdParams): Promise<TopicModel> => {
  try {
    const headers = await initAuthorizedRequestHeaders()
    const { id } = params
    const response = await fetcher({
      url: `${URLS.webhooksTopics}/${id}`,
      api: window.reapit.config.marketplaceApiUrl,
      method: 'GET',
      headers,
    })
    return response
  } catch (error) {
    logger(error)
    throw new Error(error)
  }
}
export const updateWebhooksTopicById = async (params: UpdateWebhooksTopicByIdParams) => {
  try {
    const headers = await initAuthorizedRequestHeaders()
    const { id, ...rest } = params
    const response = await fetcher({
      url: `${URLS.webhooksTopics}/${id}`,
      api: window.reapit.config.marketplaceApiUrl,
      method: 'PUT',
      body: rest,
      headers,
    })
    return response
  } catch (error) {
    logger(error)
    throw new Error(error)
  }
}
