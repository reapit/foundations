import { IsDateString, IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator'

export class SessionDto {
  @IsUUID()
  @IsOptional()
  id?: string

  @IsDateString()
  @IsOptional()
  sessionCreatedAt?: string

  @IsDateString()
  @IsNotEmpty()
  sessionExpiresAt: string

  @IsString()
  @IsNotEmpty()
  paymentId: string

  @IsString()
  @IsNotEmpty()
  clientCode: string
}
