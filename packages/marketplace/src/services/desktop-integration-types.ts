import { fetcher, setQueryParams } from '@reapit/elements'
import { URLS } from './constants'
import { generateHeader } from './utils'
import { logger } from 'logger'
import { FetchListCommonParams, FetchByIdCommonParams } from './types'

export interface CreateDesktopIntegrationTypeModel {
  id?: string
  name?: string
  description?: string
  url?: string
}

export interface UpdateDesktopIntegrationTypeModel {
  name?: string
  description?: string
  url?: string
}

export interface DesktopIntegrationTypeModel {
  id?: string
  name?: string
  description?: string
  url?: string
}

export interface PagedResultDesktopIntegrationTypeModel_ {
  data?: DesktopIntegrationTypeModel[]
  pageNumber?: number
  pageSize?: number
  pageCount?: number
  totalCount?: number
}

export type FetchDesktopIntegrationTypesListParams = FetchListCommonParams

export type CreateDesktopIntegrationTypes = CreateDesktopIntegrationTypeModel

export type FetchDesktopIntegrationTypesByIdParams = FetchByIdCommonParams

export type UpdateDesktopIntegrationTypesByIdParams = FetchByIdCommonParams & UpdateDesktopIntegrationTypeModel

export const fetchDesktopIntegrationTypesList = async (
  params: FetchDesktopIntegrationTypesListParams,
): Promise<PagedResultDesktopIntegrationTypeModel_> => {
  try {
    const response = await fetcher({
      url: `${URLS.desktopIntegrationTypes}?${setQueryParams(params)}`,
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

export const createDesktopIntegrationTypes = async (params: CreateDesktopIntegrationTypes) => {
  try {
    const response = await fetcher({
      url: `${URLS.desktopIntegrationTypes}`,
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

export const fetchDesktopIntegrationTypesById = async (
  params: FetchDesktopIntegrationTypesByIdParams,
): Promise<DesktopIntegrationTypeModel> => {
  try {
    const { id } = params
    const response = await fetcher({
      url: `${URLS.desktopIntegrationTypes}/${id}`,
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

export const updateDesktopIntegrationTypesById = async (params: UpdateDesktopIntegrationTypesByIdParams) => {
  try {
    const { id, ...rest } = params
    const response = await fetcher({
      url: `${URLS.categories}/${id}`,
      api: window.reapit.config.marketplaceApiUrl,
      method: 'PUT',
      body: rest,
      headers: generateHeader(window.reapit.config.marketplaceApiKey),
    })
    return response
  } catch (error) {
    logger(error)
    throw new Error(error)
  }
}
