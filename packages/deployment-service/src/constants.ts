export const defaultOutputHeaders = {
  'Access-Control-Allow-Origin': '*',
}

export enum QueueNamesEnum {
  CODEBUILD_EXECUTOR = 'CODEBUILD_EXECUTOR',
  CODEBUILD_VERSION_DEPLOY = 'CODEBUILD_VERSION_DEPLOY',
  PIPELINE_SETUP = 'PIPELINE_SETUP',
  PIPELINE_TEAR_DOWN = 'PIPELINE_TEAR_DOWN',
  PIPELINE_TEAR_DOWN_START = 'PIPELINE_TEAR_DOWN_START',
  APP_EVENTS = 'APP_EVENTS',
}

export const QueueNames: { [key in QueueNamesEnum]: string } = {
  [QueueNamesEnum.CODEBUILD_EXECUTOR]: process.env.CODEBUILD_EXECUTOR_URL as string,
  [QueueNamesEnum.CODEBUILD_VERSION_DEPLOY]: process.env.CODEBUILD_VERSION_DEPLOY_URL as string,
  [QueueNamesEnum.PIPELINE_SETUP]: process.env.PIPELINE_SETUP_URL as string,
  [QueueNamesEnum.PIPELINE_TEAR_DOWN]: process.env.PIPELINE_TEAR_DOWN_URL as string,
  [QueueNamesEnum.PIPELINE_TEAR_DOWN_START]: process.env.PIPELINE_TEAR_DOWN_START_URL as string,
  [QueueNamesEnum.APP_EVENTS]: process.env.APP_EVENTS_URL as string,
}

export const QueueDetails: { [key in QueueNamesEnum]: {
  url: string,
  arn: string,
} } = {
  [QueueNamesEnum.CODEBUILD_EXECUTOR]: {
    url: process.env.CODEBUILD_EXECUTOR_URL as string,
    arn: process.env.CODEBUILD_EXECUTOR_ARN as string,
  },
  [QueueNamesEnum.CODEBUILD_VERSION_DEPLOY]: {
    url: process.env.CODEBUILD_VERSION_DEPLOY_URL as string,
    arn: process.env.CODEBUILD_EXECUTOR_ARN as string,
  },
  [QueueNamesEnum.PIPELINE_SETUP]: {
    url: process.env.PIPELINE_SETUP_URL as string,
    arn: process.env.CODEBUILD_EXECUTOR_ARN as string,
  },
  [QueueNamesEnum.PIPELINE_TEAR_DOWN]: {
    url: process.env.PIPELINE_TEAR_DOWN_URL as string,
    arn: process.env.CODEBUILD_EXECUTOR_ARN as string,
  },
  [QueueNamesEnum.PIPELINE_TEAR_DOWN_START]: {
    url: process.env.PIPELINE_TEAR_DOWN_START_URL as string,
    arn: process.env.CODEBUILD_EXECUTOR_ARN as string,
  },
  [QueueNamesEnum.APP_EVENTS]: {
    url: process.env.APP_EVENTS_URL as string,
    arn: process.env.CODEBUILD_EXECUTOR_ARN as string,
  }
}
