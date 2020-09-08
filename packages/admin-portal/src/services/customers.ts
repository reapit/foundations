import { fetcher, setQueryParams } from '@reapit/elements'
import { URLS } from './constants'
import { generateHeader } from './utils'
import { logger } from '@reapit/utils'
import { FetchListCommonParams } from './types'
import { AddressModel, LinkModel } from '@reapit/foundations-ts-definitions'

export interface PagedResultCustomerModel_ {
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

export const fetchCustomersList = async (params: FetchCustomersListParams): Promise<PagedResultCustomerModel_> => {
  try {
    const response = await fetcher({
      url: `${URLS.customers}/?${setQueryParams(params)}`,
      api: window.reapit.config.marketplaceApiUrl,
      method: 'GET',
      headers: await generateHeader(window.reapit.config.marketplaceApiKey),
    })
    return response
  } catch (error) {
    logger(error)
    throw error
  }
}
