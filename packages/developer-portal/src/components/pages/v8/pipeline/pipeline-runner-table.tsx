import React, { useEffect, useState } from 'react'
import { cx } from '@linaria/core'
import { elP6, FlexContainer, Loader, Table, TableCell, TableHeader, TableHeadersRow, TableRow } from '@reapit/elements'
import { PipelineModelInterface, PipelineRunnerModelInterface } from '@reapit/foundations-ts-definitions'
import { useEvent } from '@harelpls/use-pusher'

export const PipelineDeploymentTable: React.FC<{
  pipeline: PipelineModelInterface
  initialDeployments: null | { items: PipelineRunnerModelInterface[] }
  loading: boolean
  channel: any
  newRunner: PipelineRunnerModelInterface | undefined
}> = ({ pipeline, initialDeployments, loading, channel, newRunner }) => {
  const [pagination, setPagination] = useState<{ items: PipelineRunnerModelInterface[] } | null>(initialDeployments)
  useEffect(() => {
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
  }, [initialDeployments])

  useEffect(() => {
    console.log('new runner was added', newRunner)
    if (newRunner)
      setPagination({
        items: [newRunner, ...(pagination?.items ? pagination.items : [])],
      })
  }, [newRunner])

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
    <Table>
      <TableHeadersRow>
        <TableHeader>Type</TableHeader>
        <TableHeader>Created</TableHeader>
        <TableHeader>Status</TableHeader>
        <TableHeader>Version</TableHeader>
        <TableHeader>Currently Deployed</TableHeader>
        <TableHeader></TableHeader>
      </TableHeadersRow>
      {loading ? (
        <FlexContainer isFlexAlignCenter isFlexJustifyCenter className={cx(elP6)}>
          <Loader />
        </FlexContainer>
      ) : pagination !== null ? (
        pagination.items.map((deployment) => (
          <TableRow key={deployment.id}>
            <TableCell>{deployment.type}</TableCell>
            <TableCell>{deployment.created}</TableCell>
            <TableCell>{deployment.buildStatus}</TableCell>
            <TableCell>{deployment.buildVersion}</TableCell>
            <TableCell>{deployment.currentlyDeployed ? 'Deployed' : ''}</TableCell>
            <TableCell></TableCell>
          </TableRow>
        ))
      ) : null}
    </Table>
  )
}
