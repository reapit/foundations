import { PagedResultAreaModel_ } from '../area'

export const areas: PagedResultAreaModel_ = {
  _embedded: [
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
      modified: '2020-02-21T13:12:22.0000000Z',
      name: 'Birmingham',
      active: true,
      type: 'polygon',
      area: ['51.60009,-0.21789', '51.47025,-0.27282', '51.50445,0.00184'],
      departmentIds: ['G'],
      officeIds: ['OXF', 'SOL'],
      _eTag: '"0C475763A2B7C645ECCCAEC1C2F8CD52"',
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
    {
      id: 'BIH',
      created: '2020-02-21T12:57:18.0000000Z',
      modified: '2020-02-21T12:57:18.0000000Z',
      name: 'Birmingham',
      active: true,
      type: 'polygon',
      area: ['51.60009,-0.21789', '51.47025,-0.27282', '51.50445,0.00184'],
      departmentIds: ['G'],
      officeIds: ['OXF', 'SOL'],
      _eTag: '"2DAC3218B961CFFB33DFC89EA674052B"',
      _links: {
        self: {
          href: '/areas/BIH',
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
  totalCount: 1139,
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
