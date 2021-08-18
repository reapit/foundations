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
  packageManager?: PackageManagerEnum
  repository?: string
  outDir?: string
}

export interface PipelineRunnerModelInterface {
  id?: string
  pipelineId?: string
  created?: string
  modified?: string
  appType?: AppTypeEnum
  buildCommand?: string
  packageManager?: PackageManagerEnum
  tasks?: TaskModelInterface[]
  buildStatus?: CodeBuild.StatusType
}

export interface TaskModelInterface {
  id?: string
  pipelineRunnerId?: string
  created?: string
  modified?: string
  functionName?: CodeBuild.BuildPhaseType
  status?: CodeBuild.StatusType
}

export enum PackageManagerEnum {
  NPM = 'npm',
  YARN = 'yarn',
}

export enum AppTypeEnum {
  NODE = 'node',
  REACT = 'react',
}
