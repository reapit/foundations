import { PagedApiResponse } from '../../types/core'
import { SharesModel } from '../../types/shares'

export const mockShares: PagedApiResponse<SharesModel> = {
  _embedded: [
    {
      id: '4a1c7cf9-3c25-4583-892a-4ec7b587a822',
      created: '2020-10-28T12:10:02.0000000Z',
      modified: null,
      organisationId: '8aa72233-aabb-4595-8712-f81ad8bb0dc3',
      developerId: '6ad99b9f-4c1d-453f-a591-eba068dfc745',
      datasetId: 'legacyDb',
      datasetName: 'RPS Database',
      customerId: 'DEV',
      region: 'eu-west-1',
      database: 'reapit',
      schema: 'customers_rps_DEV',
      accountName: 'WILLMCVAY',
      accountId: 'XY81204',
      warehouse: 'STANDARD_WH',
      url: 'https://XY81204.eu-west-1.snowflakecomputing.com/',
      dsn: 'MOCK_DSN',
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
