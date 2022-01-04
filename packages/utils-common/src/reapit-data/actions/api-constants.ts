export type AppEnv = 'local' | 'development' | 'production'

export const ApiNames = (appEnv: AppEnv) => {
  return {
    platform: appEnv !== 'production' ? 'https://platform.dev.paas.reapit.cloud' : 'https://platform.reapit.cloud',
    pipeline: appEnv !== 'production' ? 'https://amswvslxm3.execute-api.eu-west-2.amazonaws.com/prod' : '',
  }
}

export enum PathNames {
  apps = '/marketplace/apps',
  installations = '/marketplace/installations',
  getPipeline = '/pipeline/{appId}',
  products = '/marketplace/products',
  sandboxes = '/marketplace/sandboxes',
  createPipeline = '/pipeline',
  getPipelineDeployments = '/pipeline/{pipelineId}/pipeline-runner',
  createPipelineDeployments = '/pipeline/{pipelineId}/pipeline-runner',
}
