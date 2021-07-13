import { DefaultHeadersInterface } from '@homeservenow/serverless-aws-handler'

export const defaultOutputHeaders: DefaultHeadersInterface = {
  'Access-Control-Allow-Origin': '*',
}

export enum QueueNames {
  TASK_RUNNER = 'TaskRunner',
  TASK_POPULATION = 'TaskPopulation',
}
