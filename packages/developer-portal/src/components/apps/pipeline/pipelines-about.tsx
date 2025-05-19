import React, { useState } from 'react'
import { BodyText, Button, ColSplit, elMb10, Grid, Subtitle } from '@reapit/elements'
import { IconContainer } from '../../webhooks/__styles__'
import { WebhooksAnimatedNewIcon } from '../../webhooks/webhooks-animated-new-icon'
import { WebhooksAnimatedDocsIcon } from '../../webhooks/webhooks-animated-docs-icon'
import { ExternalPages, navigateRoute, openNewPage } from '../../../utils/navigation'
import { useNavigate } from 'react-router'
import Routes from '../../../constants/routes'
import { useAppState } from '../state/use-app-state'

export const PipelinesAbout = () => {
  const navigate = useNavigate()
  const { appId } = useAppState()
  const [newPipelineAnimated, setNewPipelineAnimated] = useState<boolean>(false)
  const [docsIsAnimated, setDocsIsAnimated] = useState<boolean>(false)

  return (
    <Grid>
      <ColSplit>
        <IconContainer className={elMb10}>
          <WebhooksAnimatedNewIcon isAnimated={newPipelineAnimated} />
        </IconContainer>
        <Subtitle>Pipeline Deployments</Subtitle>
        <BodyText hasGreyText>
          Pipelines are configurations used to deploy applications to infrastructure managed by Reapit. A pipeline is
          similar to a CI / CD runner like Github Actions, Travis or CircleCI.
        </BodyText>
        <BodyText hasGreyText>A Pipeline can be created via the DeveloperPortal or via our CLI NPM package.</BodyText>
        <BodyText hasGreyText>
          When a pipeline has been created for an app, it can be deployed from the command line from a zip file, or by
          pulling code directly from a Github repository. This will provide a link to your deployed service in the
          Platform Cloud.
        </BodyText>
        <Button
          intent="primary"
          onClick={navigateRoute(navigate, Routes.APP_PIPELINE_NEW.replace(':appId', appId as string))}
          onMouseOver={() => {
            setNewPipelineAnimated(true)
          }}
          onMouseOut={() => {
            setNewPipelineAnimated(false)
          }}
        >
          Create Pipeline
        </Button>
      </ColSplit>
      <ColSplit>
        <IconContainer className={elMb10}>
          <WebhooksAnimatedDocsIcon isAnimated={docsIsAnimated} />
        </IconContainer>
        <Subtitle>Pipeline Documentation</Subtitle>
        <BodyText hasGreyText>
          For more information on how to get started with Pipelines and deploying to Reapit Infrastructure as a Service
          (IaaS), visit the documentation link below.
        </BodyText>
        <Button
          intent="default"
          onClick={openNewPage(ExternalPages.pipelineDocs)}
          onMouseOver={() => {
            setDocsIsAnimated(true)
          }}
          onMouseOut={() => {
            setDocsIsAnimated(false)
          }}
        >
          View Docs
        </Button>
      </ColSplit>
    </Grid>
  )
}
