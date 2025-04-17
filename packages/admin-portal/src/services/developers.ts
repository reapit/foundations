import { fetcher, fetcherWithBlob, setQueryParams } from '@reapit/utils-common'
import { URLS } from './constants'
import { getPlatformHeaders, logger } from '@reapit/utils-react'
import { FetchListCommonParams } from './types'
import { reapitConnectBrowserSession } from '../core/connect-session'
import { FetchError } from '@reapit/utils-common'
import { Marketplace } from '@reapit/foundations-ts-definitions'

export type FetchDevelopersListParams = FetchListCommonParams & {
  name?: string
  company?: string
  isInactive?: boolean
  registeredFrom?: string
  registeredTo?: string
  status?: string
}

export type FetchDeveloperBillingPeriod = {
  period: string
}

export const fetchDeveloperBillingPeriod = async (params: FetchDeveloperBillingPeriod) => {
  try {
    const { period } = params
    const headers = await getPlatformHeaders(reapitConnectBrowserSession, 'latest')
    if (headers) {
      return fetcherWithBlob({
        url: `${URLS.developers}/costs/${period}`,
        api: process.env.platformApiUrl,
        method: 'GET',
        headers,
      })
    }
  } catch (error) {
    logger(error as FetchError)
  }
}

export const fetchDevelopersList = async (
  params: FetchDevelopersListParams,
): Promise<Marketplace.DeveloperModelPagedResult | void> => {
  try {
    const headers = await getPlatformHeaders(reapitConnectBrowserSession, 'latest')
    if (headers) {
      return fetcher({
        url: `${URLS.developers}/?${setQueryParams(params)}`,
        api: process.env.platformApiUrl,
        method: 'GET',
        headers,
      })
    }
  } catch (error) {
    logger(error as FetchError)
    throw error
  }
}
