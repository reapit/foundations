import { CreateEnquiryArgs } from '../enquiries'

export const createEnquiryArgsMock: CreateEnquiryArgs = {
  title: 'Mr',
  forename: 'John',
  surname: 'Smith',
  position: 'renting',
  enquiryType: 'salesApplicant',
  message: 'Sales enquiry from Rightmove for 10 High Street, Solihull',
  officeId: 'JAS',
  marketingConsent: 'grant',
  sourceName: 'Rightmove',
  homePhone: '01234 567890',
  workPhone: '01234 567890',
  mobilePhone: '07890 123456',
  email: 'example@email.com',
  address: {
    buildingName: undefined,
    buildingNumber: '15',
    line1: 'Example street',
    line2: 'Solihull',
    line3: 'West Midlands',
    line4: undefined,
    postcode: 'B91 2XX',
    countryId: 'GB',
  },
  propertyIds: ['OXF190012'],
}
