import { PagedResultSourceModel_ } from '../../../types'

export const sourcesMock: PagedResultSourceModel_ = {
  _embedded: [
    {
      id: 'ADV',
      created: '2018-12-12T12:30:23.0000000Z',
      modified: '2019-01-08T12:30:34.0000000Z',
      name: 'Property Portal',
      type: 'source',
      officeIds: ['OXF'],
      departmentIds: ['G'],
      _eTag: null,
      _links: {
        self: {
          href: '/sources/ADV',
        },
        offices: {
          href: '/offices/?id=OXF',
        },
        departments: {
          href: '/departments/?id=G',
        },
      },
      _embedded: null,
    },
  ],
  pageNumber: 1,
  pageSize: 1,
  pageCount: 1,
  totalCount: 25,
  _links: {
    self: {
      href: '/sources/?PageNumber=1&PageSize=1',
    },
    first: {
      href: '/sources/?PageNumber=1&PageSize=1',
    },
    next: {
      href: '/sources/?PageNumber=2&PageSize=1',
    },
    last: {
      href: '/sources/?PageNumber=25&PageSize=1',
    },
  },
}
