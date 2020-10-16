import { fetcher } from '@reapit/elements'
import { ReapitConnectSession } from '@reapit/connect-session'
import { PagedResultPropertyImageModel_ } from '@reapit/foundations-ts-definitions'
import { URLS, BASE_HEADERS } from '@/constants/api'
import { getAllResource } from '@/util/api-helper'

export const getPropertyImages = async (
  session: ReapitConnectSession,
  criteria?: string,
): Promise<PagedResultPropertyImageModel_ | undefined> => {
  let url = URLS.PROPERTY_IMAGES

  if (criteria !== null || criteria !== '') {
    url = `${url}?${criteria}`
  }

  try {
    const response: PagedResultPropertyImageModel_ | undefined = await fetcher({
      api: window.reapit.config.platformApiUrl,
      url,
      method: 'GET',
      headers: {
        ...BASE_HEADERS,
        Authorization: `Bearer ${session.accessToken}`,
      },
    })

    if (response) {
      return response
    }

    throw new Error('No response returned by API')
  } catch (err) {
    console.error('Error fetching Property Images', err.message)
  }
}

export const getAllPropertyImages = (session: ReapitConnectSession, criteria: URLSearchParams) => {
  return getAllResource(session, getPropertyImages, criteria)
}
