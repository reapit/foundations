import { OfficeModel } from '../../../types'

export const officeStub: OfficeModel = {
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
}
