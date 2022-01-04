import { IsString, IsNotEmpty, IsOptional, IsEnum, MaxLength, IsUUID } from 'class-validator'

export enum AppTypeEnum {
  REACT = 'react',
  NODE = 'node',
}

export enum PackageManagerEnum {
  YARN = 'yarn',
  NPM = 'npm',
}
export class PipelineDto {
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

  @IsString()
  @MaxLength(10)
  outDir: string = 'build'

  @IsString()
  @IsUUID('4')
  @IsNotEmpty()
  appId?: string
}
