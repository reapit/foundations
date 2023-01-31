import { PaymentReceiptDto } from '../../payment-receipt/dto'

export const mockPaymentReceipt: PaymentReceiptDto = {
  receipientEmail: 'mock@email.com',
  recipientName: 'Mock Name',
  paymentReason: 'Mock reason',
  paymentAmount: 1000,
  paymentCurrency: 'GBP',
}
