import { Intent, StatusIndicator } from '@reapit/elements'
import React from 'react'
import { TaskModelInterface } from '@reapit/foundations-ts-definitions/deployment-schema'
import { ElPipelineTask } from './task.element'
import { shleemy } from 'shleemy'

const pipelineStatusToIntent = (status: string): Intent => {
  switch (status) {
    case 'CANCELED':
      return 'neutral'
    case 'FAILED':
      return 'danger'
    case 'IN_PROGRESS':
      return 'critical'
    case 'SUCCEEDED':
      return 'success'
    default:
      return 'neutral'
  }
}

export const PipelineTask = ({ task }: { task: TaskModelInterface }) => {
  const started =
    task.startTime && task.startTime.substr(0, 1) !== '0' ? shleemy(task.startTime).forHumans : 'not started'

  return (
    <ElPipelineTask>
      <StatusIndicator intent={pipelineStatusToIntent(task.buildStatus as string)} shape="tag" /> {task.functionName} 🕒{' '}
      {task.elapsedTime}s {started}
    </ElPipelineTask>
  )
}
