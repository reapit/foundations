import { IsEmail, IsNotEmpty, IsString } from 'class-validator'

export class ApiKeyMemberDto extends ApiKeyDto {
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email?: string

  @IsString()
  developerId?: string
}
