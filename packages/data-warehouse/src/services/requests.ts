import { fetcher } from '@reapit/elements'
import { BASE_HEADERS, URLS } from '../constants/api'
import { reapitConnectBrowserSession } from '../core/connect-session'
import { CreateRequestModel } from '../types/requests'

export const createRequestService = async (datasetId: string): Promise<boolean | undefined> => {
  try {
    const session = await reapitConnectBrowserSession.connectSession()

    if (!session) throw new Error('No Reapit Connect Session is present')

    const { orgId, developerId, email, name, clientId } = session.loginIdentity

    if (!orgId || !developerId || !clientId)
      throw new Error('Organisation, developer and customerIds must be supplied to make a request')

    const request: CreateRequestModel = {
      organisationId: orgId,
      developerId: developerId,
      requesterEmail: email,
      requesterName: name,
      requestMessage: 'Please can I access this data',
      datasetId,
      customerId: clientId,
      devMode: false,
    }

    const response: boolean | undefined = await fetcher({
      api: window.reapit.config.platformApiUrl,
      url: `${URLS.REQUESTS}`,
      method: 'POST',
      headers: {
        ...BASE_HEADERS,
        Authorization: `Bearer ${session.accessToken}`,
      },
      body: request,
    })

    if (response) {
      return response
    }
    throw new Error('Failed to create request')
  } catch (err) {
    console.error('Error', err.message)
  }
}
