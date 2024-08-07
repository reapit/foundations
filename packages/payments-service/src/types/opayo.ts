export enum TransactionType {
  'Payment' = 'Payment',
  'Deferred' = 'Deferred',
}

export enum ThreeDSecureType {
  'UseMSPSetting' = 'UseMSPSetting',
  'Force' = 'Force',
  'Disable' = 'Disable',
  'ForceIgnoringRules' = 'ForceIgnoringRules',
}

export enum EntryMethodType {
  'Ecommerce' = 'Ecommerce',
  'MailOrder' = 'MailOrder',
  'TelephoneOrder' = 'TelephoneOrder',
}

export interface Card {
  merchantSessionKey: string
  cardIdentifier: string
  save: boolean
}

export class BillingAddress {
  address1: string
  city: string
  postalCode: string
  country: string
}

export class ShippingDetails {
  recipientFirstName: string
  recipientLastName: string
  shippingAddress1: string
  shippingCity: string
  shippingPostalCode: string
  shippingCountry: string
}

export class PaymentMethod {
  card: Card
}

export class StrongCustomerAuthentication {
  notificationURL: string
  website: string
}

export interface CreateTransactionModel {
  transactionType: TransactionType
  paymentMethod: PaymentMethod
  vendorTxCode: string // Our reference max 40 chars
  amount: number // smallest denominator eg p / c
  currency: string
  description: string
  apply3DSecure: ThreeDSecureType
  customerFirstName: string
  customerLastName: string
  customerEmail: string
  customerPhone: string
  billingAddress: BillingAddress
  shippingDetails: ShippingDetails
  entryMethod: EntryMethodType
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

export interface OpayoCreds {
  integrationKey: string
  passKey: string
  vendorName: string
}
