import { fetcher } from '@reapit/elements'
import { ReapitConnectSession } from '@reapit/connect-session'
import { PagedResultPropertyModel_ } from '@reapit/foundations-ts-definitions'
import { URLS, BASE_HEADERS } from '../constants/api'

export const getProperties = async (
  session: ReapitConnectSession,
  criteria?: string,
): Promise<PagedResultPropertyModel_ | undefined> => {
  let url = URLS.PROPERTIES

  if (criteria !== null || criteria !== '') {
    url = `${url}?${criteria}`
  }

  try {
    const response: PagedResultPropertyModel_ | undefined = await fetcher({
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
    console.error('Error fetching Properties', err.message)
  }
}
