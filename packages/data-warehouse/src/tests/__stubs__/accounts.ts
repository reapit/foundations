import { AccountModel } from '../../types/accounts'
import { PagedApiResponse } from '../../types/core'

export const stubAccounts: PagedApiResponse<AccountModel> = {
  _embedded: [
    {
      id: 'e43cfd79-da23-4158-9ef4-75e4e3823a71',
      created: '2020-10-28T15:46:02.0000000Z',
      modified: null,
      organisationId: '8aa72233-aabb-4595-8712-f81ad8bb0dc3',
      username: 'hiyaall',
      isAdmin: false,
      status: 'active',
    },
  ],
  pageNumber: 1,
  pageSize: 12,
  pageCount: 1,
  totalPageCount: 1,
  totalCount: 1,
  _links: {
    self: {
      href: '/dataMarketplace/?PageNumber=1&PageSize=12&organisationId=8aa72233-aabb-4595-8712-f81ad8bb0dc3',
    },
    first: {
      href: '/dataMarketplace/?PageNumber=1&PageSize=12&organisationId=8aa72233-aabb-4595-8712-f81ad8bb0dc3',
    },
  },
}
