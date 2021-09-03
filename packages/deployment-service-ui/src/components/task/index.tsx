import { Intent, StatusIndicator } from '@reapit/elements'
import React from 'react'
import { TaskModelInterface } from '@reapit/foundations-ts-definitions/deployment-schema'
import { ElPipelineTask } from './task.element'
import { shleemy } from 'shleemy'
import { cx } from '@linaria/core'
import { CodeBuild } from 'aws-sdk'

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

const taskFunctionToFriendlyName = (functionName: CodeBuild.BuildPhaseType): string => {
  switch (functionName) {
    case 'INSTALL':
      return 'install'
    case 'BUILD':
      return 'Build'
    case 'DOWNLOAD_SOURCE':
      return 'Download'
    case 'DEPLOY':
      return 'Deploy'
    default:
      return ''
  }
}

const toElapsedTime = (task: TaskModelInterface) => {
  return task.elapsedTime ? `🕒 ${task.elapsedTime}secs` : ''
}

export const PipelineTask = ({ task, index }: { task: TaskModelInterface; index: number }) => {
  const started =
    task.startTime && task.startTime.substr(0, 1) !== '0' ? shleemy(task.startTime).forHumans : 'not started'

  return (
    <ElPipelineTask className={cx(`order-${index + 1}`)}>
      <StatusIndicator intent={pipelineStatusToIntent(task.buildStatus as string)} shape="tag" />{' '}
      {taskFunctionToFriendlyName(task.functionName as string)} {toElapsedTime(task)} - {started}
    </ElPipelineTask>
  )
}
