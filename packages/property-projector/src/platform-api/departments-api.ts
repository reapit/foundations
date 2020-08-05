import { fetcher } from '@reapit/elements'
import { ReapitConnectSession } from '@reapit/connect-session'
import { PagedResultDepartmentModel_ } from '@reapit/foundations-ts-definitions'
import { URLS, BASE_HEADERS } from '../constants/api'

export const getDepartments = async (
  session: ReapitConnectSession,
): Promise<PagedResultDepartmentModel_ | undefined> => {
  try {
    const response: PagedResultDepartmentModel_ | undefined = await fetcher({
      api: window.reapit.config.platformApiUrl,
      url: URLS.DEPARTMENTS,
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
