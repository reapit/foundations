import { PaymentModel, PropertyModel } from '@reapit/foundations-ts-definitions'

export interface UpdatePaymentModel {
  status: 'posted' | 'rejected'
  externalReference: string
}

export interface PaymentWithPropertyModel extends PaymentModel {
  property?: PropertyModel
}
