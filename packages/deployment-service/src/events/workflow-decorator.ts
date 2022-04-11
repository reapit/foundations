import { QueueNamesEnum } from '@/constants'

export const WORKFLOW_INJECTABLE = 'WORKFLOW_INJECTABLE'

export const Workflow = (queue: QueueNamesEnum) => (target) => {
  Reflect.defineMetadata(
    WORKFLOW_INJECTABLE,
    {
      queue,
    },
    target,
  )
}
