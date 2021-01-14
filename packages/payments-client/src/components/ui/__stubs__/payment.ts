import { PaymentModel } from '@reapit/foundations-ts-definitions'

export const data: PaymentModel = {
  id: 'PAY20000001',
  created: '2018-12-12T12:30:23.0000000Z',
  modified: '2019-01-08T12:30:34.0000000Z',
  type: 'paymentRequest',
  description: 'Tenancy Check Fee',
  status: 'awaitingPosting',
  ledger: 'tenant',
  amount: 100,
  clientAccountName: 'Primary',
  externalReference: '',
  companyId: '',
  customer: {
    id: 'OXF12300101',
    name: 'Mr John Smith',
    title: 'Mr',
    forename: 'John',
    surname: 'Smith',
    type: 'contact',
    homePhone: '01234 567890',
    workPhone: '',
    mobilePhone: '07890 123456',
    email: 'example@email.com',
    primaryAddress: {
      buildingName: '',
      buildingNumber: '1',
      line1: 'Test House',
      line2: 'Test Lane',
      line3: 'County of Test',
      line4: 'Test City',
      postcode: 'A11 2BB',
      countryId: 'GB',
    },
  },
  landlordId: '',
  propertyId: 'PRP200001',
  tenancyId: '',
  _eTag: '',
  _links: {
    self: {
      href: '/payments/PAY20000001',
    },
    customer: {
      href: '/contacts/OXF12300101',
    },
    property: {
      href: '/properties/PRP200001',
    },
  },
}
