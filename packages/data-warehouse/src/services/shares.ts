import { fetcher } from '@reapit/utils-common'
import { getPlatformHeaders, logger } from '@reapit/utils-react'
import { URLS } from '../constants/api'
import { reapitConnectBrowserSession } from '../core/connect-session'
import { PagedSharesModel } from '../types/shares'

export const getSharesService = async (): Promise<PagedSharesModel | undefined | void> => {
  try {
    const session = await reapitConnectBrowserSession.connectSession()

    if (!session) throw new Error('No Reapit Connect Session is present')
    const headers = await getPlatformHeaders(reapitConnectBrowserSession)

    if (headers) {
      const response: PagedSharesModel | undefined = await fetcher({
        api: window.reapit.config.platformApiUrl,
        url: `${URLS.SHARES}/?organisationId=${session.loginIdentity.orgId}`,
        method: 'GET',
        headers,
      })

      if (response) {
        return response
      }

      throw new Error('Failed to fetch shares')
    }
  } catch (err) {
    logger(err)
  }
}

export const deleteSharesService = async (shareId: string): Promise<boolean | undefined> => {
  try {
    const headers = await getPlatformHeaders(reapitConnectBrowserSession)

    if (headers) {
      const response: boolean | undefined = await fetcher({
        api: window.reapit.config.platformApiUrl,
        url: `${URLS.SHARES}/${shareId}`,
        method: 'DELETE',
        headers,
      })

      if (response) {
        return response
      }

      throw new Error('Failed to delete share')
    }
  } catch (err) {
    logger(err)
  }
}

export const refreshSharesService = async (shareId: string): Promise<boolean | undefined> => {
  try {
    const headers = await getPlatformHeaders(reapitConnectBrowserSession)

    if (headers) {
      const response: boolean | undefined = await fetcher({
        api: window.reapit.config.platformApiUrl,
        url: `${URLS.SHARES}/${shareId}/refresh`,
        method: 'POST',
        headers,
      })

      if (response) {
        return response
      }

      throw new Error('Failed to refresh share')
    }
  } catch (err) {
    logger(err)
  }
}
