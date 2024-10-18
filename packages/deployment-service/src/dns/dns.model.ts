import { IsUrl, IsNotEmpty } from 'class-validator'

export class CreateDnsModel {
  @IsUrl()
  @IsNotEmpty()
  customDomain: string
}
