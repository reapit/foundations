import { PaymentModel, PropertyModel } from '@reapit/foundations-ts-definitions'
import { ClientConfigModel } from '../types/config'
import { MerchantKey } from '../types/opayo'

export class PaymentProvider {
  config: ClientConfigModel
  payment: PaymentModel
  property: PropertyModel | null
  merchantKey: MerchantKey

  constructor(
    config: ClientConfigModel,
    payment: PaymentModel,
    property: PropertyModel | null,
    merchantKey: MerchantKey,
  ) {
    this.config = config
    this.payment = payment
    this.property = property
    this.merchantKey = merchantKey
  }
}
