import { Intent, StatusIndicator } from '@reapit/elements'
import React from 'react'
import { TaskModelInterface } from '@reapit/foundations-ts-definitions/deployment-schema'
import { ElPipelineTask } from './task.element'

const pipelineStatusToIntent = (status: string): Intent => {
  switch (status) {
    case 'CANCELED':
      return 'neutral'
    case 'FAILED':
      return 'danger'
    case 'IN_PROGRESS':
      return 'critical'
    case 'SUCCESS':
      return 'success'
    default:
      return 'neutral'
  }
}

export const PipelineTask = ({ task }: { task: TaskModelInterface }) => {
  return (
    <ElPipelineTask>
      <StatusIndicator intent={pipelineStatusToIntent(task.buildStatus as string)} shape="tag" /> {task.functionName}
    </ElPipelineTask>
  )
}
