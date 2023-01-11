import { IsDateString, IsNotEmpty, IsNumber, IsString } from 'class-validator'

export class PaymentRequestDto {
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

  @IsDateString()
  @IsNotEmpty()
  paymentExpiry: string
}

export class PaymentRequestHeaders {
  @IsString()
  @IsNotEmpty()
  'reapit-session': string

  @IsString()
  @IsNotEmpty()
  'reapit-customer': string
}

export class PaymentRequestParams {
  @IsString()
  @IsNotEmpty()
  paymentId: string
}
