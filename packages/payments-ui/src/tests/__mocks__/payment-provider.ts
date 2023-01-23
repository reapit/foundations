import { PaymentProvider } from '../../payment-provider'
import { Transaction } from '../../types/opayo'
import { mockConfigModel } from './config'
import { mockMerchantKey } from './opayo'
import { mockPaymentModel } from './payment'
import { mockPropertyModel } from './property'

export const mockPaymentProvider = new PaymentProvider(
  mockConfigModel,
  mockPaymentModel,
  mockPropertyModel,
  mockMerchantKey,
  {
    receiptLoading: false,
    receiptSubmit: jest.fn(() => Promise.resolve(true)),
  },
  {
    statusLoading: false,
    statusSubmit: jest.fn(() => Promise.resolve(true)),
  },
  jest.fn(() => Promise.resolve({} as unknown as Transaction)),
  jest.fn(),
)
