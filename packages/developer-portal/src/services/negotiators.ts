import { fetcher, setQueryParams } from '@reapit/elements'
import { getPlatformHeaders, logger } from '@reapit/utils'
import { reapitConnectBrowserSession } from '../core/connect-session'
import { URLS } from './constants'

export interface FetchNegotiatorsParams {
  pageNumber?: number
  pageSize?: number
  sortBy?: string
  embed?: string[]
  id?: string[]
  officeId?: string[]
  name?: string
}

export type NegotiatorItem = {
  active: boolean
  created: string
  email: string
  id: string
  jobTitle: string
  metadata: any
  mobilePhone: string
  modified: string
  name: string
  officeId: string
  workPhone: string
}

export type NegotiatorsResult = {
  pageCount: number
  pageNumber: number
  pageSize: number
  totalCount: number
  _embedded: NegotiatorItem[]
} | null

export const fetchNegotiators = async (params: FetchNegotiatorsParams): Promise<NegotiatorsResult> => {
  try {
    const response = await fetcher({
      url: `${URLS.negotiators}?${setQueryParams(params)}`,
      api: window.reapit.config.platformApiUrl,
      method: 'GET',
      headers: await getPlatformHeaders(reapitConnectBrowserSession, 'latest'),
    })
    return response
  } catch (error) {
    logger(error)
    throw new Error(error)
  }
}
