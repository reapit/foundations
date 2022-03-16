import { PipelineModelInterface } from '@reapit/foundations-ts-definitions'
import { useReapitGet } from '@reapit/utils-react'
import React, { FC } from 'react'
import { CreatePipeline } from './create-pipeline'
import { reapitConnectBrowserSession } from '../../../../core/connect-session'
import { GetActionNames, getActions } from '@reapit/utils-common'
import { BodyText, FlexContainer, Loader, PersistantNotification } from '@reapit/elements'
import { useReapitConnect } from '@reapit/connect-session'
import { PusherProvider } from '@harelpls/use-pusher'
import { URLS, COGNITO_HEADERS } from '../../../../constants/api'
import { PipelineWrapper } from './pipeline-info-wrapper'
import { useAppState } from '../state/use-app-state'

export const AppPipeline: FC = () => {
  const { connectSession } = useReapitConnect(reapitConnectBrowserSession)
  const { appId } = useAppState()

  const [pipeline, loading, , refresh] = useReapitGet<PipelineModelInterface>({
    reapitConnectBrowserSession,
    action: getActions(window.reapit.config.appEnv)[GetActionNames.getPipeline],
    uriParams: { appId },
    headers: {
      Authorization: connectSession?.idToken as string,
    },
    fetchWhenTrue: [connectSession?.idToken, appId],
    onError: () => {
      // we already display errors below, so no need to show a toast here
    },
  })

  return (
    <>
      {loading || !connectSession ? (
        <FlexContainer isFlexJustifyCenter isFlexAlignCenter>
          <div>
            <BodyText>Loading</BodyText>
            <Loader />
          </div>
        </FlexContainer>
      ) : !pipeline && appId ? (
        <CreatePipeline refreshPipeline={refresh} appId={appId} />
      ) : pipeline ? (
        <PusherProvider
          cluster="eu"
          clientKey={window.reapit.config.PUSHER_KEY}
          authEndpoint={`${URLS.DEPLOYMENT_SERVICE_HOST}/pusher/auth`}
          auth={{
            headers: {
              ...COGNITO_HEADERS,
              Authorization: connectSession.idToken,
            },
          }}
        >
          <PipelineWrapper initialPipeline={pipeline} connection={connectSession} />
        </PusherProvider>
      ) : (
        <PersistantNotification intent="secondary" isExpanded isFullWidth isInline>
          No record of this app found
        </PersistantNotification>
      )}
    </>
  )
}
