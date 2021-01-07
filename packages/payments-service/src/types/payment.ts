export interface UpdatePaymentModel {
  status: 'posted' | 'rejected'
  externalReference: string
}
