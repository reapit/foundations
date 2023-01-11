import { IsNotEmpty, IsString } from 'class-validator'
import { ClientConfigModel } from './model'

export class ClientConfigDto implements ClientConfigModel {
  @IsString()
  @IsNotEmpty()
  clientCode: string

  @IsString()
  @IsNotEmpty()
  vendorName: string

  @IsString()
  @IsNotEmpty()
  integrationKey: string

  @IsString()
  @IsNotEmpty()
  passKey: string

  @IsString()
  @IsNotEmpty()
  companyName: string

  @IsString()
  @IsNotEmpty()
  logoUri: string
}

export class ClientConfigParams {
  @IsString()
  @IsNotEmpty()
  clientCode: string
}
