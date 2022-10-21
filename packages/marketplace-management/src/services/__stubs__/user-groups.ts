import { GroupModelPagedResult } from '@reapit/foundations-ts-definitions'

export const mockUserGroups: GroupModelPagedResult = {
  _embedded: [
    {
      id: 'MarketplaceAdmin',
      created: '2021-01-15T12:13:37.0000000Z',
      description: 'Users who can administer the Reapit Marketplace for an organisation or organisation office group',
      memberCount: 4,
    },
    {
      id: 'OrganisationAdmin',
      created: '2021-01-05T16:01:48.0000000Z',
      description: 'Users who can administer an organisation',
      memberCount: 1,
    },
    {
      id: 'ReapitUserAdmin',
      created: '2020-06-29T06:29:41.0000000Z',
      description: 'Users who are Reapit customers who can perform admin Foundations actions',
      memberCount: 3,
    },
  ],
  pageNumber: 1,
  pageSize: 12,
  pageCount: 3,
  totalPageCount: 1,
  totalCount: 3,
  _links: {
    self: {
      href: '/organisations/?PageNumber=1&PageSize=12&id=OrganisationAdmin&id=MarketplaceAdmin&id=ReapitUserAdmin&organisationId=1185e436-3b7e-4f67-a4b7-68f83054ad3c',
    },
    first: {
      href: '/organisations/?PageNumber=1&PageSize=12&id=OrganisationAdmin&id=MarketplaceAdmin&id=ReapitUserAdmin&organisationId=1185e436-3b7e-4f67-a4b7-68f83054ad3c',
    },
  },
}
