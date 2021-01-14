import { PropertyModel } from '@reapit/foundations-ts-definitions'

export const data: PropertyModel = {
  id: 'OXF200008',
  created: '2018-12-12T12:30:23.0000000Z',
  modified: '2019-01-08T12:30:34.0000000Z',
  marketingMode: 'sellingAndLetting',
  currency: 'GBP',
  address: {
    buildingName: '',
    buildingNumber: '15',
    line1: 'Example street',
    line2: 'Solihull',
    line3: 'West Midlands',
    line4: '',
    postcode: 'B91 2XX',
    countryId: 'GB',
    geolocation: {
      latitude: 52.4158586,
      longitude: 1.7773383,
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
  videoUrl: 'https://www.example.com/property/123/videoTour',
  videoCaption: 'Virtual property tour',
  externalArea: {
    type: 'acres',
    min: 1,
    max: 2,
  },
  internalArea: {
    type: 'squareFeet',
    min: 1500,
    max: 2000,
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
    price: 250000,
    qualifier: 'askingPrice',
    status: 'underOffer',
    disposal: 'privateTreaty',
    completed: '2019-08-27',
    exchanged: '2019-08-15',
    tenure: {
      type: 'leasehold',
      expiry: '2019-05-01',
    },
    vendorId: 'OXF123001',
  },
  letting: {
    instructed: '2018-11-18',
    availableFrom: '2018-12-26',
    availableTo: '2019-03-23',
    rent: 750,
    rentFrequency: 'monthly',
    furnishing: ['furnished', 'partFurnished'],
    term: 'long',
    status: 'toLet',
    agentRole: 'managed',
    landlordId: 'OXF123001',
  },
  type: ['house'],
  style: ['detached'],
  situation: ['garden', 'land', 'patio'],
  parking: ['secure', 'doubleGarage'],
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
  metadata: {
    CustomField1: 'CustomValue1',
    CustomField2: true,
  },
  _eTag: '',
  _links: {
    self: {
      href: '/properties/OXF200008',
    },
    images: {
      href: '/propertyImages/?propertyId=OXF200008',
    },
    documents: {
      href: '/documents/?associatedType=property&associatedId=OXF200008',
    },
    offers: {
      href: '/offers/?propertyId=OXF200008',
    },
    appointments: {
      href: '/appointments/?propertyId=OXF200008',
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
      href: '/vendors/OXF123001',
    },
    landlord: {
      href: '/landlords/OXF123001',
    },
    area: {
      href: '/areas/BRM',
    },
  },
}
