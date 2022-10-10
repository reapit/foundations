import { UserModel } from '@reapit/foundations-ts-definitions'

export const mockUserModel: UserModel = {
  id: 'MOCK_ID',
  created: '2020-11-03T12:18:38.0000000Z',
  modified: '2022-09-06T14:01:25.0000000Z',
  email: 'example@mail.com',
  name: 'Joe Person',
  mobile: '',
  landline: '',
  jobTitle: 'Head of Things',
  inactive: false,
  organisationId: 'MOCK_ORG_ID',
  organisationName: 'Reapit Ltd Internal',
  organisationIds: ['MOCK_ORG_ID'],
  organisationProduct: 'agencyCloud',
  marketplaceDeveloperId: 'MOCK_DEVELOPER_ID',
  agencyCloudCustomerId: 'SBOX',
  agencyCloudNegotiatorId: 'ADV',
  consentToTrack: true,
  consentToTrackModified: '2022-09-06T14:01:25.0000000Z',
  groups: [
    'OrganisationAdmin',
    'AgencyCloudDeveloperEdition',
    'FoundationsDeveloper',
    'MarketplaceAdmin',
    'FoundationsDeveloperAdmin',
    'ReapitEmployeeFoundationsAdmin',
    'ReapitUserAdmin',
  ],
  userClaims: [],
  organisationClaims: [
    {
      claim: 'agencyCloudId',
      value: 'SBOX',
      includeInToken: true,
    },
  ],
  products: [
    {
      id: 'agencyCloud',
      organisationId: 'MOCK_ORG_ID',
    },
  ],
}
