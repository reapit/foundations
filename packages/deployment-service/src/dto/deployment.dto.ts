import { IsString, IsNotEmpty, IsOptional } from 'class-validator'

export class DeploymentDto {
  @IsString()
  @IsNotEmpty()
  name?: string

  @IsString()
  @IsOptional()
  repo?: string
}
