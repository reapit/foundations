import React, { FC } from 'react'
import { PersistantNotification, Table, TableCell, TableHeader, TableHeadersRow, TableRow } from '@reapit/elements'
import { PipelineRunnerModelInterface } from '@reapit/foundations-ts-definitions'
import { buildStatusToReadable } from '../../../utils/pipeline-helpers'
import { fourColTable } from './__styles__'
import { dateToHuman } from '../../../utils/date-time'

interface TaskListProps {
  tasks: PipelineRunnerModelInterface['tasks']
}

export const TaskList: FC<TaskListProps> = ({ tasks }) => {
  if (!tasks || !tasks.length) {
    return (
      <PersistantNotification isInline isFullWidth isExpanded intent="secondary">
        No progress reported for this deployment
      </PersistantNotification>
    )
  }
  return (
    <Table>
      <TableHeadersRow className={fourColTable}>
        <TableHeader>Task</TableHeader>
        <TableHeader>Status</TableHeader>
        <TableHeader>Started</TableHeader>
        <TableHeader>Finished</TableHeader>
      </TableHeadersRow>
      {tasks.map((task) => (
        <TableRow key={task.id} className={fourColTable}>
          <TableCell>{task.functionName}</TableCell>
          <TableCell>{buildStatusToReadable(task.buildStatus as string)}</TableCell>
          <TableCell>{task.startTime ? dateToHuman(task.startTime) : '-'}</TableCell>
          <TableCell>{task.endTime ? dateToHuman(task.endTime) : '-'}</TableCell>
        </TableRow>
      ))}
    </Table>
  )
}
