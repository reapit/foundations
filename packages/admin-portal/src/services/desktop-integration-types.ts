import { fetcher, setQueryParams } from '@reapit/elements'
import { URLS } from './constants'
import { getPlatformHeaders, logger } from '@reapit/utils'
import { FetchListCommonParams, FetchByIdCommonParams } from './types'
import { reapitConnectBrowserSession } from '../core/connect-session'

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
      api: window.reapit.config.platformApiUrl,
      method: 'GET',
      headers: await getPlatformHeaders(reapitConnectBrowserSession, 'latest'),
    })
    return response
  } catch (error) {
    logger(error)
    throw error
  }
}

export const createDesktopIntegrationTypes = async (params: CreateDesktopIntegrationTypes) => {
  try {
    const response = await fetcher({
      url: `${URLS.desktopIntegrationTypes}`,
      api: window.reapit.config.platformApiUrl,
      method: 'POST',
      body: params,
      headers: await getPlatformHeaders(reapitConnectBrowserSession, 'latest'),
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
      api: window.reapit.config.platformApiUrl,
      method: 'GET',
      headers: await getPlatformHeaders(reapitConnectBrowserSession, 'latest'),
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
      api: window.reapit.config.platformApiUrl,
      method: 'PUT',
      body: rest,
      headers: await getPlatformHeaders(reapitConnectBrowserSession, 'latest'),
    })
    return response
  } catch (error) {
    logger(error)
    throw new Error(error)
  }
}
