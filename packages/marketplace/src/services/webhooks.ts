import { PagedResultCategoryModel_, CreateCategoryModel, CategoryModel } from '@reapit/foundations-ts-definitions'
import { fetcher, setQueryParams } from '@reapit/elements'
import { URLS } from './constants'
import { generateHeader } from './utils'
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

export interface FetchWebhooksSubscriptionsListParams extends FetchListCommonParams {
  sortBy?: string
  applicationId?: string[]
  active?: boolean
}

export type CreateWebhooksSubscriptionParams = CreateCategoryModel

export type FetchCategoryById = FetchByIdCommonParams

export type DeleteCategoryByIdParams = FetchByIdCommonParams

export const fetchWebhooksSubscriptionsList = async (
  params: FetchCategoriesListParams,
): Promise<PagedResultCategoryModel_> => {
  try {
    const response = await fetcher({
      url: `${URLS.categories}?${setQueryParams(params)}`,
      api: window.reapit.config.marketplaceApiUrl,
      method: 'GET',
      headers: generateHeader(window.reapit.config.marketplaceApiKey),
    })
    return response
  } catch (error) {
    logger(error)
    throw new Error(error)
  }
}

export const createCategory = async (params: CreateCategoryParams) => {
  try {
    const response = await fetcher({
      url: `${URLS.categories}`,
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

export const fetchCategoryById = async (params: FetchCategoryById): Promise<CategoryModel> => {
  try {
    const { id } = params
    const response = await fetcher({
      url: `${URLS.categories}/${id}`,
      api: window.reapit.config.marketplaceApiUrl,
      method: 'GET',
      headers: generateHeader(window.reapit.config.marketplaceApiKey),
    })
    return response
  } catch (error) {
    logger(error)
    throw new Error(error)
  }
}

export const deleteCategoryById = async (params: DeleteCategoryByIdParams) => {
  try {
    const { id } = params
    const response = await fetcher({
      url: `${URLS.categories}/${id}`,
      api: window.reapit.config.marketplaceApiUrl,
      method: 'DELETE',
      headers: generateHeader(window.reapit.config.marketplaceApiKey),
    })
    return response
  } catch (error) {
    logger(error)
    throw new Error(error)
  }
}
