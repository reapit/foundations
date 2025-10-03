import { GroupModelPagedResult, UserModelPagedResult } from '@reapit/foundations-ts-definitions'

export const mockUserModelPagedResult: UserModelPagedResult = {
  _embedded: [
    {
      id: 'd2lsbG1jdmF5QGljbG91ZC5jb20',
      created: '2022-11-09T12:12:31.0000000Z',
      email: 'test@icloud.com',
      name: 'Will McVay',
      idpStatus: 'active',
      inactive: false,
      organisationName: 'XTM Estates Ltd',
      agencyCloudCustomerId: 'SBOX',
      agencyCloudNegotiatorId: 'ADV',
      consentToTrack: true,
      mfaEnabled: true,
      groups: ['OrganisationAdmin', 'ReapitUser', 'MarketplaceAdmin'],
      products: [],
      organisationIds: ['d2lsbG1jdmF5QGljbG91ZC5jb20'],
    },
  ],
  pageNumber: 1,
  pageSize: 12,
  pageCount: 1,
  totalPageCount: 1,
  totalCount: 1,
}

export const mockGroupModelPagedResult: GroupModelPagedResult = {
  _embedded: [
    {
      id: 'MyTestGroup',
      created: '2022-02-07T20:17:36.0000000Z',
      modified: '2022-02-07T20:18:05.0000000Z',
      description: 'Update group desc',
      memberCount: 1,
    },
  ],
  pageNumber: 1,
  pageSize: 100,
  pageCount: 20,
  totalPageCount: 1,
  totalCount: 20,
}
