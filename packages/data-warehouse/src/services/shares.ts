import { fetcher } from '@reapit/elements'
import { URLS, BASE_HEADERS } from '../constants/api'
import { reapitConnectBrowserSession } from '../core/connect-session'
import { PagedSharesModel } from '../types/shares'

export const getSharesService = async (): Promise<PagedSharesModel | undefined | void> => {
  try {
    const session = await reapitConnectBrowserSession.connectSession()

    if (!session) throw new Error('No Reapit Connect Session is present')

    const response: PagedSharesModel | undefined = await fetcher({
      api: window.reapit.config.platformApiUrl,
      url: `${URLS.SHARES}/?organisationId=${session.loginIdentity.orgId}`,
      method: 'GET',
      headers: {
        ...BASE_HEADERS,
        Authorization: `Bearer ${session.accessToken}`,
      },
    })

    if (response) {
      return response
    }

    throw new Error('Failed to fetch shares')
  } catch (err) {
    console.error('Error', err.message)
  }
}

export const deleteSharesService = async (shareId: string): Promise<boolean | undefined> => {
  try {
    const session = await reapitConnectBrowserSession.connectSession()

    if (!session) throw new Error('No Reapit Connect Session is present')

    const response: boolean | undefined = await fetcher({
      api: window.reapit.config.platformApiUrl,
      url: `${URLS.SHARES}/${shareId}`,
      method: 'DELETE',
      headers: {
        ...BASE_HEADERS,
        Authorization: `Bearer ${session.accessToken}`,
      },
    })

    if (response) {
      return response
    }

    throw new Error('Failed to delete share')
  } catch (err) {
    console.error('Error', err.message)
  }
}
