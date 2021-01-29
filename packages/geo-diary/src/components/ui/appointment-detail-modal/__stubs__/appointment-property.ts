import { PropertyModel, VendorModel, LandlordModel } from '@reapit/foundations-ts-definitions'

export const propertyData: PropertyModel = {
  id: 'RPT200095',
  created: '2020-10-06T13:27:04Z',
  modified: '2021-01-27T10:31:22Z',
  marketingMode: 'sellingAndLetting',
  currency: 'GBP',
  address: {
    buildingName: '',
    buildingNumber: '1500',
    line1: 'Example street',
    line2: 'Solihull',
    line3: 'West Midlands',
    line4: '',
    postcode: 'B91 2XX',
    countryId: 'GB',
    geolocation: {
      latitude: 52.415859,
      longitude: 1.777338,
    },
  },
  areaId: 'BRM',
  strapline: '',
  description:
    'We are delighted to offer for sale this EXTENDED THREE BEDROOMED SEMI DETACHED PROPERTY situated in a much sought after residential location of Greasby, having the benefits of two separate entertaining rooms, morning room, extended kitchen. To the first floor there are three bedrooms, spacious family bathroom, gas central heating gardens front and rear and off road parking.',
  summary: '',
  departmentId: 'G',
  negotiatorId: 'JAS',
  bedrooms: 4,
  receptions: 1,
  bathrooms: 2,
  councilTax: 'A',
  internetAdvertising: true,
  viewingArrangements: 'Accompanied viewings after 3PM only',
  externalArea: {
    type: 'acres',
    min: 1.0,
    max: 0.0,
  },
  internalArea: {
    type: 'squareFeet',
    min: 1500.0,
    max: 2000.0,
  },
  epc: {
    exempt: false,
    eer: 45,
    eerPotential: 71,
    eir: 53,
    eirPotential: 81,
  },
  selling: {
    instructed: '2018-11-18',
    price: 250000.0,
    qualifier: 'askingPrice',
    status: 'underOffer',
    tenure: {
      type: 'leasehold',
      expiry: '2019-05-01',
    },
    vendorId: 'RPT200095',
  },
  letting: {
    instructed: '2018-11-18',
    availableFrom: '2018-12-26',
    availableTo: '2019-03-23',
    rent: 750.0,
    rentFrequency: 'monthly',
    term: 'long',
    status: 'toLet',
    landlordId: 'RPT200028',
  },
  type: ['house'],
  style: ['detached'],
  situation: ['garden', 'land', 'patio'],
  parking: ['doubleGarage'],
  age: ['period'],
  locality: ['rural', 'village'],
  rooms: [
    {
      name: 'Kitchen',
      dimensions: '4.5m x 5.2m',
      description:
        'The breakfast kitchen, with utility, comprises a matching range of wall and base units with ceramic hob and eye level double oven. A side door leads to the front courtyard area.',
    },
    {
      name: 'Lounge',
      dimensions: '6.5m x 7.8m',
      description:
        'The lounge, with a brick feature fireplace housing a Clearview stove, provides an ideal space to relax and unwind, whilst enjoying views over the Golf Course.',
    },
    {
      name: 'Dining Room',
      dimensions: '5.1m x 6.2m',
      description: 'The formal dining room is the perfect space to entertain and provides access to the useful study.',
    },
  ],
  officeIds: ['OXF', 'SOL'],
  _eTag: '"3646F7D765782CF9C2E9BF56D0B3E40A"',
  _links: {
    self: {
      href: '/properties/RPT200095',
    },
    images: {
      href: '/propertyImages/?propertyId=RPT200095',
    },
    documents: {
      href: '/documents/?associatedType=property&associatedId=RPT200095',
    },
    offers: {
      href: '/offers/?propertyId=RPT200095',
    },
    appointments: {
      href: '/appointments/?propertyId=RPT200095',
    },
    negotiator: {
      href: '/negotiators/JAS',
    },
    offices: {
      href: '/offices/?id=OXF&id=SOL',
    },
    department: {
      href: '/departments/G',
    },
    vendor: {
      href: '/vendors/RPT200095',
    },
    landlord: {
      href: '/landlords/RPT200028',
    },
    area: {
      href: '/areas/BRM',
    },
  },
  metadata: {},
  _embedded: {
    vendor: {
      id: 'RPT200095',
      created: '2020-10-06T13:27:04Z',
      modified: '2021-01-27T10:31:22Z',
      lastCall: null,
      nextCall: null,
      typeId: '',
      sellingReasonId: '',
      solicitorId: null,
      propertyId: 'RPT200095',
      source: null,
      related: [],
      negotiatorId: 'JAS',
      officeIds: ['OXF', 'SOL'],
      metadata: null,
      _eTag: '"3646F7D765782CF9C2E9BF56D0B3E40A"',
      _links: {
        self: {
          href: '/vendors/RPT200095',
        },
        property: {
          href: '/properties/RPT200095',
        },
        negotiator: {
          href: '/negotiators/JAS',
        },
        offices: {
          href: '/offices/?id=OXF&id=SOL',
        },
      },
      _embedded: null,
    },
  },
}

