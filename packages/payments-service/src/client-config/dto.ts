import { IsBoolean, IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator'

export class ClientConfigDto {
  @IsString()
  @IsNotEmpty()
  clientCode: string

  @IsString()
  logoUri: string

  @IsString()
  companyName: string

  @IsBoolean()
  isLive: boolean

  @IsString()
  @IsOptional()
  integrationKey?: string

  @IsString()
  @IsOptional()
  passKey?: string

  @IsString()
  @IsOptional()
  vendorName?: string

  @IsUUID()
  @IsOptional()
  configId?: string
}

export class ClientConfigDeleteDto {
  @IsUUID()
  @IsOptional()
  configId?: string
}

export class ClientConfigParams {
  @IsString()
  @IsNotEmpty()
  clientCode: string
}

export class ClientConfigPublicHeaders {
  @IsString()
  @IsNotEmpty()
  'reapit-customer': string

  @IsString()
  @IsNotEmpty()
  'reapit-session': string
}

export class ClientConfigPublicParams {
  @IsString()
  @IsNotEmpty()
  paymentId: string
}
