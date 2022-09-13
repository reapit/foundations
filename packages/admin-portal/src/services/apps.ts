import {
  AppDetailModel,
  AppRevisionModel,
  ApproveModel,
  AppSummaryModelPagedResult,
  RejectRevisionModel,
} from '@reapit/foundations-ts-definitions'
import { fetcher, FetchError, setQueryParams } from '@reapit/utils-common'
import { URLS } from './constants'
import { getPlatformHeaders, logger } from '@reapit/utils-react'
import { FetchByIdCommonParams, FetchListCommonParams } from './types'
import { reapitConnectBrowserSession } from '../core/connect-session'

export type FetchAppsListParams = FetchListCommonParams & {
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

export type FetchAppByIdParams = FetchByIdCommonParams & {
  clientId?: string
}

export type DeleteAppByIdParams = FetchByIdCommonParams

export type FeatureAppByIdParams = FetchByIdCommonParams

export type UnfeatureAppByIdParams = FetchByIdCommonParams

export type FetchAppRevisionsByIdParams = FetchByIdCommonParams & {
  revisionId: string
}

export type ApproveAppRevisionByIdParams = FetchByIdCommonParams & { revisionId: string } & ApproveModel

export type RejectAppRevisionByIdParams = FetchByIdCommonParams & { revisionId: string } & RejectRevisionModel

export const fetchAppById = async (params: FetchAppByIdParams): Promise<AppDetailModel | void> => {
  try {
    const { id, clientId } = params
    const headers = await getPlatformHeaders(reapitConnectBrowserSession, 'latest')
    if (headers) {
      return fetcher({
        url: `${URLS.apps}/${id}?${setQueryParams({ clientId })}`,
        api: window.reapit.config.platformApiUrl,
        method: 'GET',
        headers,
      })
    }
  } catch (error) {
    logger(error as FetchError)
    throw error
  }
}

export const fetchAppsList = async (params: FetchAppsListParams): Promise<AppSummaryModelPagedResult | void> => {
  try {
    const headers = await getPlatformHeaders(reapitConnectBrowserSession, 'latest')
    if (headers) {
      return fetcher({
        url: `${URLS.apps}?${setQueryParams(params)}`,
        api: window.reapit.config.platformApiUrl,
        method: 'GET',
        headers,
      })
    }
  } catch (error) {
    logger(error as FetchError)
    throw error
  }
}

export const fetchAppRevisionsById = async (params: FetchAppRevisionsByIdParams): Promise<AppRevisionModel | void> => {
  try {
    const { id, revisionId } = params
    const headers = await getPlatformHeaders(reapitConnectBrowserSession, 'latest')
    if (headers) {
      return fetcher({
        url: `${URLS.apps}/${id}/revisions/${revisionId}`,
        api: window.reapit.config.platformApiUrl,
        method: 'GET',
        headers,
      })
    }
  } catch (error) {
    logger(error as FetchError)
    throw error
  }
}

export const approveAppRevisionById = async (params: ApproveAppRevisionByIdParams) => {
  try {
    const { id, revisionId, ...rest } = params
    const headers = await getPlatformHeaders(reapitConnectBrowserSession, 'latest')
    if (headers) {
      return fetcher({
        url: `${URLS.apps}/${id}/revisions/${revisionId}/approve`,
        api: window.reapit.config.platformApiUrl,
        method: 'POST',
        body: rest,
        headers,
      })
    }
  } catch (error) {
    logger(error as FetchError)
    throw error
  }
}

export const rejectAppRevisionById = async (params: RejectAppRevisionByIdParams) => {
  try {
    const { id, revisionId, ...rest } = params
    const headers = await getPlatformHeaders(reapitConnectBrowserSession, 'latest')
    if (headers) {
      return fetcher({
        url: `${URLS.apps}/${id}/revisions/${revisionId}/reject`,
        api: window.reapit.config.platformApiUrl,
        method: 'POST',
        body: rest,
        headers,
      })
    }
  } catch (error) {
    logger(error as FetchError)
    throw error
  }
}

export const fetchDesktopIntegrationTypes = async () => {
  try {
    const headers = await getPlatformHeaders(reapitConnectBrowserSession, 'latest')
    if (headers) {
      return fetcher({
        url: URLS.desktopIntegrationTypes,
        method: 'GET',
        api: window.reapit.config.platformApiUrl,
        headers,
      })
    }
  } catch (error) {
    logger(error as FetchError)
    throw error
  }
}
