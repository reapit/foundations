import { fetcher, setQueryParams } from '@reapit/elements'
import { URLS } from './constants'
import { generateHeader } from './utils'
import { logger } from '@reapit/utils'
import { FetchListCommonParams, FetchByIdCommonParams } from './types'

export type CreateDesktopIntegrationTypeModel = {
  id?: string
  name?: string
  description?: string
  url?: string
}

export type UpdateDesktopIntegrationTypeModel = {
  name?: string
  description?: string
  url?: string
}

export type DesktopIntegrationTypeModel = {
  id?: string
  name?: string
  description?: string
  url?: string
}

export type PagedResultDesktopIntegrationTypeModel_ = {
  data?: DesktopIntegrationTypeModel[]
  pageNumber?: number
  pageSize?: number
  pageCount?: number
  totalCount?: number
}

export type fetchDesktopIntegrationTypeListAPIParams = FetchListCommonParams

export type CreateDesktopIntegrationTypes = CreateDesktopIntegrationTypeModel

export type FetchDesktopIntegrationTypesByIdParams = FetchByIdCommonParams

export type UpdateDesktopIntegrationTypesByIdParams = FetchByIdCommonParams & UpdateDesktopIntegrationTypeModel

export const fetchDesktopIntegrationTypeListAPI = async (
  params: fetchDesktopIntegrationTypeListAPIParams,
): Promise<PagedResultDesktopIntegrationTypeModel_> => {
  try {
    const response = await fetcher({
      url: `${URLS.desktopIntegrationTypes}?${setQueryParams(params)}`,
      api: window.reapit.config.marketplaceApiUrl,
      method: 'GET',
      headers: await generateHeader(window.reapit.config.marketplaceApiKey),
    })
    return response
  } catch (error) {
    logger(error)
    throw error?.response
  }
}

export const createDesktopIntegrationTypes = async (params: CreateDesktopIntegrationTypes) => {
  try {
    const response = await fetcher({
      url: `${URLS.desktopIntegrationTypes}`,
      api: window.reapit.config.marketplaceApiUrl,
      method: 'POST',
      body: params,
      headers: await generateHeader(window.reapit.config.marketplaceApiKey),
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
      headers: await generateHeader(window.reapit.config.marketplaceApiKey),
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
      headers: await generateHeader(window.reapit.config.marketplaceApiKey),
    })
    return response
  } catch (error) {
    logger(error)
    throw new Error(error)
  }
}
