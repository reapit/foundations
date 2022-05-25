import { IsString, IsNotEmpty, IsOptional, IsEnum, MaxLength, IsUUID, Matches, IsUrl } from 'class-validator'
import { CodeBuild } from 'aws-sdk'

export enum AppTypeEnum {
  REACT = 'react',
  NODE = 'node',
}

export enum PackageManagerEnum {
  YARN = 'yarn',
  NPM = 'npm',
}

export type PipelineProvisionBuildStatuses =
  | 'PRE_PROVISIONED'
  | 'PROVISIONING'
  | 'PROVISION_REQUEST'
  | 'FAILED_TO_PROVISION'

export type PipelineDeployingBuildStatues = 'QUEUED' | 'COMPLETED' | 'FAILED'

export type PipelineDeleteBuildStatuses = 'DELETED' | 'DELETING' | 'SCHEDULED_FOR_DELETION'

export type PipelineBuildStatus =
  | 'CREATED'
  | ('READY_FOR_DEPLOYMENT' &
      PipelineDeleteBuildStatuses &
      PipelineDeployingBuildStatues &
      PipelineProvisionBuildStatuses)
  | CodeBuild.StatusType

export class PipelineDto {
  @IsString()
  @IsNotEmpty()
  name?: string

  @IsString()
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
  @MaxLength(10)
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
