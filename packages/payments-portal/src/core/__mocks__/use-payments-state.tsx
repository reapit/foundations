import { OpayoProvider } from '../../services/providers'
import { mockPaymentModel, mockPaymentWithPropertyModel } from '../../tests/__mocks__/payment'

export const mockMerchantKey = {
  merchantSessionKey: 'MOCK_MERCHANT_KEY',
  expiry: 'MOCK_EXPIRY',
}

export const mockPaymentsState = {
  paymentsDataState: {
    selectedPayment: mockPaymentModel,
    setSelectedPayment: jest.fn(),
    paymentParams: {
      paymentId: 'MOCK_PAYMENT_ID',
    },
    setPaymentParams: jest.fn(),
    paymentWithProperty: mockPaymentWithPropertyModel,
    setPaymentWithProperty: jest.fn(),
    paymentProvider: new OpayoProvider(mockMerchantKey),
    setPaymentProvider: jest.fn(),
  },
  paymentsFilterState: {
    paymentsFilters: {
      createdFrom: 'MOCK_FROM',
      createdTo: 'MOCK_TO',
      description: 'MOCK_DESCRIPTION',
      status: 'awaitingAuthorisation',
    },
  },
}

export const usePaymentsState = jest.fn(() => mockPaymentsState)
