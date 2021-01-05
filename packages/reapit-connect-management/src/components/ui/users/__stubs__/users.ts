import { UserModelPagedResult } from '../../../../types/organisations-schema'

export const data: UserModelPagedResult = {
  _embedded: [
    {
      id: 'string',
      modified: '2019-08-14T12:30:02.0000000Z',
      created: '2019-08-14T12:30:02.0000000Z',
      email: 'string',
      name: 'string',
      mobile: 'string',
      landline: 'string',
      jobTitle: 'string',
      inactive: true,
      organisationId: 'string',
      organisationName: 'string',
      marketplaceDeveloperId: 'string',
      agencyCloudCustomerId: 'string',
      agencyCloudNegotiatorId: 'string',
      groups: ['string'],
    },
  ],
  pageNumber: 0,
  pageSize: 0,
  pageCount: 0,
  totalPageCount: 0,
  totalCount: 0,
  _links: {
    additionalProp1: {
      href: 'string',
    },
    additionalProp2: {
      href: 'string',
    },
    additionalProp3: {
      href: 'string',
    },
  },
}
