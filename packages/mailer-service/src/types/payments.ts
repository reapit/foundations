export interface EmailPaymentRequest {
  receipientEmail: string
  recipientName: string
  paymentReason: string
  paymentAmount: number
  paymentCurrency: string
  paymentExpiry: string
}

export interface ClientConfig {
  paymentRequest: ConfigPaymentRequest
}

export interface ConfigPaymentRequest {
  senderEmail: string
  companyName: string
  logoUri: string
}

export interface EmailPaymentRequestTemplate extends ConfigPaymentRequest {
  paymentReason: string
  url: string
  recipientName: string
  paymentExpiry: string
  paymentAmount: string
}
