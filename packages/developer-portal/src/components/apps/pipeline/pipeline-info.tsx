import React, { FC } from 'react'
import { buildStatusToIntent, buildStatusToReadable } from '@reapit/utils-common'
import {
  BodyText,
  Col,
  elMb11,
  elMr2,
  elMr4,
  FlexContainer,
  Grid,
  Icon,
  StatusIndicator,
  Subtitle,
} from '@reapit/elements'
import { useAppState } from '../state/use-app-state'
import { PipelineDeploymentTable } from './pipeline-deployments-table'
import { PipelineTabs } from './pipeline-tabs'

export const getAppFromPipeline = (isGithub: boolean) => {
  const isProd = process.env.appEnv === 'production'
  const isBitbucket = !isGithub

  if (isBitbucket && isProd) return 'https://bitbucket.org/site/addons/authorize?addon_key=reapit'
  if (isBitbucket) return 'https://bitbucket.org/site/addons/authorize?addon_key=reapit-dev'
  if (isGithub && isProd) return 'https://github.com/apps/reapit'
  if (isGithub) return 'https://github.com/apps/reapit-dev'
}

export const PipelineInfo: FC = () => {
  const { appPipelineState } = useAppState()
  const { appPipeline } = appPipelineState
  const pipelineUri = `https://${appPipeline?.subDomain}.iaas.paas.reapit.cloud`
  const isGithub = Boolean(appPipeline?.repository?.includes('github'))
  const isBitbucket = Boolean(appPipeline?.repository?.includes('bitbucket'))
  const hasGithubApp = Boolean(appPipeline?.installationId)
  const hasBitbucketApp = Boolean(appPipeline?.bitbucketClientId)

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
                <StatusIndicator intent={isGithub ? 'success' : isBitbucket ? 'success' : 'danger'} />{' '}
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
        <Col>
          <FlexContainer isFlexAlignCenter>
            <Icon className={elMr4} icon="webhooksInfographic" iconSize="medium" />
            <div>
              <Subtitle hasNoMargin>Github / Bitbucket App</Subtitle>
              <FlexContainer>
                <div className={elMr2}>
                  <StatusIndicator
                    intent={
                      isGithub
                        ? hasGithubApp
                          ? 'success'
                          : 'critical'
                        : isBitbucket
                        ? hasBitbucketApp
                          ? 'success'
                          : 'critical'
                        : 'danger'
                    }
                  />
                </div>
                <BodyText hasNoMargin hasGreyText>
                  {hasGithubApp ? (
                    'Github app installed successfully'
                  ) : hasBitbucketApp ? (
                    'Bitbucket app installed successfully'
                  ) : !isGithub && !isBitbucket ? (
                    'You need to confgure a repo before installing either the Github or Bitbucket app'
                  ) : (
                    <>
                      To deploy from repos, configure either the Reapit{' '}
                      <a href={getAppFromPipeline(true)} target="_blank" rel="noreferrer">
                        Github
                      </a>{' '}
                      or{' '}
                      <a href={getAppFromPipeline(false)} target="_blank" rel="noreferrer">
                        Bitbucket
                      </a>{' '}
                      app.
                    </>
                  )}
                </BodyText>
              </FlexContainer>
            </div>
          </FlexContainer>
        </Col>
      </Grid>
      <PipelineDeploymentTable />
    </>
  )
}
