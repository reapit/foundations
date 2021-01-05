import { OfficeGroupModelPagedResult } from '../../../../types/organisations-schema'

export const data: OfficeGroupModelPagedResult = {
  _embedded: [
    {
      id: 'string',
      created: '2019-08-14T12:30:02.0000000Z',
      modified: '2019-08-14T12:30:02.0000000Z',
      organisationId: 'string',
      name: 'string',
      tag: 'string',
      officeIds: 'string',
      status: 'string',
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
