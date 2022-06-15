import React, { Dispatch, FC, SetStateAction } from 'react'
import { buildStatusToIntent, buildStatusToReadable } from '../../../utils/pipeline-helpers'
import { BodyText, Col, elMb11, elMr4, FlexContainer, Grid, Icon, StatusIndicator, Subtitle } from '@reapit/elements'
import { useChannel, useEvent } from '@harelpls/use-pusher'
import { useAppState } from '../state/use-app-state'
import { PipelineModelInterface } from '@reapit/foundations-ts-definitions'
import { PipelineDeploymentTable } from './pipeline-deployments-table'
import { PipelineTabs } from './pipeline-tabs'
import { useGlobalState } from '../../../core/use-global-state'

export interface PipelinePusherEvent {
  pipeline: PipelineModelInterface
}

export const handlePipelineEvent =
  (
    pipeline: PipelineModelInterface | null,
    setPipeline: Dispatch<SetStateAction<PipelineModelInterface | null>>,
    appId: string | null,
  ) =>
  (event?: PipelineModelInterface) => {
    const pipelineId = pipeline?.id || appId
    if (!event || !pipelineId || event?.id !== pipelineId) {
      return
    }

    setPipeline(event)
  }

export const handleRunnerEvent =
  (
    pipeline: PipelineModelInterface | null,
    setPipeline: Dispatch<SetStateAction<PipelineModelInterface | null>>,
    appId: string | null,
  ) =>
  (event?: PipelinePusherEvent) => {
    const pipelineId = pipeline?.id || appId
    if (!event || !pipelineId || event.pipeline?.id !== pipelineId) {
      return
    }

    setPipeline(event.pipeline)
  }

export const PipelineInfo: FC = () => {
  const { appPipelineState, appId } = useAppState()
  const { globalDataState } = useGlobalState()
  const { currentDeveloper } = globalDataState
  const { appPipeline, setAppPipeline } = appPipelineState
  const pipelineUri = `https://${appPipeline?.subDomain}.iaas.paas.reapit.cloud`

  const channel = useChannel(`private-${currentDeveloper?.id}`)

  useEvent<PipelineModelInterface>(channel, 'pipeline-update', handlePipelineEvent(appPipeline, setAppPipeline, appId))
  useEvent<PipelinePusherEvent>(
    channel,
    'pipeline-runner-update',
    handleRunnerEvent(appPipeline, setAppPipeline, appId),
  )

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
                <StatusIndicator
                  intent={
                    appPipeline?.repository?.includes('github')
                      ? appPipeline?.installationId
                        ? 'success'
                        : 'critical'
                      : appPipeline?.repository?.includes('bitbucket')
                      ? appPipeline?.bitbucketClientId
                        ? 'success'
                        : 'critical'
                      : 'danger'
                  }
                />{' '}
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
                  'Awaiting provision request'
                )}
              </BodyText>
            </div>
          </FlexContainer>
        </Col>
      </Grid>
      <PipelineDeploymentTable channel={channel as any} />
    </>
  )
}
