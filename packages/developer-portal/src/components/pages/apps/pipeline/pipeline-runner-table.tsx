import React, { useEffect, useState } from 'react'
import { cx } from '@linaria/core'
import {
  elMt3,
  elP6,
  FlexContainer,
  Loader,
  Pagination,
  Table,
  TableCell,
  TableExpandableRow,
  TableExpandableRowTriggerCell,
  TableHeader,
  TableHeadersRow,
  TableRow,
  TableRowContainer,
} from '@reapit/elements'
import { PipelineModelInterface, PipelineRunnerModelInterface } from '@reapit/foundations-ts-definitions'
import { useEvent } from '@harelpls/use-pusher'
import { DateTime } from 'luxon'
import { PipelineRunnerMeta } from './deployment-info'

interface PipelineRunnerSetterInterface {
  initialDeployments: null | { items: PipelineRunnerModelInterface[] }
  setPagination: (
    value: React.SetStateAction<{
      items: PipelineRunnerModelInterface[]
    } | null>,
  ) => void
}

export const pipelineRunnerSetter =
  ({ initialDeployments, setPagination }: PipelineRunnerSetterInterface) =>
  () => {
    if (!initialDeployments) {
      return
    }

    const deploymentIds = initialDeployments.items.map((item) => item.id)

    setPagination((currentState) => {
      if (currentState === null || (!currentState.items && initialDeployments !== null)) {
        return initialDeployments
      }

      return {
        items: currentState.items.reduce<PipelineRunnerModelInterface[]>((items, runner) => {
          if (deploymentIds.includes(runner.id)) {
            return items
          }

          items.push(runner)

          return items
        }, initialDeployments.items),
      }
    })
  }

interface NewPipelineDeploymentInterface {
  newRunner?: PipelineRunnerModelInterface
  pagination: null | { items: PipelineRunnerModelInterface[] }
  setPagination: (
    value: React.SetStateAction<{
      items: PipelineRunnerModelInterface[]
    } | null>,
  ) => void
}

export const addNewPipelineDeployment =
  ({ newRunner, setPagination, pagination }: NewPipelineDeploymentInterface) =>
  () => {
    if (newRunner)
      setPagination({
        items: [newRunner, ...(pagination?.items ? pagination.items : [])],
      })
  }

const TaskList = ({ tasks }: { tasks: PipelineRunnerModelInterface['tasks'] }) => {
  if (!tasks) {
    return null
  }
  return (
    <Table>
      <TableHeadersRow>
        <TableHeader>Task</TableHeader>
        <TableHeader>Status</TableHeader>
        <TableHeader>Started</TableHeader>
        <TableHeader>Finished</TableHeader>
      </TableHeadersRow>
      {tasks.map((task) => (
        <TableRow key={task.id}>
          <TableCell>{task.functionName}</TableCell>
          <TableCell>{task.buildStatus}</TableCell>
          <TableCell>{task.startTime ? dateToHuman(task.startTime) : '-'}</TableCell>
          <TableCell>{task.endTime ? dateToHuman(task.endTime) : '-'}</TableCell>
        </TableRow>
      ))}
    </Table>
  )
}

const isoDateToHuman = (isoDateStr: string) => DateTime.fromISO(isoDateStr).toLocaleString(DateTime.DATETIME_SHORT)
const dateToHuman = (date: Date) => DateTime.fromJSDate(date).toLocaleString(DateTime.DATETIME_SHORT)

export const PipelineDeploymentTable: React.FC<{
  pipeline: PipelineModelInterface
  initialDeployments: null | { items: PipelineRunnerModelInterface[]; meta: PipelineRunnerMeta }
  loading: boolean
  channel: any
  newRunner: PipelineRunnerModelInterface | undefined
  setPage: (pageNumber: number) => void
}> = ({ pipeline, initialDeployments, loading, channel, newRunner, setPage }) => {
  const [pagination, setPagination] = useState<{
    items: PipelineRunnerModelInterface[]
  } | null>(initialDeployments)
  const [isOpen, setIsOpen] = useState<string>('')
  useEffect(
    pipelineRunnerSetter({
      initialDeployments,
      setPagination,
    }),
    [initialDeployments],
  )

  useEffect(
    addNewPipelineDeployment({
      newRunner,
      setPagination,
      pagination,
    }),
    [newRunner],
  )

  useEvent<PipelineRunnerModelInterface & { pipeline: PipelineModelInterface }>(
    channel,
    'pipeline-runner-update',
    (event) => {
      if (!event) {
        return
      }

      if (!event.pipeline || pipeline.id !== event.pipeline.id) {
        return
      }

      if (pagination === null) {
        setPagination({ items: [event] })
        return
      }

      setPagination({
        items: pagination.items.map((item) => {
          return item.id === event.id ? event : item
        }),
      })
    },
  )

  return (
    <>
      <Table>
        <TableHeadersRow>
          <TableHeader>Type</TableHeader>
          <TableHeader>Created</TableHeader>
          <TableHeader>Status</TableHeader>
          <TableHeader>Version</TableHeader>
          <TableHeader>Currently Deployed</TableHeader>
          {pagination?.items.some((item) => !!item.tasks?.length) && <TableHeader></TableHeader>}
        </TableHeadersRow>
        {loading ? (
          <FlexContainer isFlexAlignCenter isFlexJustifyCenter className={cx(elP6)}>
            <Loader />
          </FlexContainer>
        ) : pagination !== null ? (
          pagination.items.map((deployment) => (
            <TableRowContainer key={deployment.id}>
              <TableRow>
                <TableCell>{deployment.type}</TableCell>
                <TableCell>{deployment.created && isoDateToHuman(deployment.created)}</TableCell>
                <TableCell>{deployment.buildStatus}</TableCell>
                <TableCell>{deployment.buildVersion}</TableCell>
                <TableCell>{deployment.currentlyDeployed ? 'Deployed' : ''}</TableCell>
                {!!deployment.tasks?.length && (
                  <TableExpandableRowTriggerCell
                    isOpen={isOpen === deployment.id}
                    onClick={() => {
                      if (!deployment.id) {
                        return
                      }
                      if (isOpen === deployment.id) {
                        setIsOpen('')
                      } else {
                        setIsOpen(deployment.id)
                      }
                    }}
                  />
                )}
              </TableRow>
              {!!deployment.tasks?.length && (
                <TableExpandableRow isOpen={isOpen === deployment.id}>
                  <TaskList tasks={deployment.tasks} />
                </TableExpandableRow>
              )}
            </TableRowContainer>
          ))
        ) : null}
      </Table>

      {initialDeployments && (
        <div className={elMt3}>
          <Pagination
            currentPage={initialDeployments.meta.currentPage}
            numberPages={initialDeployments.meta.totalPages}
            callback={(page) => {
              setPage(page)
            }}
          />
        </div>
      )}
    </>
  )
}
