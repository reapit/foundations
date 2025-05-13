import React, { FC } from 'react'
import { buildStatusToIntent, buildStatusToReadable } from '@reapit/utils-common'
import { BodyText, Col, elMb11, elMr5, FlexContainer, Grid, Icon, StatusIndicator, Subtitle } from '@reapit/elements'
import { useAppState } from '../state/use-app-state'
import { PipelineDeploymentTable } from './pipeline-deployments-table'
import { PipelineTabs } from './pipeline-tabs'

export const getAppFromPipeline = (isGithub: boolean) => {
  const isBitbucket = !isGithub
  const isProd = process.env.appEnv === 'production'

  if (isBitbucket && isProd) return 'https://bitbucket.org/site/addons/authorize?addon_key=reapit'
  if (isBitbucket) return 'https://bitbucket.org/site/addons/authorize?addon_key=reapit-dev'
  if (isGithub && isProd) return 'https://github.com/apps/reapit'
  if (isGithub) return 'https://github.com/apps/reapit-dev'
}

export const PipelineInfo: FC = () => {
  const isProd = process.env.appEnv === 'production'
  const { appPipelineState } = useAppState()
  const { appPipeline } = appPipelineState
  const pipelineUri =
    appPipeline?.certificateStatus === 'complete'
      ? `https://${appPipeline?.customDomain}`
      : `https://${appPipeline?.subDomain}${isProd ? '' : '.dev'}.iaas.paas.reapit.cloud`
  const isGithub = Boolean(appPipeline?.repository?.repositoryUrl?.includes('github'))
  const isBitbucket = Boolean(appPipeline?.repository?.repositoryUrl?.includes('bitbucket'))

  return (
    <>
      <PipelineTabs />
      <Grid className={elMb11}>
        <Col>
          <FlexContainer isFlexAlignCenter>
            <div className={elMr5}>
              <Icon icon="refreshInfographic" iconSize="medium" />
            </div>
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
            <div className={elMr5}>
              <Icon icon="apiDocsInfographic" iconSize="medium" />
            </div>
            <div>
              <Subtitle hasNoMargin>Repository</Subtitle>
              <BodyText hasNoMargin hasGreyText>
                <StatusIndicator intent={isGithub ? 'success' : isBitbucket ? 'success' : 'danger'} />{' '}
                {appPipeline?.repository?.repositoryUrl ? (
                  <a href={appPipeline.repository.repositoryUrl} target="_blank" rel="noreferrer">
                    {appPipeline.repository.repositoryUrl}
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
            <div className={elMr5}>
              <Icon icon="globeInfographic" iconSize="medium" />
            </div>
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
      <PipelineDeploymentTable />
    </>
  )
}
