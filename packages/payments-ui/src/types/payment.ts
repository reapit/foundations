import { PaymentModel, PropertyModel } from '@reapit/foundations-ts-definitions'

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

export interface CreateSessionRequest {
  clientCode: string
  paymentId: string
  sessionExpiresAt: string
}

export interface SessionResponse {
  id: string
  clientCode: string
  paymentId: string
  sessionCreatedAt: string
  sessionExpiresAt: string
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

export interface PaymentWithPropertyModel extends PaymentModel {
  property?: PropertyModel
}
