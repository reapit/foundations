import {
  PagedResultLandlordModel_,
  LandlordModel,
  PagedResultLandlordContactRelationshipModel_,
  PagedResultLandlordCheckModel_,
  LandlordCheckModel,
} from '../../../types'

export const landlordsListMock: PagedResultLandlordModel_ = {
  _embedded: [
    {
      id: 'OXF180001',
      created: '2018-12-12T12:30:23.0000000Z',
      modified: '2019-01-08T12:30:34.0000000Z',
      active: true,
      solicitorId: 'OXF19000101',
      officeId: 'OXF',
      source: {
        id: 'GGL',
        type: 'source',
      },
      related: [
        {
          id: 'OXF19000101',
          name: 'Mr John Smith',
          title: 'Mr',
          forename: 'John',
          surname: 'Smith',
          type: 'contact',
          homePhone: '01234 567890',
          workPhone: null,
          mobilePhone: '07890 123456',
          email: 'example@email.com',
          primaryAddress: {
            buildingName: null,
            buildingNumber: '15',
            line1: 'Example street',
            line2: 'Solihull',
            line3: 'West Midlands',
            line4: '',
            postcode: 'B91 2XX',
            countryId: 'GB',
          },
        },
      ],
      metadata: {
        CustomField1: 'CustomValue1',
        CustomField2: true,
      },
      _eTag: null,
      _links: {
        self: {
          href: '/landlords/OXF180001',
        },
        documents: {
          href: '/documents/?associatedType=landlord&associatedId=OXF180001',
        },
        appointments: {
          href: '/appointments/?attendeeType=landlord&attendeeId=OXF180001',
        },
        office: {
          href: '/offices/OXF',
        },
        properties: {
          href: '/properties/?landlordId=OXF180001',
        },
        relationships: {
          href: '/landlords/OXF180001/relationships',
        },
        solicitor: {
          href: '/companies/OXF19000101',
        },
        source: {
          href: '/sources/GGL',
        },
      },
      _embedded: null,
    },
  ],
  pageNumber: 1,
  pageSize: 1,
  pageCount: 1,
  totalPageCount: 1,
  totalCount: 25,
  _links: {
    self: {
      href: '/landlords/?PageNumber=1&PageSize=1',
    },
    first: {
      href: '/landlords/?PageNumber=1&PageSize=1',
    },
    next: {
      href: '/landlords/?PageNumber=2&PageSize=1',
    },
    last: {
      href: '/landlords/?PageNumber=25&PageSize=1',
    },
  },
}

export const landlordMock: LandlordModel = {
  id: 'OXF180001',
  created: '2018-12-12T12:30:23.0000000Z',
  modified: '2019-01-08T12:30:34.0000000Z',
  active: true,
  solicitorId: 'OXF19000101',
  officeId: 'OXF',
  source: {
    id: 'GGL',
    type: 'source',
  },
  related: [
    {
      id: 'OXF19000101',
      name: 'Mr John Smith',
      title: 'Mr',
      forename: 'John',
      surname: 'Smith',
      type: 'contact',
      homePhone: '01234 567890',
      workPhone: null,
      mobilePhone: '07890 123456',
      email: 'example@email.com',
      primaryAddress: {
        buildingName: null,
        buildingNumber: '15',
        line1: 'Example street',
        line2: 'Solihull',
        line3: 'West Midlands',
        line4: '',
        postcode: 'B91 2XX',
        countryId: 'GB',
      },
    },
  ],
  metadata: {
    CustomField1: 'CustomValue1',
    CustomField2: true,
  },
  _eTag: null,
  _links: {
    self: {
      href: '/landlords/OXF180001',
    },
    documents: {
      href: '/documents/?associatedType=landlord&associatedId=OXF180001',
    },
    appointments: {
      href: '/appointments/?attendeeType=landlord&attendeeId=OXF180001',
    },
    office: {
      href: '/offices/OXF',
    },
    properties: {
      href: '/properties/?landlordId=OXF180001',
    },
    relationships: {
      href: '/landlords/OXF180001/relationships',
    },
    solicitor: {
      href: '/companies/OXF19000101',
    },
    source: {
      href: '/sources/GGL',
    },
  },
  _embedded: null,
}
