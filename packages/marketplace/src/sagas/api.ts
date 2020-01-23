import { fetcher, setQueryParams } from '@reapit/elements'
import { URLS, MARKETPLACE_HEADERS } from '../constants/api'
import { APPS_PER_PAGE } from '@/constants/paginator'

export const fetchAdminApps = async ({ params }) => {
  try {
    const response = await fetcher({
      url: `${URLS.apps}?${setQueryParams({
        ...params,
        pageSize: APPS_PER_PAGE
      })}`,
      api: process.env.MARKETPLACE_API_BASE_URL as string,
      method: 'GET',
      headers: MARKETPLACE_HEADERS
    })
    return response
  } catch (error) {
    console.error(error)
    throw new Error(error)
  }
}

export const deleteApp = async ({ appId }) => {
  try {
    const response = await fetcher({
      url: `${URLS.apps}/${appId}`,
      api: process.env.MARKETPLACE_API_BASE_URL as string,
      method: 'DELETE',
      headers: MARKETPLACE_HEADERS
    })
    return response
  } catch (error) {
    console.error(error)
    throw new Error(error)
  }
}

export default {
  fetchAdminApps,
  deleteApp
}
