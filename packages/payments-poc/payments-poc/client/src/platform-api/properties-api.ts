import { fetcher } from '@reapit/elements'
import { ReapitConnectSession } from '@reapit/connect-session'
import { PropertyModel, PagedResultPropertyModel_ } from '@reapit/foundations-ts-definitions'
import { URLS, BASE_HEADERS } from '../constants/api'

export const propertiesApiService = async (
  session: ReapitConnectSession,
): Promise<PropertyModel[] | undefined> => {
  try {
    const response: PagedResultPropertyModel_ | undefined = await fetcher({
      api: window.reapit.config.platformApiUrl,
      url: `${URLS.PROPERTIES}/?agentRole=rentCollection&marketingMode=letting`,
      method: 'GET',
      headers: {
        ...BASE_HEADERS,
        Authorization: `Bearer ${session.accessToken}`,
      },
    })

    if (response) {
      return response._embedded as PropertyModel[]
    }

    throw new Error('No response returned by API')
  } catch (err) {
    console.error('Error fetching properties', err.message)
  }
}
