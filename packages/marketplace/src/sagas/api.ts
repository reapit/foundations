import { fetcher, setQueryParams } from '@reapit/elements'
import { URLS, generateHeader } from '../constants/api'
import { APPS_PER_PAGE } from '@/constants/paginator'
import { logger } from 'logger'

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

export default {
  fetchAdminApps,
  deleteApp,
}
