import { PagedResultNegotiatorModel_ } from '@reapit/foundations-ts-definitions'

export const negotiatorsStub: PagedResultNegotiatorModel_ = {
  pageSize: 2,
  pageNumber: 1,
  pageCount: 2,
  totalCount: 96,
  _embedded: [
    {
      id: 'MGL',
      created: '2014-12-26T12:22:01.0000000Z',
      modified: '2016-11-29T09:57:32.0000000Z',
      name: 'Abel Robertson',
      jobTitle: null,
      active: true,
      officeId: 'NPG',
      workPhone: null,
      mobilePhone: null,
      email: 'abel.robertson@reapitestates.net',
      metadata: {},
      _eTag: '"10109C0209C684789B72FFC53730E31C"',
      _links: {
        self: {
          href: '/negotiators/MGL',
        },
        office: {
          href: '/offices/NPG',
        },
      },
      _embedded: null,
    },
    {
      id: 'RPA',
      created: '2017-02-07T12:08:53.0000000Z',
      modified: '2017-02-07T12:09:41.0000000Z',
      name: 'Accounts User',
      jobTitle: null,
      active: true,
      officeId: 'MCL',
      workPhone: null,
      mobilePhone: null,
      email: null,
      metadata: {},
      _eTag: '"85A9DB571DB893A5FB734105AFF6B464"',
      _links: {
        self: {
          href: '/negotiators/RPA',
        },
        office: {
          href: '/offices/MCL',
        },
      },
      _embedded: null,
    },
  ],
  _links: {
    self: {
      href: '/negotiators/?PageNumber=1&PageSize=2',
    },
    first: {
      href: '/negotiators/?PageNumber=1&PageSize=2',
    },
    next: {
      href: '/negotiators/?PageNumber=2&PageSize=2',
    },
    last: {
      href: '/negotiators/?PageNumber=48&PageSize=2',
    },
  },
}
