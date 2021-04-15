import { fetcher } from '@reapit/elements'
import { ReapitConnectSession } from '@reapit/connect-session'
import { URLS, BASE_HEADERS } from '../constants/api'

export interface AuthenticateModel {
  userToken: string
}

export interface CredentialsModel {
  token: string
  collection: number
  url: string | null
  status: 'incomplete' | 'complete' | 'failed'
}

export const metabaseApiService = async (session: ReapitConnectSession): Promise<CredentialsModel | undefined> => {
  try {
    const response: CredentialsModel | undefined = await fetcher({
      api: window.reapit.config.platformApiUrl,
      url: URLS.METABASE,
      method: 'POST',
      headers: {
        ...BASE_HEADERS,
        Authorization: `Bearer ${session.accessToken}`,
      },
      body: {
        userToken: session.idToken,
      },
    })

    if (response) {
      return response
    }

    throw new Error('No response returned by API')
  } catch (err) {
    console.error('Error fetching Metabase Credentials', err.message)
  }
}
