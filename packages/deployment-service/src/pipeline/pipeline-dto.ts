import { PackageManagerEnum } from '@reapit/foundations-ts-definitions'
import { Type } from 'class-transformer'
import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsEnum,
  MaxLength,
  IsUUID,
  Matches,
  IsUrl,
  ValidateNested,
  IsNumber,
} from 'class-validator'

export enum AppTypeEnum {
  REACT = 'react',
  NODE = 'node',
}

export class GithubRepositoryDto {
  @IsNotEmpty()
  @IsUrl()
  repositoryUrl?: string

  @IsNotEmpty()
  @IsNumber()
  installationId?: number

  @IsNotEmpty()
  @IsNumber()
  repositoryId?: number
}

export class PipelineDto {
  @IsString()
  @IsNotEmpty()
  name?: string

  @IsOptional()
  @Type(() => GithubRepositoryDto)
  @ValidateNested()
  repository?: GithubRepositoryDto

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
