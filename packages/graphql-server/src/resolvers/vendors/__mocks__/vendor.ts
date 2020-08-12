export const vendorMock = {
  id: 'OXF200001',
  created: '2018-12-26T12:30:22.0000000Z',
  modified: '2019-02-15T12:30:23.0000000Z',
  lastCall: '2019-11-12',
  nextCall: '2019-12-29',
  typeId: 'S',
  sellingReasonId: 'RL',
  solicitorId: 'OXF12300001',
  propertyId: null,
  source: {
    id: 'OXF',
    type: 'office',
  },
  related: [
    {
      id: 'OXF12300101',
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
  negotiatorId: 'JAS',
  officeIds: ['OXF', 'SOL'],
  metadata: {
    CustomField1: 'CustomValue1',
    CustomField2: true,
  },
  _eTag: null,
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
  _embedded: null,
}
