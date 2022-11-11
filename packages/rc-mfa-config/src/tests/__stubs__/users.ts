import { UserModelPagedResult } from '@reapit/foundations-ts-definitions'

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
    },
  ],
  pageNumber: 1,
  pageSize: 12,
  pageCount: 1,
  totalPageCount: 1,
  totalCount: 1,
}
