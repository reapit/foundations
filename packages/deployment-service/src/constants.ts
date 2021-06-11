import { DefaultHeadersInterface } from '@homeservenow/serverless-aws-handler'

export enum TABLE_NAMES {
  DEPLOYMENT = 'Cloud_Deployments_Service',
  PIPELINE = 'Cloud_Pipeline_Service',
  TASK = 'Cloud_Task_Service',
}

export const defaultOutputHeaders: DefaultHeadersInterface = {
  'Access-Control-Allow-Origin': '*',
}
