import { PagedResultOfficeModel_ } from '../../../types'

export const officesMock: PagedResultOfficeModel_ = {
  _embedded: [
    {
      id: 'TCM',
      created: '2020-03-05T09:20:43.0000000Z',
      modified: '2020-03-05T10:01:53.0000000Z',
      name: 'Test create mutation updated',
      manager: 'Reapit',
      address: {
        buildingName: 'Landmark 81',
        buildingNumber: '1',
        line1: 'line1',
        line2: '',
        line3: '',
        line4: '',
        postcode: '',
        countryId: '',
      },
      workPhone: '0987654321',
      email: 'tester@reapit.com',
      metadata: {},
      _eTag: '"84C6AB9009CE154F3CDB9F3362314D4A"',
      _links: {
        self: {
          href: '/offices/TCM',
        },
        negotiators: {
          href: '/negotiators/?officeId=TCM',
        },
      },
      _embedded: null,
    },
    {
      id: 'REP',
      created: '2020-03-04T07:14:54.0000000Z',
      modified: '2020-03-04T07:14:54.0000000Z',
      name: 'Reapit',
      manager: 'Mr John Smith',
      address: {
        buildingName: '',
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
      _eTag: '"77CD6CBB30DCA55EDC0B378DBEFC5F91"',
      _links: {
        self: {
          href: '/offices/REP',
        },
        negotiators: {
          href: '/negotiators/?officeId=REP',
        },
      },
      _embedded: null,
    },
    {
      id: 'REA',
      created: '2020-02-28T10:34:06.0000000Z',
      modified: '2020-02-28T10:34:06.0000000Z',
      name: 'Reapit',
      manager: 'Mr John Smith',
      address: {
        buildingName: '',
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
      _eTag: '"104F6D31FAFEB3B1DE6BB9CF8E071094"',
      _links: {
        self: {
          href: '/offices/REA',
        },
        negotiators: {
          href: '/negotiators/?officeId=REA',
        },
      },
      _embedded: null,
    },
    {
      id: 'STL',
      created: '2016-12-01T15:32:45.0000000Z',
      modified: '2020-02-14T15:52:06.0000000Z',
      name: 'Stevenage Lettings',
      manager: '',
      address: {
        buildingName: '',
        buildingNumber: '',
        line1: "St George's Way",
        line2: 'Stevenage',
        line3: 'Hertfordshire',
        line4: '',
        postcode: 'SG1 1XB',
        countryId: 'GB',
      },
      workPhone: null,
      email: 'lettings@hughmason.co.uk',
      metadata: {},
      _eTag: '"17465C0780A21582FFE1B06E35DEE37D"',
      _links: {
        self: {
          href: '/offices/STL',
        },
        negotiators: {
          href: '/negotiators/?officeId=STL',
        },
      },
      _embedded: null,
    },
    {
      id: 'STV',
      created: '2016-12-01T15:05:16.0000000Z',
      modified: '2020-02-14T15:52:02.0000000Z',
      name: 'Stevenage',
      manager: 'Evan Hunter',
      address: {
        buildingName: '',
        buildingNumber: '',
        line1: "St George's Way",
        line2: 'Stevenage',
        line3: 'Hertfordshire',
        line4: '',
        postcode: 'SG1 1XB',
        countryId: 'GB',
      },
      workPhone: null,
      email: 'stevenage.sales@hughmason.co.uk',
      metadata: {},
      _eTag: '"7B2C4CFDFFA0EE83468BABC0F4A8D63C"',
      _links: {
        self: {
          href: '/offices/STV',
        },
        negotiators: {
          href: '/negotiators/?officeId=STV',
        },
      },
      _embedded: null,
    },
  ],
  pageNumber: 1,
  pageSize: 5,
  pageCount: 5,
  totalCount: 27,
  _links: {
    self: {
      href: '/offices/?PageNumber=1&PageSize=5',
    },
    first: {
      href: '/offices/?PageNumber=1&PageSize=5',
    },
    next: {
      href: '/offices/?PageNumber=2&PageSize=5',
    },
    last: {
      href: '/offices/?PageNumber=6&PageSize=5',
    },
  },
}
