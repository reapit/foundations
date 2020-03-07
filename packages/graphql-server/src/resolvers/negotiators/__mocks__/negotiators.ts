import { PagedResultNegotiatorModel_ } from '../../../types'

export const negotiatorsMock: PagedResultNegotiatorModel_ = {
  _embedded: [
    {
      id: 'HCJK',
      created: '2020-03-06T10:01:43.0000000Z',
      modified: '2020-03-06T10:01:43.0000000Z',
      name: 'hcj67kdr4jfl7bg46gce8o',
      jobTitle: 'Senior Sales Negotiator',
      active: true,
      officeId: 'OXF',
      workPhone: '01234 567890',
      mobilePhone: '07890 123456',
      email: 'example@email.com',
      metadata: {},
      _eTag: '"1BB55D4EE820DDF381996328B6950C13"',
      _links: {
        self: {
          href: '/negotiators/HCJK',
        },
        office: {
          href: '/offices/OXF',
        },
      },
      _embedded: null,
    },
    {
      id: 'MBW',
      created: '2013-05-07T14:24:26.0000000Z',
      modified: '2019-09-24T11:18:45.0000000Z',
      name: 'Hugh Gillespie',
      jobTitle: null,
      active: true,
      officeId: 'BED',
      workPhone: null,
      mobilePhone: null,
      email: 'hugh.gillespie@reapitestates.net',
      metadata: {},
      _eTag: '"1253C1DDDA5D2607BA6E76DA13898071"',
      _links: {
        self: {
          href: '/negotiators/MBW',
        },
        office: {
          href: '/offices/BED',
        },
      },
      _embedded: null,
    },
    {
      id: 'RMTT',
      created: '2020-02-17T16:51:16.0000000Z',
      modified: '2020-02-17T16:51:16.0000000Z',
      name: 'i825rm89189ttti4g1e2og',
      jobTitle: null,
      active: true,
      officeId: 'OXF',
      workPhone: '01234 567890',
      mobilePhone: null,
      email: null,
      metadata: {},
      _eTag: '"999C5A2F8847E8AAB4B2872E45B07979"',
      _links: {
        self: {
          href: '/negotiators/RMTT',
        },
        office: {
          href: '/offices/OXF',
        },
      },
      _embedded: null,
    },
    {
      id: 'PMH',
      created: '2017-11-18T13:45:31.0000000Z',
      modified: '2019-04-23T12:58:55.0000000Z',
      name: 'Iona King',
      jobTitle: null,
      active: true,
      officeId: 'OHO',
      workPhone: null,
      mobilePhone: null,
      email: 'iona.king@reapitestates.net',
      metadata: {},
      _eTag: '"D4C9D0A6F529D6FAEAAAB36196469CB9"',
      _links: {
        self: {
          href: '/negotiators/PMH',
        },
        office: {
          href: '/offices/OHO',
        },
      },
      _embedded: null,
    },
    {
      id: 'QMKG',
      created: '2020-02-14T10:25:59.0000000Z',
      modified: '2020-02-14T10:25:59.0000000Z',
      name: 'iqim9k7i1gpds608ikegca',
      jobTitle: 'Senior Sales Negotiator',
      active: true,
      officeId: 'OXF',
      workPhone: '01234 567890',
      mobilePhone: '07890 123456',
      email: 'example@email.com',
      metadata: {
        CustomField1: 'CustomValue1',
        CustomField2: true,
      },
      _eTag: '"48A5F8EE28BBBDDAE67795F0F70EAFA4"',
      _links: {
        self: {
          href: '/negotiators/QMKG',
        },
        office: {
          href: '/offices/OXF',
        },
      },
      _embedded: null,
    },
  ],
  pageNumber: 1,
  pageSize: 5,
  pageCount: 5,
  totalCount: 167,
  _links: {
    self: {
      href: '/negotiators/?PageNumber=1&PageSize=5',
    },
    first: {
      href: '/negotiators/?PageNumber=1&PageSize=5',
    },
    next: {
      href: '/negotiators/?PageNumber=2&PageSize=5',
    },
    last: {
      href: '/negotiators/?PageNumber=34&PageSize=5',
    },
  },
}
