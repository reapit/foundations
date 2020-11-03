import { CategoryModelPagedResult, CreateCategoryModel, CategoryModel } from '@reapit/foundations-ts-definitions'
import { fetcher, setQueryParams } from '@reapit/elements'
import { URLS } from './constants'
import { generateHeaders } from './utils'
import { logger } from '@reapit/utils'
import { FetchListCommonParams, FetchByIdCommonParams } from './types'

export type FetchCategoriesListParams = FetchListCommonParams

export type CreateCategoryParams = CreateCategoryModel

export type FetchCategoryById = FetchByIdCommonParams

export type DeleteCategoryByIdParams = FetchByIdCommonParams

export const fetchCategoryListAPI = async (params: FetchCategoriesListParams): Promise<CategoryModelPagedResult> => {
  try {
    const response = await fetcher({
      url: `${URLS.categories}?${setQueryParams(params)}`,
      api: window.reapit.config.platformApiUrl,
      method: 'GET',
      headers: await generateHeaders(),
    })
    return response
  } catch (error) {
    logger(error)
    throw error?.response
  }
}

export const createCategory = async (params: CreateCategoryParams) => {
  try {
    const response = await fetcher({
      url: `${URLS.categories}`,
      api: window.reapit.config.platformApiUrl,
      method: 'POST',
      body: params,
      headers: await generateHeaders(),
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
      api: window.reapit.config.platformApiUrl,
      method: 'GET',
      headers: await generateHeaders(),
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
      api: window.reapit.config.platformApiUrl,
      method: 'DELETE',
      headers: await generateHeaders(),
    })
    return response
  } catch (error) {
    logger(error)
    throw new Error(error)
  }
}
