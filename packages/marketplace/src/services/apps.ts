import { PagedResultAppSummaryModel_, AppDetailModel } from '@reapit/foundations-ts-definitions'
import { fetcher, setQueryParams } from '@reapit/elements'
import { URLS } from './constants'
import { generateHeader } from './utils'
import { logger } from '@reapit/utils'
import { FetchByIdCommonParams, FetchListCommonParams } from './types'

export type FetchAppsApiParams = FetchListCommonParams & {
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
}

export const fetchAppsApi = async (params: FetchAppsApiParams): Promise<PagedResultAppSummaryModel_> => {
  try {
    const response = await fetcher({
      url: `${URLS.apps}?${setQueryParams(params)}`,
      api: window.reapit.config.marketplaceApiUrl,
      method: 'GET',
      headers: generateHeader(window.reapit.config.marketplaceApiKey),
    })
    return response
  } catch (error) {
    logger(error)
    throw error
  }
}

export type FetchAppByIdParams = FetchByIdCommonParams & {
  clientId?: string
}

export const fetchAppByIdApi = async (params: FetchAppByIdParams): Promise<AppDetailModel> => {
  try {
    const { id, clientId } = params
    const response = await fetcher({
      url: `${URLS.apps}/${id}?${setQueryParams({ clientId })}`,
      api: window.reapit.config.marketplaceApiUrl,
      method: 'GET',
      headers: generateHeader(window.reapit.config.marketplaceApiKey),
    })
    return response
  } catch (error) {
    logger(error)
    throw error
  }
}
