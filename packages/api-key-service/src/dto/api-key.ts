import { KeyType } from '@reapit/foundations-ts-definitions'
import { IsEnum, IsNotEmpty, IsOptional, IsString, Length } from 'class-validator'

export class ApiKeyDto {
  @IsEnum(KeyType)
  keyType?: KeyType

  @IsString()
  @IsNotEmpty()
  keyExpiresAt?: string

  @IsString()
  @IsNotEmpty()
  @Length(3, 3)
  clientCode?: string

  @IsString()
  @IsOptional()
  paymentId?: string
}
