import { Intent, StatusIndicator } from '@reapit/elements'
import React from 'react'
import { DeploymentStatus, TaskModelInterface } from '@reapit/foundations-ts-definitions/deployment-schema'
import { ElPipelineTask } from './task.element'

const pipelineStatusToIntent = (status: DeploymentStatus): Intent => {
  switch (status) {
    case DeploymentStatus.CANCELED:
      return 'neutral'
    case DeploymentStatus.FAILED:
      return 'danger'
    case DeploymentStatus.RUNNING:
      return 'critical'
    case DeploymentStatus.SUCCESS:
      return 'success'
    default:
      return 'neutral'
  }
}

export const PipelineTask = ({ task }: { task: TaskModelInterface }) => {
  return (
    <ElPipelineTask>
      <StatusIndicator intent={pipelineStatusToIntent(task.status as DeploymentStatus)} shape="tag" />{' '}
      {task.functionName}
    </ElPipelineTask>
  )
}
