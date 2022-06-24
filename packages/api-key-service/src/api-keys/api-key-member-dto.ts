import { IsEmail, IsNotEmpty, IsString } from 'class-validator'
import { ApiKeyDto } from './api-key-dto'

export class ApiKeyMemberDto extends ApiKeyDto {
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email?: string

  @IsString()
  developerId?: string
}
