import { DefaultHeadersInterface } from '@homeservenow/serverless-aws-handler'
import { resolve } from 'path'

export const defaultOutputHeaders: DefaultHeadersInterface = {
  'Access-Control-Allow-Origin': '*',
}

export enum QueueNames {
  TASK_RUNNER = 'https://sqs.eu-west-2.amazonaws.com/028446965111/TaskRunner',
  TASK_POPULATION = 'https://sqs.eu-west-2.amazonaws.com/028446965111/TaskPopulation',
}

export const cloneDir = 'project'
export const dir = resolve('/tmp', cloneDir)
export const cloneZip = 'resource.zip'
