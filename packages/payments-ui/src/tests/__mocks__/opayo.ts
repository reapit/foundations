import { CardDetails } from '../../payment-page/payment-form'
import { MerchantKey } from '../../types/opayo'

export const mockMerchantKey: MerchantKey = {
  merchantSessionKey: 'MOCK_KEY',
  expiry: '2030-06-01',
}

export const mockCardDetails: CardDetails = {
  customerFirstName: 'first name',
  customerLastName: 'last name',
  customerPhone: 'MOCK_PHONE',
  address1: 'MOCK_ADDESS',
  city: 'MOCK_CITY',
  postalCode: 'MOCK_PC',
  country: 'GB',
  cardholderName: 'MOCK_NAME',
  cardNumber: '0000000000000000',
  expiryDate: '1225',
  securityCode: '123',
  cardIdentifier: 'FOO',
  email: 'mock@example.com',
}
