import { IsNotEmpty, IsString } from 'class-validator'

export class PaymentsDto {
  @IsString()
  @IsNotEmpty()
  status: string

  @IsString()
  @IsNotEmpty()
  externalReference: string
}

export class PaymentsHeaders {
  @IsString()
  @IsNotEmpty()
  'reapit-session': string

  @IsString()
  'if-match'?: string

  @IsString()
  @IsNotEmpty()
  'reapit-customer': string

  @IsString()
  @IsNotEmpty()
  'api-version': string
}

export class PaymentsParams {
  @IsString()
  @IsNotEmpty()
  paymentId: string
}
