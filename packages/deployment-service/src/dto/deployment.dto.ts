import { IsString, IsNotEmpty } from 'class-validator'

export class DeploymentDto {
  @IsString()
  @IsNotEmpty()
  name?: string

  @IsString()
  repo?: string
}
