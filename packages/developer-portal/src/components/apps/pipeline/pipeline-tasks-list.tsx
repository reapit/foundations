import React, { FC } from 'react'
import {
  Button,
  PersistantNotification,
  StatusIndicator,
  Table,
  TableCell,
  TableHeader,
  TableHeadersRow,
  TableRow,
  elMt6,
} from '@reapit/elements'
import { PipelineRunnerModelInterface } from '@reapit/foundations-ts-definitions'
import { buildStatusToIntent, buildStatusToReadable } from '../../../utils/pipeline-helpers'
import { fourColTable } from './__styles__'
import { dateToHuman } from '../../../utils/date-time'
import { cx } from '@linaria/core'
import { openNewPage } from '@/utils/navigation'

interface TaskListProps {
  tasks: PipelineRunnerModelInterface['tasks']
  s3BuildLogsLocation?: string
  buildStatus: string
}

export const TaskList: FC<TaskListProps> = ({ tasks, s3BuildLogsLocation, buildStatus }) => {
  if (!tasks || !tasks.length) {
    return (
      <PersistantNotification isInline isFullWidth isExpanded intent="secondary">
        No progress reported for this deployment
      </PersistantNotification>
    )
  }
  return (
    <>
      <Table>
        <TableHeadersRow className={fourColTable}>
          <TableHeader>Task</TableHeader>
          <TableHeader>Status</TableHeader>
          <TableHeader>Started</TableHeader>
          <TableHeader>Finished</TableHeader>
        </TableHeadersRow>
        {tasks.map((task) => (
          <TableRow key={task.id} className={fourColTable}>
            <TableCell>{buildStatusToReadable(task.functionName as string)}</TableCell>
            <TableCell>
              <StatusIndicator intent={buildStatusToIntent(task.buildStatus as string)} />
              {buildStatusToReadable(task.buildStatus as string)}
            </TableCell>
            <TableCell>{task.startTime ? dateToHuman(task.startTime) : '-'}</TableCell>
            <TableCell>{task.endTime ? dateToHuman(task.endTime) : '-'}</TableCell>
          </TableRow>
        ))}
      </Table>
      <div className={cx(elMt6)}>
        <Button
          intent="secondary"
          disabled={!s3BuildLogsLocation || !['FAILED', 'SUCCEEDED'].includes(buildStatus)}
          onClick={() => {
            s3BuildLogsLocation && openNewPage(s3BuildLogsLocation)()
          }}
        >
          Download Logs
        </Button>
      </div>
    </>
  )
}
