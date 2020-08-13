import { PagedResultCompanyModel_ } from '../../../types'

export const companiesMock: PagedResultCompanyModel_ = {
  pageNumber: 1,
  pageSize: 10,
  pageCount: 10,
  totalCount: 3966,
  _links: {
    self: {
      href: '/com/?PageNumber=1&PageSize=10',
    },
    first: {
      href: '/com/?PageNumber=1&PageSize=10',
    },
    next: {
      href: '/com/?PageNumber=2&PageSize=10',
    },
    last: {
      href: '/com/?PageNumber=397&PageSize=10',
    },
  },
  _embedded: [
    {
      id: 'RPT20000141',
      created: '2020-07-21T09:36:08Z',
      modified: '2020-08-10T12:02:18Z',
      name: 'SavillsTest',
      _eTag: '"8B1B5AF36BF11E2D6C1ECF992D2F1A64"',
    },
    {
      id: 'RPT20000132',
      created: '2020-05-18T12:48:51Z',
      modified: '2020-06-24T13:03:52Z',
      name: 'Bryan Homes',
      _eTag: '"9C2E7CBE2A266A531445255C97B523A1"',
    },
    {
      id: 'RPT20000128',
      created: '2020-04-28T08:01:57Z',
      modified: '2020-04-28T08:01:58Z',
      name: 'Reapit',
      _eTag: '"AE509B6AB153D9E50D3C7CE09964CD97"',
    },
    {
      id: 'RPT20000126',
      created: '2020-04-27T08:01:09Z',
      modified: '2020-04-27T08:01:10Z',
      name: 'Reapit',
      _eTag: '"2EACD1CAED9B65B536874045F18E5FC8"',
    },
    {
      id: 'RPT20000119',
      created: '2020-04-26T08:01:13Z',
      modified: '2020-04-26T08:01:14Z',
      name: 'Reapit',
      _eTag: '"A74EAB99E36805180BA028F09523264B"',
    },
    {
      id: 'RPT20000117',
      created: '2020-04-25T08:01:11Z',
      modified: '2020-04-25T08:01:12Z',
      name: 'Reapit',
      _eTag: '"21781580C4D19F1AAD77CFFE5641533F"',
    },
    {
      id: 'RPT20000114',
      created: '2020-04-24T08:01:08Z',
      modified: '2020-04-24T08:01:09Z',
      name: 'Reapit',
      _eTag: '"DDC0F87F57BE4DF9D46479A5EEEF70D4"',
    },
    {
      id: 'RPT20000100',
      created: '2020-04-23T08:06:47Z',
      modified: '2020-04-23T08:06:48Z',
      name: 'Reapit',
      _eTag: '"981EE903CD6654470F378F636FBD4CD8"',
    },
    {
      id: 'RPT20000098',
      created: '2020-04-23T08:01:18Z',
      modified: '2020-04-23T08:01:18Z',
      name: 'Reapit',
      _eTag: '"B5CD4C048AA7D68870D0E32C1C9AED93"',
    },
    {
      id: 'RPT20000096',
      created: '2020-04-22T08:01:11Z',
      modified: '2020-04-22T08:01:12Z',
      name: 'Reapit',
      _eTag: '"BB293029F764579F368F57EAFCBFA1D9"',
    },
  ],
}
