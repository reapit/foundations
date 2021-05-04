import { MerchantKey } from '@/types/opayo'

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

/*
  TODO: Next stage - encapsulate more as below 
*/
/* 
export class InternalOpayoProvider extends OpayoProvider implements InternalTransaction {
  code: string
  constructor(key: MerchantKey, code: string) {
    super(key)
    this.code = code
  }
}
*/
