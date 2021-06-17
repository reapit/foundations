import { BASE_HEADERS } from './../constants/api'
import { ReapitConnectSession } from '@reapit/connect-session'
import { fetcher } from '@reapit/elements'

export const releaseServicePaginate = async (session: ReapitConnectSession): Promise<any[] | undefined> => {
  try {
    const response: any[] | undefined = await fetcher({
      api: 'https://h2r8e8wbd4.execute-api.eu-west-2.amazonaws.com',
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
