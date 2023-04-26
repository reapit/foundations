import { IsString, IsNotEmpty, IsOptional, IsEnum, MaxLength, IsUUID, Matches, IsUrl } from 'class-validator'

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

  @IsOptional()
  @IsUrl()
  repository?: string

  @IsEnum(AppTypeEnum)
  @IsNotEmpty()
  appType?: AppTypeEnum

  @IsString()
  buildCommand?: string = 'build'

  @IsString()
  branch?: string = 'master'

  @IsEnum(PackageManagerEnum)
  packageManager: PackageManagerEnum = PackageManagerEnum.YARN

  @IsString()
  @MaxLength(60)
  outDir: string = 'build'

  @IsString()
  @IsUUID('4')
  @IsNotEmpty()
  appId?: string

  @IsString()
  @IsOptional()
  @Matches(/PROVISION_REQUEST/)
  buildStatus?: 'PROVISION_REQUEST'
}
