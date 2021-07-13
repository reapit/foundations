import { DefaultHeadersInterface } from '@homeservenow/serverless-aws-handler'
import { resolve } from 'path'

export const defaultOutputHeaders: DefaultHeadersInterface = {
  'Access-Control-Allow-Origin': '*',
}

export enum QueueNames {
  TASK_RUNNER = 'TaskRunner',
  TASK_POPULATION = 'TaskPopulation',
}

export const cloneDir = 'project'
export const dir = resolve('/tmp', cloneDir)
export const cloneZip = 'resource.zip'
