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
          Pipelines are configurations used to deploy applications to our infrastructure. Think of them like a CI / CD
          runner like Github Actions, Travis or CircleCI
        </BodyText>
        <BodyText hasGreyText>A Pipeline can be created via the developer portal or via our CLI NPM package.</BodyText>
        <BodyText hasGreyText>
          When you have created a pipeline for your app, you can either deploy it from the command line from a zip file,
          or by pulling directly from a Github or Bitbucket repo. This will give you a link to your deployed service in
          the Reapit Platform Cloud.
        </BodyText>
        <Button
          intent="primary"
          chevronRight
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
          For more on how to get started with Pipelines and deploying to Reapit infrastructure as a Service (IAAS),
          visit the doucmentation link below.
        </BodyText>
        <BodyText hasGreyText>
          Please note, this service is a public Alpha and there may be some reliabilty issues while we refine our
          processes. As such, for now you should only use our infra for internal testing, pre-production applications
          and non-mission critical services.
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
