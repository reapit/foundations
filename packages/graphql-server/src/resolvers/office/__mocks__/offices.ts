import { PagedResultOfficeModel_ } from '../../../types'

export const officesStub: PagedResultOfficeModel_ = {
  _embedded: [
    {
      id: 'OXF',
      created: '2018-12-12T12:30:23.0000000Z',
      modified: '2019-01-08T12:30:34.0000000Z',
      name: 'Reapit',
      manager: 'Mr John Smith',
      address: {
        buildingName: 'Example building',
        buildingNumber: '15',
        line1: 'Example street',
        line2: 'Solihull',
        line3: 'West Midlands',
        line4: '',
        postcode: 'B91 2XX',
        countryId: 'GB',
      },
      workPhone: '01234 567890',
      email: 'example@email.com',
      metadata: {
        CustomField1: 'CustomValue1',
        CustomField2: true,
      },
      _eTag: undefined,
      _links: {
        self: {
          href: '/offices/OXF',
        },
        negotiators: {
          href: '/negotiators/?officeId=OXF',
        },
      },
      _embedded: undefined,
    },
  ],
  pageNumber: 1,
  pageSize: 1,
  pageCount: 1,
  totalCount: 25,
  _links: {
    self: {
      href: '/offices/?PageNumber=1&PageSize=1',
    },
    first: {
      href: '/offices/?PageNumber=1&PageSize=1',
    },
    next: {
      href: '/offices/?PageNumber=2&PageSize=1',
    },
    last: {
      href: '/offices/?PageNumber=25&PageSize=1',
    },
  },
}
