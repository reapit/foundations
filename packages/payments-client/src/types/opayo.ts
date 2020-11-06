export interface CreateTransactionModel {
  transactionType: 'Payment' | 'Deferred'
  paymentMethod: PaymentMethod
  vendorTxCode: string // Our reference max 40 chars
  amount: number // smallest denominator eg p / c
  currency: string
  description: string
  apply3DSecure: 'UseMSPSetting' | 'Force' | 'Disable' | 'ForceIgnoringRules'
  customerFirstName: string
  customerLastName: string
  billingAddress: BillingAddress
  entryMethod: 'Ecommerce' | 'MailOrder' | 'TelephoneOrder'
}

export interface BillingAddress {
  address1: string
  city: string
  postalCode: string
  country: string
}

export interface PaymentMethod {
  card: Card
}

export interface Card {
  merchantSessionKey: string
  cardIdentifier: string
  save: boolean
}
