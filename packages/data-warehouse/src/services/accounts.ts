import { fetcher } from '@reapit/utils-common'
import { URLS } from '../constants/api'
import { AccountModel } from '../types/accounts'
import { reapitConnectBrowserSession } from '../core/connect-session'
import { getPlatformHeaders, logger } from '@reapit/utils-react'

export const getAccountService = async (accountId: string): Promise<AccountModel | undefined | void> => {
  try {
    const headers = await getPlatformHeaders(reapitConnectBrowserSession)

    if (headers) {
      const response: AccountModel | undefined = await fetcher({
        api: process.env.platformApiUrl,
        url: `${URLS.ACCOUNTS}/${accountId}`,
        method: 'GET',
        headers,
      })

      if (response) {
        return response
      }

      throw new Error('Failed to fetch account')
    }
  } catch (err) {
    logger(err as Error)
  }
}
