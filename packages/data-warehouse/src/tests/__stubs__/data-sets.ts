import { PagedApiResponse } from '../../types/core'
import { DataSetModel } from '../../types/data-sets'

export const mockDataSets: PagedApiResponse<DataSetModel> = {
  _embedded: [
    {
      id: 'legacyDb',
      published: '2020-10-03T08:00:00.0000000Z',
      name: 'RPS Database',
      provider: 'Reapit Ltd',
      summary: 'Access to legacy data',
      description: 'Long version of the same info',
      iconUrl: null,
    },
    {
      id: 'legacyViews',
      published: '2020-10-03T08:00:00.0000000Z',
      name: 'RPS Views',
      provider: 'Reapit Ltd',
      summary: 'Access to legacy views',
      description: 'Access to legacy views',
      iconUrl: null,
    },
  ],
  pageNumber: 1,
  pageSize: 12,
  pageCount: 2,
  totalPageCount: 1,
  totalCount: 2,
  _links: {
    self: {
      href: '/dataMarketplace/?PageNumber=1&PageSize=12&organisationId=8aa72233-aabb-4595-8712-f81ad8bb0dc3',
    },
    first: {
      href: '/dataMarketplace/?PageNumber=1&PageSize=12&organisationId=8aa72233-aabb-4595-8712-f81ad8bb0dc3',
    },
  },
}
