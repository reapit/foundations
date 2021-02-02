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

export interface MerchantKey {
  merchantSessionKey: string
  expiry: string
}

export interface Transaction {
  statusCode: string
  statusDetail: string
  transactionId: string
  transactionType: string
  retrievalReference: number
  bankResponseCode: string
  bankAuthorisationCode: string
  paymentMethod: TransactionPaymentMethod
  amount: Amount
  currency: string
  fiRecipient: FiRecipient
  status: string
  avsCvcCheck: AvsCvcCheck
  '3DSecure': _3DSecure
}

export interface _3DSecure {
  status: string
}

export interface AvsCvcCheck {
  status: string
  address: string
  postalCode: string
  securityCode: string
}

export interface FiRecipient {}

export interface Amount {
  totalAmount: number
  saleAmount: number
  surchargeAmount: number
}

export interface TransactionPaymentMethod {
  card: PaymentCard
}

export interface PaymentCard {
  cardType: string
  lastFourDigits: string
  expiryDate: string
  cardIdentifier: string
  reusable: boolean
}
