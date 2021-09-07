import { Intent, StatusIndicator } from '@reapit/elements'
import React from 'react'
import { TaskModelInterface } from '@reapit/foundations-ts-definitions/deployment-schema'
import { ElPipelineTask } from './task.element'
import { shleemy } from 'shleemy'
import { cx } from '@linaria/core'
import { taskFunctionToFriendlyName } from '../../utils/friendly-function-name'
import { useStopwatch } from 'react-timer-hook'

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

const toElapsedTime = (seconds?: string) => {
  return seconds ? `🕒 ${seconds}secs` : ''
}

const AutoTimer = () => {
  const { seconds, minutes } = useStopwatch({
    autoStart: true,
  })

  const calculatedSeconds = (minutes * 60) + seconds

  return <>{toElapsedTime(calculatedSeconds.toString())}</>
}

const Timer = ({ started, elapsedTime }: { started: boolean; elapsedTime?: string }) => {
  return <>{started ? <AutoTimer />: elapsedTime ? toElapsedTime(elapsedTime) : null}</>
}

export const PipelineTask = ({ task, index }: { task: TaskModelInterface; index: number }) => {
  const startedAt =
    task.startTime && task.startTime.substr(0, 1) !== '0' ? shleemy(task.startTime).forHumans : 'not started'

  let started = false

  if (task.buildStatus === 'IN_PROGRESS') {
    started = true
  }

  return (
    <ElPipelineTask className={cx(`order-${index + 1}`)}>
      <StatusIndicator intent={pipelineStatusToIntent(task.buildStatus as string)} shape="tag" />{' '}
      {taskFunctionToFriendlyName(task.functionName as string)}{' '}
      <Timer elapsedTime={task.elapsedTime} started={started} /> - {startedAt}
    </ElPipelineTask>
  )
}
