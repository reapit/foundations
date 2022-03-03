import { fetcher, fetcherWithReturnHeader } from '@reapit/utils-common'
import { URLS } from '../constants/api'
import { AccountCreateModel, PagedAccountsModel, AccountModel } from '../types/accounts'
import { reapitConnectBrowserSession } from '../core/connect-session'
import { getPlatformHeaders, logger } from '@reapit/utils-react'

export const getAccountsService = async (): Promise<PagedAccountsModel | undefined | void> => {
  try {
    const session = await reapitConnectBrowserSession.connectSession()

    if (!session) throw new Error('No Reapit Connect Session is present')

    const headers = await getPlatformHeaders(reapitConnectBrowserSession)

    if (headers) {
      const response: PagedAccountsModel | undefined = await fetcher({
        api: window.reapit.config.platformApiUrl,
        url: `${URLS.ACCOUNTS}/?organisationId=${session.loginIdentity.orgId}`,
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

export const getAccountService = async (accountId: string): Promise<AccountModel | undefined | void> => {
  try {
    const headers = await getPlatformHeaders(reapitConnectBrowserSession)

    if (headers) {
      const response: AccountModel | undefined = await fetcher({
        api: window.reapit.config.platformApiUrl,
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

export const disableAccountsService = async (id: string): Promise<boolean | undefined> => {
  try {
    const headers = await getPlatformHeaders(reapitConnectBrowserSession)

    if (headers) {
      const response: boolean | undefined = await fetcher({
        api: window.reapit.config.platformApiUrl,
        url: `${URLS.ACCOUNTS}/${id}`,
        method: 'DELETE',
        headers,
      })

      if (response) {
        return response
      }
      throw new Error('Failed to delete account')
    }
  } catch (err) {
    logger(err as Error)
  }
}

export const createAccountsService = async (account: AccountCreateModel): Promise<string | undefined> => {
  try {
    const headers = await getPlatformHeaders(reapitConnectBrowserSession)

    if (headers) {
      const response = (await fetcherWithReturnHeader({
        api: window.reapit.config.platformApiUrl,
        url: `${URLS.ACCOUNTS}`,
        method: 'POST',
        headers,
        body: account,
      })) as Headers
      if (response && response.get('location')) {
        return response.get('location') as string
      }
      throw new Error('Failed to create account')
    }
  } catch (err) {
    logger(err as Error)
  }
}

export const updateAccountService = async (
  account: Partial<AccountCreateModel>,
  accountId: string,
): Promise<boolean | undefined> => {
  try {
    const headers = await getPlatformHeaders(reapitConnectBrowserSession)

    if (headers) {
      const response: boolean | undefined = await fetcher({
        api: window.reapit.config.platformApiUrl,
        url: `${URLS.ACCOUNTS}/${accountId}`,
        method: 'PATCH',
        headers,
        body: {
          password: account.password,
        },
      })

      if (response) {
        return response
      }
      throw new Error('Failed to update account')
    }
  } catch (err) {
    logger(err as Error)
  }
}
