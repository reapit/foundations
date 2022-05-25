import { IsNotEmpty, IsString } from 'class-validator'

export class ParameterDto {
  @IsString()
  @IsNotEmpty()
  key: string

  @IsNotEmpty()
  value: any
}
