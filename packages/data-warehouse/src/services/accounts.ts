import { fetcher, fetcherWithReturnHeader } from '@reapit/elements'
import { URLS } from '../constants/api'
import { AccountCreateModel, PagedAccountsModel, AccountModel } from '../types/accounts'
import { reapitConnectBrowserSession } from '../core/connect-session'
import { getPlatformHeaders, logger } from '@reapit/utils'

export const getAccountsService = async (): Promise<PagedAccountsModel | undefined | void> => {
  try {
    const session = await reapitConnectBrowserSession.connectSession()

    if (!session) throw new Error('No Reapit Connect Session is present')

    const response: PagedAccountsModel | undefined = await fetcher({
      api: window.reapit.config.platformApiUrl,
      url: `${URLS.ACCOUNTS}/?organisationId=${session.loginIdentity.orgId}`,
      method: 'GET',
      headers: await getPlatformHeaders(reapitConnectBrowserSession),
    })

    if (response) {
      return response
    }

    throw new Error('Failed to fetch account')
  } catch (err) {
    logger(err)
  }
}

export const getAccountService = async (accountId: string): Promise<AccountModel | undefined | void> => {
  try {
    const response: AccountModel | undefined = await fetcher({
      api: window.reapit.config.platformApiUrl,
      url: `${URLS.ACCOUNTS}/${accountId}`,
      method: 'GET',
      headers: await getPlatformHeaders(reapitConnectBrowserSession),
    })

    if (response) {
      return response
    }

    throw new Error('Failed to fetch account')
  } catch (err) {
    logger(err)
  }
}

export const disableAccountsService = async (id: string): Promise<boolean | undefined> => {
  try {
    const response: boolean | undefined = await fetcher({
      api: window.reapit.config.platformApiUrl,
      url: `${URLS.ACCOUNTS}/${id}`,
      method: 'DELETE',
      headers: await getPlatformHeaders(reapitConnectBrowserSession),
    })

    if (response) {
      return response
    }
    throw new Error('Failed to delete account')
  } catch (err) {
    logger(err)
  }
}

export const createAccountsService = async (account: AccountCreateModel): Promise<string | undefined> => {
  try {
    const response = (await fetcherWithReturnHeader({
      api: window.reapit.config.platformApiUrl,
      url: `${URLS.ACCOUNTS}`,
      method: 'POST',
      headers: await getPlatformHeaders(reapitConnectBrowserSession),
      body: account,
    })) as Headers
    if (response && response.get('location')) {
      return response.get('location') as string
    }
    throw new Error('Failed to create account')
  } catch (err) {
    logger(err)
  }
}

export const updateAccountService = async (
  account: Partial<AccountCreateModel>,
  accountId: string,
): Promise<boolean | undefined> => {
  try {
    const response: boolean | undefined = await fetcher({
      api: window.reapit.config.platformApiUrl,
      url: `${URLS.ACCOUNTS}/${accountId}`,
      method: 'PATCH',
      headers: await getPlatformHeaders(reapitConnectBrowserSession),
      body: {
        password: account.password,
      },
    })

    if (response) {
      return response
    }
    throw new Error('Failed to update account')
  } catch (err) {
    logger(err)
  }
}
