import {
  CreateInstallationModel,
  InstallationModelPagedResult,
  TerminateInstallationModel,
} from '@reapit/foundations-ts-definitions'
import { fetcher, setQueryParams } from '@reapit/utils-common'
import { URLS } from './constants'
import { getPlatformHeaders, logger } from '@reapit/utils-react'
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
  callback?: (hasPermissionError: boolean) => void
}

export const createInstallation = async (params: CreateInstallationParams) => {
  try {
    const headers = await getPlatformHeaders(reapitConnectBrowserSession, 'latest')
    if (headers) {
      const response = await fetcher({
        url: `${URLS.installations}`,
        api: window.reapit.config.platformApiUrl,
        method: 'POST',
        body: params,
        headers,
      })
      return response
    }
  } catch (error) {
    logger(error as Error)
    throw error
  }
}

export const fetchApiKeyInstallationById = async (params: FetchApiKeyInstallationByIdParams) => {
  try {
    const { installationId } = params
    const headers = await getPlatformHeaders(reapitConnectBrowserSession, 'latest')
    if (headers) {
      const response = await fetcher({
        url: `${URLS.installations}/${installationId}/apiKey`,
        api: window.reapit.config.platformApiUrl,
        method: 'GET',
        headers,
      })
      return response
    }
  } catch (error) {
    logger(error as Error)
    throw error
  }
}

export const removeAccessToAppById = async (params: RemoveAccessToAppByIdParams) => {
  try {
    const { installationId, ...rest } = params
    const headers = await getPlatformHeaders(reapitConnectBrowserSession, 'latest')
    if (headers) {
      const response = await fetcher({
        url: `${URLS.installations}/${installationId}/terminate`,
        api: window.reapit.config.platformApiUrl,
        method: 'POST',
        body: rest,
        headers,
      })
      return response
    }
  } catch (error) {
    logger(error as Error)
    throw error
  }
}

export const fetchInstallationsList = async (
  params: FetchInstallationsListParams,
): Promise<InstallationModelPagedResult | void> => {
  try {
    const headers = await getPlatformHeaders(reapitConnectBrowserSession, 'latest')
    if (headers) {
      const response = await fetcher({
        url: `${URLS.installations}?${setQueryParams(params)}`,
        api: window.reapit.config.platformApiUrl,
        method: 'GET',
        headers,
      })
      return response
    }
  } catch (error) {
    logger(error as Error)
    throw error
  }
}
