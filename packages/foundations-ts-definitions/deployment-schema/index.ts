import { CodeBuild } from 'aws-sdk'

export interface PipelineModelInterface {
  id?: string
  name?: string
  organisationId?: string
  created?: string
  modified?: string
  developerId?: string
  appType?: AppTypeEnum
  buildCommand?: string
  testCommand?: string
  packageManager?: PackageManagerEnum
  repository?: string
  installationId?: number
  repositoryId?: number
  branch?: string
  outDir?: string
  buildStatus?: string
  appId?: string
  subDomain?: string
  bitbucketClientId?: string
}

export interface PipelineRunnerModelInterface {
  id?: string
  pipelineId?: string
  created?: string
  modified?: string
  appType?: AppTypeEnum
  type?: PipelineRunnerType
  buildCommand?: string
  packageManager?: PackageManagerEnum
  tasks?: TaskModelInterface[]
  buildStatus?: CodeBuild.StatusType
  s3BuildLogsLocation?: string
  buildVersion?: string
  currentlyDeployed?: boolean
}

export interface TaskModelInterface {
  id?: string
  pipelineRunnerId?: string
  created?: string
  modified?: string
  functionName?: CodeBuild.BuildPhaseType
  buildStatus?: CodeBuild.StatusType
  startTime?: Date
  endTime?: Date
  elapsedTime?: string
}

export enum PackageManagerEnum {
  NPM = 'npm',
  YARN = 'yarn',
}

export enum AppTypeEnum {
  NODE = 'node',
  REACT = 'react',
}

export enum PipelineRunnerType {
  BUILD = 'BUILD',
  RELEASE = 'RELEASE',
  REPO = 'REPO',
}
