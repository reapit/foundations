// TODO: TO MOVE ALL API CALL TO HERE

import { fetcher, setQueryParams } from '@reapit/elements'
import { URLS, generateHeader } from '../constants/api'
import { RevisionsRequestParams } from '@/actions/revisions'
import { APPS_PER_PAGE } from '@/constants/paginator'
import { logger } from 'logger'

// Apps API
export const fetchAdminApps = async ({ params }) => {
  try {
    const response = await fetcher({
      url: `${URLS.apps}?${setQueryParams({
        ...params,
        pageSize: APPS_PER_PAGE,
      })}`,
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

export const deleteApp = async ({ appId }) => {
  try {
    const response = await fetcher({
      url: `${URLS.apps}/${appId}`,
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

export const fetchAppRevisions = async (params: RevisionsRequestParams) => {
  try {
    const { appId, ...rest } = params
    const response = await fetcher({
      url: `${URLS.apps}/${appId}/revisions?${setQueryParams({ ...rest })}`,
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

// developer API
export const fetchMyIdentity = async (developerId: string) => {
  try {
    const response = await fetcher({
      url: `${URLS.developers}/${developerId}`,
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

// billing API
export type FetchBillingParams = {
  dateFrom: string
  dateTo: string
  applicationId: string[]
}

export const fetchBilling = async (params: FetchBillingParams) => {
  try {
    const response = await fetcher({
      url: `${URLS.trafficEvents}/billing?${setQueryParams(params)}`,
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

export default {
  fetchAdminApps,
  deleteApp,
  fetchMyIdentity,
  fetchBilling,
}