export const vendorData: VendorModel = {
  id: 'OXF200001',
  created: '2018-12-26T12:30:22.0000000Z',
  modified: '2019-02-15T12:30:23.0000000Z',
  lastCall: '2019-11-12',
  nextCall: '2019-12-29',
  typeId: 'S',
  sellingReasonId: 'RL',
  solicitorId: 'OXF12300001',
  source: {
    id: 'OXF',
    type: 'office',
  },
  related: [
    {
      id: 'OXF12300101',
      name: 'Mr John Smith',
      type: 'contact',
      homePhone: '01234 567890',
      workPhone: '',
      mobilePhone: '07890 123456',
      email: 'example@email.com',
      primaryAddress: {
        buildingName: '',
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
  negotiatorId: 'JAS',
  officeIds: ['OXF', 'SOL'],
  metadata: {
    CustomField1: 'CustomValue1',
    CustomField2: true,
  },
  _eTag: '',
  _links: {
    self: {
      href: '/vendors/OXF200001',
    },
    solicitor: {
      href: '/companies/OXF12300001',
    },
    negotiator: {
      href: '/negotiators/JAS',
    },
    type: {
      href: '/configuration/vendorTypes/S',
    },
    sellingReason: {
      href: '/configuration/sellingReasons/RL',
    },
    relationships: {
      href: '/vendors/OXF200001/relationships',
    },
    source: {
      href: '/offices/OXF',
    },
    offices: {
      href: '/offices/?id=OXF&id=SOL',
    },
  },
  _embedded: [],
}

export const landlordData: LandlordModel = {
  id: 'RPT200028',
  created: '2020-11-10T12:06:27Z',
  modified: '2020-11-10T12:06:27Z',
  active: true,
  solicitorId: 'MKT20000101',
  officeId: 'OXF',
  source: {
    id: 'GGL',
    type: 'source',
  },
  related: [
    {
      id: 'MKT20000101',
      name: 'Mr Dwayne Johnshon',
      type: 'contact',
      homePhone: '',
      workPhone: '',
      mobilePhone: '07901234567',
      email: '',
      primaryAddress: {
        buildingName: '',
        buildingNumber: '',
        line1: '45 Ternary Street',
        line2: '',
        line3: '',
        line4: '',
        postcode: 'E15LN',
        countryId: 'GB',
      },
    },
    {
      id: 'MKT20000100',
      name: 'CORK',
      type: 'contact',
      homePhone: '01332200030',
      workPhone: '',
      mobilePhone: '07841406740',
      email: 'QATEST88@MAB.ORG.UK',
      primaryAddress: {
        buildingName: 'The Row',
        buildingNumber: '365',
        line1: 'The Street',
        line2: '',
        line3: '',
        line4: '',
        postcode: 'DE12 7DS',
        countryId: 'GB',
      },
    },
  ],
  _eTag: '"A65CB225B1B7DDC6551239ACF47A8512"',
  _links: {
    self: {
      href: '/landlords/RPT200028',
    },
    documents: {
      href: '/documents/?associatedType=landlord&associatedId=RPT200028',
    },
    appointments: {
      href: '/appointments/?attendeeType=landlord&attendeeId=RPT200028',
    },
    office: {
      href: '/offices/OXF',
    },
    properties: {
      href: '/properties/?landlordId=RPT200028',
    },
    relationships: {
      href: '/landlords/RPT200028/relationships',
    },
    solicitor: {
      href: '/companies/MKT20000101',
    },
    source: {
      href: '/sources/GGL',
    },
  },
  _embedded: [],
  metadata: {},
}
