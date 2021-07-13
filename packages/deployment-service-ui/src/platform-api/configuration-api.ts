import { fetcher } from '@reapit/elements-legacy'
import { ReapitConnectSession } from '@reapit/connect-session'
import { ApiKeyEntityType, ApiKeyInterface } from '@reapit/foundations-ts-definitions'
import { BASE_HEADERS, URLS } from '../constants/api'

export const configurationApiKeyApiService = async (
  session: ReapitConnectSession,
): Promise<ApiKeyInterface[] | undefined> => {
  try {
    const response: { items: ApiKeyInterface[] } | undefined = await fetcher({
      api: URLS.API_KEY_SERVICE_HOST,
      url: '/api-key',
      method: 'GET',
      headers: {
        ...BASE_HEADERS,
        Authorization: `${session.idToken}`,
      },
    })

    if (response) {
      return response.items
    }

    throw new Error('No response returned by API')
  } catch (err) {
    console.error('Error fetching Configuration Appointment Types', err.message)
  }
}

export const configurationApiKeyApiCreateService = async (
  session: ReapitConnectSession,
  apiKey: Partial<ApiKeyInterface>,
): Promise<ApiKeyInterface | undefined> => {
  try {
    const keyExpiresAt = new Date()
    keyExpiresAt.setFullYear(keyExpiresAt.getFullYear() + 1)
    const response: ApiKeyInterface | undefined = await fetcher({
      api: URLS.API_KEY_SERVICE_HOST,
      url: '/api-key',
      method: 'POST',
      headers: {
        ...BASE_HEADERS,
        Authorization: `${session.idToken}`,
      },
      body: {
        entityType: ApiKeyEntityType.DEPLOYMENT,
        keyExpiresAt: keyExpiresAt.toISOString(),
        ...apiKey,
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

export const configurationApiKeyApiDeleteService = async (
  session: ReapitConnectSession,
  id: string,
): Promise<undefined> => {
  try {
    const keyExpiresAt = new Date()
    keyExpiresAt.setFullYear(keyExpiresAt.getFullYear() + 1)
    const response: undefined = await fetcher({
      api: URLS.API_KEY_SERVICE_HOST,
      url: `/api-key/${id}`,
      method: 'DELETE',
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
