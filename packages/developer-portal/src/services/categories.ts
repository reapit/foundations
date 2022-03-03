import { CategoryModelPagedResult, CreateCategoryModel, CategoryModel } from '@reapit/foundations-ts-definitions'
import { fetcher, setQueryParams } from '@reapit/utils-common'
import { URLS } from './constants'
import { getPlatformHeaders, logger } from '@reapit/utils-react'
import { FetchListCommonParams, FetchByIdCommonParams } from './types'
import { reapitConnectBrowserSession } from '../core/connect-session'

export type FetchCategoriesListParams = FetchListCommonParams

export type CreateCategoryParams = CreateCategoryModel

export type FetchCategoryById = FetchByIdCommonParams

export type DeleteCategoryByIdParams = FetchByIdCommonParams

export const fetchCategoryListAPI = async (
  params: FetchCategoriesListParams,
): Promise<CategoryModelPagedResult | void> => {
  try {
    const headers = await getPlatformHeaders(reapitConnectBrowserSession, 'latest')
    if (headers) {
      const response = await fetcher({
        url: `${URLS.categories}?${setQueryParams(params)}`,
        api: window.reapit.config.platformApiUrl,
        method: 'GET',
        headers,
      })
      return response
    }
  } catch (error) {
    logger(error as Error)
    throw error
  }
}

export const createCategory = async (params: CreateCategoryParams) => {
  try {
    const headers = await getPlatformHeaders(reapitConnectBrowserSession, 'latest')
    if (headers) {
      const response = await fetcher({
        url: `${URLS.categories}`,
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

export const fetchCategoryById = async (params: FetchCategoryById): Promise<CategoryModel | void> => {
  try {
    const { id } = params
    const headers = await getPlatformHeaders(reapitConnectBrowserSession, 'latest')
    if (headers) {
      const response = await fetcher({
        url: `${URLS.categories}/${id}`,
        api: window.reapit.config.platformApiUrl,
        method: 'GET',
        headers,
      })
      return response
    }
  } catch (error) {
    logger(error as Error)
    throw error
  }
}

export const deleteCategoryById = async (params: DeleteCategoryByIdParams) => {
  try {
    const { id } = params
    const headers = await getPlatformHeaders(reapitConnectBrowserSession, 'latest')
    if (headers) {
      const response = await fetcher({
        url: `${URLS.categories}/${id}`,
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
