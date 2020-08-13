import { PagedResultAreaModel_ } from '../../../types'

export const areasMock: PagedResultAreaModel_ = {
  _embedded: [
    {
      id: 'BHM',
      created: '2020-02-24T06:59:43.0000000Z',
      modified: '2020-03-06T04:32:52.0000000Z',
      name: 'Birmingham',
      active: true,
      type: 'polygon',
      area: ['51.60009,-0.21789', '51.47025,-0.27282', '51.50445,0.00184'],
      departmentIds: ['G'],
      officeIds: ['OXF', 'SOL'],
      _eTag: '"384206680C7C14C61F2C16EA268CD502"',
      _links: {
        self: {
          href: '/areas/BHM',
        },
        offices: {
          href: '/offices/?id=OXF&id=SOL',
        },
        departments: {
          href: '/departments/?id=G',
        },
      },
      _embedded: null,
    },
    {
      id: 'BGM',
      created: '2020-02-21T13:19:46.0000000Z',
      modified: '2020-02-21T13:19:46.0000000Z',
      name: 'Birmingham',
      active: true,
      type: 'polygon',
      area: ['51.60009,-0.21789', '51.47025,-0.27282', '51.50445,0.00184'],
      departmentIds: ['G'],
      officeIds: ['OXF', 'SOL'],
      _eTag: '"DF74567CD73EA3EDA7AA451B2A2D0392"',
      _links: {
        self: {
          href: '/areas/BGM',
        },
        offices: {
          href: '/offices/?id=OXF&id=SOL',
        },
        departments: {
          href: '/departments/?id=G',
        },
      },
      _embedded: null,
    },
    {
      id: 'BNM',
      created: '2020-02-21T13:19:42.0000000Z',
      modified: '2020-02-21T13:19:42.0000000Z',
      name: 'Birmingham',
      active: true,
      type: 'polygon',
      area: ['51.60009,-0.21789', '51.47025,-0.27282', '51.50445,0.00184'],
      departmentIds: ['G'],
      officeIds: ['OXF', 'SOL'],
      _eTag: '"6CADE7741C2465FEAD680D9A8D822F40"',
      _links: {
        self: {
          href: '/areas/BNM',
        },
        offices: {
          href: '/offices/?id=OXF&id=SOL',
        },
        departments: {
          href: '/departments/?id=G',
        },
      },
      _embedded: null,
    },
    {
      id: 'BMM',
      created: '2020-02-21T13:12:22.0000000Z',
      modified: '2020-02-28T15:18:06.0000000Z',
      name: 'Birmingham',
      active: true,
      type: 'polygon',
      area: ['51.60009,-0.21789', '51.47025,-0.27282', '51.50445,0.00184'],
      departmentIds: ['G'],
      officeIds: ['OXF', 'SOL'],
      _eTag: '"A102AD2F8C092B44D9BEDC72513E4239"',
      _links: {
        self: {
          href: '/areas/BMM',
        },
        offices: {
          href: '/offices/?id=OXF&id=SOL',
        },
        departments: {
          href: '/departments/?id=G',
        },
      },
      _embedded: null,
    },
    {
      id: 'BIA',
      created: '2020-02-21T12:58:07.0000000Z',
      modified: '2020-02-21T12:58:07.0000000Z',
      name: 'Birmingham',
      active: true,
      type: 'polygon',
      area: ['51.60009,-0.21789', '51.47025,-0.27282', '51.50445,0.00184'],
      departmentIds: ['G'],
      officeIds: ['OXF', 'SOL'],
      _eTag: '"E36000B5157BF86941136E749A02EA92"',
      _links: {
        self: {
          href: '/areas/BIA',
        },
        offices: {
          href: '/offices/?id=OXF&id=SOL',
        },
        departments: {
          href: '/departments/?id=G',
        },
      },
      _embedded: null,
    },
  ],
  pageNumber: 1,
  pageSize: 5,
  pageCount: 5,
  totalCount: 1140,
  _links: {
    self: {
      href: '/areas/?PageNumber=1&PageSize=5',
    },
    first: {
      href: '/areas/?PageNumber=1&PageSize=5',
    },
    next: {
      href: '/areas/?PageNumber=2&PageSize=5',
    },
    last: {
      href: '/areas/?PageNumber=228&PageSize=5',
    },
  },
}
