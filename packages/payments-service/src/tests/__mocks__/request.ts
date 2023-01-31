import { PaymentRequestDto } from '../../payment-request/dto'

export const mockPaymentRequest: PaymentRequestDto = {
  receipientEmail: 'mock@email.com',
  recipientName: 'Mock Name',
  paymentReason: 'Mock Reason',
  paymentAmount: 1000,
  paymentCurrency: 'GBP',
  paymentExpiry: '2023-01-01',
}
