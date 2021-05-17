import { IsString, IsNotEmpty, IsOptional, IsEnum } from 'class-validator'

export enum AppTypeEnum {
  REACT = 'react',
  NODE = 'node',
}

export enum PackageManagerEnum {
  YARN = 'yarn',
  NPM = 'npm',
}
export class DeploymentDto {
  @IsString()
  @IsNotEmpty()
  name?: string

  @IsString()
  @IsOptional()
  repo?: string

  @IsEnum(AppTypeEnum)
  @IsNotEmpty()
  appType?: AppTypeEnum

  @IsString()
  buildCommand?: string = 'build'

  @IsEnum(PackageManagerEnum)
  packageManager: PackageManagerEnum = PackageManagerEnum.YARN
}
