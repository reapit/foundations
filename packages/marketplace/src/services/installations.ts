import {
  CreateInstallationModel,
  InstallationModelPagedResult,
  TerminateInstallationModel,
} from '@reapit/foundations-ts-definitions'
import { fetcher, setQueryParams } from '@reapit/elements'
import { URLS } from './constants'
import { getPlatformHeaders, logger } from '@reapit/utils'
import { FetchListCommonParams } from './types'
import { reapitConnectBrowserSession } from '../core/connect-session'

export type FetchInstallationsListParams = FetchListCommonParams & {
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

export type CreateInstallationParams = CreateInstallationModel & {
  // Callback run after update success
  callback?: () => void
}

export type FetchApiKeyInstallationByIdParams = {
  installationId: string
}

export type RemoveAccessToAppByIdParams = TerminateInstallationModel & {
  installationId: string
  // Callback run after update success
  callback?: () => void
}

export const createInstallation = async (params: CreateInstallationParams) => {
  try {
    const response = await fetcher({
      url: `${URLS.installations}`,
      api: window.reapit.config.platformApiUrl,
      method: 'POST',
      body: params,
      headers: await getPlatformHeaders(reapitConnectBrowserSession, 'latest'),
    })
    return response
  } catch (error) {
    logger(error)
    throw error?.response
  }
}

export const fetchApiKeyInstallationById = async (params: FetchApiKeyInstallationByIdParams) => {
  try {
    const { installationId } = params
    const response = await fetcher({
      url: `${URLS.installations}/${installationId}/apiKey`,
      api: window.reapit.config.platformApiUrl,
      method: 'GET',
      headers: await getPlatformHeaders(reapitConnectBrowserSession, 'latest'),
    })
    return response
  } catch (error) {
    logger(error)
    throw error?.response
  }
}

export const removeAccessToAppById = async (params: RemoveAccessToAppByIdParams) => {
  try {
    const { installationId, ...rest } = params
    const response = await fetcher({
      url: `${URLS.installations}/${installationId}/terminate`,
      api: window.reapit.config.platformApiUrl,
      method: 'POST',
      body: rest,
      headers: await getPlatformHeaders(reapitConnectBrowserSession, 'latest'),
    })
    return response
  } catch (error) {
    logger(error)
    throw error?.response
  }
}

export const fetchInstallationsList = async (
  params: FetchInstallationsListParams,
): Promise<InstallationModelPagedResult> => {
  try {
    const response = await fetcher({
      url: `${URLS.installations}?${setQueryParams(params)}`,
      api: window.reapit.config.platformApiUrl,
      method: 'GET',
      headers: await getPlatformHeaders(reapitConnectBrowserSession, 'latest'),
    })
    return response
  } catch (error) {
    logger(error)
    throw error?.response
  }
}
