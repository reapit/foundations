import { PipelineModelInterface } from '@reapit/foundations-ts-definitions'
import { useReapitGet } from '@reapit/utils-react'
import React, { useState } from 'react'
import { CreatePipeline } from './create-pipeline'
import { PipelineDeploymentInfo } from './deployment-info'
import { reapitConnectBrowserSession } from '../../../../core/connect-session'
import { GetActionNames, getActions } from '@reapit/utils-common'
import { BodyText, FlexContainer, Loader } from '@reapit/elements'
import { ReapitConnectSession, useReapitConnect } from '@reapit/connect-session'
import { COGNITO_HEADERS } from '@/constants/api'
import { PusherProvider, useEvent, useChannel } from '@harelpls/use-pusher'
import { URLS } from '../../../../constants/api'

const PipelineWrapper = ({
  initialPipeline,
  connection,
}: {
  initialPipeline: PipelineModelInterface
  connection: ReapitConnectSession
}) => {
  const [pipeline, setPipeline] = useState<PipelineModelInterface>(initialPipeline)
  const channel = useChannel(`private-${connection.loginIdentity.developerId}`)

  useEvent<{ pipeline: PipelineModelInterface }>(channel, 'pipeline-runner-update', (event) => {
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
  })

  return (
    <>
      <PipelineDeploymentInfo pipeline={pipeline} />
    </>
  )
}

export const AppPipeline = ({ appId }: { appId: string }) => {
  const { connectSession } = useReapitConnect(reapitConnectBrowserSession)
  const [pipeline, loading, , refresh] = useReapitGet<PipelineModelInterface>({
    reapitConnectBrowserSession,
    action: getActions(window.reapit.config.appEnv)[GetActionNames.getPipeline],
    uriParams: { appId },
    headers: {
      Authorization: connectSession?.idToken as string,
    },
    fetchWhenTrue: [connectSession?.idToken],
  })

  return (
    <PusherProvider
      cluster="eu"
      clientKey={window.reapit.config.PUSHER_KEY}
      authEndpoint={`${URLS.DEPLOYMENT_SERVICE_HOST}/pusher/auth`}
      auth={{
        headers: {
          ...COGNITO_HEADERS,
          Authorization: connectSession?.idToken,
        },
      }}
    >
      {loading || !connectSession ? (
        <FlexContainer isFlexJustifyCenter isFlexAlignCenter>
          <div>
            <BodyText>Loading</BodyText>
            <Loader />
          </div>
        </FlexContainer>
      ) : !pipeline ? (
        <CreatePipeline refreshPipeline={refresh} appId={appId} />
      ) : (
        <PipelineWrapper initialPipeline={pipeline} connection={connectSession} />
      )}
    </PusherProvider>
  )
}
