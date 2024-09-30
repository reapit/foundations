import { Platform } from '@reapit/foundations-ts-definitions'

export interface UpdatePaymentModel {
  status: 'posted' | 'rejected'
  externalReference: string
}

export interface PaymentWithPropertyModel extends Platform.PaymentModel {
  property?: Platform.PropertyModel
}
