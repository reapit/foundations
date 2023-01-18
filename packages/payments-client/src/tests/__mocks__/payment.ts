import { PaymentModel } from '@reapit/foundations-ts-definitions'
// import { PaymentWithPropertyModel } from '@reapit/payments-ui'
// import { CardDetails } from '../../components/payment/payment-form'
// import { mockPropertyModel } from './property'

export const mockPaymentModel: PaymentModel = {
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
  propertyId: 'OXF200008',
  tenancyId: '',
  _eTag: 'MOCK_ETAG',
}

export const mockPaymentModelPagedResult = {
  _embedded: [mockPaymentModel],
  pageCount: 1,
  pageNumber: 1,
  pageSize: 12,
  totalCount: 1,
  totalPageCount: 1,
}

// export const mockPaymentWithPropertyModel: PaymentWithPropertyModel = {
//   ...mockPaymentModel,
//   clientCode: 'SBOX',
//   property: {
//     ...mockPropertyModel,
//   },
// }

// export const mockCardDetails: CardDetails = {
//   customerFirstName: 'first name',
//   customerLastName: 'last name',
//   address1: 'MOCK_ADDESS',
//   city: 'MOCK_CITY',
//   postalCode: 'MOCK_PC',
//   country: 'GB',
//   cardholderName: 'MOCK_NAME',
//   cardNumber: '0000000000000000',
//   expiryDate: '1225',
//   securityCode: '123',
//   cardIdentifier: 'FOO',
//   email: 'mock@example.com',
// }
