import { fetcher } from '@reapit/elements'
import { getPlatformHeaders, logger } from '@reapit/utils'
import { URLS } from '../constants/api'
import { reapitConnectBrowserSession } from '../core/connect-session'
import { CreateRequestModel } from '../types/requests'

export const createRequestService = async (datasetId: string): Promise<boolean | undefined> => {
  try {
    const session = await reapitConnectBrowserSession.connectSession()

    if (!session) throw new Error('No Reapit Connect Session is present')

    const { orgId, developerId, email, name, clientId } = session.loginIdentity

    if (!orgId || !developerId) throw new Error('Organisation and developer must be supplied to make a request')

    const request: CreateRequestModel = {
      organisationId: orgId,
      developerId: developerId,
      requesterEmail: email,
      requesterName: name,
      requestMessage: 'Please can I access this data',
      datasetId,
      customerId: clientId || 'SBOX',
      devMode: false,
    }

    const response: boolean | undefined = await fetcher({
      api: window.reapit.config.platformApiUrl,
      url: `${URLS.REQUESTS}`,
      method: 'POST',
      headers: await getPlatformHeaders(reapitConnectBrowserSession),
      body: request,
    })

    if (response) {
      return response
    }
    throw new Error('Failed to create request')
  } catch (err) {
    logger(err)
  }
}
