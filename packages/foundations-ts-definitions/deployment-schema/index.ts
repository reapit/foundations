export interface DeploymentModelInterface {
  id?: string
  name?: string
  organisationId?: string
  created?: string
  modified?: string
  developerId?: string
  appType?: AppTypeEnum
  buildCommand?: string
  packageManager?: PackageManagerEnum
}

export interface PipelineModelInterface {
  id?: string
  deploymentId?: string
  created?: string
  modified?: string
  appType?: AppTypeEnum
  buildCommand?: string
  packageManager?: PackageManagerEnum
  tasks?: TaskModelInterface[]
}

export interface TaskModelInterface {
  id?: string
  pipelineId?: string
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
  BUILD = 'build',
  DEPLOY_LAMBDAS = 'deploy lambdas',
  DEPLOY_REACT = 'deploy react',
  PULL = 'pull',
}
