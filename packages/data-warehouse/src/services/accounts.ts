import { fetcher, fetcherWithReturnHeader } from '@reapit/elements'
import { URLS, BASE_HEADERS } from '../constants/api'
import { AccountCreateModel, PagedAccountsModel, AccountModel } from '../types/accounts'
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

export const getAccountService = async (accountId: string): Promise<AccountModel | undefined | void> => {
  try {
    const session = await reapitConnectBrowserSession.connectSession()

    if (!session) throw new Error('No Reapit Connect Session is present')

    const response: AccountModel | undefined = await fetcher({
      api: window.reapit.config.platformApiUrl,
      url: `${URLS.ACCOUNTS}/${accountId}`,
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

export const createAccountsService = async (account: AccountCreateModel): Promise<string | undefined> => {
  try {
    const session = await reapitConnectBrowserSession.connectSession()

    if (!session) throw new Error('No Reapit Connect Session is present')

    const response = (await fetcherWithReturnHeader({
      api: window.reapit.config.platformApiUrl,
      url: `${URLS.ACCOUNTS}`,
      method: 'POST',
      headers: {
        ...BASE_HEADERS,
        Authorization: `Bearer ${session.accessToken}`,
      },
      body: account,
    })) as Headers
    if (response && response.get('location')) {
      return response.get('location') as string
    }
    throw new Error('Failed to create account')
  } catch (err) {
    console.error('Error', err.message)
  }
}

export const updateAccountService = async (
  account: Partial<AccountCreateModel>,
  accountId: string,
): Promise<boolean | undefined> => {
  try {
    const session = await reapitConnectBrowserSession.connectSession()

    if (!session) throw new Error('No Reapit Connect Session is present')

    const response: boolean | undefined = await fetcher({
      api: window.reapit.config.platformApiUrl,
      url: `${URLS.ACCOUNTS}/${accountId}`,
      method: 'PATCH',
      headers: {
        ...BASE_HEADERS,
        Authorization: `Bearer ${session.accessToken}`,
      },
      body: {
        password: account.password,
      },
    })

    if (response) {
      return response
    }
    throw new Error('Failed to update account')
  } catch (err) {
    console.error('Error', err.message)
  }
}
