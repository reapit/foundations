import { EnquiryModel } from '../../../types'

export const enquiryMock: EnquiryModel = {
  id: 45,
  created: '2018-12-12T12:30:23.0000000Z',
  modified: '2019-01-08T12:30:34.0000000Z',
  title: 'Mr',
  forename: 'John',
  surname: 'Smith',
  enquiryType: 'salesApplicant',
  message: 'Sales enquiry from Rightmove for 10 High Street, Solihull',
  status: 'pending',
  marketingConsent: 'grant',
  position: 'renting',
  officeId: 'OXF',
  sourceName: 'Rightmove',
  homePhone: '01234 567890',
  workPhone: '01234 567890',
  mobilePhone: '07890 123456',
  email: 'example@email.com',
  address: {
    buildingName: null,
    buildingNumber: '15',
    line1: 'Example street',
    line2: 'Solihull',
    line3: 'West Midlands',
    line4: '',
    postcode: 'B91 2XX',
    countryId: 'GB',
  },
  propertyIds: ['OXF190012'],
  _links: {
    self: {
      href: '/enquiries/45',
    },
    properties: {
      href: '/properties/?id=OXF190012',
    },
  },
  _embedded: null,
}
