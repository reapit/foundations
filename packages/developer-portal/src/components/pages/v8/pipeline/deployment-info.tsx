import { cx } from '@linaria/core'
import { useReapitConnect } from '@reapit/connect-session'
import {
  BodyText,
  Button,
  ButtonGroup,
  ColSplit,
  elMb6,
  InputWrap,
  Intent,
  StatusIndicator,
  Subtitle,
  Table,
  TableCell,
  TableHeader,
  TableHeadersRow,
  TableRow,
  Title,
  Grid,
  FlexContainer,
  Loader,
  elP6,
} from '@reapit/elements'
import { PipelineModelInterface, PipelineRunnerModelInterface } from '@reapit/foundations-ts-definitions'
import { GetActionNames, getActions, UpdateActionNames, updateActions } from '@reapit/utils-common'
import { useReapitGet, useReapitUpdate } from '@reapit/utils-react'
import React, { useEffect, useState } from 'react'
import { reapitConnectBrowserSession } from '../../../../core/connect-session'
import { useEvent } from '@harelpls/use-pusher'
import { openNewPage } from '@/utils/navigation'

const buildStatusToIntent = (status: string): Intent => {
  switch (status) {
    case 'CREATING_ARCHITECTURE':
      return 'primary'
    case 'SUCCESS':
      return 'primary'
    case 'RUNNING':
      return 'secondary'
    case 'PENDING':
    case 'QUEUED':
    default:
      return 'neutral'
  }
}

const buildStatusToReadable = (status: string): string =>
  status
    .split('_')
    .map((str) => str.toLowerCase())
    .join(' ')

const PipelineInfo = ({ pipeline }: { pipeline: PipelineModelInterface }) => {
  return (
    <Grid>
      <ColSplit>
        <InputWrap>
          <Subtitle>Status</Subtitle>
          <BodyText>
            <StatusIndicator intent={buildStatusToIntent(pipeline.buildStatus as string)} />{' '}
            {buildStatusToReadable(pipeline.buildStatus as string)}
          </BodyText>
        </InputWrap>
        <InputWrap>
          <Subtitle>Repository</Subtitle>
          <BodyText>{pipeline.repository}</BodyText>
        </InputWrap>
        <InputWrap>
          <Subtitle>Package Manager</Subtitle>
          <BodyText>{pipeline.packageManager}</BodyText>
        </InputWrap>
      </ColSplit>
      <ColSplit>
        <InputWrap>
          <Subtitle>Build Command</Subtitle>
          <BodyText>{pipeline.buildCommand}</BodyText>
        </InputWrap>
        <InputWrap>
          <Subtitle>Tests</Subtitle>
          <BodyText>{pipeline.testCommand}</BodyText>
        </InputWrap>
        <InputWrap>
          <Subtitle>Location</Subtitle>
          <BodyText>{pipeline.subDomain ? `https://${pipeline.subDomain}.dev.paas.reapit.cloud` : ''}</BodyText>
        </InputWrap>
      </ColSplit>
    </Grid>
  )
}

const PipelineDeploymentTable = ({
  pipeline,
  initialDeployments,
  loading,
  channel,
  newRunner,
}: {
  pipeline: PipelineModelInterface
  initialDeployments: null | { items: PipelineRunnerModelInterface[] }
  loading: boolean
  channel: any
  newRunner: PipelineRunnerModelInterface | undefined
}) => {
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

export const PipelineDeploymentInfo = ({ pipeline, channel }: { pipeline: PipelineModelInterface; channel: any }) => {
  const { connectSession } = useReapitConnect(reapitConnectBrowserSession)
  const [pipelineDeployments, loading] = useReapitGet<{ items: PipelineRunnerModelInterface[] }>({
    reapitConnectBrowserSession,
    action: getActions(window.reapit.config.appEnv)[GetActionNames.getPipelineDeployments],
    uriParams: {
      pipelineId: pipeline.id,
    },
    headers: {
      Authorization: connectSession?.idToken as string,
    },
    fetchWhenTrue: [connectSession?.idToken],
  })
  const [deploymentLoading, pipelineRunner, sendFunc] = useReapitUpdate<void, PipelineRunnerModelInterface>({
    reapitConnectBrowserSession,
    action: updateActions(window.reapit.config.appEnv)[UpdateActionNames.createPipelineDeployment],
    uriParams: {
      pipelineId: pipeline.id,
    },
    headers: {
      Authorization: connectSession?.idToken as string,
    },
    returnUpdatedModel: true,
  })

  return (
    <>
      <PipelineInfo pipeline={pipeline} />
      <Title>Deployments</Title>
      <ButtonGroup className={cx(elMb6)}>
        <Button
          loading={deploymentLoading}
          intent="primary"
          onClick={async () => {
            await sendFunc()
          }}
        >
          Deploy
        </Button>
        <Button
          intent="critical"
          onClick={openNewPage('https://github.com/reapit/foundations/tree/master/packages/cli#readme')}
        >
          Deploy With Cli
        </Button>
      </ButtonGroup>
      <PipelineDeploymentTable
        pipeline={pipeline}
        initialDeployments={pipelineDeployments}
        newRunner={pipelineRunner}
        loading={loading}
        channel={channel}
      />
    </>
  )
}
