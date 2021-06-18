import { BASE_HEADERS, URLS } from './../constants/api'
import { ReapitConnectSession } from '@reapit/connect-session'
import { fetcher } from '@reapit/elements'

export const releaseServicePaginate = async (session: ReapitConnectSession): Promise<any[] | undefined> => {
  try {
    const response: any[] | undefined = await fetcher({
      api: URLS.DEPLOYMENT_SERVICE_HOST,
      url: '/dev/deploy/release/react-test',
      method: 'GET',
      headers: {
        ...BASE_HEADERS,
        Authorization: `${session.idToken}`,
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
