import { UserInfoModel } from '@reapit/foundations-ts-definitions'

export const mockUserInfo: UserInfoModel = {
  id: 'cGV0ZS5saXR0bGV3b29kK3h0bUBnbWFpbC5jb20',
  name: 'Pete XTM User',
  organisationId: 'f3c86df7-0c20-4182-ad5a-d8a135999e3b',
  userOrganisations: [
    {
      id: '10545779-1d3b-4f6a-9287-093e87f2adbd',
      created: '2022-07-07T09:09:49.0000000Z',
      organisationId: 'a2331ba0-e4c9-4057-b7a3-723f2abbd9cb',
      customerId: 'TST',
      name: 'Office Groups Testing',
      groups: ['MarketplaceAdmin', 'OrganisationAdmin'],
    },
    {
      id: 'ffc9101f-0dd2-4121-8d7d-52710f7e2881',
      created: '2022-05-16T15:02:55.0000000Z',
      organisationId: 'f3c86df7-0c20-4182-ad5a-d8a135999e3b',
      customerId: 'XTM',
      name: 'XTM Estates Ltd',
      groups: ['ReapitUser', 'ReapitUserAdmin', 'MarketplaceAdmin', 'OrganisationAdmin'],
    },
  ],
}
