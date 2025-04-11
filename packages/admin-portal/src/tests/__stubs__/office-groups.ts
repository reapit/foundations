import { Organisations } from '@reapit/foundations-ts-definitions'

export const mockOfficeGroupModelPagedResult: Organisations.OfficeGroupModelPagedResult = {
  _embedded: [
    {
      id: '12ce73ac-76b6-45ec-8b92-a3d1a10c2ffc',
      created: '2021-04-29T07:03:21.0000000Z',
      organisationId: '201a8d35-f682-41a8-95ed-079133e4b517',
      customerId: 'RES-GGTN',
      name: 'Group 10',
      tag: 'GGTN',
      officeIds: 'AAE,CSL,AAS',
      status: 'inactive',
    },
  ],
  pageNumber: 1,
  pageSize: 12,
  pageCount: 1,
  totalPageCount: 1,
  totalCount: 1,
}
