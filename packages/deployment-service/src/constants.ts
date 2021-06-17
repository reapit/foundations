import { DefaultHeadersInterface } from '@homeservenow/serverless-aws-handler'

export enum TABLE_NAMES {
  PIPELINE = 'Cloud_Pipeline_Service',
  PIPELINE_RUNNER = 'Cloud_Pipeline_Runners_Service',
  TASK = 'Cloud_Task_Service',
}

export const defaultOutputHeaders: DefaultHeadersInterface = {
  'Access-Control-Allow-Origin': '*',
}
