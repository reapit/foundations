import { fetcher, setQueryParams } from '@reapit/elements'
import { generateHeader, URLS } from '@/constants/api'
import { logger } from 'logger'
import { FetchByIdCommonParams, FetchListCommonParams } from './types'

export interface FetchAppsListParams {
  developerId?: string[]
  clientId?: string
  externalAppId?: string[]
  category?: string
  desktopIntegrationTypeId?: string
  appName?: string
  developerName?: string
  companyName?: string
  isFeatured?: string
  isDirectApi?: string
  isFeatured?: string
  onlyInstalled?: string
  registeredFrom?: string
  registeredTo?: string
  pageNumber?: number
  pageSize?: number
}

export interface FetchAppByIdParams extends FetchByIdCommonParams {
  clientId?: string
}

export type CreateAppParams = FetchByIdCommonParams

export type DeleteAppByIdParams = FetchByIdCommonParams

export type FeatureAppByIdParams = FetchByIdCommonParams

export type UnfeatureAppByIdParams = FetchByIdCommonParams

export interface FetchAppRevisionsList extends Fetch {
  id: string
  pageNumber?: number
  pageSize?: number
}

export const fetchAppsList = async (params: FetchAppsListParams) => {
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
    throw new Error(error)
  }
}

export const fetchAppById = async (params: FetchAppByIdParams) => {
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
    throw new Error(error)
  }
}

export const createApp = async (params: CreateAppParams) => {
  try {
    const response = await fetcher({
      url: URLS.apps,
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

export const deleteAppById = async (params: DeleteAppByIdParams) => {
  try {
    const response = await fetcher({
      url: `${URLS.apps}?${setQueryParams(params)}`,
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
