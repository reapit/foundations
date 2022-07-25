import { fetcher, FetchError, fetcherWithBlob, setQueryParams } from '@reapit/utils-common'
import { URLS } from './constants'
import { getPlatformHeaders, logger } from '@reapit/utils-react'
import { FetchListCommonParams } from './types'
import { AddressModel, LinkModel } from '@reapit/foundations-ts-definitions'
import { reapitConnectBrowserSession } from '../core/connect-session'

export interface PagedResultCustomerModel {
  pageNumber?: number
  pageSize?: number
  pageCount?: number
  totalCount?: number
  data?: CustomerModel[]
}

export interface CustomerModel {
  id?: string
  created?: string
  agencyCloudId?: string
  name?: string
  address?: AddressModel
  links?: LinkModel[]
  modified?: string
}
export type FetchCustomersListParams = FetchListCommonParams & {
  name?: string[]
  agencyCloudId?: string[]
}

export const fetchCustomersList = async (
  params: FetchCustomersListParams,
): Promise<PagedResultCustomerModel | void> => {
  try {
    const headers = await getPlatformHeaders(reapitConnectBrowserSession, 'latest')
    if (headers) {
      const response = await fetcher({
        url: `${URLS.customers}/?${setQueryParams(params)}`,
        api: window.reapit.config.platformApiUrl,
        method: 'GET',
        headers,
      })
      return response
    }
  } catch (error) {
    logger(error as FetchError)
    throw error
  }
}

export const fetchCustomerWarehouseCosts = async (period: string) => {
  try {
    const headers = await getPlatformHeaders(reapitConnectBrowserSession, 'latest')
    if (headers) {
      const response = await fetcherWithBlob({
        url: `${URLS.customers}/warehouseCosts/${period}`,
        api: window.reapit.config.platformApiUrl,
        method: 'GET',
        headers,
      })
      return response
    }
  } catch (error) {
    logger(error as FetchError)
    throw error
  }
}
