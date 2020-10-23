import { fetcher } from '@reapit/elements'
import { URLS, BASE_HEADERS } from '../constants/api'
import { PagedAccountsModel } from '../types/accounts'
import { reapitConnectBrowserSession } from '../core/connect-session'

export const getAccountsService = async (): Promise<PagedAccountsModel | undefined> => {
  try {
    const session = await reapitConnectBrowserSession.connectSession()

    if (!session) throw new Error('No Reapit Connect Session is present')

    const response: PagedAccountsModel | undefined = await fetcher({
      api: window.reapit.config.platformApiUrl,
      url: `${URLS.ACCOUNTS}/?organisationId=${session.loginIdentity.orgId}&devMode=true`,
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
    console.error('Error fetching Account information', err.message)
  }
}
