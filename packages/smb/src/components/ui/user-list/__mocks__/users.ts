import { UsersQueryResponse } from '../user-list'

export const users: UsersQueryResponse = {
  GetNegotiators: {
    _embedded: [
      {
        id: 'MGL',
        created: '2014-12-26T12:22:01.0000000Z',
        modified: '2016-11-29T09:57:32.0000000Z',
        name: 'Abel Robertson',
        active: true,
        officeId: 'NPG',
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
      },
      {
        id: 'RPA',
        created: '2017-02-07T12:08:53.0000000Z',
        modified: '2017-02-07T12:09:41.0000000Z',
        name: 'Accounts User',
        active: true,
        officeId: 'MCL',
        _eTag: '"85A9DB571DB893A5FB734105AFF6B464"',
        _links: {
          self: {
            href: '/negotiators/RPA',
          },
          office: {
            href: '/offices/MCL',
          },
        },
      },
      {
        id: 'KLB',
        created: '2010-11-15T14:53:08.0000000Z',
        modified: '2017-03-10T00:02:08.0000000Z',
        name: 'Adele Small',
        active: true,
        officeId: 'NGL',
        email: 'adele.small@reapitestates.net',
        metadata: {},
        _eTag: '"B28EE5CFF654DB22BF3247CA028C10C3"',
        _links: {
          self: {
            href: '/negotiators/KLB',
          },
          office: {
            href: '/offices/NGL',
          },
        },
      },
    ],
    pageNumber: 1,
    pageSize: 3,
    pageCount: 3,
    totalCount: 3,
    _links: {
      self: {
        href: '/negotiators/?PageNumber=1&PageSize=3',
      },
      first: {
        href: '/negotiators/?PageNumber=1&PageSize=3',
      },
      next: {
        href: '/negotiators/?PageNumber=2&PageSize=3',
      },
      last: {
        href: '/negotiators/?PageNumber=3&PageSize=3',
      },
    },
  },
}
