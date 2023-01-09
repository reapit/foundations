import { IsDateString, IsNotEmpty, IsString, IsUUID } from 'class-validator'

export class SessionDto {
  @IsUUID()
  id: string

  @IsDateString()
  @IsNotEmpty()
  sessionCreatedAt: string

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
