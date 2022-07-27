import { fetcher, setQueryParams } from '@reapit/utils-common'
import { URLS } from './constants'
import { getPlatformHeaders, logger } from '@reapit/utils-react'
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

export type PagedResultDesktopIntegrationTypeModel = {
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
): Promise<PagedResultDesktopIntegrationTypeModel | void> => {
  try {
    const headers = await getPlatformHeaders(reapitConnectBrowserSession, 'latest')
    if (headers) {
      return fetcher({
        url: `${URLS.desktopIntegrationTypes}?${setQueryParams(params)}`,
        api: window.reapit.config.platformApiUrl,
        method: 'GET',
        headers,
      })
    }
  } catch (error) {
    logger(error as Error)
    throw error
  }
}

export const createDesktopIntegrationTypes = async (params: CreateDesktopIntegrationTypes) => {
  try {
    const headers = await getPlatformHeaders(reapitConnectBrowserSession, 'latest')
    if (headers) {
      return fetcher({
        url: `${URLS.desktopIntegrationTypes}`,
        api: window.reapit.config.platformApiUrl,
        method: 'POST',
        body: params,
        headers,
      })
    }
  } catch (error) {
    logger(error as Error)
    throw error
  }
}

export const fetchDesktopIntegrationTypesById = async (
  params: FetchDesktopIntegrationTypesByIdParams,
): Promise<DesktopIntegrationTypeModel | void> => {
  try {
    const { id } = params
    const headers = await getPlatformHeaders(reapitConnectBrowserSession, 'latest')
    if (headers) {
      return fetcher({
        url: `${URLS.desktopIntegrationTypes}/${id}`,
        api: window.reapit.config.platformApiUrl,
        method: 'GET',
        headers,
      })
    }
  } catch (error) {
    logger(error as Error)
    throw error
  }
}

export const updateDesktopIntegrationTypesById = async (params: UpdateDesktopIntegrationTypesByIdParams) => {
  try {
    const { id, ...rest } = params
    const headers = await getPlatformHeaders(reapitConnectBrowserSession, 'latest')
    if (headers) {
      return fetcher({
        url: `${URLS.categories}/${id}`,
        api: window.reapit.config.platformApiUrl,
        method: 'PUT',
        body: rest,
        headers,
      })
    }
  } catch (error) {
    logger(error as Error)
    throw error
  }
}
