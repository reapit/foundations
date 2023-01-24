import { PaymentProvider } from '../../payment-provider'
import { Transaction } from '../../types/opayo'
import { mockConfigModel } from './config'
import { mockMerchantKey } from './opayo'
import { mockPaymentModel } from './payment'
import { mockPropertyModel } from './property'

export const mockPaymentProvider = new PaymentProvider({
  config: mockConfigModel,
  payment: mockPaymentModel,
  property: mockPropertyModel,
  merchantKey: mockMerchantKey,
  receiptAction: {
    receiptLoading: false,
    receiptSubmit: jest.fn(() => Promise.resolve(true)),
  },
  statusAction: {
    statusLoading: false,
    statusSubmit: jest.fn(() => Promise.resolve(true)),
  },
  transactionSubmit: jest.fn(() => Promise.resolve({} as unknown as Transaction)),
  refreshPayment: jest.fn(),
  isPortal: false,
})
