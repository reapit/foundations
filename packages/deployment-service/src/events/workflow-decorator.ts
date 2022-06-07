import { QueueNamesEnum, QueueDetails } from '../constants'

export const WORKFLOW_INJECTABLE = 'WORKFLOW_INJECTABLE'
export const WORKFLOW_TYPE = 'WORKFLOW_TYPE'

export const Workflow = (queue: QueueNamesEnum, type?: () => Function) => (target) => {
  Reflect.defineMetadata(WORKFLOW_INJECTABLE, QueueDetails[queue], target)
  type && Reflect.defineMetadata(WORKFLOW_TYPE, type(), target)
}
