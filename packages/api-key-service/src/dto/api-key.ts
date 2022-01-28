import { ApiKeyEntityType } from '@reapit/foundations-ts-definitions'
import { IsDateString, IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator'

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

export class ApiKeyMemberDto extends ApiKeyDto {
  @IsString()
  @IsEmail()
  email?: string

  @IsString()
  developerId?: string
}
