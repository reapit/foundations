import {
  PagedResultAppSummaryModel_,
  AppDetailModel,
  AppRevisionModel,
  ApproveModel,
  RejectRevisionModel,
} from '@reapit/foundations-ts-definitions'
import { fetcher, setQueryParams } from '@reapit/elements'
import { URLS } from './constants'
import { generateHeader } from './utils'
import { logger } from '@reapit/utils'
import { FetchByIdCommonParams, FetchListCommonParams } from './types'

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

export const fetchAppsList = async (params: FetchAppsListParams): Promise<PagedResultAppSummaryModel_> => {
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

export const fetchAppById = async (params: FetchAppByIdParams): Promise<AppDetailModel> => {
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

export const deleteAppById = async (params: DeleteAppByIdParams) => {
  try {
    const { id } = params
    const response = await fetcher({
      url: `${URLS.apps}/${id}`,
      api: window.reapit.config.marketplaceApiUrl,
      method: 'DELETE',
      headers: generateHeader(window.reapit.config.marketplaceApiKey),
    })
    return response
  } catch (error) {
    logger(error)
    throw error
  }
}
/*
 * TODOME(appsManagementFeatured)
 * throw correct error
 */

export const featureAppById = async (params: FeatureAppByIdParams) => {
  try {
    const { id } = params
    const response = await fetcher({
      url: `${URLS.apps}/${id}/feature`,
      api: window.reapit.config.marketplaceApiUrl,
      method: 'PUT',
      headers: generateHeader(window.reapit.config.marketplaceApiKey),
    })
    return response
  } catch (error) {
    logger(error)
    throw new Error(error)
  }
}

/*
 * TODOME(appsManagementFeatured)
 * throw correct error
 */
export const unfeatureAppById = async (params: UnfeatureAppByIdParams) => {
  try {
    const { id } = params
    const response = await fetcher({
      url: `${URLS.apps}/${id}/feature`,
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

export const fetchAppRevisionsById = async (params: FetchAppRevisionsByIdParams): Promise<AppRevisionModel> => {
  try {
    const { id, revisionId } = params
    const response = await fetcher({
      url: `${URLS.apps}/${id}/revisions/${revisionId}`,
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
/*
 * TODOME(requestApproveRevision)
 * throw error
 */

export const approveAppRevisionById = async (params: ApproveAppRevisionByIdParams) => {
  try {
    const { id, revisionId, ...rest } = params
    const response = await fetcher({
      url: `${URLS.apps}/${id}/revisions/${revisionId}/approve`,
      api: window.reapit.config.marketplaceApiUrl,
      method: 'POST',
      body: rest,
      headers: generateHeader(window.reapit.config.marketplaceApiKey),
    })
    return response
  } catch (error) {
    logger(error)
    throw error
  }
}

export const rejectAppRevisionById = async (params: RejectAppRevisionByIdParams) => {
  try {
    const { id, revisionId, ...rest } = params
    const response = await fetcher({
      url: `${URLS.apps}/${id}/revisions/${revisionId}/reject`,
      api: window.reapit.config.marketplaceApiUrl,
      method: 'POST',
      body: rest,
      headers: generateHeader(window.reapit.config.marketplaceApiKey),
    })
    return response
  } catch (error) {
    logger(error)
    throw new Error(error)
  }
}

export const fetchDesktopIntegrationTypes = async () => {
  const response = await fetcher({
    url: URLS.desktopIntegrationTypes,
    method: 'GET',
    api: window.reapit.config.marketplaceApiUrl,
    headers: generateHeader(window.reapit.config.marketplaceApiKey),
  })
  return response
}
