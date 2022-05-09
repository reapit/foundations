import React, { Dispatch, FC, SetStateAction } from 'react'
import { reapitConnectBrowserSession } from '../../../core/connect-session'
import { buildStatusToIntent, buildStatusToReadable } from '../../../utils/pipeline-helpers'
import { useReapitConnect } from '@reapit/connect-session'
import { BodyText, Col, elMb11, elMr4, FlexContainer, Grid, Icon, StatusIndicator, Subtitle } from '@reapit/elements'
import { useChannel, useEvent } from '@harelpls/use-pusher'
import { useAppState } from '../state/use-app-state'
import { PipelineModelInterface } from '@reapit/foundations-ts-definitions'
import { PipelineDeploymentTable } from './pipeline-deployments-table'
import { PipelineTabs } from './pipeline-tabs'

export interface PipelinePusherEvent {
  pipeline: PipelineModelInterface
}

export const handlePipelineEvent =
  (pipeline: PipelineModelInterface | null, setPipeline: Dispatch<SetStateAction<PipelineModelInterface | null>>) =>
  (event?: PipelinePusherEvent) => {
    if (!event) {
      return
    }

    if (!pipeline) {
      return
    }

    if (event.pipeline.id !== pipeline.id) {
      return
    }

    setPipeline(event.pipeline)
  }

export const PipelineInfo: FC = () => {
  const { connectSession } = useReapitConnect(reapitConnectBrowserSession)
  const { appPipelineState } = useAppState()
  const { appPipeline, setAppPipeline } = appPipelineState
  const pipelineUri = `https://${appPipeline?.subDomain}.iaas.paas.reapit.cloud`

  const channel = useChannel(`private-${connectSession?.loginIdentity.developerId}`)
  useEvent<PipelinePusherEvent>(channel, 'pipeline-runner-update', handlePipelineEvent(appPipeline, setAppPipeline))

  return (
    <>
      <PipelineTabs />
      <Grid className={elMb11}>
        <Col>
          <FlexContainer isFlexAlignCenter>
            <Icon className={elMr4} icon="refreshInfographic" iconSize="medium" />
            <div>
              <Subtitle hasNoMargin>Status</Subtitle>
              <BodyText hasNoMargin hasGreyText>
                <StatusIndicator intent={buildStatusToIntent(appPipeline?.buildStatus ?? '')} />{' '}
                {buildStatusToReadable(appPipeline?.buildStatus ?? '')}
              </BodyText>
            </div>
          </FlexContainer>
        </Col>
        <Col>
          <FlexContainer isFlexAlignCenter>
            <Icon className={elMr4} icon="apiDocsInfographic" iconSize="medium" />
            <div>
              <Subtitle hasNoMargin>Repository</Subtitle>
              <BodyText hasNoMargin hasGreyText>
                <StatusIndicator intent={appPipeline?.branch ? 'success' : 'low'} />{' '}
                {appPipeline?.repository ? (
                  <a href={appPipeline.repository} target="_blank" rel="noreferrer">
                    {appPipeline.repository}
                  </a>
                ) : (
                  'Not configured'
                )}
              </BodyText>
            </div>
          </FlexContainer>
        </Col>
        <Col>
          <FlexContainer isFlexAlignCenter>
            <Icon className={elMr4} icon="globeInfographic" iconSize="medium" />
            <div>
              <Subtitle hasNoMargin>Location</Subtitle>
              <BodyText hasNoMargin hasGreyText>
                {appPipeline?.subDomain ? (
                  <a href={pipelineUri} target="_blank" rel="noreferrer">
                    {pipelineUri}
                  </a>
                ) : (
                  'Not yet deployed'
                )}
              </BodyText>
            </div>
          </FlexContainer>
        </Col>
      </Grid>
      <PipelineDeploymentTable />
    </>
  )
}
