import { ApiKeyEntityType } from '@reapit/foundations-ts-definitions'
import { IsDateString, IsEnum, IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator'

export class ApiKeyDto {
  @IsEnum(ApiKeyEntityType)
  entityType?: ApiKeyEntityType

  @IsUUID()
  @IsOptional()
  entityId?: string

  @IsDateString()
  @IsNotEmpty()
  keyExpiresAt?: string

  @IsString()
  @IsOptional()
  name?: string
}
