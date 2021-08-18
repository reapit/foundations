import { DefaultHeadersInterface } from '@homeservenow/serverless-aws-handler'

export const defaultOutputHeaders: DefaultHeadersInterface = {
  'Access-Control-Allow-Origin': '*',
}

export enum QueueNames {
  CODE_BUILD_EXECUTOR = 'https://sqs.eu-west-2.amazonaws.com/028446965111/CodebuildExecutor',
}
