import React, { FC } from 'react'
import {
  Button,
  PersistentNotification,
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
  created: Date
}

const intendedTaskOrder = ['DOWNLOAD_SOURCE', 'INSTALL', 'BUILD', 'TEST', 'DEPLOY']

export const TaskList: FC<TaskListProps> = ({ tasks, s3BuildLogsLocation, buildStatus, created }) => {
  if (!tasks || !tasks.length) {
    return (
      <PersistentNotification isInline isFullWidth isExpanded intent="secondary">
        No progress reported for this deployment
      </PersistentNotification>
    )
  }

  const expires = created
  expires.setDate(1)

  const logsExpired = new Date().getTime() < expires.getTime()

  return (
    <>
      <Table>
        <TableHeadersRow className={fourColTable}>
          <TableHeader>Task</TableHeader>
          <TableHeader>Status</TableHeader>
          <TableHeader>Started</TableHeader>
          <TableHeader>Finished</TableHeader>
        </TableHeadersRow>
        {tasks
          .sort((a, b) => {
            return (
              intendedTaskOrder.indexOf(a.functionName as string) - intendedTaskOrder.indexOf(b.functionName as string)
            )
          })
          .map((task) => (
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
          disabled={!s3BuildLogsLocation || !['FAILED', 'SUCCEEDED'].includes(buildStatus) || logsExpired}
          onClick={() => {
            s3BuildLogsLocation && openNewPage(s3BuildLogsLocation)()
          }}
        >
          {logsExpired ? 'Logs Expired' : 'FAILED'.includes(buildStatus) ? 'Logs Unavailable' : 'Download Logs'}
        </Button>
      </div>
    </>
  )
}
