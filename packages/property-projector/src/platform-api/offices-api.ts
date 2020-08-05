import { fetcher } from '@reapit/elements'
import { ReapitConnectSession } from '@reapit/connect-session'
import { PagedResultOfficeModel_ } from '@reapit/foundations-ts-definitions'
import { URLS, BASE_HEADERS } from '../constants/api'

export const getOffices = async (session: ReapitConnectSession): Promise<PagedResultOfficeModel_ | undefined> => {
  try {
    const response: PagedResultOfficeModel_ | undefined = await fetcher({
      api: window.reapit.config.platformApiUrl,
      url: URLS.OFFICES,
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
    console.error('Error fetching Configuration Appointment Types', err.message)
  }
}
