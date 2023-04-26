import { fetcher } from '@reapit/utils-common'
import { ReapitConnectSession } from '@reapit/connect-session'
import { URLS, BASE_HEADERS } from '../constants/api'
import { logger } from '@reapit/utils-react'

export interface AuthenticateModel {
  userToken: string
}

export interface Report {
  name: string
  reportId: string
  embeddedUrl: string
}

export interface CredentialsBaseModel {
  token: string
  information: string | null
  status: 'incomplete' | 'complete' | 'failed'
}

export interface CredentialsModel extends CredentialsBaseModel {
  report: Report | null
}

export interface CredentialsResponseModel extends CredentialsBaseModel {
  reports: Report[]
}

export const powerBiApiService = async (
  session: ReapitConnectSession,
): Promise<CredentialsModel | undefined | never> => {
  try {
    const response: CredentialsResponseModel | undefined = await fetcher({
      api: process.env.platformApiUrl,
      url: URLS.POWER_BI,
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
      const { token, information, reports, status } = response
      return {
        token,
        information,
        status,
        report: reports && reports[0] ? reports[0] : null,
      }
    }

    throw new Error('No response returned by API')
  } catch (err) {
    logger(err as Error)
  }
}
