import { fetcher } from '@reapit/elements'
import { ReapitConnectSession } from '@reapit/connect-session'
import { ApiKeyInterface } from '@reapit/foundations-ts-definitions'
import { BASE_HEADERS } from '../constants/api'

export const configurationApiKeyApiService = async (
  session: ReapitConnectSession,
): Promise<ApiKeyInterface[] | undefined> => {
  try {
    const response: ApiKeyInterface[] | undefined = await fetcher({
      api: 'https://ey4eq5tak9.execute-api.eu-west-2.amazonaws.com',
      url: '/dev/api-key',
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
