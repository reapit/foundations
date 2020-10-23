import { selector, RecoilValueReadOnly } from 'recoil'
// import { atom, selector, RecoilState } from 'recoil'
import { PagedAccountsModel } from '../types/accounts'
// import { getAccountsService } from '../services/accounts'
import { reapitConnectBrowserSession } from '../core/connect-session'
import { fetcher } from '@reapit/elements'
import { URLS, BASE_HEADERS } from '../constants/api'

// export const organisationIdState = atom({
//   key: 'OrganisationId',
//   default: null,
// }) as RecoilState<null | string>

export const organisationAccountQuery: RecoilValueReadOnly<PagedAccountsModel | undefined> = selector({
  key: 'OrgainisationAccount',
  get: async () => {

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
  },
})
