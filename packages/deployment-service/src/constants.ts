import { DefaultHeadersInterface } from '@homeservenow/serverless-aws-handler'

export const defaultOutputHeaders: DefaultHeadersInterface = {
  'Access-Control-Allow-Origin': '*',
}

export enum QueueNamesEnum {
  CODEBUILD_EXECUTOR = 'CODEBUILD_EXECUTOR',
  CODEBUILD_VERSION_DEPLOY = 'CODE_BUILD_VERSION_DEPLOY',
  PIPELINE_SETUP = 'PIPELINE_SETUP',
  PIPELINE_TEAR_DOWN = 'PIPELINE_TEAR_DOWN',
  PIPELINE_TEAR_DOWN_START = 'PIPELINE_TEAR_DOWN_START',
}

export const QueueNames: { [key in QueueNamesEnum]: string } = {
  [QueueNamesEnum.CODEBUILD_EXECUTOR]: process.env.CODEBUILD_EXECUTOR as string,
  [QueueNamesEnum.CODEBUILD_VERSION_DEPLOY]: process.env.CODE_BUILD_VERSION_DEPLOY as string,
  [QueueNamesEnum.PIPELINE_SETUP]: process.env.PIPELINE_SETUP as string,
  [QueueNamesEnum.PIPELINE_TEAR_DOWN]: process.env.PIPELINE_TEAR_DOWN as string,
  [QueueNamesEnum.PIPELINE_TEAR_DOWN_START]: process.env.PIPELINE_TEAR_DOWN_START as string,
}
