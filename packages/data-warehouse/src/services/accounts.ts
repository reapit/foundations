import { fetcher } from '@reapit/elements'
import { URLS, BASE_HEADERS } from '../constants/api'
import { PagedAccountsModel } from '../types/accounts'
import { reapitConnectBrowserSession } from '../core/connect-session'

export const getAccountsService = async (): Promise<PagedAccountsModel | undefined | void> => {
  try {
    const session = await reapitConnectBrowserSession.connectSession()

    if (!session) throw new Error('No Reapit Connect Session is present')

    const response: PagedAccountsModel | undefined = await fetcher({
      api: window.reapit.config.platformApiUrl,
      url: `${URLS.ACCOUNTS}/?organisationId=${session.loginIdentity.orgId}`,
      method: 'GET',
      headers: {
        ...BASE_HEADERS,
        Authorization: `Bearer ${session.accessToken}`,
      },
    })

    if (response) {
      return response
    }

    throw new Error('Failed to fetch account')
  } catch (err) {
    console.error('Error', err.message)
  }
}

export const disableAccountsService = async (id: string): Promise<boolean | undefined> => {
  try {
    const session = await reapitConnectBrowserSession.connectSession()

    if (!session) throw new Error('No Reapit Connect Session is present')

    const response: boolean | undefined = await fetcher({
      api: window.reapit.config.platformApiUrl,
      url: `${URLS.ACCOUNTS}/${id}`,
      method: 'DELETE',
      headers: {
        ...BASE_HEADERS,
        Authorization: `Bearer ${session.accessToken}`,
      },
    })

    if (response) {
      return response
    }
    throw new Error('Failed to delete account')
  } catch (err) {
    console.error('Error', err.message)
  }
}
