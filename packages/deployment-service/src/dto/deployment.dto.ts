import {IsString} from 'class-validator'

export class DeploymentDto {
  @IsString()
  name: string
}
