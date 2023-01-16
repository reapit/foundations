import { PaymentModel, PropertyModel } from '@reapit/foundations-ts-definitions'

export interface PaymentWithPropertyModel extends PaymentModel {
  clientCode: string
  property: PropertyModel
}

export type PaymentStatus = 'awaitingAuthorisation' | 'awaitingPosting' | 'posted' | 'rejected'

export interface UpdateStatusBody {
  status: string
  externalReference?: string
}

export interface UpdateStatusParams {
  _eTag: string
  paymentId: string
  session?: string | null
  clientCode?: string
}

export interface ApiKeyRequest {
  clientCode: string
  paymentId: string
  keyExpiresAt: string
}

export interface ApiKeyResponse {
  apiKey: string
}

export interface PaymentEmailRequest {
  receipientEmail: string
  recipientName: string
  paymentReason: string
  paymentAmount: number
  paymentCurrency: string
  paymentExpiry: string
}

export interface PaymentEmailReceipt {
  receipientEmail: string
  recipientName: string
  paymentReason: string
  paymentAmount: number
  paymentCurrency: string
}
