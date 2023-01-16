import { MerchantKey } from '@reapit/payments-ui'

export interface InternalTransaction {
  code: string
}

export interface ExternalTransaction {
  session: string
}

type ProviderName = 'opayo'

export interface PaymentProvider {
  providerName: ProviderName
  merchantKey: MerchantKey
}

export class OpayoProvider implements PaymentProvider {
  providerName: ProviderName
  merchantKey: MerchantKey
  constructor(key: MerchantKey) {
    this.providerName = 'opayo'
    this.merchantKey = key
  }
}
