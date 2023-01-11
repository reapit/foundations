import { IsNotEmpty, IsNumber, IsString } from 'class-validator'

export class PaymentReceiptDto {
  @IsString()
  @IsNotEmpty()
  receipientEmail: string

  @IsString()
  @IsNotEmpty()
  recipientName: string

  @IsString()
  @IsNotEmpty()
  paymentReason: string

  @IsNumber()
  @IsNotEmpty()
  paymentAmount: number

  @IsString()
  @IsNotEmpty()
  paymentCurrency: string
}

export class PaymentReceiptHeaders {
  @IsString()
  'reapit-session'?: string

  @IsString()
  @IsNotEmpty()
  'reapit-customer': string
}

export class PaymentReceiptParams {
  @IsString()
  @IsNotEmpty()
  paymentId: string
}
