import { IsString, Length, IsUrl, IsNotEmpty } from 'class-validator'

export class CreateDnsModel {
  @IsString()
  @Length(3, 20)
  @IsNotEmpty()
  recordName: string

  @IsUrl()
  @IsNotEmpty()
  customDomain: string
}
