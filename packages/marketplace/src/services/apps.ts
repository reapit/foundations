import { AppSummaryModelPagedResult, AppDetailModel } from '@reapit/foundations-ts-definitions'
import { fetcher, setQueryParams } from '@reapit/utils-common'
import { URLS } from './constants'
import { getPlatformHeaders, logger } from '@reapit/utils-react'
import { FetchByIdCommonParams, FetchListCommonParams } from './types'
import { reapitConnectBrowserSession } from '../core/connect-session'

export type FetchAppsParams = FetchListCommonParams & {
  developerId?: string[]
  clientId?: string
  externalAppId?: string[]
  category?: string[]
  desktopIntegrationTypeId?: string
  appName?: string
  developerName?: string
  companyName?: string
  isFeatured?: boolean
  isDirectApi?: boolean
  onlyInstalled?: boolean
  registeredFrom?: string
  registeredTo?: string
  showHiddenApps?: boolean
  product: string
}

export const fetchAppsApi = async (params: FetchAppsParams): Promise<AppSummaryModelPagedResult | void> => {
  try {
    const headers = await getPlatformHeaders(reapitConnectBrowserSession, 'latest')
    if (headers) {
      const response = await fetcher({
        url: `${URLS.apps}?${setQueryParams(params)}`,
        api: window.reapit.config.platformApiUrl,
        method: 'GET',
        headers,
      })
      return response
    }
  } catch (error) {
    logger(error)
    throw error?.response
  }
}

export type FetchAppByIdParams = FetchByIdCommonParams & {
  clientId?: string
}

export const fetchAppByIdApi = async (params: FetchAppByIdParams): Promise<AppDetailModel | void> => {
  try {
    const { id, clientId } = params
    const headers = await getPlatformHeaders(reapitConnectBrowserSession, 'latest')
    if (headers) {
      const response = await fetcher({
        url: `${URLS.apps}/${id}?${setQueryParams({ clientId })}`,
        api: window.reapit.config.platformApiUrl,
        method: 'GET',
        headers,
      })
      return response
    }
  } catch (error) {
    logger(error)
    throw error?.response
  }
}
