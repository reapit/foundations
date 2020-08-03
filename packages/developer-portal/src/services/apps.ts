import {
  CreateAppModel,
  PagedResultAppSummaryModel_,
  AppDetailModel,
  PagedResultAppRevisionModel_,
  CreateAppRevisionModel,
  AppRevisionModel,
  ApproveModel,
  RejectRevisionModel,
  AppClientSecretModel,
} from '@reapit/foundations-ts-definitions'
import { fetcher, fetcherWithReturnHeader, fetcherWithRawUrl, setQueryParams } from '@reapit/elements'
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

export type CreateAppParams = CreateAppModel & {
  successCallback?: (appDetail: AppDetailModel) => void
}

export type DeleteAppByIdParams = FetchByIdCommonParams & {
  successCallback?: () => void
}

export type FeatureAppByIdParams = FetchByIdCommonParams

export type UnfeatureAppByIdParams = FetchByIdCommonParams

export type FetchAppRevisionsListParams = FetchListCommonParams & {
  id: string
}

export type CreateAppRevisionParams = FetchByIdCommonParams & CreateAppRevisionModel

export type FetchAppRevisionsByIdParams = FetchByIdCommonParams & {
  revisionId: string
}

export type ApproveAppRevisionByIdParams = FetchByIdCommonParams & { revisionId: string } & ApproveModel

export type RejectAppRevisionByIdParams = FetchByIdCommonParams & { revisionId: string } & RejectRevisionModel

export type FetchAppSecretByIdParams = FetchByIdCommonParams

export const fetchAppsListAPI = async (params: FetchAppsListParams): Promise<PagedResultAppSummaryModel_> => {
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
    throw error?.response
  }
}

export const fetchAppByIdByRawUrl = async (url: string): Promise<AppDetailModel> => {
  try {
    const response = await fetcherWithRawUrl({
      url,
      method: 'GET',
      headers: generateHeader(window.reapit.config.marketplaceApiKey),
    })

    return response
  } catch (error) {
    logger(error)
    throw new Error(error)
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
    throw new Error(error)
  }
}

export const createAppAPI = async (params: CreateAppParams) => {
  try {
    const headers = await fetcherWithReturnHeader({
      url: URLS.apps,
      api: window.reapit.config.marketplaceApiUrl,
      method: 'POST',
      body: params,
      headers: generateHeader(window.reapit.config.marketplaceApiKey),
    })
    return headers
  } catch (error) {
    logger(error)
    throw error?.response
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
    throw error?.response
  }
}

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

export const fetchAppRevisionsList = async (
  params: FetchAppRevisionsListParams,
): Promise<PagedResultAppRevisionModel_> => {
  try {
    const { id, ...rest } = params
    const response = await fetcher({
      url: `${URLS.apps}/${id}/revisions?${setQueryParams(rest)}`,
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

export const createAppRevision = async (params: CreateAppRevisionParams) => {
  try {
    const { id, ...rest } = params
    const response = await fetcher({
      url: `${URLS.apps}/${id}/revisions`,
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
    throw error?.response
  }
}

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
    throw new Error(error)
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

export const fetchAppSecretByIdAPI = async (params: FetchAppSecretByIdParams): Promise<AppClientSecretModel> => {
  try {
    const { id } = params
    const response = await fetcher({
      url: `${URLS.apps}/${id}/secret`,
      api: window.reapit.config.marketplaceApiUrl,
      method: 'GET',
      headers: generateHeader(window.reapit.config.marketplaceApiKey),
    })
    return response
  } catch (error) {
    logger(error)
    throw error?.response
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

export const fetchAppDetail = async ({ clientId, id }) => {
  const response = await fetcher({
    url: clientId ? `${URLS.apps}/${id}?clientId=${clientId}` : `${URLS.apps}/${id}`,
    api: window.reapit.config.marketplaceApiUrl,
    method: 'GET',
    headers: generateHeader(window.reapit.config.marketplaceApiKey),
  })
  return response
}

export const fetchAppApiKey = async ({ installationId }) => {
  const response = await fetcher({
    url: `${URLS.installations}/${installationId}/apiKey`,
    api: window.reapit.config.marketplaceApiUrl,
    method: 'GET',
    headers: generateHeader(window.reapit.config.marketplaceApiKey),
  })
  return response
}
