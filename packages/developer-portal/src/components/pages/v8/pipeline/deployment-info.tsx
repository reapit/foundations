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
  Title,
  Grid,
} from '@reapit/elements'
import { PipelineModelInterface, PipelineRunnerModelInterface } from '@reapit/foundations-ts-definitions'
import { GetActionNames, getActions, UpdateActionNames, updateActions } from '@reapit/utils-common'
import { useReapitGet, useReapitUpdate } from '@reapit/utils-react'
import React from 'react'
import { reapitConnectBrowserSession } from '../../../../core/connect-session'
import { openNewPage } from '@/utils/navigation'
import { UpdateReturnTypeEnum } from '@reapit/utils-react/src/use-reapit-data/use-reapit-update'
import { PipelineDeploymentTable } from './pipeline-runner-table'

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

const PipelineInfo: React.FC<{ pipeline: PipelineModelInterface }> = ({ pipeline }) => {
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
    returnType: UpdateReturnTypeEnum.RESPONSE,
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
