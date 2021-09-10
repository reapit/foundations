import { DefaultHeadersInterface } from '@homeservenow/serverless-aws-handler'

export const defaultOutputHeaders: DefaultHeadersInterface = {
  'Access-Control-Allow-Origin': '*',
}

export enum QueueNames {
  CODE_BUILD_EXECUTOR = 'https://sqs.eu-west-2.amazonaws.com/028446965111/CodebuildExecutor',
  CODE_BUILD_VERSION_DEPLOY = 'https://sqs.eu-west-2.amazonaws.com/028446965111/CodebuildDeploy',
  PIPELINE_SETUP = 'https://sqs.eu-west-2.amazonaws.com/028446965111/PipelineSetup',
  PIPELINE_TEAR_DOWN = 'https://sqs.eu-west-2.amazonaws.com/028446965111/PipelineTearDown',
}
