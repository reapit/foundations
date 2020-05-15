import {
  PagedResultInstallationModel_,
  CreateInstallationModel,
  InstallationModel,
  TerminateInstallationModel,
} from '@reapit/foundations-ts-definitions'
import { fetcher, setQueryParams } from '@reapit/elements'
import { URLS } from './constants'
import { generateHeader } from './utils'
import { logger } from 'logger'
import { FetchListCommonParams } from './types'

export interface FetchInstallationsListParams extends FetchListCommonParams {
  appId?: string[]
  developerId?: string[]
  clientId?: string[]
  externalAppId?: string[]
  installedDateFrom?: string
  installedDateTo?: string
  uninstalledDateFrom?: string
  uninstalledDateto?: string
  isInstalled?: boolean
}

export type CreateInstallationParams = CreateInstallationModel

export interface FetchInstallationByIdParams {
  installationId: string
}

export interface FetchApiKeyInstallationByIdParams {
  installationId: string
}

export interface DeleteApiKeyInstallationById {
  installationId: string
}

export interface RemoveAccessToAppByIdParams extends TerminateInstallationModel {
  installationId: string
}

export const fetchInstallationsList = async (
  params: FetchInstallationsListParams,
): Promise<PagedResultInstallationModel_> => {
  try {
    const response = await fetcher({
      url: `${URLS.installations}?${setQueryParams(params)}`,
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

export const createInstallation = async (params: CreateInstallationParams) => {
  try {
    const response = await fetcher({
      url: `${URLS.installations}`,
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

export const fetchInstallationById = async (params: FetchInstallationByIdParams): Promise<InstallationModel> => {
  try {
    const { installationId } = params
    const response = await fetcher({
      url: `${URLS.installations}/${installationId}`,
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

export const fetchApiKeyInstallationById = async (params: FetchApiKeyInstallationByIdParams) => {
  try {
    const { installationId } = params
    const response = await fetcher({
      url: `${URLS.installations}/${installationId}/apiKey`,
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

export const deleteApiKeyInstallationById = async (params: DeleteApiKeyInstallationById) => {
  try {
    const { installationId } = params
    const response = await fetcher({
      url: `${URLS.installations}/${installationId}/apiKey`,
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

export const removeAccessToAppById = async (params: RemoveAccessToAppByIdParams) => {
  try {
    const { installationId, ...rest } = params
    const response = await fetcher({
      url: `${URLS.installations}/${installationId}/terminate`,
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
