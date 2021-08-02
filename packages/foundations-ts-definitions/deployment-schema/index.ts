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
  buildStatus?: DeploymentStatus
}

export interface TaskModelInterface {
  id?: string
  pipelineRunnerId?: string
  created?: string
  modified?: string
  functionName?: TaskRunnerFunctions
  status?: DeploymentStatus
}

export enum PackageManagerEnum {
  NPM = 'npm',
  YARN = 'yarn',
}

export enum AppTypeEnum {
  NODE = 'node',
  REACT = 'react',
}

export enum DeploymentStatus {
  FAILED = 'failed',
  SUCCESS = 'success',
  CANCELED = 'canceled',
  PENDING = 'pending',
  RUNNING = 'running',
}

export enum TaskRunnerFunctions {
  INSTALL = 'install',
  BUILD = 'build',
  DEPLOY_LAMBDAS = 'deploy lambdas',
  DEPLOY_REACT = 'deploy react',
  PULL = 'pull',
}