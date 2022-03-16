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
  TableHeader,
  TableHeadersRow,
  TableRow,
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
        </TableHeadersRow>
        {loading ? (
          <FlexContainer isFlexAlignCenter isFlexJustifyCenter className={cx(elP6)}>
            <Loader />
          </FlexContainer>
        ) : pagination !== null ? (
          pagination.items.map((deployment) => (
            <TableRow key={deployment.id}>
              <TableCell>{deployment.type}</TableCell>
              <TableCell>
                {deployment.created && DateTime.fromISO(deployment.created).toLocaleString(DateTime.DATETIME_SHORT)}
              </TableCell>
              <TableCell>{deployment.buildStatus}</TableCell>
              <TableCell>{deployment.buildVersion}</TableCell>
              <TableCell>{deployment.currentlyDeployed ? 'Deployed' : ''}</TableCell>
            </TableRow>
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
